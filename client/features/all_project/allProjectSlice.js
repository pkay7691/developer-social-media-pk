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

//create a slice that adds a project to the database 
export const addProjectAsync = createAsyncThunk('addProject', async (project) => {
    try {
        const { data } = await axios.post('/api/project', project);
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
        });
        builder.addCase(addProjectAsync.fulfilled, (state, action) => {
            state.push(action.payload)
        });
    }
})

export const selectProjects = (state, action) => {
    return state.projects
}

export default projectsSlice.reducer;