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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var StepHeader = (function (_Component) {
  _inherits(StepHeader, _Component);

  _createClass(StepHeader, null, [{
    key: 'propTypes',
    value: {
      onChangeStep: _react.PropTypes.func.isRequired,
      headings: _react.PropTypes.array.isRequired,
      step: _react.PropTypes.number.isRequired,
      className: _react.PropTypes.string,
      step_class: _react.PropTypes.string,
      stepClassName: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      step: 1,
      className: 'clearfix',
      step_class: '',
      stepClassName: ''
    },
    enumerable: true
  }]);

  function StepHeader() {
    var _this = this;

    _classCallCheck(this, StepHeader);

    _get(Object.getPrototypeOf(StepHeader.prototype), 'constructor', this).call(this);

    this.stepEnabled = function (step) {
      return step <= Math.max(_this.state.max_step, _this.props.step);
    };

    this.handleStepFn = function (step) {
      return function () {
        return _this.stepEnabled(step) && _this.props.onChangeStep(step);
      };
    };

    this.state = { max_step: 1 };
  }

  _createClass(StepHeader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(new_props) {
      if (new_props.step > this.state.max_step) this.setState({ max_step: new_props.step });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var step = _props.step;
      var headings = _props.headings;

      var step_class = this.props.stepClassName || this.props.step_class;

      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])(this.props.className, 'step-header') },
        headings.map(function (title, i) {
          var index = i + 1;

          var classes = {
            step: true,
            active: index === step,
            complete: index < step,
            disabled: !_this2.stepEnabled(index)
          };

          return _react2['default'].createElement(
            'div',
            { key: index, className: (0, _classnames2['default'])(classes, step_class), onClick: _this2.handleStepFn(index) },
            _react2['default'].createElement(
              'div',
              { className: 'number' },
              index
            ),
            _react2['default'].createElement(
              'div',
              { className: 'text' },
              _react2['default'].createElement(
                'div',
                { className: 'text-inner' },
                title
              )
            ),
            _react2['default'].createElement('div', { className: 'dot' }),
            index > 1 && _react2['default'].createElement('div', { className: 'bar bar-left' }),
            index < headings.length && _react2['default'].createElement('div', { className: 'bar bar-right' })
          );
        })
      );
    }
  }]);

  return StepHeader;
})(_react.Component);

exports['default'] = StepHeader;
module.exports = exports['default'];