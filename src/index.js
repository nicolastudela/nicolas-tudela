import React from 'react'
import ReactDOM from 'react-dom'

import { hot } from 'react-hot-loader/root'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'emotion-theming'
import { Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { createBrowserHistory } from 'history'
import ClientDeviceTypeProvider from 'components/utils/useClientDeviceType'
import LoggedUserProvider from 'components/utils/useLoggedUser'
import ScrollToTop from 'components/utils/ScrollToTop'
import App from './App'
import apolloClient from './api'
import theme from './theme'

const appHistory = createBrowserHistory()

const Main = hot(() => (
  <>
    <MuiThemeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={appHistory}>
          <ScrollToTop>
            <ClientDeviceTypeProvider>
              <ApolloProvider client={apolloClient}>
                <LoggedUserProvider>
                  <App />
                </LoggedUserProvider>
              </ApolloProvider>
            </ClientDeviceTypeProvider>
          </ScrollToTop>
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  </>
))

ReactDOM.render(<Main />, document.getElementById('root'))
