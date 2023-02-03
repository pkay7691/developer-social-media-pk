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
    globalFeed.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    return globalFeed




  } catch (error) {
    console.log(error);
  }
});

export const fetchUserFeedById = createAsyncThunk("fetchUserFeed", async (id) => {
  try {
    const userFeed = []
    const posts = await axios.get("/api/post");
    const user = await axios.get(`/api/users/${id}`)
    console.log('posts in fetchuserfeed', posts)
    console.log('this is user in fetchuserfeed', user)
    const userPosts = posts.data.filter(post => post.userId == id)
    console.log('userposts in fetchuserfeed', userPosts)
    userPosts.forEach(post => userFeed.push(post))
    user.data.projects.forEach(project => userFeed.push(project) )
    userFeed.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
    console.log('user feed', userFeed)
    return userFeed



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
    builder.addCase(fetchUserFeedById.fulfilled, (state, action) => {
      return action.payload
    });
  },
});

export const selectGlobalFeed = (state) => {
  return state.globalfeed;
};


export default globalFeedSlice.reducer;
