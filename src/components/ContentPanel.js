import React from 'react'
import { Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'

const ContentPanel = ({
  color,
  backgroundImage,
  backgroundPosition,
  children,
  ...props
}) => {
  const custom = {
    width: { sm: 6 / 7, lg: 4 / 6 },
    py: { sm: 'xl', lg: 'xxl' },
    mx: 'auto',
  }

  const isRenderProps = children instanceof Function

  return (
    <Box
      width={1}
      backgroundColor={color}
      backgroundImage={backgroundImage}
      backgroundPosition={backgroundPosition}
    >
      <Box {...custom} {...props}>
        {isRenderProps ? children({ color }) : children}
      </Box>
    </Box>
  )
}

ContentPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  color: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundPosition: PropTypes.string,
}

ContentPanel.defaultProps = {
  children: () => {},
  color: 'inherit',
  backgroundPosition: '0% 0%',
  backgroundImage: 'none',
}

export default ContentPanel
