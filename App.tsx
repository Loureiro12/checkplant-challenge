import 'react-native-get-random-values';
import React from 'react';

import {ThemeProvider} from 'styled-components/native';

import theme from './src/theme';

import {Routes} from './src/routes';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
