import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
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

  if (!user) {
    return null;
  }


  return (
    <Container maxWidth="lg">
      <Paper elevation={1}
      sx={{
        marginTop: "25px",
        display: 'flex',
        justifyContent: 'center',
        top: '50%'
      }}
      >
        <Avatar
          justifyContent="center"
          alignItems="center"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 128, height: 128}}
        />
        <Stack
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography variant="h3" gutterBottom>
          {user.username}
          </Typography>
          <Typography variant="h5" /*sx={{marginRight: 15.5}}*/>
            Classic Physique Mr. Olympia x3🇨🇦
            Owner: @cbumfitness & @getrawnutrition
            @Revive_MD @YoungLA
            MEGAFIT MEALS BUM BOX👇🏼
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
export default User;
