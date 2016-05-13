'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

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
      stepClass: _react.PropTypes.string,
      stepClassName: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      step: 1,
      className: 'clearfix',
      stepClass: '',
      stepClassName: ''
    },
    enumerable: true
  }]);

  function StepHeader() {
    var _this = this;

    _classCallCheck(this, StepHeader);

    _Component.call(this);

    this.stepEnabled = function (step) {
      return step <= Math.max(_this.state.maxStep, _this.props.step);
    };

    this.handleStepFn = function (step) {
      return function () {
        return _this.stepEnabled(step) && _this.props.onChangeStep(step);
      };
    };

    this.state = { maxStep: 1 };
  }

  StepHeader.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (newProps.step > this.state.maxStep) this.setState({ maxStep: newProps.step });
  };

  StepHeader.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var step = _props.step;
    var headings = _props.headings;

    var stepClass = this.props.stepClassName || this.props.stepClass;

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](this.props.className, 'step-header') },
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
          { key: index, className: _classnames2['default'](classes, stepClass), onClick: _this2.handleStepFn(index) },
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
  };

  return StepHeader;
})(_react.Component);

exports['default'] = StepHeader;
module.exports = exports['default'];