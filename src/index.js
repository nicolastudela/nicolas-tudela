import React from 'react'
import ReactDOM from 'react-dom'

import { hot } from 'react-hot-loader/root'
import { Normalize, ThemeProvider } from '@smooth-ui/core-em'
import { Router } from 'react-router-dom'
import { createBrowserHistory }  from 'history'
import App from './App'

import theme from './theme'

const appHistory = createBrowserHistory()

const Main = hot(() => (
  <>
    <ThemeProvider theme={theme}>
      <Normalize />
      <Router history={appHistory}>
        <App />
      </Router>
    </ThemeProvider>
  </>
))

ReactDOM.render(<Main />, document.getElementById('root'))
