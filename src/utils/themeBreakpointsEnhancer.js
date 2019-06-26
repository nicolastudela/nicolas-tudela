/**
 * Adds functionality to theme.breakpoints object, where this is useful to produce media queries based in our
 * theme breakpoints 
 * 
 * Replicated from Material UI, where I find it very usefull and couldn't see an easy way 
 * to import only this functionality
 * 
 * @see https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createBreakpoints.js
 * @see useMediaQuery
 */
const themeBreakpointsEnhancer = breakpoints => {
  const enhancement = {}
  enhancement.keys = [...Object.keys(breakpoints)]
  enhancement.step = 5
  enhancement.unit = 'px'

  enhancement.up = key => {
    const value = breakpoints[key]
    return `@media (min-width:${value}px)`
  }

  enhancement.down = key => {
    const { keys } = enhancement
    const endIndex = keys.indexOf(key) + 1
    const upperbound = breakpoints[keys[endIndex]]
    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return enhancement.up('xs')
    }

    const value =
      typeof upperbound === 'number' && endIndex > 0 ? upperbound : key
    return `@media (max-width:${value - enhancement.step / 100}px)`
  }

  enhancement.between = (start, end) => {
    const { keys } = enhancement
    const endIndex = keys.indexOf(end) + 1

    if (endIndex === keys.length) {
      return enhancement.up(start)
    }

    return (
      `@media (min-width:${breakpoints[start]}px) and ` +
      `(max-width:${breakpoints[keys[endIndex]] - enhancement.step / 100}px)`
    )
  }

  enhancement.only = key => {
    return enhancement.between(key, key)
  }

  return enhancement
}

export default themeBreakpointsEnhancer
