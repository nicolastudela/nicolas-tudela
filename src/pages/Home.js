import React from 'react'
import { Box, Typography } from '@smooth-ui/core-em'
import { TitleAndSubtitle, ContentPanel } from 'components'
import { Text } from 'uiCommons'
import workingNico from 'images/working-nico-lg.jpg'
import { fullstack, javascript, over10years, backgrKeyword } from 'images'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'

const imgStyle = {
  display: 'block',
  height: '250px',
}

// eslint-disable-next-line react/prop-types
const Card = ({ isMobile, title, text, imgSrc, imgAlt, ...rest }) => {
  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'row' : 'column'}
      alignItems="center"
      {...rest}
    >
      <Box>
        <img alt={imgAlt} src={imgSrc} style={imgStyle} />
      </Box>
      <Box>
        <Text variant="h4" size="l" bold textAlign="center" mt="5px">
          {title}
        </Text>
        <Text as="p" size="s" textAlign="center" ml="5px">
          {text}
        </Text>
      </Box>
    </Box>
  )
}

const Home = () => {
  const { isMobile } = useClientDeviceType()

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
        {!isMobile ? (
          <>
            <Box width={6 / 10} m="auto">
              <TitleAndSubtitle
                subtitle="I'm here to create meaningful and lasting relationships with my clients."
                title="LET'S BUILD SOMETHING AMAZING TOGETHER"
              />
            </Box>
            <Box width={4 / 10}>
              <img
                style={{ width: '100%', height: '100%' }}
                src={workingNico}
                alt="nico"
              />
            </Box>
          </>
        ) : (
          <Box width={1}>
            <TitleAndSubtitle
              subtitle="I'm here to create meaningful and lasting relationships with my clients."
              title="LET'S BUILD SOMETHING AMAZING TOGETHER"
            />
          </Box>
        )}
      </ContentPanel>
      <ContentPanel
        width={6 / 7}
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Card
          isMobile={isMobile}
          title="I choose Javascript"
          imgSrc={javascript}
          imgAlt="javascript"
          text={`I find in Javascript a powerfull language where it gives you the
              chance to work on both backend and frontend sides seamlessly. It has a
              huge commutity support and it's constantly evolving to make develop experience great`}
          width={{ sm: 1, lg: 0.32 }}
        />
        <Card
          isMobile={isMobile}
          title="Fullstack developer"
          imgSrc={fullstack}
          imgAlt="fullstack"
          text={`Specialization its great to achieve complex problems but having in-depth knowledge and experience of on every topic related to the app development gives you a 360 degree view, which it's useful to get a better understanding of the project requirements`}
          width={{ sm: 1, lg: 0.32 }}
        />
        <Card
          isMobile={isMobile}
          title="Experience"
          imgSrc={over10years}
          imgAlt="over10years"
          text={`Throughout my work experience, I learned the importance of having good communication skills, paying attention to detail and building reliable code. 
          My career started as a Java developer but these last few years I’ve switched to Javascript and I’m loving it.`}
          width={{ sm: 1, lg: 0.32 }}
        />
      </ContentPanel>
      <ContentPanel color="gray" backgroundPosition="center">
        <>
          <Text variant="h1" size="title" textAlign="center" color="lightBlue">
            {'Keys to success when working remotely'}
          </Text>
          <Text as="p">
            The keys to creating meaningful and lasting relationships are
            transparency, authenticity and openness. Expectations must be set,
            shared and clarified.
            <br />
            <br /> Open and frequent communication is fundamental. Having proper
            communication tools such as slack and zoom helps a lot. Holding
            regular meetings as well as practicing Agile methodologies is a
            must.
            <br />
            <br /> Trust is another important key. We definitely have to build
            trust. That is why we have to be as transparent and clear as
            possible. Ongoing communication and having personal or off-topic
            chats can help too.
          </Text>
        </>
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

      <ContentPanel
        color="black"
        backgroundImage={`url('${backgrKeyword}')`}
        backgroundPosition="center"
      >
        <>
          <TitleAndSubtitle
            subtitle="I'm here to create meaningful and lasting relationships with my clients."
            title="LET'S BUILD SOMETHING AMAZING TOGETHER"
            color="allWhite"
          />
          <Box height="5em" />
          <Box height="40px" />
        </>
      </ContentPanel>
    </>
  )
}

export default Home
