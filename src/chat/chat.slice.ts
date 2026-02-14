import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from './chat.types';

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  isTyping: boolean;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  isTyping: false,
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
    loadHistoryRequest: (
      state,
      action: PayloadAction<{ otherUserId: string }>,
    ) => {
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
    typingStarted(state) {
      state.isTyping = true;
    },
    typingStopped(state) {
      state.isTyping = false;
    },
  },
});

export const {
  messageReceived,
  clearChat,
  sendMessageRequest,
  loadHistoryFailure,
  loadHistoryRequest,
  loadHistorySuccess,
  typingStarted,
  typingStopped,
} = chatSlice.actions;
export default chatSlice.reducer;
