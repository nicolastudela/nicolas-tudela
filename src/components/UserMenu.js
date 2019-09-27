import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@smooth-ui/core-em'
import { Menu, MenuItem, IconButton, Avatar } from '@material-ui/core'
import { defaultProfileImage } from 'icons'
import { Text, Link } from 'uiCommons'
import MobileBarNavButton from './MobileBarNavButton'

const UserMenu = ({
  loggedUser: { isAdmin, personalData },
  onSignOut,
  isMobile,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMyAccountClick(event) {}

  function handleClose() {
    setAnchorEl(null)
  }

  const user = personalData

  return !isMobile ? (
    <>
      <Box display="flex" flexDirection="column" {...rest}>
        <IconButton
          aria-label="user-menu"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          style={{ paddingBottom: '0' }}
        >
          <Avatar
            alt={`${user.name}`}
            src={user.picture ? `${user.picture}` : `${defaultProfileImage}`}
          />
        </IconButton>
        <Text maxWidth="80px" truncate="ellipsis" color="white" size="xs">
          {user.name}
        </Text>
      </Box>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
        elevation={0}
      >
        <MenuItem>
          <Link
            to={!isAdmin ? '/user' : '/admin'}
            color="black"
          >
            {!isAdmin ? 'My account' : 'Admin'}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link onClick={onSignOut} color="black">
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <>
      <MobileBarNavButton
        label={!isAdmin ? 'My account' : 'Admin'}
        name={!isAdmin ? 'my-account' : 'admin'}
        onClick={handleMyAccountClick}
      />
      <MobileBarNavButton label="Logout" name="Logout" onClick={onSignOut} />
    </>
  )
}

UserMenu.propTypes = {
  loggedUser: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
    personalData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string,
    }),
  }),
  onSignOut: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
}

UserMenu.defaultProps = {
  loggedUser: {
    personalData: {
      picture: null,
    },
  },
  isMobile: false,
}

export default UserMenu
