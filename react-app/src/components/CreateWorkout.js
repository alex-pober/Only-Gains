import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { createWorkout } from '../store/workout';

function CreateWorkout() {
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session.user?.id)

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const onCreateWorkout = async (e) => {
        e.preventDefault();
        await dispatch(createWorkout(user_id, title, notes))
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
      };

      const updateNotes = (e) => {
        setNotes(e.target.value);
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
            <Box component="form" onSubmit={onCreateWorkout}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%'
                        }}>
                <Typography variant="h5">
                Create Workout
                </Typography>
                <TextField sx={{ my: 1}}
                label="Title"
                helperText="Title of your workout"
                variant="filled"
                type="text"
                value={title}
                onChange={updateTitle}
                />
                <TextField sx={{ my: 1}}
                label="Notes"
                helperText="Some notes you want to mention about this workout"
                variant="filled"
                type="text"
                value={notes}
                onChange={updateNotes}
                />
                <Button sx={{ mx: 'auto', my: 1}} variant="contained" type='submit'>Submit</Button>
            </Box>
        </Box>
    </Modal>
    <Stack container spacing={2}>
    <Button onClick={handleOpenModal} variant="text" startIcon={<AddIcon />}>
        Create NEW Workout
    </Button>
    </Stack>
</>
)}

export default CreateWorkout;
