'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

    _get(Object.getPrototypeOf(Step.prototype), 'constructor', this).call(this);

    this.startAnimateIn = function () {
      _this.setState({ animate_in: false });
    };

    this.stopAnimateOut = function () {
      _this.setState({ animate_out: false });
      if (_this.props.onAnimateOutEnd) _this.props.onAnimateOutEnd();
    };

    this.state = {
      animate_in: false,
      animate_out: false
    };
  }

  _createClass(Step, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next_props) {
      if (!this.state.animate_in && next_props.active && !this.props.active) {
        this.setState({ animate_in: true });
      } else if (!this.state.animate_out && !next_props.active && this.props.active) {
        this.setState({ animate_out: true });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.animate_in) {
        setTimeout(this.startAnimateIn, 0);
      }
      if (this.state.animate_out) {
        _TransitionEvents2['default'].addEndEventListener(_reactDom2['default'].findDOMNode(this), this.stopAnimateOut);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _TransitionEvents2['default'].removeEndEventListener(_reactDom2['default'].findDOMNode(this), this.stopAnimateOut);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = {
        fade: true,
        active: this.props.active || this.state.animate_out,
        'in': this.props.active && !this.state.animate_in,
        hidden: !this.props.active && !this.state.animate_out
      };

      return _react2['default'].createElement(
        'div',
        _extends({}, this.props, {
          role: 'tabpanel',
          'aria-hidden': !this.props.active,
          className: (0, _classnames2['default'])(this.props.className, classes)
        }),
        this.props.children
      );
    }
  }]);

  return Step;
})(_react.Component);

exports['default'] = Step;
module.exports = exports['default'];