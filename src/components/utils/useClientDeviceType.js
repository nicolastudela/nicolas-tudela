import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import useMediaQuery from 'components/utils/useMediaQuery'

const ClientDeviceTypeCtx = createContext(null)
const ClientDeviceTypeProvider = ({ children }) => {
  const isMobile = useMediaQuery('mobile')

  const isDesktop = useMediaQuery('desktop')

  return (
    <ClientDeviceTypeCtx.Provider value={{ isMobile, isDesktop }}>
      {children}
    </ClientDeviceTypeCtx.Provider>
  )
}

ClientDeviceTypeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

ClientDeviceTypeProvider.defaultProps = {
  children: null,
}

export default ClientDeviceTypeProvider
export const useClientDeviceType = () => useContext(ClientDeviceTypeCtx)
