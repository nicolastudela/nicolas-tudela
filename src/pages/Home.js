import React from 'react'
import { Box } from '@smooth-ui/core-em'
import { TitleAndSubtitle, ContentPanel } from 'components'
import workingNico from 'images/working-nico-lg.jpg'
import backgrKeyword from 'images/backgr-keyword.jpg'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'

const Home = () => {
  const { isMobile, isDesktop } = useClientDeviceType()

  return (
    <>
      <ContentPanel
        color="gray"
        width={{ sm: 6 / 7, lg: 1 }}
        py="0"
        display="flex"
        justifyContent="space-between"
        alignItems="inherit"
        backgroundImage="url(http://musicments.com/img/d_default/work-desk-background/work-desk-background-concept-5c7472acb9eb5.jpg);"
        backgroundPosition="center"
      >
        {({ color }) => {
          if (isDesktop)
            return (
              <>
                <Box width={4 / 6} m="auto">
                  <TitleAndSubtitle
                    subtitle="I'm here to create meaningful and lasting relationships with my clients."
                    title="LET'S BUILD SOMETHING AMAZING TOGETHER"
                    color={color}
                  />
                </Box>
                <Box width={2 / 6}>
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={workingNico}
                    alt="nico"
                  />
                </Box>
              </>
            )
          if (isMobile)
            return (
              <Box width={1}>
                <TitleAndSubtitle
                  subtitle="I'm here to create meaningful and lasting relationships with my clients."
                  title="LET'S BUILD SOMETHING AMAZING TOGETHER"
                  color={color}
                />
              </Box>
            )
          return null
        }}
      </ContentPanel>
      <ContentPanel
        color="black"
        backgroundImage={`url('${backgrKeyword}')`}
        backgroundPosition="center"
      >
        {() => (
          <>
            <TitleAndSubtitle
              subtitle="I'm here to create meaningful and lasting relationships with my clients."
              title="LET'S BUILD SOMETHING AMAZING TOGETHER"
              color="allWhite"
            />
            <Box height="40px" />
          </>
        )}
      </ContentPanel>
      <ContentPanel color="white">
        {({ color }) => (
          <TitleAndSubtitle
            subtitle="I'm here to create meaningful and lasting relationships with my clients."
            title="LET'S BUILD SOMETHING AMAZING TOGETHER"
            color={color}
          />
        )}
      </ContentPanel>

      <ContentPanel color="lightBlue">
        {({ color }) => (
          <TitleAndSubtitle
            subtitle="I'm here to create meaningful and lasting relationships with my clients."
            title="LET'S BUILD SOMETHING AMAZING TOGETHER"
            color={color}
          />
        )}
      </ContentPanel>
    </>
  )
}

export default Home
