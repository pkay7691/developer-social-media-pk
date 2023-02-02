import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// this fetches all products from the database
export const fetchGlobalFeed = createAsyncThunk("fetchGlobalFeed", async () => {
  try {
    const globalFeed = []
    const posts = await axios.get("/api/post");
    const projects = await axios.get('/api/project');
    const comments = await axios.get('/api/comment')
    const project_memberships = await axios.get('/api/projectmembership')
    posts.data.forEach(post => globalFeed.push(post))
    projects.data.forEach(project => globalFeed.push(project))
    globalFeed.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
    return globalFeed




  } catch (error) {
    console.log(error);
  }
});

export const fetchUserFeedById = createAsyncThunk("fetchGlobalFeed", async (id) => {
  try {
    const globalFeed = []
    const posts = await axios.get("/api/post");
    const projects = await axios.get('/api/project');
    const comments = await axios.get('/api/comment')
    const project_memberships = await axios.get('/api/projectmembership')
    userPosts = posts.data.filter((post) => userId === id)
    posts.data.forEach(post => globalFeed.push(post))
    projects.data.forEach(project => globalFeed.push(project))
    globalFeed.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
    return globalFeed




  } catch (error) {
    console.log(error);
  }
});




const globalFeedSlice = createSlice({
  name: "globalFeed",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalFeed.fulfilled, (state, action) => {
      return action.payload
    });
  },
});

export const selectGlobalFeed = (state) => {
  return state.globalfeed;
};


export default globalFeedSlice.reducer;
