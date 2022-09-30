import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import {editProfile} from '../store/session'
import { getUserLinks } from '../store/links';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function EditLinks(){
  const userState = useSelector(state => state.session.user)
  const links = useSelector(state => state.links)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const dispatch = useDispatch();
  console.log(Object.keys(links).length === 0)
  useEffect(() => {
    dispatch(getUserLinks(userState.id))
  }, [])

  const onEditLink = async (e) => {
    e.preventDefault();
    const data = {
      id: userState.id,
    }
    dispatch(editProfile(data))
  }
  return (
  <>
   <AppBar color='primary' position="sticky">
    <ToolBar>
      <IconButton href={`/users/${userState?.id}`}>
        <ArrowBackIosIcon />
     </IconButton>
      <Typography sx={{ flexGrow: 1 }}>Links Manger</Typography>
        <Button type='submit' variant="contained" disabled={btnDisabled} onClick={onEditLink}>Save</Button>
    </ToolBar>
  </AppBar>
  {Object.keys(links).length === 0
  ? <>obejct is empty</>
  : <>objec is full</>
  }
  </>

  )
}

export default EditLinks;
