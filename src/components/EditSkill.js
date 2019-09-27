import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@smooth-ui/core-em'
import { Select, TextField } from 'uiCommons'
import { SKILL_LEVELS, PROGRAMMING_SCOPES } from 'constants'
import { fromSelectValue, toIntValue } from 'utils/formCommons'

const EditSkill = ({ skill, onSave, onClose, ...rest }) => {
  const [state, setState] = useState({
    name: {
      touched: false,
      required: true,
      value: skill.name ? skill.name : '',
      error: null,
    },
    level: {
      touched: false,
      required: true,
      value: skill.level ? skill.level : '',
      error: null,
    },
    scope: {
      touched: false,
      required: true,
      value: skill.scope ? skill.scope : '',
      error: null,
    },
    keywords: {
      touched: false,
      value: skill.keywords ? skill.keywords : '',
      error: null,
      required: false,
      onSave: val => (val ? val.split(',') : null),
    },
    priority: {
      touched: false,
      value: skill.priority ? skill.priority : 'None',
      error: null,
      required: false,
      onSave: val => toIntValue(fromSelectValue(val)),
    },
  })

  const isValid = () => {
    const errors = [...Object.values(state)].filter(
      ({ required, value, error: fieldError }) =>
        (required && !value) || !!fieldError
    )
    return errors.length === 0
  }

  const handleChange = name => ({ target: { value } }) => {
    const field = state[name]

    if (field.required && (!value || value === '')) {
      field.error = 'This field is required'
    } else {
      field.error = null
    }

    field.value = value
    field.touched = true

    setState({ ...state, ...{ [name]: field } })
  }

  const save = async event => {
    event.preventDefault()
    if (isValid()) {
      onSave({
        ...skill,
        ...[...Object.entries(state)].reduce(
          (acum, [key, val]) => ({
            ...acum,
            ...{ [key]: val.onSave ? val.onSave(val.value) : val.value },
          }),
          {}
        ),
      })
    }
  }

  return (
    <Box {...rest}>
      <form onSubmit={save}>
        <TextField
          id="skill-name"
          label="Name"
          autoComplete="name"
          name="name"
          onChange={handleChange('name')}
          value={state.name.value}
          error={!!state.name.error}
          helperText={state.name.error}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
          required
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Select
            inputId="skill-scope"
            name="scope"
            label="Scope"
            value={state.scope.value}
            onChange={handleChange('scope')}
            width={4 / 9}
            required
          >
            <option value="" disabled />
            {[...Object.values(PROGRAMMING_SCOPES)].map(scope => (
              <option key={scope} value={scope}>
                {scope}
              </option>
            ))}
          </Select>
          <Select
            inputId="skill-level"
            name="level"
            label="Level"
            value={state.level.value}
            onChange={handleChange('level')}
            width={4 / 9}
            required
          >
            <option value="" disabled />
            {[...Object.values(SKILL_LEVELS)].map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </Box>
        <TextField
          id="skill-keywords"
          label="Keywords"
          name="keywords"
          onChange={handleChange('keywords')}
          value={state.keywords.value}
          error={!!state.keywords.error}
          helperText={state.keywords.error || 'Accept comma separated values'}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
        />
        <Select
          inputId="skill-priority"
          name="priority"
          label="Priority"
          value={state.priority.value}
          onChange={handleChange('priority')}
          width={4 / 10}
          native
        >
          <option value="None">None</option>
          {[1, 2, 3, 4].map(priority => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </Select>
        <Box
          my="xl"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            width={1 / 4}
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            width={2 / 4}
            type="submit"
            variant="info"
            disabled={!isValid()}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}

EditSkill.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    scope: PropTypes.string.isRequired,
    keywords: PropTypes.arrayOf(String).isRequired,
    priority: PropTypes.number,
  }),
  onSave: PropTypes.func,
  onClose: PropTypes.func,
}

EditSkill.defaultProps = {
  skill: {},
  onSave: () => {},
  onClose: () => {},
}

export default EditSkill
