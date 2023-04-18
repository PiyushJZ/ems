import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default authSlice.reducer;
