'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

//eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TransitionEvents = require('./TransitionEvents');

var _TransitionEvents2 = _interopRequireDefault(_TransitionEvents);

var Step = (function (_Component) {
  _inherits(Step, _Component);

  _createClass(Step, null, [{
    key: 'propTypes',
    value: {
      className: _react2['default'].PropTypes.string,
      children: _react2['default'].PropTypes.node,
      active: _react2['default'].PropTypes.bool,
      onAnimateOutEnd: _react2['default'].PropTypes.func
    },
    enumerable: true
  }]);

  function Step() {
    var _this = this;

    _classCallCheck(this, Step);

    _Component.call(this);

    this.startAnimateIn = function () {
      _this.setState({ animateIn: false });
    };

    this.stopAnimateOut = function () {
      _this.setState({ animateOut: false });
      if (_this.props.onAnimateOutEnd) _this.props.onAnimateOutEnd();
    };

    this.state = {
      animateIn: false,
      animateOut: false
    };
  }

  Step.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.animateIn && nextProps.active && !this.props.active) {
      this.setState({ animateIn: true });
    } else if (!this.state.animateOut && !nextProps.active && this.props.active) {
      this.setState({ animateOut: true });
    }
  };

  Step.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.state.animateIn) {
      setTimeout(this.startAnimateIn, 0);
    }
    if (this.state.animateOut) {
      _TransitionEvents2['default'].addEndEventListener(_reactDom2['default'].findDOMNode(this), this.stopAnimateOut);
    }
  };

  Step.prototype.componentWillUnmount = function componentWillUnmount() {
    _TransitionEvents2['default'].removeEndEventListener(_reactDom2['default'].findDOMNode(this), this.stopAnimateOut);
  };

  Step.prototype.render = function render() {
    var classes = {
      fade: true,
      active: this.props.active || this.state.animateOut,
      'in': this.props.active && !this.state.animateIn,
      hidden: !this.props.active && !this.state.animateOut
    };

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: 'tabpanel',
        'aria-hidden': !this.props.active,
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  };

  return Step;
})(_react.Component);

exports['default'] = Step;
module.exports = exports['default'];