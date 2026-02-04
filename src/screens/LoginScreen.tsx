import React from 'react';
import { View, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../auth/auth.slice';
import { RootState } from '../store/root.reducer';
import styles from '../styles/style';

const LoginScreen = ({ onRegisterPress }: { onRegisterPress: () => void }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onLogin = () => {
    dispatch(
      loginRequest({
        email: 'test@example.com',
        password: 'pass123',
      }),
    );
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Textriz</Text>

      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={onLogin}
        disabled={loading}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button title="Create account" onPress={onRegisterPress} />
    </View>
  );
};

export default LoginScreen;
