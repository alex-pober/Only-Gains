import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createExercise } from '../store/exercise';

function CreateExercise({day_id}){
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const dispatch = useDispatch();

  const onCreateExercise = async (e) => {
    e.preventDefault();
    await dispatch(createExercise(day_id, title, reps))
    setTitle('')
    setReps('')
  }

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

const updateReps = (e) => {
  setReps(e.target.value);
  };

return (
<Box
  component="form"
  onSubmit={onCreateExercise}
  sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      height: '100%'
      }}>
  <TextField sx={{ mr: 1}}
    required
    size="small"
    margin="dense"
    label="Exercise"
    variant="outlined"
    type="text"
    value={title}
    onChange={updateTitle}
  />
  <TextField sx={{ mr: 1}}
    size="small"
    margin="dense"
    label="Reps"
    variant="outlined"
    type="text"
    value={reps}
    onChange={updateReps}
  />
  <Button
    size="small"
    variant="text"
    type='submit'>Submit
  </Button>
</Box>
)}

export default CreateExercise;
