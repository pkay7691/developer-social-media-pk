
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChat = createAsyncThunk('fetchChat', async ({userId, otherId}) => {
  try{
    console.log(userId, otherId)
    const { data } = await axios.get('/api/message')
   const chat = data.filter((message) => (message.senderId === userId && message.receiverId === otherId) || (message.senderId === otherId && message.receiverId === userId) )

    chat.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
    return chat
    
    

  }
  catch(error) {
    console.log(error)
  }
})

const messageSlice = createSlice({
    name: 'message',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChat.fulfilled, (state, action) => {
            return action.payload
        });
    }
})

export const selectChat = (state) => {
    return state.message;
};

export default messageSlice.reducer;
