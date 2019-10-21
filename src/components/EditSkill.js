import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@smooth-ui/core-em'
import { Select, TextField } from 'uiCommons'
import { SKILL_LEVELS, PROGRAMMING_SCOPES } from 'constants'
import { fromSelectValue } from 'utils/formCommons'
import useFormControl from 'components/utils/useFormControl'
import { toInt, trim } from 'validator'

const EditSkill = ({ skill, onSave, onClose, ...rest }) => {
  const [
    values,
    errors,
    meta,
    sanitize,
    validate,
    handleChange,
  ] = useFormControl({
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
      value: skill.keywords ? skill.keywords.join(', ') : '',
      error: null,
      required: false,
      onSanitize: val => val.split(',').map(x => trim(x)),
    },
    priority: {
      touched: false,
      value: skill.priority ? skill.priority.toString() : 'None',
      error: null,
      required: false,
      onSanitize: val => {
        const selectValue = fromSelectValue(val)
        return selectValue ? toInt(selectValue) : selectValue
      },
    },
  })

  const save = async event => {
    event.preventDefault()
    if (validate()) {
      onSave({
        ...skill,
        ...sanitize(),
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
          value={values.name}
          error={!!errors.name}
          helperText={errors.name}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
          required={meta.name.required}
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Select
            inputId="skill-scope"
            name="scope"
            label="Scope"
            value={values.scope}
            onChange={handleChange('scope')}
            width={4 / 9}
            required={meta.scope.required}
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
            value={values.level}
            onChange={handleChange('level')}
            width={4 / 9}
            required={meta.level.required}
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
          value={values.keywords}
          error={!!errors.keywords}
          helperText={errors.keywords || 'Accept comma separated values'}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
          required={meta.keywords.required}
        />
        <Select
          inputId="skill-priority"
          name="priority"
          label="Priority"
          value={values.priority}
          onChange={handleChange('priority')}
          width={4 / 10}
          native
          required={meta.priority.required}
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
            // disabled={!isValid()}
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
