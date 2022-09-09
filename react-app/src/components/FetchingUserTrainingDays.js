import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {getTrainingDays} from '../store/days'
import {getExercises} from '../store/exercise'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CreateExercise from './CreateExcercise';
import FetchingUserExercises from './FetchingUserExercises';

function FetchingUserTrainingDays({workout_id}){
  const dispatch = useDispatch();
  const trainingDays = useSelector(state => state.days)
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (workout_id === undefined){
      return;
    }
    dispatch(getTrainingDays(+workout_id))
  }, [+workout_id])

return (workout_id == undefined) ? (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mt: '20vh', minHeight: '100vh' }}>
    <CircularProgress/>
  </Box>
) : (
<Box sx={{mx: 0}}>
    {Object.values(trainingDays).map((value, index) => {
      return (
          <Accordion expanded={expanded === index} onChange={handleChange(index)} TransitionProps={{ unmountOnExit: true }} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {value?.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{value?.description}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{p:1, marginTop: "-18px"}}>
            <FetchingUserExercises day_id={value?.id}/>
            <CreateExercise day_id={value?.id}/>
          </AccordionDetails>
          </Accordion>
      )
    })}
</Box>
)
}

export default FetchingUserTrainingDays;
