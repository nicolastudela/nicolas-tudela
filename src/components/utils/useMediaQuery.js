import React, { useContext } from 'react'
import { ThemeContext } from '@emotion/core'
import useMediaQueryMaterial from '@material-ui/core/useMediaQuery'

const useMediaQuery = ({ action, breakpoints }) => {
  const theme = useContext(ThemeContext)
  const matches = useMediaQueryMaterial(
    theme.breakpoints[action](...breakpoints)
  )
  return matches
}

export default useMediaQuery
