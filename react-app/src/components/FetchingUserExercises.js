import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux'
import {getExercises} from '../store/exercise'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

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
              <TableCell component="th" scope="row"><Link underline="none" rel="noopener noreferrer" target="_blank" href={`http://images.google.com/images?um=1&hl=en&safe=active&nfpr=1&q=${value?.title}`}>{value?.title}</Link></TableCell>
              <TableCell align="right">{value?.reps}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </TableContainer>
)}

export default FetchingUserExercises
