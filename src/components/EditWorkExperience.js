import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@smooth-ui/core-em'
import { Checkbox, IconButton, FormControl } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { format } from 'date-fns'
import shortId from 'shortid'
import { PROGRAMMING_LANGUAGES, PROGRAMMING_SCOPES } from 'constants'
import { Select, TextField, Text, FormControlLabel } from 'uiCommons'
import useFormControl from 'components/utils/useFormControl'
import { trim } from 'validator'
import { checkISODate, checkURL } from 'utils/formCommons'

const EditWorkExperience = ({ experience, onSave, onClose, ...rest }) => {
  const [
    values,
    errors,
    meta,
    sanitize,
    validate,
    handleChange,
    _,
    handleChangeValue,
  ] = useFormControl({
    company: {
      touched: false,
      required: false,
      value: experience.company ? experience.company : '',
      error: null,
    },
    companyWebsite: {
      touched: false,
      required: false,
      value: experience.companyWebsite ? experience.companyWebsite : '',
      validators: [checkURL],
      error: null,
    },
    position: {
      touched: false,
      required: true,
      value: experience.position ? experience.position : '',
      error: null,
    },
    website: {
      touched: false,
      value: experience.website ? experience.website : '',
      error: null,
      validators: [checkURL],
      required: false,
    },
    current: {
      touched: false,
      value: experience.current ? experience.current : false,
      error: null,
      required: false,
    },
    startDate: {
      touched: false,
      value: experience.startDate
        ? experience.startDate
        : format(new Date(), 'yyyy-MM-dd'),
      error: null,
      validators: [checkISODate],
      required: true,
    },
    endDate: {
      touched: false,
      value: experience.endDate
        ? experience.endDate
        : format(new Date(), 'yyyy-MM-dd'),
      error: null,
      validators: [checkISODate],
    },
    summary: {
      touched: false,
      value: experience.summary ? experience.summary : '',
      error: null,
      required: false,
    },
    highlights: {
      touched: false,
      value: experience.highlights
        ? experience.highlights.reduce((acc, text) => {
            const id = shortId.generate()
            return {
              ...acc,
              ...{
                [id]: {
                  id,
                  text,
                },
              },
            }
          }, {})
        : [],
      error: null,
      required: false,
      onSanitize: val =>
        Object.values(val)
          .filter(light => !!light.text)
          .map(light => light.text),
    },
    scope: {
      touched: false,
      required: true,
      value: experience.scope ? experience.scope : '',
      error: null,
    },
    programmingLanguages: {
      touched: false,
      required: false,
      value: experience.programmingLanguages
        ? experience.programmingLanguages
        : [],
      error: null,
      onSanitize: val => (val.length === 0 ? null : val),
    },
    technologies: {
      touched: false,
      required: false,
      value: experience.technologies ? experience.technologies.join(', ') : '',
      error: null,
      onSanitize: val => val.split(',').map(x => trim(x)),
    },
  })

  const save = async event => {
    event.preventDefault()
    if (validate()) {
      onSave({
        ...experience,
        ...sanitize(),
      })
    }
  }

  const handleChangeHighlight = (id, { target: { value } }) => {
    values.highlights[id].text = value

    handleChangeValue('highlights', values.highlights)
  }

  const handleChangeProgrammingLanguage = (key, { target: { checked } }) => {
    debugger
    const programmingLanguages = checked
      ? values.programmingLanguages.concat([key])
      : values.programmingLanguages.filter(x => x !== key)

    handleChangeValue('programmingLanguages', programmingLanguages)
  }

  const handleAddHighlight = () => {
    debugger
    const id = shortId.generate()
    const updatedHighlights = {
      ...{ [id]: { id, text: '' } },
      ...values.highlights,
    }

    handleChangeValue('highlights', updatedHighlights)
  }

  const removeHighlight = id => {
    handleChangeValue(
      'highlights',
      Object.fromEntries(
        Object.entries(values.highlights).filter(([lightId]) => lightId !== id)
      )
    )
  }

  return (
    <Box {...rest}>
      <form onSubmit={save}>
        <TextField
          id="experience-position"
          label="Position"
          autoComplete="position"
          name="position"
          onChange={handleChange('position')}
          value={values.position}
          error={!!errors.position}
          helperText={errors.position}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
          required={meta.position.required}
        />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            id="experience-company"
            label="Company"
            autoComplete="company"
            name="company"
            onChange={handleChange('company')}
            value={values.company}
            error={!!errors.company}
            helperText={errors.company}
            variant="outlined"
            boxProps={{ width: 2 / 5, my: { sm: 's', lg: 'l' } }}
            required={meta.company.required}
          />
          <TextField
            id="experience-companyWebsite"
            label="Company Website"
            autoComplete="companyWebsite"
            name="companyWebsite"
            onChange={handleChange('companyWebsite')}
            value={values.companyWebsite}
            error={!!errors.companyWebsite}
            helperText={errors.companyWebsite}
            variant="outlined"
            boxProps={{ width: 2 / 5, my: { sm: 's', lg: 'l' } }}
            required={meta.companyWebsite.required}
          />
        </Box>
        <TextField
          id="experience-website"
          label="Project Website"
          autoComplete="website"
          name="website"
          onChange={handleChange('website')}
          value={values.website}
          error={!!errors.website}
          helperText={errors.website}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
          required={meta.website.required}
        />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            id="experience-startDate"
            label="Start Date"
            autoComplete="startDate"
            name="startDate"
            type="date"
            // defaultValue={format(new Date(), 'yyyy-MM-dd')}
            onChange={handleChange('startDate')}
            value={values.startDate}
            error={!!errors.startDate}
            helperText={errors.startDate}
            variant="outlined"
            boxProps={{ width: 1 / 4, my: { sm: 's', lg: 'l' } }}
            required={meta.startDate.required}
          />
          <TextField
            id="experience-endDate"
            label="End Date"
            autoComplete="endDate"
            // defaultValue={format(new Date(), 'yyyy-MM-dd')}
            name="endDate"
            type="date"
            onChange={handleChange('endDate')}
            value={values.endDate}
            error={!!errors.endDate}
            helperText={errors.endDate}
            variant="outlined"
            boxProps={{ width: 1 / 4, my: { sm: 's', lg: 'l' } }}
            required={!values.current}
            disabled={!!values.current}
          />
          <Box width={1 / 4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.current}
                  onChange={handleChange('current')}
                  value="current"
                />
              }
              label="Current"
            />
          </Box>
        </Box>
        <TextField
          id="experience-summary"
          label="Summary"
          autoComplete="summary"
          name="summary"
          onChange={handleChange('summary')}
          value={values.summary}
          error={!!errors.summary}
          helperText={errors.summary}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
          multiline
          rows={4}
          required={meta.summary.required}
        />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Select
            inputId="experience-scope"
            name="scope"
            label="Scope"
            value={values.scope}
            onChange={handleChange('scope')}
            width={2 / 9}
            required={meta.scope.required}
          >
            <option value="" disabled />
            {[...Object.values(PROGRAMMING_SCOPES)].map(scope => (
              <option key={scope} value={scope}>
                {scope}
              </option>
            ))}
          </Select>
          <Box width={6 / 9}>
            <FormControl component="fieldset">
              <legend style={{ display: 'none' }}>Programming Languages</legend>
              <Text size="xs" cursive color="darkGray">
                Programming Languages
              </Text>
              <Box display="flex" flexDirection="row">
                {Object.entries(PROGRAMMING_LANGUAGES).map(([key, val]) => (
                  <FormControlLabel
                    size="m"
                    key={key}
                    control={
                      <Checkbox
                        checked={values.programmingLanguages.includes(key)}
                        onChange={event =>
                          handleChangeProgrammingLanguage(key, event)
                        }
                        value={key}
                      />
                    }
                    label={val}
                  />
                ))}
              </Box>
            </FormControl>
          </Box>
        </Box>

        <TextField
          id="experience-technologies"
          label="Technologies"
          name="technologies"
          onChange={handleChange('technologies')}
          value={values.technologies}
          error={!!errors.technologies}
          helperText={errors.technologies || 'Comma separated values'}
          variant="outlined"
          boxProps={{ my: { sm: 's', lg: 'l' } }}
          required={meta.technologies.required}
          multiline
          rows={2}
        />
        <Text size="xs" cursive color="darkGray">
          Highlights
        </Text>
        <IconButton onClick={() => handleAddHighlight()}>
          <AddIcon style={{ fontSize: 24 }} />
        </IconButton>
        {Object.values(values.highlights).map(light => (
          <Box
            key={light.id}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              id={`experience-highlight-{${light.id}}`}
              onChange={event => handleChangeHighlight(light.id, event)}
              value={light.text}
              variant="outlined"
              boxProps={{ width: 1, my: 'xxs' }}
            />
            <IconButton onClick={() => removeHighlight(light.id)}>
              <RemoveIcon style={{ fontSize: 24 }} />
            </IconButton>
          </Box>
        ))}

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
          <Button width={2 / 4} type="submit" variant="info">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}

EditWorkExperience.propTypes = {
  experience: PropTypes.shape({
    company: PropTypes.string,
    companyWebsite: PropTypes.string,
    position: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    summary: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    current: PropTypes.bool,
    programmingLanguages: PropTypes.arrayOf(String),
    highlights: PropTypes.arrayOf(String),
    technologies: PropTypes.arrayOf(String),
    scope: PropTypes.string,
  }),
  onSave: PropTypes.func,
  onClose: PropTypes.func,
}

EditWorkExperience.defaultProps = {
  experience: {},
  onSave: () => {},
  onClose: () => {},
}

export default EditWorkExperience
