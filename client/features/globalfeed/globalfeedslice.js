import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// this fetches all products from the database
export const fetchGlobalFeed = createAsyncThunk("fetchGlobalFeed", async () => {
  try {
    const { data } = await axios.get("/api/posts");
    return data;
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
  return state.globalFeed;
};


export default globalFeedSlice.reducer;
