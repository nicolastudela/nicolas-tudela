import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AppBar, Footer } from 'components'
import { About, Contact, Home, Resume } from './pages'

const NoMatch = () => <div>NO match</div>

export default () => {
  const [isLoading, setIsLoading] = useState(true)

  const toggleLoading = () => setIsLoading(!isLoading)

  return (
    <>
      <AppBar isLoading={false} />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/resume" component={Resume} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      <Footer />
    </>
  )
}
