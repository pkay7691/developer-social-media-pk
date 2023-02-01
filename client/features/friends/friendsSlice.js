// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchFriendsAsync = createAsyncThunk('friends', async (id) =>{
//     try {
//         const {data} = await axios.get(`/api/users/${id}`);
//         return data;
//     }
//     catch (error) {
//         console.log(error);
//     }
// })

// const friendsSlice = createSlice({
//     name: 'friends',
//     initialState: {},
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchFriendsAsync.fulfilled, (state, action) => {
//             return action.payload
//         })
//     }
// })

// export default friendsSlice.reducer;