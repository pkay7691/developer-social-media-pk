import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";


// this fetches all products from the database
export const asyncFetchComments = createAsyncThunk("fetchComments", async () => {
  try {

    const { data } = await axios.get('/api/comment');
    data.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
    return data


  } catch (error) {
    console.log(error);
  }
});


export const asyncCreateComment = createAsyncThunk("createComment", async (newComment) => {
  try {

    const { data } = await axios.post('/api/comment', newComment);
    return data


  } catch (error) {
    console.log(error);
  }
});

export const asyncDeleteComment = createAsyncThunk("deleteComment", async (id) => {
  try {
    const {data} = await axios.delete(`/api/comment/${id}`)
    return data

  }
  catch {
    console.log(error)

  }
})



const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchComments.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(asyncCreateComment.fulfilled, (state, action) => {
      console.log(action.payload)
    })
    builder.addCase(asyncDeleteComment.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  
    
  },
});

export const selectComments = (state) => {
  return state.comments;
};




export default commentsSlice.reducer;
