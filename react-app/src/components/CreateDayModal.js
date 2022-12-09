import React, { useState } from 'react';
import { createTrainingDay } from '../store/days';
import { useDispatch } from 'react-redux'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

function CreateDayModal({workout_id}) {
 const [openModal, setOpenModal] = useState(false);
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
    height: 'auto',
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
    <Accordion disableGutters>
        <AccordionSummary expandIcon={<Chip onClick={handleOpenModal} icon={<AddIcon />} label="Add" size='small' variant='outlined' color='success'/>}>
            <Typography sx={{ width: '33%', flexShrink: 0, color: 'action.disabled' }}>
            Day...
            </Typography>
            <Typography sx={{color: 'action.disabled'}}>Description...</Typography>
            {/* <Chip onClick={handleOpenModal}
                startIcon={<AddIcon />}
                label="Add"
            /> */}
        </AccordionSummary>
    </Accordion>
    {/* <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        <Chip onClick={handleOpenModal}
            startIcon={<AddIcon />}
            label="Add new workout"
        />
        <Chip onClick={handleOpenModal}
            variant="outlined"
            deleteIcon={<DeleteIcon />}
            label="Delete Workout"
        />
    </Stack> */}
</>
    )
}
export default CreateDayModal;
