import React from 'react'
import PropTypes from 'prop-types'
import Box from './Box'

const Space = ({ size, kind }) => {
  const props = {}
  if (kind === 'inline') {
    props.display = 'inline-block'
    props.mr = size
  } else {
    props.display = 'block'
    props.mb = size
  }

  return <Box {...props} />
}

Space.propTypes = {
  size: PropTypes.string.isRequired,
  kind: PropTypes.string,
}

Space.defaultProps = {
  kind: false,
}

export default Space
