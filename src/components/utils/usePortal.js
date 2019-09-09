import { useRef, useEffect } from 'react'

const usePortal = id => {
  const rootElemRef = useRef(null)

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div')
    }
    return rootElemRef.current
  }

  useEffect(function setupElement() {
    // Look for existing target dom element to append to
    const parentElem = document.querySelector(`#${id}`)
    // Add the detached element to the parent
    parentElem.appendChild(getRootElem())
    // This function is run on unmount
    return function removeElement() {
      getRootElem().remove()
    }
  }, [])

  return getRootElem()
}

export default usePortal
