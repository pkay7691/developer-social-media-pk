import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReportUserAsync = createAsyncThunk(
    "reportUser/reportUser",
    async (report, thunkAPI) => {
        try{
            const {data} = await axios.post('/api/report', report)
            return data
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
});

const reportUserSlice = createSlice({
    name: "reportUser",
        initialState: {},
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetchReportUserAsync.fulfilled, (state, action) => {
                return action.payload
            })
        }
})

export const selectReportUser = (state, action) => {
    return state.reportUser
}

export default reportUserSlice.reducer