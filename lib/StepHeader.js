'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

//eslint-disable-line

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _components = {
  _$StepHeader: {
    displayName: 'StepHeader'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/StepHeader.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

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

    _classCallCheck(this, _StepHeader);

    _Component.call(this);

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

  StepHeader.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (newProps.step > this.state.max_step) this.setState({ max_step: newProps.step });
  };

  StepHeader.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var step = _props.step;
    var headings = _props.headings;

    var step_class = this.props.stepClassName || this.props.step_class;

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
          { key: index, className: _classnames2['default'](classes, step_class), onClick: _this2.handleStepFn(index) },
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

  var _StepHeader = StepHeader;
  StepHeader = _wrapComponent('_$StepHeader')(StepHeader) || StepHeader;
  return StepHeader;
})(_react.Component);

exports['default'] = StepHeader;
module.exports = exports['default'];