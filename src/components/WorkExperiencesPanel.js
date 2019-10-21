import React from 'react'
import {
  CircularProgress,
  Tooltip,
  Popover,
  IconButton,
} from '@material-ui/core'
import { format, parseISO } from 'date-fns'
import { ApolloError } from 'apollo-client'
import PropTypes from 'prop-types'
import { Box, Button } from '@smooth-ui/core-em'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Delete'
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
  user,
  onCreate,
  onRemove,
  onEdit,
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

  const isAdminUser = user && user.isAdmin

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
        {isAdminUser && (
          <IconButton onClick={onCreate}>
            <AddIcon style={{ fontSize: 24 }} />
          </IconButton>
        )}
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
          scoped.map((workExperience, idx) => (
            <Box
              key={`${workExperience.company}-${workExperience.companyWebsite}`}
              mb="xxl"
              width={9 / 10}
            >
              <Text bold display="block" mb="l">
                {workExperience.position}
              </Text>
              <Box>
                <Link
                  href={`${workExperience.companyWebsite}`}
                  ariaLabel={`${workExperience.company}`}
                  underline
                  color="darkBlue"
                >
                  {workExperience.company}
                </Link>
                {`, `}
                <Text bold size="s">{`${
                  workExperience.startDate
                    ? format(parseISO(workExperience.startDate), 'MMMM yyyy')
                    : ''
                } - ${
                  workExperience.current
                    ? 'Present'
                    : format(parseISO(workExperience.endDate), 'MMMM yyyy')
                }`}</Text>
                {isAdminUser && (
                  <IconButton onClick={() => onEdit(workExperience)}>
                    <EditIcon style={{ fontSize: 24 }} />
                  </IconButton>
                )}
                {isAdminUser && (
                  <IconButton onClick={() => onRemove(workExperience)}>
                    <RemoveIcon style={{ fontSize: 24 }} />
                  </IconButton>
                )}
              </Box>
              <Text size="s">{workExperience.summary}</Text>
              <Box
                display="flex"
                flexDirection="row"
                my="s"
                alignItems="center"
              >
                {workExperience.programmingLanguages &&
                  workExperience.programmingLanguages.map(
                    language => programmingLanguageIcons[language]
                  )}
                <Button
                  size="sm"
                  ml={workExperience.programmingLanguages ? 'l' : 0}
                  aria-describedby={`${workExperience.company}-${
                    workExperience.companyWebsite
                  }-pop`}
                  onClick={event =>
                    handlePopOverClick(
                      event,
                      `${workExperience.company}-${idx}-pop`
                    )
                  }
                >
                  See More
                </Button>
                <Popover
                  id={`${workExperience.company}-${idx}-pop`}
                  open={
                    !!anchorEl &&
                    anchorId === `${workExperience.company}-${idx}-pop`
                  }
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
                    {workExperience.highlights &&
                      workExperience.highlights.length > 0 && (
                        <Box maxWidth="40%" m="l">
                          <Text cursive>Highlights</Text>
                          <ul>
                            {workExperience.highlights.map(light => (
                              <Text as="li" size="xs" key={light}>
                                {light}
                              </Text>
                            ))}
                          </ul>
                        </Box>
                      )}
                    {workExperience.technologies &&
                      workExperience.technologies.length > 0 && (
                        <Box maxWidth="40%" m="l">
                          <Text cursive>Technologies</Text>
                          <ul>
                            {workExperience.technologies.map(technology => (
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
          ))}
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
  user: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
  }),
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
}

WorkExperiencesPanel.defaultProps = {
  experiences: [],
  onScopeSelection: () => {},
  scope: null,
  loading: false,
  error: null,
  user: null,
  selectedScope: null,
  onCreate: () => {},
  onEdit: () => {},
  onRemove: () => {},
}

export default WorkExperiencesPanel
