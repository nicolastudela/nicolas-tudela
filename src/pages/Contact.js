import React, { useEffect } from 'react'
import { TitleAndSubtitle, ContentPanel } from 'components'
import { Box, Typography } from '@smooth-ui/core-em'
import { Space } from 'uiCommons'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import { gmailLogo, skypeLogo, backgrKeyword } from 'images'
import linkedinBadgeCreator from '../utils/linkedinBadgeCreator'

const LinkedinBox = () => {
  useEffect(() => {
    linkedinBadgeCreator(window)
  }, [])

  return (
    <div
      className="LI-profile-badge"
      data-version="v1"
      data-size="large"
      data-locale="es_ES"
      data-type="horizontal"
      data-theme="light"
      data-vanity="nicolas-tudela-85455a2b"
    >
      <a
        className="LI-simple-link"
        href="https://ar.linkedin.com/in/nicolas-tudela-85455a2b?trk=profile-badge"
      >
        Nicolas Tudela
      </a>
    </div>
  )
}

const Contact = () => {
  const { isMobile } = useClientDeviceType()
  return (
    <>
      <ContentPanel color="lightBlue">
        {({ color }) => (
          <TitleAndSubtitle title="Conect with me today" color={color} />
        )}
      </ContentPanel>
      <ContentPanel
        display="flex"
        flexDirection="row"
        alignItems="center"
        color="white"
        justifyContent="space-between"
      >
        <LinkedinBox />
        <Box>
          <a
            tabIndex="0"
            display="block"
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:nicolastudela@gmail.com"
          >
            <img
              alt="gmailLogo"
              src={gmailLogo}
              style={{
                height: '256px',
                width: '256px',
              }}
            />
          </a>
        </Box>
        <Box>
          <a
            tabIndex="0"
            display="block"
            target="_blank"
            rel="noopener noreferrer"
            href="https://join.skype.com/invite/BfPs9S9gdahK"
          >
            <img
              alt="skypeLogo"
              src={skypeLogo}
              style={{
                height: '256px',
                width: '256px',
              }}
            />
          </a>
        </Box>
      </ContentPanel>
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
