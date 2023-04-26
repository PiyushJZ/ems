import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    apiData: [],
    loading: true,
    success: false,
    error: "No errors"
}

let auth = localStorage.getItem('auth');

export const getTasks = createAsyncThunk('/getTasks', async () => {
    const res = await axios('http://localhost:3001/api/tasks', {
        headers: {
            Authorization: `Bearer ${auth}`
        }
    });
    console.log(res.data);
    return res;
})


const fetchSlice = createSlice({
    name: fetch,
    initialState,
    reducers: {},
    extraReducers: {
        [getTasks.pending]: (state) => {
            state
        },
        [getTasks.fulfilled]: (state, action) => {
            console.log(action);
            state.loading = false
            state.success = true
            state.apiData = action.payload.data
        },
        [getTasks.rejected]: (state, action) => {
            state.loading = true
            state.success = false
            state.apiData = action.payload
        }
    }
})


export default fetchSlice.reducer;







