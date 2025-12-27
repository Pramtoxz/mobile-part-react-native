import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
