import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { styled, Box } from '@smooth-ui/core-em'

const labelStyle = size => {
  let fontSize
  if (size === 'm') fontSize = '0.8em'
  else if (size === 's') fontSize = '0.6em'
  else fontSize = '1em'

  return {
    '& label.MuiFormLabel-filled': { fontSize },
    '& label.Mui-focused': { fontSize },
  }
}

const inputStyle = size => {
  let fontSize
  if (size === 'm') fontSize = '1em'
  else if (size === 's') fontSize = '0.8em'
  else fontSize = '1.2em'

  return { '& input': { fontSize } }
}

const CssTextField = styled(TextField)(
  {
    '& label': {
      fontFamily: "'Lobster', cursive",
    },
  },
  props => ({ ...labelStyle(props.size), ...inputStyle(props.size) })
)

const CustomTextField = ({ boxProps, size, ...rest }) => {
  return (
    <Box {...boxProps}>
      <CssTextField {...rest} size={size} margin="normal" fullWidth />
    </Box>
  )
}

CustomTextField.propTypes = {
  size: PropTypes.string,
}

CustomTextField.defaultProps = {
  size: 'm',
}

export default CustomTextField
