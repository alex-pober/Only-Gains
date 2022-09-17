import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {editProfile} from '../store/session'

function AccountInfo(){
  const { userId }  = useParams();
  const [user, setUser] = useState({});
  const userState = useSelector(state => state.session.user)
  const [username, setUsername] = useState(userState.username);
  const [email, setEmail] = useState(userState.email);
  const [name, setName] = useState(userState.name);
  const [bio, setBio] = useState(userState.bio);
  const [btnDisabled, setBtnDisabled] = useState(true)
  const dispatch = useDispatch();

  const updateUsername = (e) => {
    setUsername(e.target.value);
    setBtnDisabled(!e.target.value.trim());
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
    setBtnDisabled(!e.target.value.trim());
  };
  const updateName = (e) => {
    setName(e.target.value);
    setBtnDisabled(!e.target.value.trim());
  };
  const updateBio = (e) => {
    setBio(e.target.value)
    setBtnDisabled(!e.target.value.trim());
  }

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);


  const onEditProfile = async (e) => {
    e.preventDefault();
    const data = {
      id: userState.id,
      username,
      email,
      name,
      bio
    }
    dispatch(editProfile(data))
  }

  return (
  <>
    <AppBar color='primary' position="sticky">
      <ToolBar>
      <Typography sx={{ flexGrow: 1 }}>Edit Account Info</Typography>
      <Button type='submit' variant="contained" disabled={btnDisabled} onClick={onEditProfile}>Save</Button>
      </ToolBar>
    </AppBar>
    <Box>
      <Stack sx={{m:3}}>
        <TextField label="Display Name" variant="outlined" margin="normal" required
          type='text'
          value={name}
          onChange={updateName}/>
        <TextField label="Username" variant="outlined" margin="normal"
          type='text'
          value={username}
          onChange={updateUsername}/>
        <TextField label="Email" variant="outlined" margin="normal"
          type='text'
          value={email}
          onChange={updateEmail}/>
        <TextField label="Bio" variant="outlined" margin="normal"
          type='text'
          value={bio}
          onChange={updateBio}
          multiline
          />
      </Stack>
    </Box>
  </>
  )
}

export default AccountInfo;
