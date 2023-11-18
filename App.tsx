import React from 'react';

import {ThemeProvider} from 'styled-components/native';

import theme from './src/theme';

import Home from './src/screens/Home';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
