import { createTheme } from '@mui/material/styles';
import { green, orange, red } from '@mui/material/colors';
import { lightBlue } from '@mui/material/colors';
import { esES } from '@mui/material/locale';
// Create a theme instance.
export const primeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ad5389',
    },
    secondary: {
      main: '#3c1053',
    },
    error: {
      main: red[300],
    },
    success:{
      main: green[300]
    },
    warning: {
      main: orange[300],
    },
    info: {
      main: lightBlue[300],
    },
    persist: {
        main: '#ad5389'
    },
  },
    typography:{
        fontFamily:['monospace','arial'],
    } 
},esES);
