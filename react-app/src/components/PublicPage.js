import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FetchingUserTrainingDays from './FetchingUserTrainingDays';
import Backdrop from '@mui/material/Backdrop';
import Slide from '@mui/material/Slide';
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Global } from '@emotion/react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

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
  position: "relative",
  width: '96%',
  top: '40%',
  left: '2%',
  right: '2%',
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24,
  padding: '20px'
};

const drawerBleeding = 56;

export default function PublicPage() {
  let { userName } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState({})
  const [links, setLinks] = useState([])
  const [workouts, setWorkouts] = useState()
  const [open, setOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState(false)
  const [value, setValue] = useState("0");

  useEffect(() => {
    (async () => {
      const responseUser = await fetch(`/api/auth/${userName}`);
      const user = await responseUser.json();
      setUser(user)
      const responseLinks = await fetch(`/api/links/${user?.id}`)
      const links = await responseLinks.json();
      setLinks(links.links)
      const responseWorkouts = await fetch(`/api/workouts/${user?.id}`)
      const workouts = await responseWorkouts.json();
      setWorkouts(workouts.workout)
      setLoaded(true)
    })();
  }, [userName]);

  // useEffect(() => {
  //   (async () => {
  //     workouts?.map(({id}) => {return console.log(id)})
  //   })();
  // }, [workouts])

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  return (!loaded)
  ?
  <Box sx={{ display: 'flex', justifyContent: "center", marginBlock: "45vh"}}>
    <CircularProgress size='5rem'/>
  </Box>

  :
  <Container maxWidth="sm" disableGutters>
    <Box sx={{ pt: 1, mt:1, px: 4, bgcolor: 'background.default' }}>
      <Grid item xs>
        <Typography gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{mb:"11px", mr: 8}}>
          {user.bio}
        </Typography>
      </Grid>
      <Divider variant="middle" sx={{ my: 0 }}><Button onClick={toggleDrawer(true)}>My Links</Button></Divider>
    </Box>

    <TabContext value={value}>
      <Box display="flex" justifyContent="center" width="100%">
        <Tabs value={value} onChange={(e, newValue) => {setValue(newValue)}} scrollButtons="auto" >
          {workouts?.map(({title, id}, index) => {
            return <Tab key={id} label={title} value={index.toString()} />})}
        </Tabs>
      </Box>

      {workouts?.map(({title, id, notes}, index) => {
        return (
        <TabPanel key={id} value={index.toString()} sx={{p: 0, mb:"60px", bgcolor: 'background.default'}} >
            <FetchingUserTrainingDays workout_id={id}/>
  {/* \/\/\/\/\/\/\/\/\/\/\/\/SEE NOTES POPUP BELOW \/\/\/\/\/\/\/\/\/\/\/\/ */}
              <Box textAlign='center'>
                <Button onClick={() => setOpenNotes(true)} startIcon={<KeyboardArrowUpIcon />} endIcon={<KeyboardArrowUpIcon />}
                  align='center'
                >See Notes
                </Button>
              </Box>
              <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openNotes}
                onClose={() => setOpenNotes(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                PaperProps={{
                  style: {
                    backgroundColor: 'Transparent',
                    backgroundImage: 'none',
                    margin: '0px',
                  },
                }}
              >
              <Slide direction="up" in={openNotes}>
                <DialogContent sx={{width: '100%', padding: "0px"}}>
                  <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 'auto',
                        minWidth: '300px'
                        }}>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        {title}
                      </Typography>
                      <IconButton onClick={() => setOpenNotes(false)} right='true'>
                        <CloseIcon/>
                      </IconButton>
                    </Box>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }} paragraph>
                      {notes}
                    </Typography>
                  </Box>
                </DialogContent>
              </Slide>
              </Dialog>
        </TabPanel>
        )
      })}



    </TabContext>


    <Global
      styles={{
        '.MuiDrawer-root > .MuiPaper-root': {
          height: `calc(50% - 56px)`,
          overflow: 'visible'
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
            const regex = /\/\/([^,\s]+\.[^,\s]+?)(?=\/|,|\s|$|\?|#)/g;
            const mached = value?.link.match(regex)
            return (
              <Stack key={value.id}>
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
}
