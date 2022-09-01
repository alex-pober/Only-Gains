import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {getTrainingDays} from '../store/days'
import {getExercises} from '../store/exercise'
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CreateExercise from './CreateExcercise';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';

function FetchingUserExercises({day_id}){
  const dispatch = useDispatch();
  const exercises = useSelector(state => state.exercises)
  let filter = _.filter(exercises, {'day_id': day_id})

  useEffect(() => {
    dispatch(getExercises(+day_id))
  }, [+day_id])

return (
  <TableContainer component={Paper}>
    <Table size="small" aria-label="a dense table">
      <TableBody>
        {Object.values(filter).map((value, index) => {
          return (
            <TableRow key={value?.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{value?.title}</TableCell>
              <TableCell align="right">{value?.reps}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </TableContainer>
)}

export default FetchingUserExercises
