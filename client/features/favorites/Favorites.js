import React from 'react'
import { rmvFavorites, addToFavorites, seeFavorites,asyncAddFavorite,asyncRmvFavorite, asyncFetchFavorite} from './favoriteSlice'

import { useSelector, useDispatch } from 'react-redux'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
const Favorites = ({project}) => {
  const dispatch = useDispatch();
  //getting the state, thestates name and the array
  const collectedFavs = useSelector((state)=>state.favorite.collectedFavs)
  //should be empty
  const partOfFavs = collectedFavs.includes(project)
  console.log('part of favs 11', partOfFavs)
  console.log('Line 12',project )
  //this happens when the button is clicked
  const addingfavorite = (id) =>{
    console.log("--------------------")
    console.log(id);
    console.log("------------------")
    if(partOfFavs){
      dispatch(asyncRmvFavorite(project.id))
      
      //dispatch(asyncRmvFavorite(project))
    }else{
      // dispatch(addToFavorites(project))
      console.log('Line 20',project )
      dispatch(asyncAddFavorite(project))
    }
  }
  return (
    <>
      <BookmarkAddOutlinedIcon
      
        onClick={()=>addingfavorite(project.id)}

      />
      {partOfFavs? 'remove' : 'add'}
    </>
    
      
  )
}

export default Favorites;