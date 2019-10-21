import { useState } from 'react'
import { checkRequiredField } from 'utils/formCommons'

const validateField = field => {
  let errors
  errors = checkRequiredField(field)
  if (!errors && field.validators && field.value) {
    errors = field.validators
      .map(validator => validator(field.value))
      .filter(error => error)
      .join()
  }
  return errors || null
}

const isValid = state => {
  const errors = Object.values(state).filter(
    ({ required, value, error: fieldError }) =>
      (required && !value) || !!fieldError
  )
  return errors.length === 0
}

/**
 * This hook helps with form validation. It keeps track of the state and
 * then exposes it along with some useful validation data. You need to delegate
 * the control of the form state to this hook. To do that, this this hook exposes
 * an event handler (handleChange) which must be called when fields values changes.
 *
 * Exposed data:
 *  - values -> object with all fields by key containing updated value
 *  - errors -> object with all fields by key containing errors or null
 *    (null indicates if the value is valid)
 *  - meta -> object with all fields by key containing metadata related to the field
 *  - validate -> will run validators on each field and returns a boolean indication
 *    (if there were any errors or not)
 *  - sanitize -> will run onSanitize on each field and returns an object with
 *    each field and its sanitized values
 * @returns {Array [values,errors,meta,sanitize,validate, handleChange,isValid]}
 * @param {*} initialState
 */
const useFormControl = initialState => {
  const [state, setState] = useState(() => initialState)

  const handleChange = name => ({ target: { type, value, checked } }) => {
    const field = state[name]

    field.value = type === 'checkbox' ? checked : value
    field.touched = true

    field.error = validateField(field)

    setState({ ...state, ...{ [name]: field } })
  }

  const handleChangeValue = (name, value) => {
    const field = state[name]
    field.touched = true
    field.value = value
    field.error = validateField(field)

    setState({ ...state, ...{ [name]: field } })
  }

  const validate = () => {
    const newState = Object.fromEntries(
      Object.entries(state).map(([key, val]) => [
        key,
        { ...val, ...{ error: validateField(val) } },
      ])
    )

    setState(newState)
    return isValid(newState)
  }

  const sanitize = () => {
    return Object.entries(state).reduce(
      (acum, [key, val]) => ({
        ...acum,
        ...{
          [key]:
            val.onSanitize && val.value ? val.onSanitize(val.value) : val.value,
        },
      }),
      {}
    )
  }

  const { errors, values, meta } = Object.entries(state).reduce(
    (acum, [key, val]) => ({
      errors: { ...acum.errors, ...{ [key]: val.error } },
      values: { ...acum.values, ...{ [key]: val.value } },
      meta: {
        ...acum.meta,
        ...{
          [key]: {
            required: !!val.required,
            touched: !!val.touched,
          },
        },
      },
    }),
    { errors: {}, values: {}, meta: {} }
  )

  return [
    values,
    errors,
    meta,
    sanitize,
    validate,
    handleChange,
    () => isValid(state),
    handleChangeValue,
  ]
}

export default useFormControl
