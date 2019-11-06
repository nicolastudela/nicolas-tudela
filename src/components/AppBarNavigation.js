import React, { useState } from 'react'
// import { useQuery, useApolloClient } from '@apollo/react-hooks'

import { IconButton, Drawer, CircularProgress } from '@material-ui/core'
import InputIcon from '@material-ui/icons/Input'
import { Box } from '@smooth-ui/core-em'
import { Modal } from 'uiCommons'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import { useLoggedUser } from 'components/utils/useLoggedUser'
import sandwichIcon from 'icons/baseline-reorder-24px.svg'
import SigninPanel from './SigninPanel'
import MobileBarNavButton from './MobileBarNavButton'
import BarNavLink from './BarNavLink'
import UserMenu from './UserMenu'

const staticNavLinks = [
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
  const [signInModalVisible, setSignInModalVisible] = useState(false)
  const { loggedUser, loading: userLoading, onSignOut } = useLoggedUser()
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

  const onCloseModal = () => {
    setSignInModalVisible(false)
  }

  return (
    <>
      <Modal
        title="Sign In"
        withCloseButton
        open={signInModalVisible}
        onClose={onCloseModal}
      >
        <SigninPanel onClose={onCloseModal} />
      </Modal>
      {!isMobile ? (
        <Box display="flex" alignItems="center">
          {staticNavLinks.map(({ name, link, label }) => (
            <BarNavLink
              key={name}
              name={name}
              selected={selectedLink}
              onmouseLeave={setSelectedLink}
              to={link}
            >
              {label}
            </BarNavLink>
          ))}
          {userLoading && <CircularProgress />}
          {!userLoading && !loggedUser && (
            <IconButton
              aria-label="sign-in"
              onClick={() => setSignInModalVisible(true)}
              onMouseEnter={() => setSelectedLink('signin')}
              onMouseLeave={() => setSelectedLink(null)}
            >
              <InputIcon style={{ color: 'white' }} />
            </IconButton>
          )}
          {!userLoading && loggedUser && (
            <UserMenu
              isMobile={isMobile}
              onSignOut={onSignOut}
              loggedUser={loggedUser}
            />
          )}
        </Box>
      ) : (
        <>
          <Drawer anchor="top" open={openDrawer} onClose={toggleDrawer(false)}>
            {staticNavLinks.map(({ name, link, label }) => (
              <MobileBarNavButton
                key={name}
                name={name}
                selected={selectedLink}
                to={link}
                label={label}
                onClick={toggleDrawer(false)}
              />
            ))}
            {!loggedUser ? (
              <MobileBarNavButton
                label="Sign In"
                name="signin"
                onClick={event => {
                  toggleDrawer(false)(event)
                  setSignInModalVisible(true)
                }}
              />
            ) : (
              <UserMenu
                isMobile={isMobile}
                onSignOut={onSignOut}
                loggedUser={loggedUser}
                onClose={toggleDrawer(false)}
              />
            )}
          </Drawer>
          <Box onClick={toggleDrawer(true)}>
            <img width="70px" src={sandwichIcon} alt="sandwichico" />
          </Box>
        </>
      )}
    </>
  )
}

export default AppBarNavigation
