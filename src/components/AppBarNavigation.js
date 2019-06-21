import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Typography } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import useMediaQuery from 'components/utils/useMediaQuery'

const CustomNavLink = ({ onmouseLeave, name, selected, ...rest }) => {
  const custom = {
    textDecoration: 'none',
  }

  const CustomLink = Typography.withComponent(NavLink)

  return (
    <CustomLink
      css={custom}
      fontFamily="'Lobster',cursive"
      color="white"
      opacity={selected === name || selected === null ? '1' : '0.5'}
      activeStyle={{ textDecoration: 'underline' }}
      pl="m"
      {...rest}
      fontSize="1.5vw"
      onMouseEnter={() => onmouseLeave(name)}
      onMouseLeave={() => onmouseLeave(null)}
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

const AppBarNavigation = props => {
  const [selectedLink, setSelectedLink] = useState(null)
  const isMobile = useMediaQuery({ action: 'down', breakpoints: ['sm'] })

  return !isMobile ? (
    <Box {...props}>
      <CustomNavLink
        name="home"
        selected={selectedLink}
        onmouseLeave={setSelectedLink}
        exact
        to="/"
      >
        Home
      </CustomNavLink>
      <CustomNavLink
        name="about"
        selected={selectedLink}
        onmouseLeave={setSelectedLink}
        to="/about"
      >
        About
      </CustomNavLink>
      <CustomNavLink
        name="resume"
        selected={selectedLink}
        onmouseLeave={setSelectedLink}
        to="/resume"
      >
        Resume
      </CustomNavLink>
      <CustomNavLink
        name="contact"
        selected={selectedLink}
        onmouseLeave={setSelectedLink}
        to="/contact"
      >
        Contact
      </CustomNavLink>
      <CustomNavLink
        name="blog"
        selected={selectedLink}
        onmouseLeave={setSelectedLink}
        to="/blog"
      >
        Blog
      </CustomNavLink>
    </Box>
  ) : null
}

export default AppBarNavigation
