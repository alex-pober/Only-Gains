import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AccountInfo(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateName = (e) => {
    setName(e.target.value);
  };
  const updateBio = (e) => {
    setBio(e.target.value)
  }

  return (
  <>
    <AppBar color='primary' position="sticky">
      <ToolBar>
      <Typography sx={{ flexGrow: 1 }}>Edit Account Info</Typography>
      <Button variant="contained">Save</Button>
      </ToolBar>
    </AppBar>
    <Box component="form">
      <Stack>
        <TextField label="Username" variant="outlined" margin="normal"
          type='text'
          value={username}
          onChange={updateUsername}/>
        <TextField label="Email" variant="outlined" margin="normal"
          type='text'
          value={email}
          onChange={updateEmail}/>
        <TextField label="Display Name" variant="outlined" margin="normal" required
          type='text'
          value={name}
          onChange={updateName}/>
        <TextField label="Bio" variant="outlined" margin="normal"
          type='text'
          value={bio}
          onChange={updateBio}/>
      </Stack>
    </Box>
  </>
  )
}

export default AccountInfo;
