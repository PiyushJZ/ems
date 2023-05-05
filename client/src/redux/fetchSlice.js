import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { FETCH_WRAPPER } from '../api';

const initialState = {
  tasks: [],
  notes: [],
  loading: true,
  success: false,
  error: 'No error',
};

// fetching notes
export const getNotes = createAsyncThunk('/getNotes', async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await FETCH_WRAPPER.get('notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data.notes;
  } catch (err) {
    return err.response.statusText;
  }
});

// fetching Tasks
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
export const updateNote = createAction('updateNote');
export const editNote = createAction('editNote');

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
    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = 'No error';
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = 'No error';
      state.notes = action.payload;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase('editNote', (state, action) => {
      state.loading = false;
      state.success = true;
      state.notes = action.payload;
    });
    builder.addCase('updateNote', (state, action) => {
      state.loading = false;
      state.success = true;
      state.notes = action.payload;
    });
  },
});

export default fetchSlice.reducer;
