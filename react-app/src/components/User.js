import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Chip from '@mui/material/Chip';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import CreateDayModal from './CreateDayModal';
import CreateWorkout from './CreateWorkout'
import FetchingUserWorkouts from './FetchingUserWorkouts';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  // const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

const openMenu = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};

  return (
    <>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {user.username}
            </Typography>
          </Grid>
          <Grid item>
            {/* <Typography gutterBottom variant="h6" component="div">
              side
            </Typography> */}
            <MoreVertIcon
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
          </MoreVertIcon>
          <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                Edit Info
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <LinkIcon fontSize="small" />
                </ListItemIcon>
                Edit Links
              </MenuItem>
            </Menu>

          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {user.bio}
          <Divider variant="middle" sx={{ my: 0 }}> <Button onClick={toggleDrawer(true)}>My Links</Button> </Divider>
        </Typography>
          {/* <IconButton color="primary" aria-label="upload picture" component="label">
            <EditIcon fontSize="large"/>
          </IconButton> */}
      </Box>
      {/* ------------ MODAL SECTION START ------------ */}
      <FetchingUserWorkouts />
      <CreateWorkout />
      <CreateDayModal />
      {/* ------------ MODAL SECTION END ------------ */}


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
          <Typography sx={{ p: 2, color: 'text.secondary' }}>Links</Typography>
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
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}
export default User;
