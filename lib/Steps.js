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

    _Component.call(this);

    this.renderStep = function (child, i) {
      var index = i + 1; // start from 1
      var prevStep = _this.state.prevStep;
      var isAlreadyActive = prevStep && child.props.step === prevStep;

      return _react2['default'].cloneElement(child, {
        key: child.key ? child.key : index,
        step: index,
        active: !prevStep && index === _this.props.step,
        onAnimateOutEnd: isAlreadyActive ? _this.handlePaneAnimateOutEnd : null
      });
    };

    this.state = { prevStep: null };
  }

  Steps.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    if (nextProps.step !== null && nextProps.step !== this.props.step) {
      (function () {
        // check if the 'prevStep' child still exists
        var prevStep = _this2.props.step;

        _react2['default'].Children.forEach(nextProps.children, function (child) {
          if (_react2['default'].isValidElement(child)) {
            if (child.props.step === prevStep) {
              _this2.setState({ prevStep: prevStep });
              return;
            }
          }
        });
      })();
    }
  };

  Steps.prototype.handlePaneAnimateOutEnd = function handlePaneAnimateOutEnd() {
    this.setState({ prevStep: null });
  };

  Steps.prototype.render = function render() {
    var children = this.props.children;

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].Children.map(children, this.renderStep)
    );
  };

  return Steps;
})(_react.Component);

exports['default'] = Steps;
module.exports = exports['default'];