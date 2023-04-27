import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  apiData: {},
  loading: true,
  success: false,
  error: 'No error',
};

export const getTasks = createAsyncThunk('/getTasks', async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios('http://localhost:3001/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response.statusText;
  }
});

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = 'No error';
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = 'No error';
      state.apiData = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export default fetchSlice.reducer;
