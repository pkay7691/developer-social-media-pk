import { createTheme } from '@mui/material/styles';
import { cyan, lightBlue } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      // Dark blue
      main: '#023c40',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#93b7be',
    },
    tertiary: {
      main: '#ff9fb2',
    },
    //if mode is dark, then the background is dark
    mode: 'dark',
    //if mode is light, then the background is light
    mode: 'light',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
