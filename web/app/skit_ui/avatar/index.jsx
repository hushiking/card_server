import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../icon';
import classNames from 'classnames';
import  './style/index';



export default class Avatar extends React.Component {
  static defaultProps = {
    prefixCls: 'xxx-avatar',
    shape: 'circle',
    size: 'default',
  };


  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      isImgExist: true,
    };
  }

  componentDidMount() {
    this.setScale();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.children !== this.props.children
        || (prevState.scale !== this.state.scale && this.state.scale === 1)) {
      this.setScale();
    }
  }

  setScale = () => {
    const childrenNode = this.avatarChildren;
    if (childrenNode) {
      const childrenWidth = childrenNode.offsetWidth;
      const avatarWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
      // add 4px gap for each side to get better performance
      if (avatarWidth - 8 < childrenWidth) {
        this.setState({
          scale: (avatarWidth - 8) / childrenWidth,
        });
      } else {
        this.setState({
          scale: 1,
        });
      }
    }
  }

  handleImgLoadError = () => this.setState({ isImgExist: false });

  render() {
    const {
      prefixCls, shape, size, src, icon, className, ...others,
    } = this.props;

    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    const classString = classNames(prefixCls, className, sizeCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src,
      [`${prefixCls}-icon`]: icon,
    });

    let children = this.props.children;
    if (src && this.state.isImgExist) {
      children = (
        <img
          src={src}
          onError={this.handleImgLoadError}
        />
      );
    } else if (icon) {
      children = <Icon type={icon} />;
    } else {
      const childrenNode = this.avatarChildren;
      if (childrenNode || this.state.scale !== 1) {
        const childrenStyle = {
          msTransform: `scale(${this.state.scale})`,
          WebkitTransform: `scale(${this.state.scale})`,
          transform: `scale(${this.state.scale})`,
          position: 'absolute',
          display: 'inline-block',
          left: `calc(50% - ${Math.round(childrenNode.offsetWidth / 2)}px)`,
        };
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={span => this.avatarChildren = span}
            style={childrenStyle}
          >
            {children}
          </span>
        );
      } else {
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={span => this.avatarChildren = span}
          >
            {children}
          </span>
        );
      }
    }
    return (
      <span {...others} className={classString}>
        {children}
      </span>
    );
  }
}
