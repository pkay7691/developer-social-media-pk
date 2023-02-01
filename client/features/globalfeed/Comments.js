import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField, Badge } from '@mui/material';
import { asyncDeleteComment, asyncFetchComments, selectComments } from './commentslice';
import { asyncCreateCommentLike } from './commentlikeslice'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


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

  useEffect(() => {
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
            <ThumbUpOffAltOutlinedIcon onClick={(e) => handleCreateCommentLike(comment.id)} />
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
