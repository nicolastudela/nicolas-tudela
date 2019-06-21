/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console  */
import React from 'react'
import { Button, Box } from '@smooth-ui/core-em'
import {
  ElementWithRectRenderProp,
  useElementWithRectHook,
  withElementRectHOC,
} from '../components'

const onResize = rect => {
  console.log(`onResize ${rect}`)
}

const ElementWithRectHOC = withElementRectHOC(
  ({ width, height, top, handleRef }) => (
    <div
      ref={handleRef}
    >{`HOC: in which the wrapped component will receive via prop its width is ${width} and height is ${height} and top: ${top}`}</div>
  )
)

// it will be a function component
const ElementWithRectHook = props => {
  const [rect, handleRef] = useElementWithRectHook(props.onResize)

  return (
    <div ref={handleRef}>
      {rect &&
        `HOOK approach: This comp has width: ${rect.width} and height is ${
          rect.height
        } and top: ${rect.top}`}
    </div>
  )
}

class ReuseComponentsLogic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSpace: false,
      hideBoxes: false,
    }
  }

  componentDidMount() {
    this.props.toggleLoading()
  }

  render() {
    return (
      <>
        <Box display="flex">
          <Button
            mr="l"
            onClick={() => {
              this.setState(prevState => ({
                showSpace: !prevState.showSpace,
              }))
              this.props.toggleLoading()
            }}
          >
            SHOW/HIDE SPACE
          </Button>
          <Button
            variant="info"
            size="md"
            onClick={() =>
              this.setState(prevState => ({
                hideBoxes: !prevState.hideBoxes,
              }))
            }
          >
            SHOW/HIDE BOXES
          </Button>
        </Box>

        {this.state.showSpace && <Box style={{ height: '100px' }} />}

        {this.state.hideBoxes && (
          <>
            <ElementWithRectRenderProp onResize={onResize}>
              {({ width, height, top, handleRef }) => (
                <div
                  ref={handleRef}
                >{`Render Props: a component holding the state/logic will call to children-prop as a function (insted of component) and 
          will pass its state: This comp has width: ${width} and height: ${height} and top: ${top}`}</div>
              )}
            </ElementWithRectRenderProp>
            <ElementWithRectHOC onResize={onResize} />
            <ElementWithRectHook onResize={onResize} />
          </>
        )}
      </>
    )
  }
}

export default ReuseComponentsLogic
