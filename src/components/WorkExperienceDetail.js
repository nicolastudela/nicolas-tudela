import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@smooth-ui/core-em'
import { Text } from 'uiCommons'

const WorkExperienceDetail = ({ workExperience, ...rest }) => {
  return (
    <Box display="flex" flexDirection="row" mt="s" {...rest}>
      {workExperience.highlights && workExperience.highlights.length > 0 && (
        <Box maxWidth="40%" mr="l">
          <Text cursive>Highlights</Text>
          <ul style={{ margin: '10px 0', paddingInlineStart: '20px' }}>
            {workExperience.highlights.map(light => (
              <Text as="li" size="xs" key={light}>
                {light}
              </Text>
            ))}
          </ul>
        </Box>
      )}
      {workExperience.technologies && workExperience.technologies.length > 0 && (
        <Box maxWidth="40%">
          <Text cursive>Technologies</Text>
          <ul style={{ margin: '10px 0', paddingInlineStart: '20px' }}>
            {workExperience.technologies.map(technology => (
              <Text as="li" size="xs" key={technology}>
                {technology}
              </Text>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  )
}
WorkExperienceDetail.propTypes = {
  workExperience: PropTypes.shape({
    highlights: PropTypes.arrayOf(Object),
    technologies: PropTypes.arrayOf(Object),
  }),
}

WorkExperienceDetail.defaultProps = {
  workExperience: {},
}

export default WorkExperienceDetail
