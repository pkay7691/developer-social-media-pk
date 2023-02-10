import React from 'react'
import { rmvFavorites, addToFavorites, seeFavorites,asyncAddFavorite,asyncRmvFavorite, asyncFetchFavorite} from './favoriteSlice'

import { useSelector, useDispatch } from 'react-redux'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
const Favorites = ({project}) => {
  const dispatch = useDispatch();
  //getting the state, thestates name and the array
  const collectedFavs = useSelector((state)=>state.favorite.collectedFavs)
  //should be empty
  const user = useSelector((state)=> state.auth.me)
  console.log("LINE 11----------",project)
  const partOfFavs = collectedFavs.includes(project)
  //this happens when the button is clicked
  const addingfavorite = (project) =>{
    if(partOfFavs){
      dispatch(asyncRmvFavorite(project.id))  
      
    }else{
      // const userInfo = {
      //   projectId: project.id,
      //   userId: user.Id,
      //   compositeId: `${user.Id}&${project.id}`
      // }

      //added replaced project with favInfo to see if information will be added to db
      dispatch(asyncAddFavorite(project))
    }
  }
  return (
    <>
      <BookmarkAddOutlinedIcon
      
        onClick={()=>addingfavorite(project)}

      />
      {partOfFavs? 'remove' : 'add'}
    </>
    
      
  )
}

export default Favorites;