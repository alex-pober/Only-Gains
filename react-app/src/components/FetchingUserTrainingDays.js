import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {getTrainingDays} from '../store/days'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function FetchingUserTrainingDays({workout_id}){
  const dispatch = useDispatch();
  const trainingDays = useSelector(state => state.days)
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getTrainingDays(+workout_id))
  }, [+workout_id])

return (workout_id == undefined) ? (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', my: 'auto', minHeight: '350px' }}>
    <CircularProgress/>
  </Box>
) : (
<Box sx={{mx: 0}}>
    {Object.values(trainingDays).map((value, index) => {
      return (
        <>
          <Accordion expanded={expanded === index} onChange={handleChange(index)}>
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
          <AccordionDetails>
            <Typography>
              {value?.description}
            </Typography>
          </AccordionDetails>
          </Accordion>
        </>
      )
    })}
</Box>
)
}

export default FetchingUserTrainingDays;
