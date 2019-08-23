import React from 'react'
import {
  Select,
  FormControl,
  InputLabel,
  FilledInput,
  Input,
} from '@material-ui/core'
import { Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import { css } from 'emotion'

const labelStyle = (size, variant, fontVariant) => {
  let fontSize
  if (size === 'm') fontSize = '0.8em'
  else if (size === 's') fontSize = '0.6em'
  else fontSize = '1em'

  return {
    fontFamily: fontVariant,
    fontSize,
  }
}

const inputStyle = (size, variant) => {
  let fontSize
  if (size === 'm') fontSize = '1em !important'
  else if (size === 's') fontSize = '0.8em !important'
  else fontSize = '1.2em !important'

  return css({
    fontSize,
  })
}

const CustomSelect = ({
  inputId,
  name,
  label,
  value,
  onChange,
  size,
  fontVariant,
  variant,
  children,
  error,
  required,
  disabled,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <FormControl
        fullWidth
        variant={variant}
        error={error}
        disabled={disabled}
        required={required}
      >
        <InputLabel
          htmlFor={inputId}
          style={labelStyle(size, variant, fontVariant)}
        >
          {label}
        </InputLabel>
        <Select
          native
          value={value}
          onChange={onChange}
          input={
            variant === 'filled' ? (
              <FilledInput
                classes={{ input: inputStyle(size, variant) }}
                name={name}
                id={inputId}
              />
            ) : (
              <Input
                classes={{ input: inputStyle(size, variant) }}
                name={name}
                id={inputId}
              />
            )
          }
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  )
}

CustomSelect.propTypes = {
  inputId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(String).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  fontVariant: PropTypes.string,
  variant: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

CustomSelect.defaultProps = {
  size: 'm',
  fontVariant: "'Lobster',cursive",
  variant: null,
  children: null,
  error: false,
  disabled: false,
  required: false,
}

export default CustomSelect
