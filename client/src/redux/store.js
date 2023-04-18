import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskListReducer from './taskListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    taskList: taskListReducer,
  },
});
