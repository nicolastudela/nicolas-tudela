import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { Box, Button, Typography } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import sandwichIcon from 'icons/baseline-reorder-24px.svg'

const CustomNavLink = ({ onmouseLeave, name, selected, ...rest }) => {
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

CustomNavLink.propTypes = {
  onmouseLeave: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.string,
}

CustomNavLink.defaultProps = {
  selected: null,
}

const CustomNavButton = ({ name, label, onClick, ...rest }) => {
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

CustomNavButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

const navLinks = [
  {
    name: 'home',
    link: '/',
    label: 'Home',
  },
  // {
  //   name: 'about',
  //   link: '/about',
  //   label: 'About',
  // },
  {
    name: 'resume',
    link: '/resume',
    label: 'Resume',
  },
  {
    name: 'contact',
    link: '/contact',
    label: 'Contact',
  },
  // {
  //   name: 'blog',
  //   link: '/blog',
  //   label: 'blog',
  // },
]

const AppBarNavigation = () => {
  const [selectedLink, setSelectedLink] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { isMobile } = useClientDeviceType()

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpenDrawer(open)
  }

  return !isMobile ? (
    <Box>
      {navLinks.map(({ name, link, label }) => (
        <CustomNavLink
          key={name}
          name={name}
          selected={selectedLink}
          onmouseLeave={setSelectedLink}
          to={link}
        >
          {label}
        </CustomNavLink>
      ))}
    </Box>
  ) : (
    <>
      <Drawer anchor="top" open={openDrawer} onClose={toggleDrawer(false)}>
        {navLinks.map(({ name, link, label }) => (
          <CustomNavButton
            key={name}
            name={name}
            selected={selectedLink}
            to={link}
            label={label}
            onClick={toggleDrawer(false)}
          />
        ))}
      </Drawer>
      <Box onClick={toggleDrawer(true)}>
        <img width="70px" src={sandwichIcon} alt="sandwichico" />
      </Box>
    </>
  )
}

export default AppBarNavigation
