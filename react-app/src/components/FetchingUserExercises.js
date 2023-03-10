import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux'
import { getExercises, clearAllExercises } from '../store/exercise'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import EditingExercise from './EditingExercise.js'
import { useParams } from 'react-router-dom'
import Grow from '@mui/material/Grow';
import LinearProgress from '@mui/material/LinearProgress';

function FetchingUserExercises({ day_id }) {
  const tableRef = useRef()
  const dispatch = useDispatch();
  let { userId } = useParams()
  const exercises = useSelector(state => state.exercises)
  const user = useSelector(state => state.session.user)
  let filter = _.filter(exercises, { 'day_id': day_id })
  let ordered = _.orderBy(filter, ['id'], ['asc'])
  let heightEst = (ordered.length * 33.02)
  useEffect(() => {
      dispatch(getExercises(+day_id))
      setTimeout(() => {
        tableRef.current.scrollIntoView({block: 'end', behavior: 'smooth'})}, 500)

        return(() => clearTimeout())
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TableContainer component={Paper} sx={{minHeight: heightEst}} ref={tableRef}>
      {(ordered.length === 0) && <LinearProgress />}
      <Table size="small" aria-label="a dense table">
          <TableBody id="table-exercises">
            {Object.values(ordered).map((value, index) => {
              return (
                <Grow in={true} key={value?.id} unmountOnExit>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell component="th" scope="row"><Link underline="none" rel="noopener noreferrer" target="_blank" href={`http://images.google.com/images?um=1&hl=en&safe=active&nfpr=1&q=${value?.title}`}>{value?.title}</Link></TableCell>
                    <TableCell align="right">{value?.reps}</TableCell>
                    <TableCell align='right' padding='none'>
                      {+userId === user?.id && <EditingExercise exercise={value} />}
                    </TableCell>
                  </TableRow>
                </Grow>
              )
            })}
          </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FetchingUserExercises
