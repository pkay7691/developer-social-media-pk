import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllUsers = createAsyncThunk('users', async () => {
    try {
        const {data} = await axios.get("/api/users");
        return data;
    } catch (error) {
        console.log(error);
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled,(state,action) => {
            return action.payload;
        });
    },
});

export const selectUsers = (state) => {
    return state.users;
}

export default usersSlice.reducer;