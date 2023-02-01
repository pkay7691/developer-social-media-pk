import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";


// this fetches all products from the database
export const asyncFetchCommentLikes = createAsyncThunk("fetchCommentLikes", async () => {
  try {

    const { data } = await axios.get('/api/commentlike');
    data.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
    return data


  } catch (error) {
    console.log(error);
  }
});


export const asyncCreateCommentLike = createAsyncThunk("createCommentLike", async (newCommentLike) => {
  try {

    const { data } = await axios.post('/api/commentlike', newCommentLike);
    return data


  } catch (error) {
    console.log(error);
  }
});

export const asyncDeleteCommentLike = createAsyncThunk("deleteComment", async (id) => {
  try {
    const {data} = await axios.delete(`/api/comment/${id}`)
    return data

  }
  catch {
    console.log(error)

  }
})



const commentLikesSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchCommentLikes.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(asyncCreateCommentLike.fulfilled, (state, action) => {
      console.log(action.payload)
    })
    builder.addCase(asyncDeleteCommentLike.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  
    
  },
});

export const selectComments = (state) => {
  return state.commentlikes;
};




export default commentLikesSlice.reducer;
