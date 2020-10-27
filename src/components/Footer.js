import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Drawer } from '@material-ui/core'
import { Link, Text } from 'uiCommons'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import { GET_NICOLAS_TUDELA_SITE_EXPERIENCE } from 'graphqlSchema'
import WorkExperienceDetail from './WorkExperienceDetail'

const Footer = () => {
  const { loading, error, data } = useQuery(GET_NICOLAS_TUDELA_SITE_EXPERIENCE)
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

  const siteData = !loading && !error ? data.nicolasTudelaSiteExperience : null
  return (
    <footer>
      <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box m="l">
          <Text cursive size="h3">
            About this site
          </Text>
          <Box display="flex" flexDirection="column">
            <Box>
              <Text as="p" size="s" mb="s">
                A personal site? Why not? It was created to use it as a
                portfolio and opportunity to research about new technologies.
                The site displays information about myself and my work
                experience.
              </Text>
            </Box>
            <Box>
              <WorkExperienceDetail
                workExperience={siteData}
                justifyContent="space-between"
                maxWidth={isMobile ? '100%' : '60%'}
              />
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Text color="white" fontFamily="'Lobster',cursive">
        <Box
          py="xxl"
          px="m"
          display="flex"
          justifyContent="space-between"
          backgroundColor="darkBlue"
        >
          <Text>© 2020 Nicolas Tudela. All rights reserved.</Text>
          <Link
            onClick={toggleDrawer(true)}
            ariaLabel="About this site"
            underline
          >
            About this site
          </Link>
        </Box>
      </Text>
    </footer>
  )
}

export default Footer
