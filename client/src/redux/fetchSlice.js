import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    apiData: [],
    loading: true,
    success: false,
    error: "No errors"
}


export const getTasks = createAsyncThunk('/getTasks', async () => {
    const res = await axios('https://localhost:3001/api/tasks' , {
        auth:`bearer`
    });
    console.log(res);
    return res.data;
})


 const fetchSlice = createSlice({
    name: fetch,
    initialState,
    reducers: {},
    extraReducers:  {
        [getTasks.pending]: (state) => {
            return { ...state }
        },
        [getTasks.fulfilled]: (state, action) => {
            return { ...state, loading: false, success: true, apiData: action.payload }
        },
        [getTasks.rejected]: (state, action) => {
            return { ...state, loading: true, success: false, error: action.payload }
        }
    }
})
 
export default fetchSlice.reducer;







