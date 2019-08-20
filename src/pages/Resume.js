import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TitleAndSubtitle, ContentPanel, SkillsPanel } from 'components'
import { PROGRAMMING_SCOPES } from 'constants'
import { Box, Typography } from '@smooth-ui/core-em'
import road from 'images/road.jpg'
import { Link } from 'uiCommons'
import { GET_RESUME } from '../graphql/Resume'
import resumePdf from '../static/nicolas-tudela-cv.pdf'

const Resume = () => {
  const { loading, error, data } = useQuery(GET_RESUME)
  const [selectedScope, setSelectedScope] = useState(
    PROGRAMMING_SCOPES.FULL_STACK
  )

  return (
    <>
      <ContentPanel
        color="gray"
        width={{ sm: 6 / 7, lg: 1 }}
        backgroundImage={`url(${road});`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        {({ color }) => (
          <>
            <Box m="auto" width={{ sm: 6 / 7, lg: 6 / 7 }}>
              <TitleAndSubtitle
                textAlign="unset"
                title="THE ONLY SOURCE OF KNOWLEDGE IS EXPERIENCE"
                color={color}
              />
              <Link color="darkBlue" href={resumePdf}>
                Download resume
              </Link>
            </Box>
          </>
        )}
      </ContentPanel>
      <SkillsPanel
        skills={data.resume ? data.resume.skills : []}
        loading={loading}
        selectedScope={selectedScope}
        onScopeSelection={setSelectedScope}
        error={error}
      />
    </>
  )
}
export default Resume
