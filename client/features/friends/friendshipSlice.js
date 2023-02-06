import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFriendshipsById = createAsyncThunk('friendship', async (id) =>{
    try {
        const {data} = await axios.get(`/api/friendship`);
        let friendRequests =  data.filter(friendship => friendship.friendId === id && friendship.status === 'inReview');
        return friendRequests
    }
    catch (error) {
        console.log(error);
    }
})

export const sendFriendRequest = createAsyncThunk('sendFriendRequest',  async (friendship) => {
  try {
    const { data } = await axios.post('/api/friendship', friendship)
    return data


  }
  catch (error) {

  }
})

const friendshipSlice = createSlice({
    name: 'friendship',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFriendshipsById.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
          return action.payload
      });
    }
})

export const selectFriendRequests = (state, action) => {
  return state.friendship
}

export default friendshipSlice.reducer;
