/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {ThemeProvider} from 'styled-components/native';

import {SafeAreaView, Text, View} from 'react-native';
import theme from './src/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View>
          <Text>Hello World</Text>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
