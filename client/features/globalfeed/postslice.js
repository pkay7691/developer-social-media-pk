import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// this fetches all posts from the database
export const asyncFetchPosts = createAsyncThunk("fetchPosts", async () => {
  try {

    const { data } = await axios.get('/api/post');
    return data


  } catch (error) {
    console.log(error);
  }
});

export const asyncCreatePost = createAsyncThunk('createPost', async (newPost) => {
  const {data } = await axios.post('/api/post', newPost);
  return data

})


export const asyncDeletePost = createAsyncThunk('deletePost', async (id) => {

  console.log(id, 'id in api call')
  const {data} = await axios.delete(`/api/post/${id}`)
  return data


})



const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchPosts.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(asyncCreatePost.fulfilled, (state, action) => {
      state.push(action.payload)
    });
    builder.addCase(asyncDeletePost.fulfilled, (state, action) => {
      return action.payload
    });
  },
});

export const selectPostLikes = (state) => {
  return state.posts;
};


export default postsSlice.reducer;
