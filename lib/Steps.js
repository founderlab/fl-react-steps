'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

var Steps = (function (_Component) {
  _inherits(Steps, _Component);

  _createClass(Steps, null, [{
    key: 'propTypes',
    value: {
      children: _react.PropTypes.node.isRequired,
      step: _react.PropTypes.number.isRequired
    },
    enumerable: true
  }]);

  function Steps() {
    var _this = this;

    _classCallCheck(this, Steps);

    _get(Object.getPrototypeOf(Steps.prototype), 'constructor', this).call(this);

    this.renderStep = function (child, i) {
      var index = i + 1; // start from 1
      var prev_step = _this.state.prev_step;
      var is_already_active = prev_step && child.props.step === prev_step;

      return _react2['default'].cloneElement(child, {
        key: child.key ? child.key : index,
        step: index,
        active: !prev_step && index === _this.props.step,
        onAnimateOutEnd: is_already_active ? _this.handlePaneAnimateOutEnd : null
      });
    };

    this.state = { prev_step: null };
  }

  _createClass(Steps, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next_props) {
      var _this2 = this;

      if (next_props.step !== null && next_props.step !== this.props.step) {
        (function () {
          // check if the 'prev_step' child still exists
          var prev_step = _this2.props.step;

          _react2['default'].Children.forEach(next_props.children, function (child) {
            if (_react2['default'].isValidElement(child)) {
              if (child.props.step === prev_step) {
                _this2.setState({ prev_step: prev_step });
                return;
              }
            }
          });
        })();
      }
    }
  }, {
    key: 'handlePaneAnimateOutEnd',
    value: function handlePaneAnimateOutEnd() {
      this.setState({ prev_step: null });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].Children.map(children, this.renderStep)
      );
    }
  }]);

  return Steps;
})(_react.Component);

exports['default'] = Steps;
module.exports = exports['default'];