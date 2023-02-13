import { createTheme } from '@mui/material/styles';
import { cyan, lightBlue } from '@mui/material/colors';


const theme = createTheme({
       palette: {
        primary: {
          main: cyan[900],
        },
        secondary: {
          main: lightBlue[700],
        },
      },

});

export default theme;
