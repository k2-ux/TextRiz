import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
  me: any | null;
  results: any[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  me: null,
  results: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadMeRequest: state => {
      state.loading = true;
    },
    loadMeSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.me = action.payload;
    },

    searchUsersRequest: (state, action: PayloadAction<{ email: string }>) => {
      state.loading = true;
      state.error = null;
      state.results = [];
    },

    searchUsersSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.results = action.payload;
    },

    // ✅ ADD THIS
    searchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.results = [];
    },
  },
});

export const {
  loadMeRequest,
  loadMeSuccess,
  searchUsersRequest,
  searchUsersSuccess,
  searchUsersFailure, // 👈 export it
} = usersSlice.actions;

export default usersSlice.reducer;
