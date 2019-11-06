/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider } from '@smooth-ui/core-em'
import ClientDeviceTypeProvider from 'components/utils/useClientDeviceType'
import { MemoryRouter } from 'react-router-dom'
import theme from './theme'

const BasicTestWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <ClientDeviceTypeProvider value={{ isMobile: false, isDesktop: false }}>
          {children}
        </ClientDeviceTypeProvider>
      </MemoryRouter>
    </ThemeProvider>
  )
}

export default BasicTestWrapper
