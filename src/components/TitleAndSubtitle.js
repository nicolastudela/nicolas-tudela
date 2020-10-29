import React from 'react'
import { Text } from 'uiCommons'
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
        <Text
          variant="h4"
          textAlign="center"
          color={colors.subtitle}
          fontFamily="'EB Garamond', serif"
          fontWeight="500"
          fontStyle="italic"
        >
          {subtitle}
        </Text>
      )}
      <Text
        variant="h1"
        textAlign="center"
        color={colors.title}
        fontWeight="bolder"
        {...rest}
      >
        {title}
      </Text>
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
