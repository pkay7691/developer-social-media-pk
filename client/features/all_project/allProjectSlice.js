import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProjectAsync = createAsyncThunk('project', async () => {
    try {
        const { data } = await axios.get('/api/project');
        return data;
    }
    catch (error) {
        console.log(error);
    }
})

const projectsSlice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProjectAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectProjects = (state, action) => {
    return state.projects
}

export default projectsSlice.reducer;