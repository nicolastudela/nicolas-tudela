import React, { useState } from 'react'
import { Box } from '@smooth-ui/core-em'
import { css } from 'emotion'
import PropTypes from 'prop-types'
import { IconButton, Modal } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useClientDeviceType } from 'components/utils/useClientDeviceType'
import Text from './Text'

const modalStyleClass = css({
  position: 'absolute',
  border: '1px solid',
  boxShadow: '1px 1px rgba(0,153,204,.9)',
  borderColor: 'darkBlue',
  backgroundColor: 'white',
  outline: 'none',
})

function rand() {
  return 0
}

function getModalStyle(isMobile) {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: isMobile ? '80%' : '50%',
  }
}

const CustomModal = ({
  open,
  onClose,
  title,
  description,
  withCloseButton,
  children,
  ...rest
}) => {
  const { isMobile } = useClientDeviceType()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(() => getModalStyle(isMobile))

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={onClose}
    >
      <div style={modalStyle} className={modalStyleClass}>
        <Box
          p="l"
          justifySelf="center"
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          {...rest}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            mb="m"
          >
            <Text size="subtitle" cursive id="modal-title">
              {title}
            </Text>
            {withCloseButton && (
              <IconButton aria-label="close-modal" onClick={onClose}>
                <CloseIcon style={{ color: 'black' }} />
              </IconButton>
            )}
          </Box>
          {!!description && (
            <Text id="modal-description" mb="m">
              {description}
            </Text>
          )}
          {children}
        </Box>
      </div>
    </Modal>
  )
}

CustomModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  withCloseButton: PropTypes.bool,
}

CustomModal.defaultProps = {
  children: null,
  onClose: () => {},
  description: null,
  title: null,
  withCloseButton: false,
}

export default CustomModal
