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
    console.log(project_memberships)
    console.log(posts.data);
    console.log(projects.data);
    console.log(comments.data);
    posts.data.forEach(post => globalFeed.push(post))
    projects.data.forEach(project => globalFeed.push(project))
    comments.data.forEach(comment => globalFeed.push(comment));
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
