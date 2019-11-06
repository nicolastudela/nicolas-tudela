import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@smooth-ui/core-em'
import { NavLink } from 'react-router-dom'

const MobileBarNavButton = ({ name, label, to, ...rest }) => {
  const CustomButton = to ? Button.withComponent(NavLink) : Button

  return (
    <CustomButton
      activeStyle={{ color: 'lightBlue' }}
      color="white"
      variant="secondary"
      fontSize="1.5em"
      fontFamily="'Lobster',cursive"
      textAlign="center"
      width={1}
      exact
      to={to}
      {...rest}
    >
      {label}
    </CustomButton>
  )
}

MobileBarNavButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
}

MobileBarNavButton.defaultProps = {
  onClick: () => {},
  to: null,
}

export default MobileBarNavButton
