import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast, { BaseToast } from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

import { store } from './redux/store';
import Navigator from './screens/Navigator';

const toastConfig = {
  error: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'red', height: 70 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
      }}
      leadingIcon={require('../assets/icons/error.png')}
      text2Style={{
        fontSize: 12,
      }}
      text1={text1}
      text2={text2}
    />
  ),
};

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <>
        <Provider store={store}>
          <Navigator />
        </Provider>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </>
    </SafeAreaProvider>
  );
}
