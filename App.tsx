import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { store } from './src/store';
import { RootState } from './src/store/root.reducer';
import LoginScreen from './src/screens/LoginScreen';
import { rehydrateRequest, logout } from './src//auth/auth.slice';
import styles from './src/styles/style';
import { socketConnect, socketDisconnect } from './src/socket/socket.events';
import { watchAppState } from './src/utils/app.lifecycle';
import { sendMessageRequest } from './src/chat/chat.slice';
import ChatScreen from './src/screens/ChatScreen';
import RegisterScreen from './src/screens/RegisterScreen';

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
  const [showRegister, setShowRegister] = useState(false);

  if (!isAuthenticated) {
    return showRegister ? (
      <RegisterScreen onLoginPress={() => setShowRegister(false)} />
    ) : (
      <LoginScreen onRegisterPress={() => setShowRegister(true)} />
    );
  }

  return <ChatScreen />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
