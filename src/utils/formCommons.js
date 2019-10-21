import { isInt, isEmail, isISO8601, isURL } from 'validator'

export const fromSelectValue = val => (val === 'None' ? null : val)
export const checkInt = value =>
  !isInt(value) ? 'Needs to be numberic value' : null
export const checkRequiredField = field =>
  field.required && !field.value ? 'This field is required' : null

export const checkEmail = email => {
  return !isEmail(email) ? 'Please input a valid email' : null
}

export const checkISODate = date => {
  return !isISO8601(date) ? 'Please input a valid email' : null
}

export const checkURL = url => (!isURL(url) ? 'Please input a valid URL' : null)
