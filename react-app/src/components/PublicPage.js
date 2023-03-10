import React, { useState, useEffect } from 'react'
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
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FetchingUserTrainingDays from './FetchingUserTrainingDays';
import Backdrop from '@mui/material/Backdrop';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import LinkStack from './LinksStack/LinkStack';
import DescriptionIcon from '@mui/icons-material/Description';

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


  return (!loaded)
    ?
    <Box sx={{ display: 'flex', justifyContent: "center", marginBlock: "45vh" }}>
      <CircularProgress size='5rem' />
    </Box>

    :
    <Container maxWidth="sm" disableGutters>
      <Box sx={{ pt: 1, mt: 1, px: 4, bgcolor: 'background.default' }}>
        <Grid item xs>
          <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mb: "11px", mr: 8 }}>
            {user.bio}
          </Typography>
        </Grid>

        {/* <Divider variant="middle" sx={{ my: 0 }}><Button onClick={toggleDrawer(true)}>My Links</Button></Divider> */}
      </Box>

      <TabContext value={value} sx={{ position: 'relative' }}>
        <Box display="flex" justifyContent="center" width="100%">
          <Tabs value={value} onChange={(e, newValue) => { setValue(newValue) }} scrollButtons="auto" >
            {workouts?.map(({ title, id }, index) => {
              return <Tab key={id} label={title} value={index.toString()} />
            })}
          </Tabs>
        </Box>

        {workouts?.map(({ title, id, notes }, index) => {
          return (
            <TabPanel key={id} value={index.toString()} sx={{ p: 0, mb: "60px", bgcolor: 'background.default' }} >
              <FetchingUserTrainingDays workout_id={id} />
              {/* \/\/\/\/\/\/\/\/\/\/\/\/SEE NOTES POPUP BELOW \/\/\/\/\/\/\/\/\/\/\/\/ */}
              <Box textAlign='center' sx={{ m: 2, mb: '96px' }}>
                <Button size="small" variant="contained" onClick={() => setOpenNotes(true)}
                  align='center' sx={{ alignItems: 'flex-end' }}
                >See Notes{<DescriptionIcon sx={{ ml: 0.5 }} />}
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
                  <DialogContent sx={{ width: '100%', padding: "0px" }}>
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
                          <CloseIcon />
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

      {links.length > 0 &&
        <LinkStack data={links} />
      }

    </Container>
}
