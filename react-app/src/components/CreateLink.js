import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { createLink } from '../store/links';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';

function CreateLink(){
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch()
  const user_id = useSelector(state => state.session.user.id);


  const onCreateLink = async (e) => {
    e.preventDefault();
    await dispatch(createLink(user_id, title, url))
    setTitle('')
    setUrl('')
  }

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

const updateUrl = (e) => {
  setUrl(e.target.value);
  };

  return (
      <Paper elevation={4} sx={{maxWidth: '55%', padding: '10px', display:"flex", flexDirection: "column", alignItems: "center", margin: 'auto', borderRadius: '10px'}}>
      <Typography variant="h6">Create New Link</Typography>
          <TextField
            type="text"
            value={title}
            onChange={updateTitle}
            label="Title"
            size="small"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end"><EditIcon fontSize='small'/></InputAdornment>,
            }}
          />
          <TextField
            type="text"
            value={url}
            onChange={updateUrl}
            label="Url"
            size="small"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end"><EditIcon fontSize='small'/></InputAdornment>,
            }}
          />
          <Button onClick={onCreateLink} sx={{my: 1}} rginTop variant="contained" endIcon={<AddIcon/>}>Add New Link</Button>
      </Paper>
  )
}

export default CreateLink;
