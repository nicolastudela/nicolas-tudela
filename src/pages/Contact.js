import React from 'react'
import { TitleAndSubtitle, ContentPanel } from 'components'
import { Box, Typography } from '@smooth-ui/core-em'
import { Space, Link } from 'uiCommons'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import { backgrKeyword } from 'images'
import MailIcon from '@material-ui/icons/Mail'
import Mobile from '@material-ui/icons/MobileFriendly'
import LinkedIn from '@material-ui/icons/LinkedIn'
import GitHub from '@material-ui/icons/GitHub'
import Instagram from '@material-ui/icons/Instagram'

const Contact = () => {
  const { isMobile } = useClientDeviceType()
  return (
    <>
      <ContentPanel color="lightBlue">
        {({ color }) => (
          <TitleAndSubtitle title="Conect with me today" color={color} />
        )}
      </ContentPanel>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth="1290px"
        height={{ sm: '32rem', md: 'unset' }}
        m="auto"
        style={{ gap: '2.5rem' }}
        justifyContent="center"
      >
        <Box display="flex" style={{ gap: '1rem' }}>
          <MailIcon style={{ fontSize: 60 }} />
          <Link
            tabIndex="0"
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:nicolastudela@gmail.com"
            color="black"
          >
            nicolastudela@gmail.com
          </Link>
        </Box>
        <Box display="flex" style={{ gap: '1rem' }}>
          <Mobile style={{ fontSize: 60 }} />
          <Link
            tabIndex="0"
            href="https://wa.me/+5191153254124?text=Hola%20quiero%20averiguar%20sobre%20calacabana"
            aria-label="Contact me on whatsapp"
            isExternal
            rel="noopener noreferrer"
            color="black"
          >
            +549115325-4124 / +393313872735
          </Link>
        </Box>
        <Box display="flex" style={{ gap: '1rem' }}>
          <LinkedIn style={{ fontSize: 60 }} />
          <Link
            tabIndex="0"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/nicolas-tudela-85455a2b/"
            color="black"
          >
            LinkedIn
          </Link>
        </Box>
        <Box display="flex" style={{ gap: '1rem' }}>
          <GitHub style={{ fontSize: 60 }} />
          <Link
            tabIndex="0"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/nicolastudela"
            color="black"
          >
            GitHub
          </Link>
        </Box>
        <Box display="flex" style={{ gap: '1rem' }}>
          <Instagram style={{ fontSize: 60 }} />
          <Link
            tabIndex="0"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/tudelacade/"
            color="black"
          >
            Instagram
          </Link>
        </Box>
      </Box>
      <ContentPanel
        color="black"
        backgroundImage={`url('${backgrKeyword}')`}
        backgroundPosition="center"
        width={{ sm: 6 / 7, lg: 3 / 4 }}
        display="flex"
      >
        {!isMobile && (
          <>
            <Space kind="inline" size="xxl" />
            <Space kind="inline" size="xxl" />
          </>
        )}
        <Typography
          css={{ textShadow: '2px 2px 2px rgba(0,153,204,.9)' }}
          color="white"
          fontFamily="'Lobster',cursive"
          fontSize="1.5em"
          as="div"
        >
          Feel free to reach out to me if you have any questions or comments
          about the services I offer. Also, you could always just send me a
          friendly hello.
        </Typography>
      </ContentPanel>
    </>
  )
}

export default Contact
