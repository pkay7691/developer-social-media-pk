import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFeed, fetchGlobalFeed, fetchUserFeedById, resetGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { asyncFetchComments, selectComments } from './commentslice';
import { asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import {  Container, Stack, Avatar, FormControl, TextField, Button, Autocomplete, Box } from '@mui/material';
import FeedPost from './FeedPost';
import FeedProject from './FeedProject';
import { asyncFetchCommentLikes, selectCommentLikes } from './commentlikeslice';
import { BookSharp, ConstructionOutlined } from '@mui/icons-material';
import { asyncCreatePost } from './postslice';




/**
 * COMPONENT
 */
const GlobalFeed = ({profileId}) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  const allPostLikes = useSelector(selectPostLikes)
  const feed = useSelector(selectGlobalFeed)
  const globalFeed = feed
  const userId = useSelector((state) => state.auth.me.id);
  const userProjects = useSelector((state) => state.user.projects)

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const [url, setUrl] = useState('')
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  const url = useRef()
  const title = useRef()
  const description = useRef()

  const [pageNumber, setPageNumber] = useState(1)

  const nullProject = [{ project_name: 'You have no projects' }]

  const options = userProjects && userProjects.length ? userProjects : nullProject

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
      userId: userId,
      description: description.current,
      title: title.current,
    }
    console.log(newPost, 'new post attempt')
    if (!!inputValue && inputValue.project_name !== 'You have no projects') {
      newPost.projectId = value.id
    }
    if (!!url) {
      newPost.url = url.current
    }
    dispatch(asyncCreatePost(newPost))
    dispatch(resetGlobalFeed())
    if (pageNumber === 1) {
      const params = {
        page: pageNumber,
        limit: 10,
      } 
      dispatch(fetchGlobalFeed(params))
    } else {
      setPageNumber(1)
    }
    // setDescription('')
    // setInputValue('')
    // setValue('')
    // setTitle('')
    setUrl('')
  }



  useEffect(() => {
   
      console.log('running global feed')
      const params = {
        page: pageNumber,
        limit: 10,
      } 
      dispatch(fetchGlobalFeed(params))


    
   
  

  
  },[pageNumber])

  const observer = useRef()

  const lastFeedItemref = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {

        setPageNumber(pageNumber + 1)

      }

    }) 
    if (node) observer.current.observe(node)
    if (feed.length % 10 !== 0) {
      observer.current.disconnect()
    }

  })


 
  
  return (
    <div>
       <FormControl onSubmit={handleCreatePost} sx={{ width: 1 }}>
        <Autocomplete
          id='project-select'
          disablePortal
          value={value || null}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          getOptionLabel={(option) => option.project_name}

          renderInput={(params) => (
            <TextField
              {...params}
              label='Choose a Project'
            />

          )}
        />

        <TextField
          id='main-feed-post-title'
          placeholder='Title'
          // value={title}
          onChange={(e) => title.current = e.target.value}
          rows={1}
        />
        <TextField
          id='main-feed-post-url'
          placeholder='Url'
          // value={url}
          onChange={(e) => url.current = e.target.value}
          rows={1}
        />

        <TextField

          id={`main-feed-post-text`}
          placeholder='Comment'
          multiline
          rows={2}
          // value={description}
          onChange={(e) => description.current = e.target.value}

        />
        <Button onClick={handleCreatePost} type='submit'>Reply</Button>
      </FormControl>
      <Container maxWidth="sm">
        <Stack spacing={3}>
      {globalFeed && globalFeed.length ? (
        globalFeed.map((feedItem, index) => (
          feedItem.modelType === 'post' && (globalFeed.length === index + 1) ? 
          <div ref={lastFeedItemref} > 
          <FeedPost
          
          key={Math.floor(Math.random() * 10000)} 
          feedItem={feedItem} 
          profileId={profileId}
          />
          </div>
          : 
          
          feedItem.modelType === 'project' && (globalFeed.length === index + 1) ? 
          <div ref={lastFeedItemref}>
          <FeedProject ref={lastFeedItemref} key={Math.floor(Math.random() * 10000)} feedItem={feedItem} />
          </div>
 
            : 
          feedItem.modelType === 'post' ? 
          <FeedPost
          
          key={Math.floor(Math.random() * 10000)} 
          feedItem={feedItem} 
          profileId={profileId}
          />
          :
          feedItem.modelType === 'project' ? 
         <FeedProject key={Math.floor(Math.random() * 10000)} feedItem={feedItem} />

           : 
           
           <div key='notloaded'>hello</div>

        ))
      ) : null}
      </Stack>
      </Container>
    </div>
  );
};

export default GlobalFeed;
