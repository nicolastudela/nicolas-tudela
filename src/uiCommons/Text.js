import React from 'react'
import { Typography } from '@smooth-ui/core-em'

const Text = ({ bold, size, cursive, children, ...rest }) => {
  let custom = {}

  let fontSize
  if (size === 'xs') {
    fontSize = '0.6em'
  } else if (size === 's') {
    fontSize = '0.8em'
  } else if (size === 'l') {
    fontSize = '1.2em'
  } else if (size === 'm') {
    fontSize = '1em'
  } else if (size === 'xl') {
    fontSize = '1.5em'
  } else if (size === 'subtitle') {
    fontSize = '2em'
  } else if (size === 'title') {
    fontSize = '2.5em'
  }
  custom = { ...custom, fontSize }

  if (cursive) {
    custom = { ...custom, fontFamily: "'Lobster',cursive" }
  }

  if (bold) {
    custom = { ...custom, fontWeight: 'bold' }
  }

  return (
    <Typography {...custom} {...rest}>
      {children}
    </Typography>
  )
}

export default Text
