import React from 'react'
import { CircularProgress, Tooltip, Popover } from '@material-ui/core'
import { ApolloError } from 'apollo-client'
import PropTypes from 'prop-types'
import { Box, Button } from '@smooth-ui/core-em'
import { PROGRAMMING_SCOPES, PROGRAMMING_LANGUAGES } from 'constants'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import { Select, Link, Text } from 'uiCommons'
import { javascript, java, php, scala, rails } from 'icons'

const programmingLanguageIcons = [
  ...Object.entries(PROGRAMMING_LANGUAGES),
].reduce((prev, [key, value]) => {
  let srcImg
  switch (key) {
    case 'JAVASCRIPT':
      srcImg = javascript
      break
    case 'JAVA':
      srcImg = java
      break
    case 'SCALA':
      srcImg = scala
      break
    case 'RUBY_ON_RAILS':
      srcImg = rails
      break
    case 'PHP':
      srcImg = php
      break
    default:
      break
  }

  const comp = (
    <Tooltip
      title={value}
      aria-label={value}
      style={{ height: '35px', width: '35px' }}
      key={key}
    >
      <img src={srcImg} alt={value} />
    </Tooltip>
  )
  return { ...prev, ...{ [key]: comp } }
}, {})

const WorkExperiencesPanel = ({
  experiences,
  selectedScope,
  onScopeSelection,
  loading,
  error,
  ...rest
}) => {
  const { isMobile } = useClientDeviceType()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorId, setAnchorId] = React.useState(null)

  const onScopeSelect = event => {
    if (event.target) {
      onScopeSelection(event.target.value)
    }
  }

  function handlePopOverClick(event, id) {
    setAnchorEl(event.currentTarget)
    setAnchorId(id)
  }

  function handlehandlePopOverClose() {
    setAnchorEl(null)
    setAnchorId(null)
  }

  const scoped = experiences.filter(
    skill =>
      !selectedScope ||
      selectedScope === PROGRAMMING_SCOPES.FULL_STACK ||
      [PROGRAMMING_SCOPES.FULL_STACK, selectedScope].includes(skill.scope)
  )

  scoped.sort((a, b) => {
    if (a.current !== b.current) {
      return b.current - a.current
    }

    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      backgroundColor="gray"
      minHeight="300px"
      {...rest}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? 'row' : 'column'}
        justifyContent={isMobile ? 'space-between' : 'flex-start'}
        alignItems={isMobile ? 'center' : 'flex-start'}
        py={{ sm: 'l', lg: 'xxl' }}
        pl={{ sm: 0, lg: 'xxl' }}
        width={{ sm: 1, lg: 1 / 3 }}
      >
        <Text cursive size="subtitle" variant="h4">
          Work Experience
        </Text>
        <Select
          inputId="work-experiences-scope"
          name="scope"
          label="Scope"
          size="s"
          value={selectedScope}
          onChange={onScopeSelect}
          width={4 / 10}
        >
          {[...Object.values(PROGRAMMING_SCOPES)].map(scope => (
            <option key={scope} value={scope}>
              {scope}
            </option>
          ))}
        </Select>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        py={{ sm: 'l', lg: 'l' }}
        width={{ sm: 1, lg: 2 / 3 }}
      >
        {loading && <CircularProgress style={{ margin: '40px' }} />}
        {error && <p>Error :(</p>}
        {!loading &&
          !error &&
          scoped.map(
            (
              {
                company,
                companyWebsite,
                position,
                summary,
                startDate,
                endDate,
                current,
                programmingLanguages,
                highlights,
                technologies,
              },
              idx
            ) => (
              <Box key={`${company}-${companyWebsite}`} mb="xxl" width={9 / 10}>
                <Text bold display="block" mb="l">
                  {position}
                </Text>
                <Box>
                  <Link
                    href={`${companyWebsite}`}
                    ariaLabel={`${company}`}
                    underline
                    color="darkBlue"
                  >
                    {company}
                  </Link>
                  {`, `}
                  <Text bold size="s">{`${startDate} - ${
                    current ? 'Present' : endDate
                  }`}</Text>
                </Box>
                <Text size="s">{summary}</Text>
                <Box
                  display="flex"
                  flexDirection="row"
                  my="s"
                  alignItems="center"
                >
                  {programmingLanguages.map(
                    language => programmingLanguageIcons[language]
                  )}
                  <Button
                    size="sm"
                    ml="l"
                    aria-describedby={`${company}-${companyWebsite}-pop`}
                    onClick={event =>
                      handlePopOverClick(event, `${company}-${idx}-pop`)
                    }
                  >
                    See More
                  </Button>
                  <Popover
                    id={`${company}-${idx}-pop`}
                    open={!!anchorEl && anchorId === `${company}-${idx}-pop`}
                    anchorEl={anchorEl}
                    onClose={handlehandlePopOverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Box display="flex" flexDirection="row">
                      {highlights && highlights.length > 0 && (
                        <Box maxWidth="40%" m="l">
                          <Text cursive>Highlights</Text>
                          <ul>
                            {highlights.map(light => (
                              <Text as="li" size="xs" key={light}>
                                {light}
                              </Text>
                            ))}
                          </ul>
                        </Box>
                      )}
                      {technologies && technologies.length > 0 && (
                        <Box maxWidth="40%" m="l">
                          <Text cursive>Technologies</Text>
                          <ul>
                            {technologies.map(technology => (
                              <Text as="li" size="xs" key={technology}>
                                {technology}
                              </Text>
                            ))}
                          </ul>
                        </Box>
                      )}
                    </Box>
                  </Popover>
                </Box>
              </Box>
            )
          )}
      </Box>
    </Box>
  )
}

WorkExperiencesPanel.propTypes = {
  experiences: PropTypes.arrayOf(Object),
  scope: PropTypes.string,
  onScopeSelection: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(ApolloError),
  selectedScope: PropTypes.string,
}

WorkExperiencesPanel.defaultProps = {
  experiences: [],
  onScopeSelection: () => {},
  scope: null,
  loading: false,
  error: null,
  selectedScope: null,
}

export default WorkExperiencesPanel
