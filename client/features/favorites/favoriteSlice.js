import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";

  //fetches all favorite projects 
  export const asyncFetchFavorite = createAsyncThunk('fetchFavorites', async()=>{
    try {
        const { data } = await axios.get('/api/favorites');
        console.log('favorite Axio Call', data)
        return data;
    } catch (error) {
        console.log(error)
    }
  });
  export const asyncAddFavorite = createAsyncThunk("addFavorite", async (myFavorite) => {
    try {
  
      const { data } = await axios.post('/api/favorites', myFavorite);
      return data;
    } catch (error) {
      console.log(error);
    }
  });
  export const asyncRmvFavorite = createAsyncThunk("removeFavorite", async (id) => {
    try {
      const {data} = await axios.delete(`/api/favorites/${id}`)
      return data;
    }
    catch {
      console.log(error)
    }
  })

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        collectedFavs: [],
        loading: false,
        error: null
    },
    reducers:{
      //add a new reducer
        seeFavorites:(state, action) => {
          state.loading = false
          state.collectedFavs = action.payload
        },
        addToFavorites:(state, action)=>{
            state.collectedFavs.push(action.payload);
        },
        rmvFavorites:(state, action)=>{
            state.collectedFavs = state.collectedFavs.filter(fav => fav !== action.payload)
            state.collectedFavs.shift(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(asyncFetchFavorite.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(asyncAddFavorite.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        builder.addCase(asyncRmvFavorite.fulfilled, (state, action) => {
            console.log(action.payload)
        })
    }
});

export const {rmvFavorites, addToFavorites,seeFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;