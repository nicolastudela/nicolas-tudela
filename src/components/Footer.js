import React from 'react'
import { Box, Typography } from '@smooth-ui/core-em'
import { Link } from 'uiCommons'

const Footer = () => (
  <footer>
    <Typography color="white" fontFamily="'Lobster',cursive">
      <Box
        py="xxl"
        px="m"
        display="flex"
        justifyContent="space-between"
        backgroundColor="darkBlue"
      >
        <Typography>© 2019 Nicolas Tudela. All rights reserved.</Typography>
        <Link to="/resume" ariaLabel="About this site" underline>
          About this site
        </Link>
      </Box>
    </Typography>
  </footer>
)

export default Footer
