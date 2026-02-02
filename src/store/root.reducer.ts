import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/auth.slice';
import chatReducer from '../chat/chat.slice';
import { logout } from '../auth/auth.slice';

const appReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
export default rootReducer;
