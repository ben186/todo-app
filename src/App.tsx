import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { ViewStyle } from 'react-native';
import { registerRootComponent } from 'expo';

import AppNavigator from './navigators/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider style={$root} initialMetrics={initialWindowMetrics}>
      <StatusBar style='dark'/>
      <AppNavigator/>
    </SafeAreaProvider>
  );
}

export default App;

registerRootComponent(App);

const $root: ViewStyle = {
  backgroundColor: '#DCDCDC'
}