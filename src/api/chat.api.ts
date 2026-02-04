import { api } from './axios';

export const fetchChatHistoryApi = (otherUserId: string) => {
  return api.get(`/chat/history/${otherUserId}`);
};
