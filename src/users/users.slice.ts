import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
}

interface UsersState {
  me: User | null;
  results: User[];
  loading: boolean;
}

const initialState: UsersState = {
  me: null,
  results: [],
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadMeRequest(state) {
      state.loading = true;
    },
    loadMeSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.me = action.payload;
    },

    searchUsersRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    searchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.results = action.payload;
    },
  },
});

export const {
  loadMeRequest,
  loadMeSuccess,
  searchUsersRequest,
  searchUsersSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
