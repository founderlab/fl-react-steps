import _ from 'lodash' //eslint-disable-line
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class StepHeader extends Component {

  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
    headings: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
    className: PropTypes.string,
    step_class: PropTypes.string,
    stepClassName: PropTypes.string,
  }

  static defaultProps = {
    step: 1,
    className: 'clearfix',
    step_class: '',
    stepClassName: '',
  }

  constructor() {
    super()
    this.state = {max_step: 1}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.step > this.state.max_step) this.setState({max_step: newProps.step})
  }

  stepEnabled = step => step <= Math.max(this.state.max_step, this.props.step)
  handleStepFn = step => () => this.stepEnabled(step) && this.props.onChangeStep(step)

  render() {
    const {step, headings} = this.props
    const step_class = this.props.stepClassName || this.props.step_class

    return (
      <div className={classNames(this.props.className, 'step-header')}>
        {headings.map((title, i) => {
          const index = i + 1

          const classes = {
            step: true,
            active: index === step,
            complete: index < step,
            disabled: !this.stepEnabled(index),
          }

          return (
            <div key={index} className={classNames(classes, step_class)} onClick={this.handleStepFn(index)}>
              <div className="number">{index}</div>
              <div className="text">
                <div className="text-inner">
                  {title}
                </div>
              </div>
              <div className="dot"></div>
              {index > 1 && (<div className="bar bar-left"></div>)}
              {index < headings.length && (<div className="bar bar-right"></div>)}
            </div>
          )
        })}
      </div>
    )
  }
}
