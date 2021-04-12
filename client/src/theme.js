import { createMuiTheme } from '@material-ui/core';

// export const appTheme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#98C1D9',
//       main: '#BF4342',
//       // dark: '#8C1C13',
//       contrastText: '#E7D7C1',
//     },
//     secondary: {
//       main: '#735751',
//     },
//   },
// });

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#EDF2F4',
      main: '#8D99AE',
      dark: '#30324a',
      contrastText: '#D90429',
    },
    secondary: {
      main: '#dc143c',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      lmd: 680,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 2,
  },
});
