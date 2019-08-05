/* eslint-disable no-console */
import React from 'react'
import { Button } from '@smooth-ui/core-em'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = underline => ({
  textDecoration: underline ? 'underline' : 'none',
  ':hover': {
    opacity: '0.5',
  },
  ':not(:disabled):hover': {
    backgroundColor: 'transparent',
  },
  ':not(:disabled):active': {
    backgroundColor: 'transparent',
  },
  fontFamily: "'Lobster',cursive",
})

const Link = ({
  to,
  href,
  onClick,
  ariaLabel,
  onHover,
  underline,
  children,
  ...rest
}) => {
  let CustomLink

  if (to) {
    CustomLink = Button.withComponent(({ ...compRest }) => (
      <RouterLink to={to} {...compRest}>
        {children}
      </RouterLink>
    ))
  } else if (href) {
    CustomLink = Button.withComponent(({ ...compRest }) => (
      <a href={href} target="_blank" {...compRest} rel="noopener noreferrer">
        {children}
      </a>
    ))
  } else if (onClick) {
    CustomLink = ({ ...compRest }) => (
      <Button {...compRest} onClick={onClick}>
        {children}
      </Button>
    )
  } else {
    return { children }
  }

  return <CustomLink css={styles(underline)} aria-label={ariaLabel} {...rest} />
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  ariaLabel: PropTypes.string,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
  underline: PropTypes.bool,
}

Link.defaultProps = {
  to: null,
  onClick: null,
  href: null,
  onHover: null,
  underline: false,
  size: null,
  ariaLabel: null,
}

export default Link
