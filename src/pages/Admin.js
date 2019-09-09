import React from 'react'
import PropTypes from 'prop-types'
// import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import { Text } from 'uiCommons'
// import { Box } from '@smooth-ui/core-em'

const Admin = ({ loggedUser: { personalData } }) => {
  const user = personalData
  return (
    <>
      <Text size="title">Welcome {user.name}</Text>
    </>
  )
}

Admin.propTypes = {
  loggedUser: PropTypes.shape({
    role: PropTypes.string.isRequired,
    personalData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string,
    }),
  }),
}

Admin.defaultProps = {
  loggedUser: {
    personalData: {
      picture: null,
    },
  },
}

export default Admin
