import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@smooth-ui/core-em'
import { InputAdornment, CircularProgress } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import { useMutation } from '@apollo/react-hooks'
import { Text, Link, TextField } from 'uiCommons'
import { useLoggedUser } from 'components/utils/useLoggedUser'
import { SIGN_IN } from 'graphqlSchema'
import { validateEmail } from 'utils/formCommons'

const SignInPanel = ({ onClose }) => {
  const [state, setState] = useState({
    email: { touched: false, value: '', error: null },
    password: { touched: false, value: '', error: null },
  })
  const { onSignIn } = useLoggedUser()
  const [login, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: ({ signin: { token } }) => {
      onSignIn(token)
    },
  })

  const isValid = () => {
    const errors = [...Object.values(state)].filter(
      ({ touched, error: fieldError }) => !touched || !!fieldError
    )
    return errors.length === 0
  }

  const handleChange = name => ({ target: { value } }) => {
    const field = state[name]

    if (!value || value === '') {
      field.error = 'This field is required'
    } else {
      field.error = null
    }

    if (name === 'email') {
      if (!validateEmail(value)) {
        field.error = 'Please input a valid email'
      } else {
        field.error = null
      }
    }
    field.touched = true
    field.value = value

    setState({ ...state, ...{ [name]: field } })
  }

  const emailSignin = async event => {
    event.preventDefault()
    if (isValid()) {
      try {
        const { data } = await login({
          variables: {
            email: state.email.value,
            password: state.password.value,
          },
        })
        onClose(data.user)
      } catch (ApolloError) {
        // nothing to do, error will be caputured in useMutation Hook
      }
    }
  }

  return (
    <Box>
      {error && <p>{error.message}</p>}
      <form onSubmit={emailSignin}>
        <TextField
          // className={classes.margin}
          id="singin-email"
          label="Email"
          autoComplete="email"
          name="email"
          onChange={handleChange('email')}
          value={state.email.value}
          error={!!state.email.error}
          helperText={state.email.error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          type="email"
          variant="outlined"
        />
        <TextField
          // className={classes.margin}
          id="signin-password"
          label="Password"
          onChange={handleChange('password')}
          value={state.password.value}
          error={!!state.password.error}
          helperText={state.password.error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          type="password"
          autoComplete="current-password"
          variant="outlined"
          name="password"
        />
        <Box my="xl" display="flex" flexDirection="column" alignItems="center">
          {loading ? (
            <CircularProgress style={{ margin: '40px' }} />
          ) : (
            <Button
              width={1}
              type="submit"
              variant="info"
              disabled={!isValid()}
            >
              Sign In
            </Button>
          )}
          <Link type="button" underline onClick={() => {}} color="black">
            <Text size="s">Lost your password pasword?</Text>
          </Link>
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Text size="s">Not registered?</Text>
          <Link underline onClick={() => {}} color="black">
            <Text size="s">Create an Account</Text>
          </Link>
        </Box>
      </form>
    </Box>
  )
}

SignInPanel.propTypes = {
  onClose: PropTypes.func,
}

SignInPanel.defaultProps = {
  onClose: () => {},
}

export default SignInPanel
