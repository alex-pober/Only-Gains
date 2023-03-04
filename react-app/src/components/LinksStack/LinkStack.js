import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import "./LinkStack.css"


export default function LinkStack({ data }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {
        Object.values(data).map((value, index) => {
          const regex = /\/\/([^,\s]+\.[^,\s]+?)(?=\/|,|\s|$|\?|#)/g;
          const mached = value?.link.match(regex)
          console.log(value)
          return (
            <Box key={index} className={"box" + (open ? ' box_expanded' : '')}>
              <Avatar alt={value?.title} src={`https://icon.horse/icon/${mached}`} sx={{ position: 'inherit', width: 24, height: 24, mx: 1 }} />
              <Typography sx={{ fontSize: '1rem' }} align='center' variant="h6" my={0.5}>{value?.title}</Typography>
            </Box>
          )
        })
      }

      {open &&
        <Box sx={{ display: "flex", justifyContent: "center", m: -5, zIndex: '1', position: 'sticky', bottom: '0' }}>
          <IconButton onClick={() => { setOpen(false) }} sx={{ zIndex: 1 }}>
            <CancelRoundedIcon fontSize={'large'} />
          </IconButton>
        </Box>}

      {!open &&
        <>
          <div style={{cursor: 'pointer', zIndex: '12', position: 'absolute', width: '100%', height: '92px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', bottom: '0px', flexDirection: "column-reverse", display: 'flex' }}
            onClick={() => { setOpen(!open) }}
          >
            <Typography variant="h6" align='right'
              sx={{
                marginRight: '40px',
                fontWeight: "400",
                fontSize: "0.75rem",
                lineHeight: "1.66",
                letterSpacing: "0.03333em",
                color: '#8b8b8b',
                marginBottom: '0px'
              }}
            >
              {data.length} more links
            </Typography>
          </div>
          <div style={{ backgroundColor: '#121212', zIndex: '-1', position: 'absolute', width: '100%', height: '82px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', bottom: '0px', flexDirection: "column-reverse", display: 'flex' }}
          >

          </div>
        </>
      }

      <Backdrop open={open} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }} onClick={() => { setOpen(!open) }}>
      </Backdrop>
    </>
  )
}
