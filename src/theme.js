import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// eslint-disable-next-line import/no-mutable-exports
let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#001724',
    },
    secondary: {
      main: '#0099cc',
    },
  },
  typography: {},
})

theme = responsiveFontSizes(theme)
export default theme

// const { spaces } = theme
// spaces.xs = 2
// spaces.s = 4
// spaces.m = 8
// spaces.l = 16
// spaces.xl = 32
// spaces.xxl = 64