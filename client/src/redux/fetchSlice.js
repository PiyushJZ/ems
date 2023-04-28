import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { FETCH_WRAPPER } from '../api';

const initialState = {
  tasks: [],
  loading: true,
  success: false,
  error: 'No error',
};

export const getTasks = createAsyncThunk('/getTasks', async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await FETCH_WRAPPER.get('tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tasks;
  } catch (err) {
    return err.response.statusText;
  }
});

export const clearList = createAction('clearList');
export const updateList = createAction('updateList');

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
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(clearList, (state) => {
      state.loading = true;
      state.success = false;
      state.error = 'No error';
      state.tasks = [];
    });
    builder.addCase(updateList, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = 'No error';
      state['tasks'] = action.payload;
    });
  },
});

export default fetchSlice.reducer;
