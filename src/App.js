import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AppBar, Footer } from 'components'
import { About, Contact, Home, Resume } from './pages'

// import ReuseComponentsLogic from './containers/ReuseComponentsLogic'
// import Resume from './components/resume'

export default () => {
  const [isLoading, setIsLoading] = useState(true)

  const toggleLoading = () => setIsLoading(!isLoading)

  return (
    <>
      <AppBar isLoading={false} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/resume" component={Resume} />
      </Switch>
      <Footer />
    </>
  )
}
