'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      {
        role: 'tabpanel',
        'aria-hidden': !this.props.active,
        className: _classnames2['default'](this.props.className, classes)
      },
      this.props.children
    );
  };

  return Step;
})(_react.Component);

exports['default'] = Step;
module.exports = exports['default'];