import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchGlobalFeed,  selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField, FormControl } from '@mui/material';
import { sizing } from '@mui/system';
import Comments from './Comments';
import PostLikes from './PostLikes';
import { asyncCreateLike, asyncDeleteLike, asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import { asyncCreateComment, asyncFetchComments } from './commentslice';
import { asyncFetchCommentLikes } from './commentlikeslice';
import { asyncDeletePost, asyncFetchPosts, asyncUpdatePost } from './postslice';
import { HighlightOff } from '@mui/icons-material';
import { fetchUserFeedById } from './userfeedslice';

/**
 * COMPONENT
 */
const FeedPost = ({feedItem, renderPostLikes, setRenderPostLikes, renderComments, setRenderComments, profileId}) => {

const [likeButton, setLikeButton] = useState('')
const [edit, setEdit] = useState(false)

const [text_field, setText_field] = useState(feedItem.description)
const [title, setTitle] = useState(feedItem.title)
const [url, setURL] = useState(feedItem.url)
 
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch()
  const postLikes = useSelector(selectPostLikes)

  // searches Post Like api for post like with matching userId and Post Id
  const postLikeCheck = postLikes && postLikes.length ? postLikes.filter(postLike => postLike.userId === user.id && postLike.postId === feedItem.id) : null

  


  
   


// Checks if post is liked and manipulates like button text
  useEffect(() => {
    if (postLikeCheck && postLikeCheck.length) {
      setLikeButton('Unlike')   
    } else {
      setLikeButton('Like')
    }
    },[dispatch])

  // if Post like Check returns a post like.. it will dispatch asyncDeleteLike.  If it doesn't return a post like, it will create a like
  // dispatch the Createlike with user and post Id
  const handlePostLike = (userId, postId) => {

      const like = {
        userId: userId,
        postId: postId,
        compositeId: `${userId}&${postId}`
      }
      dispatch(asyncCreateLike(like))
      dispatch(fetchGlobalFeed())
      dispatch(asyncFetchPostLikes())
      dispatch(asyncFetchPosts())

    }
  

  const handleDeleteLike = (userId, postId) => {
    let id = postLikeCheck[0].id;
    dispatch(asyncDeleteLike(id))
    dispatch(fetchGlobalFeed())
    dispatch(asyncFetchPostLikes())
    dispatch(asyncFetchPosts())
    
  }




  // creates new comment and alters commentrender state to render component
  const handleCreateComment = (e) => {
    e.preventDefault();
    const newComment = {
      userId: user.id,
      postId: feedItem.id,
      text_field: text_field,
    }
    dispatch(asyncCreateComment(newComment))
    if(!!profileId) {
      dispatch(fetchUserFeedById(profileId))
    } else dispatch(fetchGlobalFeed());
    setText_field('')
    dispatch(asyncFetchComments())
  }

  const handleDeletePost = (e) => { 
    e.preventDefault();
    dispatch(asyncDeletePost(feedItem.id))
    if(!!profileId) {
      dispatch(fetchUserFeedById(profileId))
    } else dispatch(fetchGlobalFeed());
    dispatch(asyncFetchComments())
  }

  //!FIXME: handleEditPost does not rerender the feed.
  const handleEditPost = (e) => {
    e.preventDefault();
    setEdit(true)
  }
  
  return (
    <div>
            <Box className='border'>
              {feedItem.userId === user.id ? <HighlightOff onClick={handleDeletePost} /> : null}
              <div className='flex flex-row'> 
              {/*users can update their own posts*/}
              {feedItem.userId === user.id ? <Button onClick={handleEditPost}>Edit</Button> : null}
              {edit ? <FormControl>
                <TextField
                id="outlined-multiline-static"
                label="Edit Title"
                rows={4}
                defaultValue={feedItem.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Edit URL"
                rows={4}
                defaultValue={feedItem.url}
                onChange={(e) => setURL(e.target.value)}
              />
                <TextField
                  id="outlined-multiline-static"
                  label="Edit Post"
                  multiline
                  rows={4}
                  defaultValue={feedItem.description}
                  onChange={(e) => setText_field(e.target.value)}
                />
                <Button onClick={() => {
                  const updatedPost = {
                    id: feedItem.id,
                    title: title,
                    url: url,
                    description: text_field,
                    userId: feedItem.userId,
                    projectId: feedItem.projectId
                  }
                  console.log(updatedPost, 'this is updated post in handleEditPost')
                  dispatch(asyncUpdatePost(updatedPost))
                  if(!!profileId) {
                    dispatch(fetchUserFeedById(profileId))
                  } else dispatch(fetchGlobalFeed());
                  setEdit(false)
                }}>Submit</Button>
              </FormControl> : null}
               <Link to={`/users/${feedItem.userId}`}> <Avatar src={feedItem.user.img_url} /> </Link>
                {feedItem.project && feedItem.project.project_name ?
                <div>
                 <Link to={`/users/${feedItem.userId}`}><div>{feedItem.user.first_name} {feedItem.user.last_name} </div> </Link>
                 <Link to={`/projects/${feedItem.projectId}`}><div>{feedItem.project.project_name}</div></Link>
                 </div> : <Link to={`/users/${feedItem.userId}`}><div>{feedItem.user.first_name} {feedItem.user.last_name} </div></Link> }
                
                
              </div>
             
              <div>{feedItem.title}</div>
              <div>{feedItem.url}</div>
              <div>{feedItem.description}</div>
              <PostLikes feedItem={feedItem}  />
              <ButtonGroup variant='outlined' aria-label='outlined button group' sx={{ width: 1 }}>
                {postLikeCheck && postLikeCheck.length ? <Button onClick={(e) => handleDeleteLike(user.id, feedItem.id)} sx={{ width: 1/3 }}>Unlike</Button> 
                :
                 <Button onClick={(e) => handlePostLike(user.id, feedItem.id)} sx={{ width: 1/3 }}>Like</Button>}
                  <Button sx={{ width: 1/3 }}>Comment</Button>
                  <Button  sx={{ width: 1/3 }}>Share</Button>
                </ButtonGroup>
            </Box>
            <Comments feedItem={feedItem} renderComments={renderComments} setRenderComments={setRenderComments}/> 
            <FormControl onSubmit={handleCreateComment} sx={{ width: 1 }}>
            <TextField
            
          id={`commentbox-${feedItem.id}`}
          placeholder='Comment'
          multiline
          rows={2}
          value={text_field}
          onChange={(e) => setText_field(e.target.value)} 
          
        />
        <Button onClick={handleCreateComment} type='submit'>Reply</Button>
        </FormControl>
        
    </div>
  );
};

export default FeedPost;
