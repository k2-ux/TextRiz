import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from './chat.types';

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
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

export const { messageReceived, clearChat, sendMessageRequest } =
  chatSlice.actions;
export default chatSlice.reducer;
