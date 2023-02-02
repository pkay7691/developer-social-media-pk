import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField, Badge } from '@mui/material';
import { asyncDeleteComment, asyncFetchComments, selectComments } from './commentslice';
import { asyncCreateCommentLike, asyncDeleteCommentLike } from './commentlikeslice'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


/**
 * COMPONENT
 */
const Comments = ({ feedItem }) => {


  const [commentRender, setCommentRender] = useState(false)

  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.me)

  const allComments = useSelector(selectComments);

  // Searches Comments API for comments pertaining to this specific post
  const postComments = allComments && allComments.length ? allComments.filter(comment => feedItem.id === comment.postId) : null



  // Deletes comment by ID... manipulates commentRender state to render Component
  const handleDeleteComment = (id) => {
    dispatch(asyncDeleteComment(id));
    setCommentRender(!commentRender)
  }

  const handleCreateCommentLike = (commentId) => {
    const newCommentLike = {
      commentId: commentId,
      userId: user.id
    }
    dispatch(asyncCreateCommentLike(newCommentLike))
    setCommentRender(!commentRender)
  }

  const handleDeleteCommentLike = (id) => {
    dispatch(asyncDeleteCommentLike(id))
    setCommentRender(!commentRender)

  }
  
  
const commentLikeButton = (comment) => {
  let commentLikes = comment.comment_likes
  if (commentLikes && commentLikes.length) {
     const userCommentLike = commentLikes.filter((like) => like.userId === user.id);
     if (!!userCommentLike) {
      console.log("delet like")
      return  <ThumbUpAltIcon onClick={(e) => handleDeleteCommentLike(userCommentLike[0].id)} /> 
     }
  }
  console.log("create like")
  return <ThumbUpOffAltOutlinedIcon onClick={(e) => handleCreateCommentLike(comment.id)} />


  
}


  useEffect(() => {
    console.log("fetching Comments")
    dispatch(asyncFetchComments())
    
  }, [commentRender])








  return (
    <div>
      {postComments && postComments.length ?
        postComments.map((comment) => (
          <Box key={`post-comment-${comment.id}`} className='border'>
            <div className='flex flex-row'>
              <Avatar src={comment.user.img_url} />
              <div>{comment.user.first_name} {comment.user.last_name}</div>
            </div>

            <div>{comment.text_field}</div>
           
            <Badge badgeContent={comment.comment_likes && comment.comment_likes.length ? comment.comment_likes.length : null }>
            {commentLikeButton(comment)}
            </Badge>
            <DeleteOutlineOutlinedIcon onClick={(e) => handleDeleteComment(comment.id)} />
          </Box>

        )) :
        <Box>
        </Box>
      }
    </div>
  );
};

export default Comments;
