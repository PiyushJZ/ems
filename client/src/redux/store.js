import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fetchReducer from "./fetchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fetch: fetchReducer,
  },
});
