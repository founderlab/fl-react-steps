import _ from 'lodash' //eslint-disable-line
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import TransitionEvents from 'react-bootstrap/lib/utils/TransitionEvents'

export default class Step extends Component {

  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    active: React.PropTypes.bool,
    onAnimateOutEnd: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      animate_in: false,
      animate_out: false,
    }
  }

  componentWillReceiveProps(next_props) {
    if (!this.state.animate_in && next_props.active && !this.props.active) {
      this.setState({animate_in: true})
    }
    else if (!this.state.animate_out && !next_props.active && this.props.active) {
      this.setState({animate_out: true})
    }
  }

  componentDidUpdate() {
    if (this.state.animate_in) {
      setTimeout(this.startAnimateIn, 0)
    }
    if (this.state.animate_out) {
      TransitionEvents.addEndEventListener(ReactDOM.findDOMNode(this), this.stopAnimateOut)
    }
  }

  componentWillUnmount() {
    TransitionEvents.removeEndEventListener(ReactDOM.findDOMNode(this), this.stopAnimateOut)
  }

  startAnimateIn = () => {
    this.setState({animate_in: false})
  }

  stopAnimateOut = () => {
    this.setState({animate_out: false})
    if (this.props.onAnimateOutEnd) this.props.onAnimateOutEnd()
  }

  render() {
    const classes = {
      fade: true,
      active: this.props.active || this.state.animate_out,
      in: this.props.active && !this.state.animate_in,
      hidden: !this.props.active && !this.state.animate_out,
    }

    return (
      <div {...this.props}
        role="tabpanel"
        aria-hidden={!this.props.active}
        className={classNames(this.props.className, classes)}
      >
        {this.props.children}
      </div>
    )
  }
}
