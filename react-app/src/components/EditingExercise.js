import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function EditingExercise({exercise}){
  const [openModal, setOpenModal] = React.useState(false);
  const [title, setTitle] = useState(exercise.title);
  const [reps, setReps] = useState(exercise.reps);
  const dispatch = useDispatch();
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateReps = (e) => {
    setReps(e.target.value);
  };

  const onEditExercise = async (e) => {
    e.preventDefault();

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  };

  return(
    <>
    <IconButton sx={{padding: "3px"}} onClick={handleOpenModal}>
      <EditIcon sx={{display: "block"}} fontSize='small'/>
    </IconButton>

    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Box component="form" onSubmit={onEditExercise}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%'
                        }}>
                <Typography variant="h5">
                Edit Exercise
                </Typography>
                <TextField sx={{ my: 1}}
                label="Exercise"
                variant="outlined"
                type="text"
                value={title}
                onChange={updateTitle}
                />
                <TextField sx={{ my: 1}}
                label="Reps"
                variant="outlined"
                type="text"
                value={reps}
                onChange={updateReps}
                />
                <Stack direction="row" justifyContent='center' spacing={5} sx={{ mt: 1}}>
                  <Button variant="text" color="error" type='submit'>Delete</Button>
                  <Button variant="contained" type='submit'>Update</Button>
                </Stack>
            </Box>
        </Box>
    </Modal>
    </>
  )
}

export default EditingExercise;