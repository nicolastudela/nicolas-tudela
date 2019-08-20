import React from 'react'
import ReactDOM from 'react-dom'

import { hot } from 'react-hot-loader/root'
import { Normalize, ThemeProvider } from '@smooth-ui/core-em'
import { Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { createBrowserHistory } from 'history'
import ClientDeviceTypeProvider from 'components/utils/useClientDeviceType'
import ScrollToTop from 'components/utils/ScrollToTop'
import App from './App'
import apolloClient from './api'
import theme from './theme'

const appHistory = createBrowserHistory()

const Main = hot(() => (
  <>
    <ThemeProvider theme={theme}>
      <Normalize />
      <Router history={appHistory}>
        <ScrollToTop>
          <ClientDeviceTypeProvider>
            <ApolloProvider client={apolloClient}>
              <App />
            </ApolloProvider>
          </ClientDeviceTypeProvider>
        </ScrollToTop>
      </Router>
    </ThemeProvider>
  </>
))

ReactDOM.render(<Main />, document.getElementById('root'))
