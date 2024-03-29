import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { getUserLinks, deleteOneLink } from '../store/links';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreateLink from './CreateLink';
import DeleteIcon from '@mui/icons-material/Delete';

function LinkManager(){
  const userState = useSelector(state => state.session.user)
  const links = useSelector(state => state.links)
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserLinks(userState.id))
  }, [])

  const onDeleteLink = (id) => {
    dispatch(deleteOneLink(id))
  }

  return (
  <>
   <AppBar position="sticky">
    <ToolBar>
      <IconButton onClick={() => {history.push(`/user/${userState?.id}`)}}>
        <ArrowBackIosIcon />
     </IconButton>
      <Typography sx={{ flexGrow: 1 }}>Links Manger</Typography>
    </ToolBar>
  </AppBar>


  {/* IF links object is empty */}
  {Object.keys(links).length === 0


  // TRUE render this <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  ? <Typography
      variant="subtitle1"
      align="center"
      sx={{
        padding: "10%",
        color: "text.secondary"
      }}
    >
      Create your first link by filling out the form below and clicking "Add New Link" button
    </Typography>


  // FALSE render this <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  : <>
    {Object.values(links).map((value, index) => {
      return (
          <Paper key={index} elevation={4} sx={{position: "relative", overflow: "hidden", p: 2, m: 1, borderRadius: '10px',  display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
            <div>
              <Typography>{value?.title}</Typography>
              <Typography>{value?.link}</Typography>
            </div>
            <div style={{position: 'absolute', right: 10}}>
              <IconButton onClick={() => onDeleteLink(value?.id)}>
                <DeleteIcon fontSize="small" sx={{color: 'error.dark'}}/>
              </IconButton>
            </div>
          </Paper>
      )
    })}
    </>
  }
  <CreateLink/>
  </>
  )
}

export default LinkManager;
