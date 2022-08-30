import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getUserWorkouts } from '../store/workout'

function FetchingUserWorkouts(){
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  const workouts = useSelector(state => state.workout)
  const [value, setValue] = React.useState('1');
  console.log(workouts)

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
    <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
      {Object.values(workouts).map((value, index) => {
        console.log(value)
        return (
                <Tab label={value?.title} value="1" />
        )
        })}
    </TabList>
            </Box>
            <TabPanel value="1">
              Item One
            </TabPanel>
  </TabContext>
</>
)}

export default FetchingUserWorkouts;
