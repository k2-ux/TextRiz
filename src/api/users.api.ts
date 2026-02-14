import { api } from './axios';

export const fetchMeApi = () => {
  return api.get('/users/me');
};

export const fetchUserByEmailApi = (email: string) => {
  return api.get('/users/by-email', {
    params: { email },
  });
};
