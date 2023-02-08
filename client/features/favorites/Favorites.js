import React from 'react'
import { rmvFavorites, addToFavorites } from './favoriteSlice'
import { useSelector, useDispatch } from 'react-redux'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
const Favorites = ({fav}) => {
  const dispatch = useDispatch();
  //getting the state, thestates name and the array
  const collections = useSelector(state => state.favorites.collectedFavs)
  console.log('After collected Fave', collectedFavs)
  const partOfFavs = collections.includes(fav)

  //this happens when the button is clicked
  const addingfavorite = () =>{
    if(partOfFavs.length === 0 || partOfFavs === '' || partOfFavs === null){
      return(
        <div>
          'There are No Favorites'
        </div>
      )
    }else if(partOfFavs){
      dispatch(addToFavorites(fav))
      dispatch(rmvFavorites(fav))
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