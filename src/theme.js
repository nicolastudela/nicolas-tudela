import { theme } from '@smooth-ui/core-em'
import { themeBreakpointsEnhancer } from './utils'

const { spaces } = theme
spaces.xs = 2
spaces.s = 4
spaces.m = 8
spaces.l = 16
spaces.xl = 32
spaces.xxl = 64

const { breakpoints } = theme
breakpoints.xs = 0
breakpoints.sm = 600
breakpoints.md = 990
breakpoints.lg = 1280
breakpoints.xl = 1920

const enhancedBreakpoints = {
  ...breakpoints,
  ...themeBreakpointsEnhancer(breakpoints),
}

const colors = {
  green: '#28a745',
  lightBlue: 'rgba(0,153,204,.9)',
  darkBlue: '#001724',
  gray: '#edeeef',
  indigo: '#6610f2',
  // purple: '#6f42c1',
  // pink: '#e83e8c',
  // brick: '#bd4932',
  // orange: '#fd7e14',
  // yellow: '#ffc107',
  // teal: '#20c997',
  // cyan: '#17a2b8',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
}

export default {
  ...theme,
  colors,
  primary: '#001724',
  info: 'rgba(0,153,204,.9)',
  fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
  spaces,
  breakpoints: enhancedBreakpoints,
}
