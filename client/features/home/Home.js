import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom'
import GlobalFeed from '../globalfeed/GlobalFeed';
import { fetchGlobalFeed } from '../globalfeed/globalfeedslice';
import { asyncFetchComments } from '../globalfeed/commentslice';
import { asyncFetchPostLikes } from '../globalfeed/postlikesslice';
import { asyncFetchCommentLikes } from '../globalfeed/commentlikeslice';
import { FormControl, TextField, Button, Autocomplete, Box } from '@mui/material';
import { fetchUserAsync } from '../single_user/singleUserSlice';
import { asyncCreatePost } from '../globalfeed/postslice';



/**
 * COMPONENT
 */

const Home = (props) => {
  const router = useLocation();
  const userId = useSelector((state) => state.auth.me.id);
  const userProjects = useSelector((state) => state.user.projects)
  const feed = useSelector((state) => state.globalfeed)
  const nullProject = [{ project_name: 'You have no projects' }]
  const dispatch = useDispatch()

  const options = userProjects && userProjects.length ? userProjects : nullProject


  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
      userId: userId,
      description: description,
      title: title,
    }
    console.log(value)
    if (!!inputValue && inputValue.project_name !== 'You have no projects') {
      newPost.projectId = value.id
    }
    if (!!url) {
      newPost.url = url
    }
    dispatch(asyncCreatePost(newPost))
    dispatch(fetchGlobalFeed())
    setDescription('')
    setInputValue('')
    setValue('')
    setTitle('')
    setUrl('')
  }


useEffect(() => {
  console.log('logging Router', router)
  if(router.search.token){
    const TOKEN = 'token'
    window.localStorage.setItem(TOKEN, router.search.token)
    dispatch(me())
  }
  dispatch(fetchUserAsync(userId))
  dispatch(fetchGlobalFeed())
  dispatch(asyncFetchPostLikes())
  dispatch(asyncFetchComments())

},[])





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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={1}
        />
        <TextField
          id='main-feed-post-url'
          placeholder='Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          rows={1}
        />

        <TextField

          id={`main-feed-post-text`}
          placeholder='Comment'
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}

        />
        <Button onClick={handleCreatePost} type='submit'>Reply</Button>
      </FormControl>
      <GlobalFeed />
    </div>
  );
};

export default Home;
