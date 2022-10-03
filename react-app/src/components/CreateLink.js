import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

function CreateLink(){
  return (
      <Paper elevation={4} sx={{maxWidth: '55%', padding: '10px', display:"flex", flexDirection: "column", alignItems: "center", margin: 'auto', borderRadius: '10px'}}>
      <Typography variant="h6">Create New Link</Typography>
          <TextField
            label="Title"
            size="small"
            required
          />
          <TextField
            label="Url"
            size="small"
            required
          />
          <Button sx={{my: 1}} rginTop variant="contained" endIcon={<AddIcon/>}>Add New Link</Button>
      </Paper>
  )
}

export default CreateLink;
