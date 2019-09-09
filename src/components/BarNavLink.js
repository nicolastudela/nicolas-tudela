import React from 'react'
import { Typography } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const BarNavLink = ({ onmouseLeave, name, selected, ...rest }) => {
  const custom = {
    textDecoration: 'none',
  }

  const CustomLink = Typography.withComponent(NavLink)

  return (
    <CustomLink
      key={name}
      css={custom}
      fontFamily="'Lobster',cursive"
      color="white"
      opacity={selected === name || selected === null ? '1' : '0.5'}
      activeStyle={{ textDecoration: 'underline' }}
      pl="m"
      {...rest}
      //fontSize="1.5em"
      onMouseEnter={() => onmouseLeave(name)}
      onMouseLeave={() => onmouseLeave(null)}
      exact
    />
  )
}

BarNavLink.propTypes = {
  onmouseLeave: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.string,
}

BarNavLink.defaultProps = {
  selected: null,
}

export default BarNavLink
