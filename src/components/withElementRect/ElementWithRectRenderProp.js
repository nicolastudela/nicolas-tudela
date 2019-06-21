/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

class ElementWithRect extends React.Component {
  static propTypes = {
    onResize: PropTypes.func,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onResize: null,
  }

  componentDidMount() {
    this.resizeObserver = new ResizeObserver(this.measure)
    if (this.node) {
      this.resizeObserver.observe(this.node)
    }
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      console.log('RENDER-PROPS disconnecting/unmounting')
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    // window.cancelAnimationFrame(this._animationFrameID)
  }

  measure = entries => {
    const { onResize } = this.props
    const rect = this.node.getBoundingClientRect()
    this.setState({
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      contentRect: entries ? entries[0].contentRect : null,
    })
    if (onResize) {
      onResize(rect)
    }
  }

  handleRef = node => {
    if (this.resizeObserver && this.node) {
      this.resizeObserver.unobserve(this.node)
    }

    this.node = node

    if (this.resizeObserver && this.node) {
      this.resizeObserver.observe(this.node)
    }
  }

  render() {
    const { children, ...rest } = this.props
    return children({ ...rest, ...this.state, handleRef: this.handleRef })
  }
}

export default ElementWithRect
