/* eslint-disable no-console */
import { useState, useCallback, useEffect } from 'react'

function useWithElementRect(onResize) {
  const [node, setNode] = useState(null)
  const [resizeObserver, setResizeObserver] = useState(null)
  const [rect, setRect] = useState(null)

  const handleRef = useCallback(nodeRef => {
    if (nodeRef !== null) {
      setNode(nodeRef)
    }
  }, [])

  const measure = entries => {
    const nodeRect = node.getBoundingClientRect()
    setRect({
      top: nodeRect.top,
      right: nodeRect.right,
      bottom: nodeRect.bottom,
      left: nodeRect.left,
      width: nodeRect.width,
      height: nodeRect.height,
      contentRect: entries ? entries[0].contentRect : null,
    })
    if (onResize) {
      console.log(`Calling HOOK onresize ${{ ...rect }}`)
      onResize(nodeRect)
    }
  }

  useEffect(() => {
    const ro = new ResizeObserver(measure)
    if (node) {
      ro.observe(node)
    }

    setResizeObserver(ro)

    return () => {
      if (resizeObserver) {
        console.log('HOOK disconecting/unmounting ')
        resizeObserver.disconnect()
      }
    }
  }, [node])

  return [rect, handleRef]
}

export default useWithElementRect
