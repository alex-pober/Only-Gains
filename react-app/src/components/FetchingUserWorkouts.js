import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { getUserWorkouts } from '../store/workout'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CreateDayModal from './CreateDayModal';
import FetchingUserTrainingDays from './FetchingUserTrainingDays';
import Accordion from '@mui/material/Accordion';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteOneWorkout } from '../store/workout';
import { updateOneWorkout } from '../store/workout';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

const style = {
  position: "relative",
  width: '96%',
  top: '40%',
  left: '2%',
  right: '2%',
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24
};


function FetchingUserWorkouts(){
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  useEffect(() => {
    dispatch(getUserWorkouts(user?.id))
  }, [dispatch])
  const workouts = useSelector(state => state.workout)
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [notes, setNotes] = React.useState()
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditing(false)
  }
  const handleEditing = (notes) => {
    setEditing(true);
    setNotes(notes)
  }

  const submitNotesEdit = async (e, id, title) => {
    e.preventDefault();
    const workout = {
      id: id,
      title,
      notes
    }
    dispatch(updateOneWorkout(workout))
    setOpen(false)
    setEditing(false)
  }
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  useEffect(() => {
    setValue(Object.values(workouts)[0]?.id)
  }, [Object.values(workouts)[0]?.id])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateNotes = (e) => {
    setNotes(e.target.value)
  }

  const handleDeleteWorkout = (id) => {
    dispatch(deleteOneWorkout(id))
    setValue(Object.values(workouts)[0]?.id)
    handleCloseDelete()
  }

return (
<>
  <TabContext value={value}>
    <Box display="flex" justifyContent="center" width="100%">
      <Tabs value={value} onChange={handleChange} scrollButtons="auto" wrapped unmountOnExit>
        {Object.values(workouts).map((value, index) => {
          return (
            <Tab label={value?.title} value={value?.id} />
          )
          })}
      </Tabs>
    </Box>
    {Object.values(workouts).map((value, index) => {
        return (
          <TabPanel value={value?.id} sx={{p: 0, bgcolor: 'background.default'}} unmountOnExit>
            <FetchingUserTrainingDays workout_id={value?.id}/>
            <CreateDayModal workout_id={value?.id} />
            <Accordion>
              <Box textAlign='center'>
                <Button onClick={handleOpen} startIcon={<KeyboardArrowUpIcon />} endIcon={<KeyboardArrowUpIcon />}
                  align='center'
                >See Notes
                </Button>
              </Box>
            </Accordion>
            <Dialog
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
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
              <Slide direction="up" in={open}>
              <DialogContent sx={{width: '100%'}}>
                <Box sx={style}>
                  <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                      height: 'auto'
                      }}>
                    <IconButton onClick={handleClose} right sx={{
                        position: 'absolute',
                        p: 3,
                        m: 'auto'
                        }}>
                      <CloseIcon/>
                    </IconButton>
                  </Box>
                  <Box component='form' onSubmit={(e) => submitNotesEdit(e, value?.id, value?.title)} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: 'auto',
                            p: 2
                            }}
                  >
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Notes <IconButton sx={{padding: "3px"}} onClick={() => handleEditing(value?.notes)}> <EditIcon sx={{display: "block"}} fontSize='small'/> </IconButton>
                    </Typography>
                    {editing
                      ? <TextField type='text' sx={{width: "310px", my: 2}}size="large" multiline value={notes} onChange={updateNotes}></TextField>
                      : <Typography id="transition-modal-description" sx={{ mt: 2 }} paragraph>
                          {value?.notes}
                        </Typography>
                    }
                    {editing
                      ? <Button type='submit' variant="contained">Update</Button>
                      : <></>
                    }
                  </Box>
                </Box>
              </DialogContent>
              </Slide>
            </Dialog>
              <Box
                sx={{
                  position: 'absolute',
                  textAlign: 'center',
                  bottom: "70px",
                  left: '10%',
                  right: '10%',
                  zIndex: '-1'
                  }}
              >
                <Chip onClick={handleClickOpenDelete} size='small' label={`Delete '${value?.title}'`} variant='outlined' color='error'/>
                <Dialog
                  open={openDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {`Delete '${value?.title}'?`}
                  </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This will delete the entire plan and all the days and exercises associated with it.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDelete}>Cancel</Button>
                      <Button onClick={() => handleDeleteWorkout(value?.id)} autoFocus>
                        Delete
                      </Button>
                    </DialogActions>
                </Dialog>
              </Box>
          </TabPanel>
        )
        })}
  </TabContext>
</>
)}

export default FetchingUserWorkouts;
