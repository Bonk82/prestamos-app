import { createTheme } from '@mui/material/styles';
import { green, orange, red } from '@mui/material/colors';
import { lightBlue } from '@mui/material/colors';
import { esES } from '@mui/material/locale';
import { esES as dataGridEsEs } from '@mui/x-data-grid';
import { esES as coreEsEs } from '@mui/material/locale';
// Create a theme instance.
export const yardTheme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        main: '#19A7CE',
      },
      secondary: {
        main: '#146C94',
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
        main: '#AFD3E2'
      },
      alternate:{
        main: '#F6F1F1'
      }
    },
    typography:{
        fontFamily:['monospace','arial'],
    } 
  },
  esES,
  dataGridEsEs,
  coreEsEs
);
