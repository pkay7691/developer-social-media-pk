import React from 'react'
import { rmvFavorites, addToFavorites, favoriteSlice} from './favoriteSlice'

import { useSelector, useDispatch } from 'react-redux'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
const Favorites = ({id}) => {
  const dispatch = useDispatch();
  //getting the state, thestates name and the array
  const collectedFavs = useSelector((state)=>state.favorite.collectedFavs)
  console.log('After collected Fave', collectedFavs)
  //should be empty
  const partOfFavs = collectedFavs.includes(id)
  console.log("AFTER AFTER COLLECTED FAV", partOfFavs)

  //this happens when the button is clicked
  const addingfavorite = () =>{
    if(partOfFavs){
      dispatch(rmvFavorites(id))
    }else{
      dispatch(addToFavorites(id))
    }
  }
  return (
    <>
      <BookmarkAddOutlinedIcon
      onClick={addingfavorite}
      />
      {partOfFavs? 'remove' : 'add'}
    </>
    
      
  )
}

export default Favorites;