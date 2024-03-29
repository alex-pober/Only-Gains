import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getTrainingDays } from '../store/days'
import { useParams } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import CreateExercise from './CreateExcercise';
import FetchingUserExercises from './FetchingUserExercises';

function FetchingUserTrainingDays({ workout_id }) {
  let { userId } = useParams()
  const dispatch = useDispatch();
  const trainingDays = useSelector(state => state.days)
  const user = useSelector(state => state.session.user)
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  useEffect(() => {
    if (workout_id !== undefined) {
      dispatch(getTrainingDays(+workout_id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workout_id])

  return (
    <Box sx={{ mx: 0 }}>
      {Object.values(trainingDays).map((value, index) => {
        return (
          <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)} TransitionProps={{ unmountOnExit: true }} disableGutters >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1bh-content"
              id={`panel1bh-header-${index}`}
            >
              <Typography sx={{ width: '37%', flexShrink: 0 }}>
                {value?.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{value?.description}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1, marginTop: "-18px" }}>
              <FetchingUserExercises day_id={value?.id} />
              {+userId === user?.id && <CreateExercise day_id={value?.id} />}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}

export default FetchingUserTrainingDays;
