import { api } from './axios';

export const fetchMeApi = () => {
  return api.get('/users/me');
};

export const getUserByIdApi = (userId: string) => {
  return api.get(`/users/${userId}`);
};
