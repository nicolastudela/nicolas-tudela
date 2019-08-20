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

const TitleAndSubtitle = ({ subtitle, title, color, ...rest }) => {
  const colors = textColorsByBackgroundColors(color)
  return (
    <>
      {subtitle && (
        <Typography
          variant="h4"
          textAlign="center"
          color={colors.subtitle}
          fontFamily="'EB Garamond', serif"
          fontWeight="500"
          css={{ fontStyle: 'italic' }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant="h1"
        textAlign="center"
        color={colors.title}
        fontWeight="bolder"
        {...rest}
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
  subtitle: null,
  title: '',
  color: null,
}

export default TitleAndSubtitle
