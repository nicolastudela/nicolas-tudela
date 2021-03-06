import React from 'react'
import { Breakpoint, Box, Typography } from '@smooth-ui/core-em'
import { keyframes } from '@emotion/core'
import football from 'icons/football.svg'
import AppBarNavigation from './AppBarNavigation'
import useScrollTrigger from './utils/useScrollTrigger'

const rotating = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

const titleStyle = {
  textShadow: '1px 1px 1px rgba(0,153,204,.9)',
}

const imgStyle = props => {
  const base = {
    transitionDuration: '0.8s',
    transitionProperty: 'transform',
    '&:hover': {
      animation: `${rotating} 0.5s linear infinite`,
    },
  }
  return props.isLoading
    ? { ...base, ...{ animation: `${rotating} 0.5s linear infinite running` } }
    : { ...base, ...{ animation: `${rotating} 0.5s linear infinite paused` } }
}

const AppBar = props => {
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 100 })

  return (
    <header>
      <Box
        py="xs"
        boxShadow={scrolled ? '2px 2px 2px rgba(0,153,204,.9)' : 'none'}
        backgroundColor="darkBlue"
        px="m"
        display="flex"
        alignItems="center"
        position={scrolled ? 'fixed' : 'relative'}
        top="0"
        justifyContent="space-between"
        width="100%"
        zIndex="1000"
      >
        <Box display="flex" alignItems="center">
          <Box mr="l">
            <img
              css={imgStyle(props)}
              width="70px"
              src={football}
              alt="football ico"
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h2"
              color="white"
              fontFamily="'Lobster',cursive"
              css={titleStyle}
              mb={0}
            >
              Nicolas Jose Tudela
            </Typography>
            {!scrolled && (
              <Breakpoint up="md">
                <Typography
                  color="white"
                  fontFamily="'Lobster',cursive"
                  css={titleStyle}
                >
                  Remote Software Engineer &#183; Good vibes
                </Typography>
              </Breakpoint>
            )}
          </Box>
        </Box>
        <AppBarNavigation />
      </Box>
    </header>
  )
}

export default AppBar
