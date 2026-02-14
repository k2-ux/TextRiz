import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../auth/auth.slice';
import { RootState } from '../store/root.reducer';

const RegisterScreen = ({ onLoginPress }: { onLoginPress: () => void }) => {
  const dispatch = useDispatch();
  const loading = useSelector((s: RootState) => s.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    if (!email || !password) return;

    dispatch(
      registerRequest({
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
      {/* Title */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        Create Account
      </Text>

      {/* Email */}
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

      {/* Password */}
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

      {/* Register button */}
      <TouchableOpacity
        onPress={onRegister}
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
            Register
          </Text>
        )}
      </TouchableOpacity>

      {/* Login link */}
      <TouchableOpacity onPress={onLoginPress}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 14,
          }}
        >
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
