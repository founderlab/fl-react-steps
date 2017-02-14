import _ from 'lodash' //eslint-disable-line
import React, {Component, PropTypes} from 'react'

export default class Steps extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    step: PropTypes.number.isRequired,
  }

  constructor() {
    super()
    this.state = {prevStep: null}
  }

  children = _props => {
    const props = _props || this.props
    return _.filter(_.compact(React.Children.toArray(props.children)), c => React.isValidElement(c))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.step !== null && nextProps.step !== this.props.step) {
      // check if the 'prevStep' child still exists
      const prevStep = this.props.step

      _.forEach(this.children(nextProps), child => {
        if (child.props.step === prevStep) {
          this.setState({prevStep})
        }
      })
    }
  }

  handlePaneAnimateOutEnd() {
    this.setState({prevStep: null})
  }

  renderStep = (child, i) => {
    const index = i + 1 // start from 1
    const prevStep = this.state.prevStep
    const isAlreadyActive = prevStep && child.props.step === prevStep

    return React.cloneElement(
      child,
      {
        key: child.key ? child.key : index,
        step: index,
        active: !prevStep && index === this.props.step,
        onAnimateOutEnd: isAlreadyActive ? this.handlePaneAnimateOutEnd : null,
      }
    )
  }

  render() {
    return (
      <div>
        {_.map(this.children()), this.renderStep)}
      </div>
    )
  }
}
