import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider as StoreProvider } from 'react-redux';
import { appTheme } from './theme';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import { ConfigureStore } from './redux/Store';

const store = ConfigureStore();

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
