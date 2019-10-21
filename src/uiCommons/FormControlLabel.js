import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { styled, Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'

const labelStyle = (size, cursive) => {
  let fontSize
  if (size === 'm') fontSize = '0.8em'
  else if (size === 's') fontSize = '0.6em'
  else fontSize = '1em'

  let fontFamily
  if (cursive) {
    fontFamily = "'Lobster', cursive"
  }

  return {
    '.MuiFormControlLabel-label': { fontSize, fontFamily },
  }
}

const CSSFormControlLabel = styled(FormControlLabel)({}, props => ({
  ...labelStyle(props.size, props.cursive),
}))

const CustomFormControlLabel = ({ boxProps, size, cursive, ...rest }) => {
  return (
    <Box {...boxProps}>
      <CSSFormControlLabel {...rest} size={size} cursive={cursive} />
    </Box>
  )
}

CustomFormControlLabel.propTypes = {
  size: PropTypes.string,
  cursive: PropTypes.bool,
}

CustomFormControlLabel.defaultProps = {
  size: 'm',
  cursive: false,
}

export default CustomFormControlLabel
