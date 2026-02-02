import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';

import { store } from './src/store';
import { RootState } from './src/store/root.reducer';
import LoginScreen from './src/screens/LoginScreen';
import { rehydrateRequest, logout } from './src//auth/auth.slice';
import styles from './src/styles/style';
import { socketConnect, socketDisconnect } from './src/socket/socket.events';
import { watchAppState } from './src/utils/app.lifecycle';
import { sendMessageRequest } from './src/chat/chat.slice';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = watchAppState(
      () => dispatch(socketConnect()),
      () => dispatch(socketDisconnect()),
    );

    return () => {
      dispatch(socketDisconnect());
      unsubscribe();
    };
  }, [dispatch]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    dispatch(rehydrateRequest());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Welcome to Textriz</Text>
      <Button
        title="Send Test Message"
        onPress={() =>
          dispatch(
            sendMessageRequest({
              id: Date.now().toString(),
              text: 'hello from textriz',
              senderId: 'me',
            }),
          )
        }
      />

      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
