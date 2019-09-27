import React from 'react'
import { CircularProgress, IconButton } from '@material-ui/core'
import { ApolloError } from 'apollo-client'
import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Delete'
import { Box } from '@smooth-ui/core-em'
import { SKILL_LEVELS, PROGRAMMING_SCOPES } from 'constants'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import { Select, Text } from 'uiCommons'

const prioritySortFunc = (a, b) => {
  const aPrio = a.priority ? a.priority : 0
  const bPrio = b.priority ? b.priority : 0

  return bPrio - aPrio === 0 ? a.name.localeCompare(b.name) : bPrio - aPrio
}

const SkillsPanel = ({
  skills,
  selectedScope,
  onScopeSelection,
  loading,
  user,
  error,
  onCreate,
  onRemove,
  onEdit,
  ...rest
}) => {
  const { isMobile } = useClientDeviceType()

  const isAdminUser = user && user.isAdmin

  const scopedSkills = skills.filter(
    skill =>
      !selectedScope ||
      selectedScope === PROGRAMMING_SCOPES.FULL_STACK ||
      [PROGRAMMING_SCOPES.FULL_STACK, selectedScope].includes(skill.scope)
  )

  const dayToDay = scopedSkills
    .filter(skill =>
      [SKILL_LEVELS.ADVANCED, SKILL_LEVELS.PROFICIENT].includes(skill.level)
    )
    .sort(prioritySortFunc)

  const experienceWith = scopedSkills
    .filter(skill =>
      [SKILL_LEVELS.DEVELOPING, SKILL_LEVELS.NOVICE].includes(skill.level)
    )
    .sort(prioritySortFunc)

  const onScopeSelect = event => {
    if (event.target) {
      onScopeSelection(event.target.value)
    }
  }

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
          Technologies
        </Text>
        {isAdminUser && (
          <IconButton onClick={onCreate}>
            <AddIcon style={{ fontSize: 24 }} />
          </IconButton>
        )}
        <Select
          inputId="skills-scope"
          name="scope"
          label="Scope"
          size="s"
          // variant="filled"
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
      <Box width={{ sm: 1, lg: 1 / 3 }}>
        <Text cursive size="xl" variant="h4" display="block">
          Day-to-Day Confort
        </Text>
        {loading && <CircularProgress style={{ margin: '40px' }} />}
        {error && <p>Error :(</p>}
        {!loading && !error && (
          <ul>
            {dayToDay.map((skill, idx) => (
              <li key={skill._id}>
                <Text size={idx > 9 ? 'xs' : 's'} key={skill.name}>
                  {skill.name}
                </Text>
                {isAdminUser && (
                  <IconButton onClick={() => onEdit(skill)}>
                    <EditIcon style={{ fontSize: 24 }} />
                  </IconButton>
                )}
                {isAdminUser && (
                  <IconButton onClick={() => onRemove(skill)}>
                    <RemoveIcon style={{ fontSize: 24 }} />
                  </IconButton>
                )}
              </li>
            ))}
          </ul>
        )}
      </Box>
      <Box width={{ sm: 1, lg: 1 / 3 }}>
        <Text cursive variant="h4" size="xl" display="block">
          Experience With
        </Text>
        {loading && <CircularProgress style={{ margin: '40px' }} />}
        {error && <p>Error :(</p>}
        {!loading && !error && (
          <ul>
            {experienceWith.map((skill, idx) => (
              <li key={skill._id}>
                <Text size={idx > 9 ? 'xs' : 's'} key={skill.name}>
                  {skill.name}
                </Text>
                {isAdminUser && (
                  <IconButton onClick={() => onEdit(skill)}>
                    <EditIcon style={{ fontSize: 24 }} />
                  </IconButton>
                )}
                {isAdminUser && (
                  <IconButton onClick={() => onRemove(skill)}>
                    <RemoveIcon style={{ fontSize: 24 }} />
                  </IconButton>
                )}
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Box>
  )
}

SkillsPanel.propTypes = {
  skills: PropTypes.arrayOf(Object),
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

SkillsPanel.defaultProps = {
  skills: [],
  onScopeSelection: () => {},
  scope: null,
  loading: false,
  error: null,
  selectedScope: null,
  user: null,
  onCreate: () => {},
  onEdit: () => {},
  onRemove: () => {},
}

export default SkillsPanel
