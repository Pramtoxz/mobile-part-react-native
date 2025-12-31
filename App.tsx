import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

function App() {
  useEffect(() => {
    // Ignore specific warnings
    LogBox.ignoreLogs([
      'InteractionManager has been deprecated',
    ]);
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
