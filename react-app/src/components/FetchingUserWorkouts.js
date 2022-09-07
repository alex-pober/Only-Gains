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


function FetchingUserWorkouts(){
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  useEffect(() => {
    dispatch(getUserWorkouts(user?.id))
  }, [dispatch])
  const workouts = useSelector(state => state.workout)
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

return (
<>
  <TabContext value={value}>
    <Tabs centered warapped variant="scrollable" sx={{minHeight: "0px"}} value={value} onChange={handleChange} unmountOnExit>
      {Object.values(workouts).map((value, index) => {
        return (
          <Tab label={value?.title} value={index} />
        )
        })}
    </Tabs>
    {Object.values(workouts).map((value, index) => {
        return (
          <TabPanel value={index} sx={{ p: 0, bgcolor: 'background.default'}}>
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
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Slide direction="up" in={open}>
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
                      Notes
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                      {value?.notes}
                    </Typography>
                  </Box>
                </Box>
              </Slide>
            </Modal>
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
                      <Button onClick={handleClose} autoFocus>
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
