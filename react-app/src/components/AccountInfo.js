import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AccountInfo(){
  const { userId }  = useParams();
  const [user, setUser] = useState({});
  const userState = useSelector(state => state.session.user)
  const [username, setUsername] = useState(userState.username);
  const [email, setEmail] = useState(userState.email);
  const [name, setName] = useState(userState.name);
  const [bio, setBio] = useState(userState.bio);
  const [btnDisabled, setBtnDisabled] = useState(true)
  console.log(userState)

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

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  return (
  <>
    <AppBar color='primary' position="sticky">
      <ToolBar>
      <Typography sx={{ flexGrow: 1 }}>Edit Account Info</Typography>
      <Button variant="contained" disabled={btnDisabled}>Save</Button>
      </ToolBar>
    </AppBar>
    <Box component="form">
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
