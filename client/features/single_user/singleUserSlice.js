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
});

export const editUser = createAsyncThunk( 'editUser ', async (updateUser)=>{
    try{
        const id = updateUser.id
        const {data} = await axios.put(`/api/users/${id}`,{
            first_name: updateUser.first_name,
            last_name: updateUser.last_name,
            img_url:updateUser.img_url,
            email: updateUser.email,
            about_me: updateUser.about_me,
            skill_level:updateUser.skill_level
        })
         return data
    }catch(err){
        console.log(err)
    }
  });

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectUser = (state, action) => {
    return state.user
}

export default userSlice.reducer
