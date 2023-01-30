import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// this fetches all products from the database
export const asyncFetchComments = createAsyncThunk("fetchComments", async () => {
  try {

    const { data } = await axios.get('/api/comment');
    return data


  } catch (error) {
    console.log(error);
  }
});




const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchComments.fulfilled, (state, action) => {
      return action.payload
    });
  },
});

export const selectComments = (state) => {
  return state.comments;
};


export default commentsSlice.reducer;
