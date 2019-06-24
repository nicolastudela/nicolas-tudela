import { useContext } from 'react'
import { ThemeContext } from '@emotion/core'
import useMediaQueryMaterial from '@material-ui/core/useMediaQuery'

const useMediaQuery = breakpoint => {
  const theme = useContext(ThemeContext)
  const query =
    breakpoint === 'mobile'
      ? `@media (max-width:${theme.breakpoints.md}px)`
      : `@media (min-width:${theme.breakpoints.md}px)`
  const matches = useMediaQueryMaterial(query, { noSsr: true })

  return matches
}

export default useMediaQuery
