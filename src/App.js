import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { AppBar, Footer } from 'components'
import { useLoggedUser } from 'components/utils/useLoggedUser'
import { About, Contact, Home, Resume, Admin } from './pages'

const NoMatch = () => <div>NO match</div>

/* eslint-disable react/prop-types */
const PrivateRoute = ({ component: Component, adminOnly, ...rest }) => {
  const { loggedUser, loading } = useLoggedUser()

  return (
    <Route
      {...rest}
      render={props => {
        if (loading) return <CircularProgress />

        if (loggedUser && (!adminOnly || loggedUser.isAdmin)) {
          return <Component loggedUser={loggedUser} {...props} />
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

export default () => {
  return (
    <>
      <AppBar isLoading={false} />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/resume" component={Resume} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      <Footer />
      <div id="modal" />
    </>
  )
}
