import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from './chat.types';

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messageReceived(state, action: PayloadAction<ChatMessage>) {
      const exists = state.messages.find(m => m.id === action.payload.id);
      if (!exists) {
        state.messages.unshift(action.payload);
      }
    },
    loadHistoryRequest(state) {
      state.loading = true;
    },
    loadHistorySuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    loadHistoryFailure(state) {
      state.loading = false;
    },

    clearChat(state) {
      state.messages = [];
    },
    sendMessageRequest(
      state,
      action: PayloadAction<{
        id: string;
        text: string;
        senderId: string;
        createdAt: Date;
        toUserId: string;
      }>,
    ) {},
  },
});

export const {
  messageReceived,
  clearChat,
  sendMessageRequest,
  loadHistoryFailure,
  loadHistoryRequest,
  loadHistorySuccess,
} = chatSlice.actions;
export default chatSlice.reducer;
