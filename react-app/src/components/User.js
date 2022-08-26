import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextareaAutosize';
import { flexbox } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

import Chip from '@mui/material/Chip';

import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';

function User(props) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const { window } = props;
  const [open, setOpen] = React.useState(false);
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

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));



  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {user.username}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              side
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {user.bio}
        </Typography>
          {/* <IconButton color="primary" aria-label="upload picture" component="label">
            <EditIcon fontSize="large"/>
          </IconButton> */}
      </Box>
      <Divider variant="middle"> <Button onClick={toggleDrawer(true)}>My Links</Button> </Divider>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
                    <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
                    <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
                    <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
                    <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
                    <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
                    <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
                    <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}
export default User;
