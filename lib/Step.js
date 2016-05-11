'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

//eslint-disable-line

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TransitionEvents = require('./TransitionEvents');

var _TransitionEvents2 = _interopRequireDefault(_TransitionEvents);

var _components = {
  _$Step: {
    displayName: 'Step'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/Step.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

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

    _classCallCheck(this, _Step);

    _Component.call(this);

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

  Step.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.animate_in && nextProps.active && !this.props.active) {
      this.setState({ animate_in: true });
    } else if (!this.state.animate_out && !nextProps.active && this.props.active) {
      this.setState({ animate_out: true });
    }
  };

  Step.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.state.animate_in) {
      setTimeout(this.startAnimateIn, 0);
    }
    if (this.state.animate_out) {
      _TransitionEvents2['default'].addEndEventListener(_reactDom2['default'].findDOMNode(this), this.stopAnimateOut);
    }
  };

  Step.prototype.componentWillUnmount = function componentWillUnmount() {
    _TransitionEvents2['default'].removeEndEventListener(_reactDom2['default'].findDOMNode(this), this.stopAnimateOut);
  };

  Step.prototype.render = function render() {
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
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  };

  var _Step = Step;
  Step = _wrapComponent('_$Step')(Step) || Step;
  return Step;
})(_react.Component);

exports['default'] = Step;
module.exports = exports['default'];