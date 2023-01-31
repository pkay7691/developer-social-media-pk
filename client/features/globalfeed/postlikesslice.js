import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// this fetches all products from the database
export const asyncFetchPostLikes = createAsyncThunk("fetchPostLikes", async () => {
  try {

    const { data } = await axios.get('/api/postlike');
    console.log(data)
    return data


  } catch (error) {
    console.log(error);
  }
});




const postLikesSlice = createSlice({
  name: "postlikes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchPostLikes.fulfilled, (state, action) => {
      return action.payload
    });
  },
});

export const selectPostLikes = (state) => {
  return state.postlikes;
};


export default postLikesSlice.reducer;
