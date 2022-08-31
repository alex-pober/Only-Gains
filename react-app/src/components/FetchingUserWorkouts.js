import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getUserWorkouts } from '../store/workout'

import CreateDayModal from './CreateDayModal';
import FetchingUserTrainingDays from './FetchingUserTrainingDays';

function FetchingUserWorkouts(){
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  const workouts = useSelector(state => state.workout)
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getUserWorkouts(user?.id))
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

return (
<>
  <TabContext value={value}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={value} onChange={handleChange} variant="scrollable">
      {Object.values(workouts).map((value, index) => {
        return (
                <Tab label={value?.title} value={index} />
        )
        })}
    </Tabs>
  </Box>
    {Object.values(workouts).map((value, index) => {
        return (
          <TabPanel value={index} sx={{ p: 0}}>
            <FetchingUserTrainingDays workout_id={value?.id}/>
            <CreateDayModal workout_id={value?.id} />
            {value?.notes}
          </TabPanel>
        )
        })}
  </TabContext>
</>
)}

export default FetchingUserWorkouts;
