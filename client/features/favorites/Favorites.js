import React from 'react'
import { rmvFavorites, addToFavorites, seeFavorites} from './favoriteSlice'

import { useSelector, useDispatch } from 'react-redux'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
const Favorites = ({project}) => {
  const dispatch = useDispatch();
  //getting the state, thestates name and the array
  const collectedFavs = useSelector((state)=>state.favorite.collectedFavs)
  //should be empty
  const partOfFavs = collectedFavs.includes(project)

  //this happens when the button is clicked
  const addingfavorite = () =>{
    if(partOfFavs){
      dispatch(rmvFavorites(project))
    }else{
      dispatch(addToFavorites(project))
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