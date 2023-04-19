import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    updateList: (state, action) => {
      state.tasks = action.payload;
    },
    clearList: (state) => {
      state.tasks = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList, clearList } = taskListSlice.actions;

export default taskListSlice.reducer;
