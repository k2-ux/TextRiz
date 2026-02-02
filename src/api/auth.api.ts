import { api } from './axios';
import { LoginPayload } from '../auth/auth.types';

export const refreshTokenApi = (refreshToken: string) => {
  return api.post('/auth/refresh', {
    refreshToken,
  });
};

export const loginApi = (payload: LoginPayload) => {
  return api.post('/auth/login', payload);
};
