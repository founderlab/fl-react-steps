import _ from 'lodash' //eslint-disable-line
import React, {Component, PropTypes} from 'react'

export default class Steps extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    step: PropTypes.number.isRequired,
  }

  constructor() {
    super()
    this.state = {prev_step: null}
  }

  componentWillReceiveProps(next_props) {
    if (next_props.step !== null && next_props.step !== this.props.step) {
      // check if the 'prev_step' child still exists
      const prev_step = this.props.step

      React.Children.forEach(next_props.children, (child) => {
        if (React.isValidElement(child)) {
          if (child.props.step === prev_step) {
            this.setState({prev_step})
            return
          }
        }
      })
    }
  }

  handlePaneAnimateOutEnd() {
    this.setState({prev_step: null})
  }

  renderStep = (child, i) => {
    const index = i + 1 // start from 1
    const prev_step = this.state.prev_step
    const is_already_active = prev_step && child.props.step === prev_step

    return React.cloneElement(
      child,
      {
        key: child.key ? child.key : index,
        step: index,
        active: !prev_step && index === this.props.step,
        onAnimateOutEnd: is_already_active ? this.handlePaneAnimateOutEnd : null,
      }
    )
  }

  render() {
    const {children} = this.props
    return (
      <div>
        {React.Children.map(children, this.renderStep)}
      </div>
    )
  }
}
