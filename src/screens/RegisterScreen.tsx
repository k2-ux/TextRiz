import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../auth/auth.slice';
import { RootState } from '../store/root.reducer';

const RegisterScreen = ({ onLoginPress }: { onLoginPress: () => void }) => {
  const dispatch = useDispatch();
  const loading = useSelector((s: RootState) => s.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    dispatch(
      registerRequest({
        email,
        password,
      }),
    );
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? 'Registering...' : 'Register'}
        onPress={onRegister}
        disabled={loading}
      />

      <Button title="Already have account? Login" onPress={onLoginPress} />
    </View>
  );
};

export default RegisterScreen;
