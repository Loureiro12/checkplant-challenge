import 'react-native-get-random-values';
import React from 'react';

import {ThemeProvider} from 'styled-components/native';

import theme from './src/theme';
import {RealmProvider} from './src/libs/realm/index';

import {Routes} from './src/routes';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <RealmProvider>
        <Routes />
      </RealmProvider>
    </ThemeProvider>
  );
}

export default App;
