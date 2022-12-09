import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom';
import NavBar from './NavBar';
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
import CreateWorkout from './CreateWorkout'
import FetchingUserWorkouts from './FetchingUserWorkouts';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { getUserLinks } from '../store/links';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import QRCode from "react-qr-code";
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';
import _ from 'lodash';

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
  bottom: '5px',
  width: '96%',
  maxWidth: '500px',
  margin: 'auto',
  left: '2%',
  right: '2%',
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24,
};

const drawerBleeding = 56;

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const workouts = useSelector(state => state.workout)
  const links = useSelector(state => state.links)
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  let hasWorkouts = (_.isEmpty(workouts))

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      dispatch(getUserLinks(user.id))
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
    <Container maxWidth="sm" disableGutters>
      <NavBar />
      <Box sx={{ pt: 1, mb:0, px: 2, bgcolor: 'background.default' }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {user.name}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleOpen}  size="small"
              sx={{ ml: 2 }}>
              <MoreVertIcon/>
            </IconButton>
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
                      <Box
                        sx={{
                          backgroundColor: 'divider',
                          paddingInline: '25px',
                          paddingBlock: '5px',
                          borderRadius: '10px',
                          width: "fit-content",
                          margin: 'auto',
                          marginBottom: '10px'
                        }}
                      >
                        <Typography variant="subtitle2" align='center'>Your public link</Typography>
                        <Link href={`/${user.username}`} target="_blank" rel="noopener" underline="hover" align='center'>onlygains.org/{user.username}<LaunchIcon sx={{marginBlock: '-8px', fontSize: '23px', marginLeft: '5px'}}/></Link>
                      </Box>
                      <QRCode
                        size={150}
                        value="https://www.onlygains.com"
                        style = {{marginInline: 'auto', marginBottom: '10px' }}
                      />
                      <Divider />
                      <CreateWorkout />
                      <Divider />
                      <NavLink to={`/user/${user.id}/account-info`} style={{textDecoration:"none", margin:"auto"}}>
                        <Button variant="text" startIcon={<ManageAccountsIcon/>}>Account Info</Button>
                      </NavLink>
                      <Divider />
                      <NavLink to={`/user/${user.id}/edit-links`} style={{textDecoration:"none", margin:"auto"}}>
                        <Button variant="text" startIcon={<InsertLinkIcon/>}>Edit Links</Button>
                      </NavLink>
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
      {hasWorkouts
        ? <Box display='flex' justifyContent='center' alignItems='center' height='50vh'>
            <Typography display='flex' color='text.secondary'>Create workouts by tapping <MoreVertIcon/> icon</Typography>
          </Box>
        : null
      }
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
          {Object.values(links).map((value) => {
            const regex = /\/\/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g;
            const mached = value?.link.match(regex)
            return (
              <Stack>
                <Chip
                  component="a"
                  avatar={<Avatar src={`https://icon.horse/icon/${mached}`} />}
                  label={value?.title}
                  variant="outlined"
                  clickable
                  rel="noopener noreferrer"
                  href={value?.link}
                  target="_blank"
                  sx={{
                    m: "auto",
                    my: 0.5,
                    minWidth: "90%",
                    maxWidth: "370px",
                    height: "50px"
                  }}
                />
              </Stack>
            )
          })}
        </StyledBox>
      </SwipeableDrawer>
    </Container>
  );
}
export default User;
