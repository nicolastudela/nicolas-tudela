import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks'
import { ME } from 'graphqlSchema'

const LoggedUserCtx = createContext({
  loggedUser: null,
  loading: false,
  onSignIn: () => {},
  onSignOut: () => {},
})
const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null)
  const apolloClient = useApolloClient()
  const [
    getMe,
    {
      data,
      loading: meQueryLoading,
      called: meQueryCalled,
      refetch,
      networkStatus,
    },
  ] = useLazyQuery(ME, {
    notifyOnNetworkStatusChange: true,
  })
  // I need this to turn on/off loading flag when apollo-client is being reset
  const [isOnSignOut, setIsOnSignOut] = useState(false)

  // This is is called when the page when the app is reloaded (fetches the user)
  if (localStorage.getItem('token') && !meQueryCalled) {
    getMe()
  }

  const onSignIn = async token => {
    localStorage.setItem('token', token)
    if (!meQueryCalled) {
      return getMe()
    }
    return refetch()
  }

  const onSignOut = async () => {
    localStorage.removeItem('token')
    setIsOnSignOut(true)
    await apolloClient.resetStore()
    setIsOnSignOut(false)
  }

  // apolloQueryHooks provides the result of the query but we want to store it
  // in our own state; With this check here we don't allow the state gets updated
  // indefefinetly
  if (data && data.me && !loggedUser) {
    setLoggedUser(data.me)
  } else if ((!data || !data.me) && loggedUser) {
    setLoggedUser(null)
  }

  // networkStatus === 4 means 'me' query is being refetched
  const loading = isOnSignOut || meQueryLoading || networkStatus === 4
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
