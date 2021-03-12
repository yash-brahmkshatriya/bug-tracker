import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { appTheme } from './theme';
import { CssBaseline } from '@material-ui/core';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <MainComponent />
    </ThemeProvider>
  );
}

export default App;
