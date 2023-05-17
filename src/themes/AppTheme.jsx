import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

// import { primeTheme } from './prime';
import {yardTheme} from './yard'


// eslint-disable-next-line react/prop-types
export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ yardTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}
