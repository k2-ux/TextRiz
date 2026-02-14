import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../auth/auth.slice';
import { RootState } from '../store/root.reducer';

const LoginScreen = ({ onRegisterPress }: { onRegisterPress: () => void }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!email || !password) {
      return;
    }

    dispatch(
      loginRequest({
        email,
        password,
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#ffffff',
      }}
    >
      {/* App title */}
      <Text
        style={{
          fontSize: 32,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        Textriz
      </Text>

      {/* Email input */}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          fontSize: 15,
          color: '#000',
        }}
      />

      {/* Password input */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          marginBottom: 20,
          fontSize: 15,
          color: '#000',
        }}
      />

      {/* Login button */}
      <TouchableOpacity
        onPress={onLogin}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#999' : '#000',
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '500',
            }}
          >
            Login
          </Text>
        )}
      </TouchableOpacity>

      {/* Error message */}
      {error ? (
        <Text
          style={{
            color: '#d32f2f',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          {error}
        </Text>
      ) : null}

      {/* Register link */}
      <TouchableOpacity onPress={onRegisterPress}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 14,
          }}
        >
          Create account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
