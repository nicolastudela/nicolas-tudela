import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks'
import { ME } from 'graphqlSchema'

const LoggedUserCtx = createContext(null)
const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  const apolloClient = useApolloClient()
  const [getMe, { data, loading, called: meQueryCalled }] = useLazyQuery(ME)

  if (localStorage.getItem('token') && !meQueryCalled && !isLogged) {
    setIsLogged(true)
    getMe()
  }

  const onSignIn = token => {
    localStorage.setItem('token', token)
    setIsLogged(true)
    getMe()
  }

  const onSignOut = () => {
    setIsLogged(false)
    apolloClient.clearStore()
    localStorage.clear()
    setLoggedUser(null)
  }

  if (data && data.me && !loggedUser && isLogged) {
    setLoggedUser(data.me)
  }

  return (
    <LoggedUserCtx.Provider
      value={{ loggedUser, loading, onSignIn, onSignOut }}
    >
      {children}
    </LoggedUserCtx.Provider>
  )
}

LoggedUserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

LoggedUserProvider.defaultProps = {
  children: null,
}

export default LoggedUserProvider
export const useLoggedUser = () => useContext(LoggedUserCtx)
