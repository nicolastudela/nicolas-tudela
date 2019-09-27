const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const fromSelectValue = val => (val === 'None' ? null : val)
export const fromTextFieldValue = val => (val === '' ? null : val)
export const toIntValue = val => {debugger; return (val ? Number.parseInt(val, 10) : null)}
export const validateEmail = email => {
  return re.test(email)
}
