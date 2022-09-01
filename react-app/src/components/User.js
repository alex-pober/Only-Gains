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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

const style = {
  position: 'absolute',
  top: '50%',
  width: '96%',
  left: '2%',
  right: '2%',
  height: '40%',
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24,
};

const drawerBleeding = 56;

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
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
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);



const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};

  return (
    <>
      <Box sx={{ pt: 1, mb:0, px: 2, bgcolor: 'background.default' }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {user.username}
            </Typography>
          </Grid>
          <Grid item>
            <MoreVertIcon
            onClick={handleOpen}
            size="small"
            sx={{ ml: 2 }}
          >
          </MoreVertIcon>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Slide direction="up" in={openModal}>
                  <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        width: '100%'
                        }}>
                      <IconButton onClick={handleClose} right sx={{
                          position: 'absolute',
                          p: 3,
                          m: 'auto'
                          }}>
                        <CloseIcon/>
                      </IconButton>
                    </Box>
                    <Box  sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              height: 'auto',
                              p: 3
                              }}
                    >
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        Dashboard
                      </Typography>
                      <CreateWorkout />
                      <Divider />
                    </Box>
                  </Box>
                </Slide>
              </Modal>
            </div>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {user.bio}
        </Typography>

        <Divider variant="middle" sx={{ my: 0 }}><Button onClick={toggleDrawer(true)}>My Links</Button></Divider>
      </Box>
      {/* ------------ MODAL SECTION START ------------ */}
      <FetchingUserWorkouts />
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
