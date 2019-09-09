import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@smooth-ui/core-em'
import { NavLink } from 'react-router-dom'

const MobileBarNavButton = ({ name, label, onClick, ...rest }) => {
  const CustomButton = Button.withComponent(NavLink)

  return (
    <CustomButton
      activeStyle={{ color: 'lightBlue' }}
      color="white"
      variant="secondary"
      {...rest}
      fontSize="1.5em"
      fontFamily="'Lobster',cursive"
      textAlign="center"
      width={1}
      exact
      onClick={onClick}
    >
      {label}
    </CustomButton>
  )
}

MobileBarNavButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MobileBarNavButton
