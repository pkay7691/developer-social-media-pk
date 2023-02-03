import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjectAsync = createAsyncThunk('project', async (id) => {
    try {
        const {data} = await axios.get(`/api/project/${id}`);
        return data;
    }
    catch (error) {
        console.log(error);
    }
})

const projectSlice = createSlice({
    name: 'project',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProjectAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectProject = (state, action) => {
    return state.project
}

export default projectSlice.reducer;