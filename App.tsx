import 'react-native-get-random-values';
import React from 'react';

import {ThemeProvider} from 'styled-components/native';

import theme from './src/theme';

import AddAnnotation from './src/screens/AddAnnotation';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AddAnnotation />
    </ThemeProvider>
  );
}

export default App;
