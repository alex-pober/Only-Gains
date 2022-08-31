import React, { useState, useEffect } from 'react';
import { createTrainingDay } from '../store/days';
import { useSelector, useDispatch } from 'react-redux'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';


function CreateDayModal({workout_id}) {
 const [openModal, setOpenModal] = React.useState(false);
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const dispatch = useDispatch();

 const handleOpenModal = () => setOpenModal(true);
 const handleCloseModal = () => setOpenModal(false);

 const onCreateTrainingDay = async (e) => {
    e.preventDefault();
    await dispatch(createTrainingDay(workout_id, title, description))
    setTitle('')
    setDescription('')
    setOpenModal(false)
}

const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

 const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '40%',
    bgcolor: 'background.paper',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  };

return (
<>
    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Box component="form" onSubmit={onCreateTrainingDay}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%'
                        }}>
                <Typography variant="h5">
                Add training day
                </Typography>
                <TextField sx={{ my: 1}}
                label="Day"
                helperText="Ex: Day 1, Push, Pull, etc."
                variant="filled"
                type="text"
                value={title}
                onChange={updateTitle}
                />
                <TextField sx={{ my: 1}}
                label="Description"
                helperText="Ex: Chest/Tris/Shoulder, Rest Day, etc."
                variant="filled"
                type="text"
                value={description}
                onChange={updateDescription}
                />
                <Button sx={{ mx: 'auto', my: 1}} variant="contained" type='submit'>Submit</Button>
            </Box>
        </Box>
    </Modal>
    <Stack container spacing={2}>
    <Button onClick={handleOpenModal} sx={{ my: 0, mx: 8 }} variant="outlined" startIcon={<AddIcon />}>
        Add training day
    </Button>
    </Stack>
</>
    )
}
export default CreateDayModal;
