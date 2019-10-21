import { useEffect, useRef, useState } from 'react'

// distance from the element's top to its topmost visible content.
// When an element's content does not generate a vertical scrollbar,
// then its scrollTop value is 0
function getScrollY(target) {
  return target.pageYOffset !== undefined
    ? target.pageYOffset
    : target.scrollTop
}

// It evaluates if the taget-element (event) was scrolled according the options given
// If `disableHysteresis` is true:
//  evaluates to true if element was scrolled from its topmost visible content
// If `disableHysteresis` is false:
//  evaluates to true if its scroll position was different than before
function defaultTrigger(event, store, options) {
  const { disableHysteresis = false, threshold = 100 } = options
  const previous = store.current
  store.current = event ? getScrollY(event.currentTarget) : previous

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false
    }
  }

  return store.current > threshold
}

const defaultTarget = typeof window !== 'undefined' ? window : null

export default function useScrollTrigger(options = {}) {
  const {
    getTrigger = defaultTrigger,
    target = defaultTarget,
    ...other
  } = options
  // useRef() handy for keeping any mutable value around (like instance variables would do)
  const store = useRef()
  const [trigger, setTrigger] = useState(() => getTrigger(null, store, other))

  useEffect(() => {
    const handleScroll = event => {
      // Re-evaluate trigger when a scroll event is fired
      setTrigger(getTrigger(event, store, other))
    }

    handleScroll(null) // Re-evaluate trigger when dependencies change
    target.addEventListener('scroll', handleScroll)
    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other)])

  return trigger
}
