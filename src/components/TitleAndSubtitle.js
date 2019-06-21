import React from 'react'
import { Typography } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'

const textColorsByBackgroundColors = color => {
  let customColors = {
    subtitle: 'lightBlue',
    title: 'darkBlue',
  }

  if (color === 'lightBlue') {
    customColors = {
      subtitle: 'black',
      title: 'white',
    }
  } else if (color === 'allWhite') {
    customColors = {
      subtitle: 'white',
      title: 'white',
    }
  }

  return customColors
}

const TitleAndSubtitle = ({ subtitle, title, color }) => {
  const colors = textColorsByBackgroundColors(color)
  return (
    <>
      <Typography
        variant="h6"
        textAlign="center"
        color={colors.subtitle}
        fontSize={{ sm: '3vw', lg: '2vw' }}
        fontFamily="'EB Garamond', serif"
        fontWeight="500"
        css={{ fontStyle: 'italic' }}
      >
        {subtitle}
      </Typography>
      <Typography
        variant="h1"
        textAlign="center"
        color={colors.title}
        fontWeight="bolder"
        fontSize={{ sm: '4.5vw', lg: '5vw' }}
      >
        {title}
      </Typography>
    </>
  )
}

TitleAndSubtitle.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
}

TitleAndSubtitle.defaultProps = {
  subtitle: '',
  title: '',
  color: null,
}

export default TitleAndSubtitle
