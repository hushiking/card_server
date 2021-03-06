import * as React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { PREFIX_CLS } from './Constants';
import Header from './Header';
import callMoment from '../utils/callMoment';

export { HeaderProps } from './Header';

function noop() { return null; }

function zerofixed(v) {
  if (v < 10) {
    return `0${v}`;
  }
  return `${v}`;
}

export default class Calendar extends React.Component {
  static defaultProps = {
    locale: {},
    fullscreen: true,
    prefixCls: PREFIX_CLS,
    mode: 'month',
    onSelect: noop,
    onPanelChange: noop,
  };

  static propTypes = {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    monthFullCellRender: PropTypes.func,
    dateFullCellRender: PropTypes.func,
    fullscreen: PropTypes.bool,
    locale: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onPanelChange: PropTypes.func,
    value: PropTypes.object,
    onSelect: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const value = props.value || props.defaultValue || callMoment(moment);
    if (!moment.isMoment(value)) {
      throw new Error(
        'The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' +
        'see: https://u.ant.design/calendar-value',
      );
    }
    this.state = {
      value,
      mode: props.mode,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  monthCellRender = (value) => {
    const { prefixCls, monthCellRender = noop } = this.props;
    return (
      <div className={`${prefixCls}-month`}>
        <div className={`${prefixCls}-value`}>
          {value.localeData().monthsShort(value)}
        </div>
        <div className={`${prefixCls}-content`}>
          {monthCellRender(value)}
        </div>
      </div>
    );
  }

  dateCellRender = (value) => {
    const { prefixCls, dateCellRender = noop } = this.props;
    return (
      <div className={`${prefixCls}-date`}>
        <div className={`${prefixCls}-value`}>
          {zerofixed(value.date())}
        </div>
        <div className={`${prefixCls}-content`}>
          {dateCellRender(value)}
        </div>
      </div>
    );
  }

  getDefaultLocale() {
    const locale = require('./locale/zh_CN');
    return locale.default || locale;
  }

  setValue = (value, way) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (way === 'select') {
      if (this.props.onSelect) {
        this.props.onSelect(value);
      }
    } else if (way === 'changePanel') {
      this.onPanelChange(value, this.state.mode);
    }
  }

  setType = (type) => {
    const mode = (type === 'date') ? 'month' : 'year';
    if (this.state.mode !== mode) {
      this.setState({ mode });
      this.onPanelChange(this.state.value, mode);
    }
  }

  onHeaderValueChange = (value) => {
    this.setValue(value, 'changePanel');
  }

  onHeaderTypeChange = (type) => {
    this.setType(type);
  }

  onPanelChange(value, mode) {
    const { onPanelChange } = this.props;
    if (onPanelChange) {
      onPanelChange(value, mode);
    }
  }

  onSelect = (value) => {
    this.setValue(value, 'select');
  }

  renderCalendar = (locale, localeCode) => {
    const { state, props } = this;
    const { value, mode } = state;
    if (value && localeCode) {
      value.locale(localeCode);
    }
    const { prefixCls, style, className, fullscreen, dateFullCellRender, monthFullCellRender } = props;
    const type = (mode === 'year') ? 'month' : 'date';

    let cls = className || '';
    if (fullscreen) {
      cls += (` ${prefixCls}-fullscreen`);
    }

    const monthCellRender = monthFullCellRender || this.monthCellRender;
    const dateCellRender = dateFullCellRender || this.dateCellRender;

    return (
      <div className={cls} style={style}>
        <Header
          fullscreen={fullscreen}
          type={type}
          value={value}
          locale={locale.lang}
          prefixCls={prefixCls}
          onTypeChange={this.onHeaderTypeChange}
          onValueChange={this.onHeaderValueChange}
        />
        <FullCalendar
          {...props}
          Select={noop}
          locale={locale.lang}
          type={type}
          prefixCls={prefixCls}
          showHeader={false}
          value={value}
          monthCellRender={monthCellRender}
          dateCellRender={dateCellRender}
          onSelect={this.onSelect}
        />
      </div>
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="Calendar"
        defaultLocale={this.getDefaultLocale}
      >
        {this.renderCalendar}
      </LocaleReceiver>
    );
  }
}
