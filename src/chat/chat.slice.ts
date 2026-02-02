import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  senderId: string;
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messageReceived(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    clearChat() {
      return initialState;
    },
    sendMessageRequest(_state, _action) {
      // saga trigger only
    },
  },
});

export const { messageReceived, clearChat, sendMessageRequest } =
  chatSlice.actions;
export default chatSlice.reducer;
