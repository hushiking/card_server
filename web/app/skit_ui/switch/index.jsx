
import * as React from 'react';
import PropTypes from 'prop-types';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
import omit from 'omit.js';
import './style/index';

export default class Switch extends React.Component {
  static defaultProps = {
    prefixCls: 'xxx-switch',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/ant-design/ant-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string,
  };

  focus() {
    this.rcSwitch.focus();
  }

  blur() {
    this.rcSwitch.blur();
  }

  saveSwitch = (node) => {
    this.rcSwitch = node;
  }

  render() {
    const { prefixCls, size, loading, className = '' } = this.props;
    const classes = classNames(className, {
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-loading`]: loading,
    });
    return (
      <RcSwitch
        {...omit(this.props, ['loading'])}
        className={classes}
        ref={this.saveSwitch}
      />
    );
  }
}
