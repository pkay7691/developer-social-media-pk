import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserAsync = createAsyncThunk('user', async (id) => {
    try {
        const {data} = await axios.get(`/api/users/${id}`);
        return data;
    } 
    catch (error) {
        console.log(error);
    }
})

//report a user
export const reportUserAsync = createAsyncThunk('reportUser', async ({report}, id) => {
    try {
        const { id, reportee, reason_for_report, message } = report;
        const reportedUser = {reportee, reason_for_report, message};
        const {data} = await axios.post(`/api/users/${id}/reportUser`, reportedUser);
        console.log('data', data)
        return data;
    } 
    catch (error) {
        console.log(error);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(reportUserAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectUser = (state, action) => {
    return state.user
}

export default userSlice.reducer