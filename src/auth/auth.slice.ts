import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, LoginPayload } from './auth.types';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ FIX IS HERE
    registerRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout() {
      return initialState;
    },
    rehydrateRequest(state) {
      // no state change, just a trigger
    },

    rehydrateSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  rehydrateRequest,
  rehydrateSuccess,
  registerRequest,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
