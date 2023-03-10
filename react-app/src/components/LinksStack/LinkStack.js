import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import "./LinkStack.css"


export default function LinkStack({ data }) {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{ position: 'fixed', bottom: '0', height: '24px', width: 'inherit', maxWidth: 'inherit' }}>

      {
        Object.values(data).map((value, index) => {
          const regex = /\/\/([^,/\s]+\.[^,/\s]+?)(?=\/|,|\s|$|\?|#)/g;
          const mached = value?.link.match(regex)
          return (
            <Box key={index} className={"box" + (open ? ' box_expanded' : '')}
              component='a'
              sx={{ textDecoration: 'none', color: 'white' }}
              rel="noopener noreferrer"
              href={value?.link}
              target="_blank"
            >
              <Avatar variant="rounded" alt={value?.title} src={`https://www.google.com/s2/favicons?domain=https:${mached}&sz=128`} sx={{ position: 'inherit', width: 24, height: 24, mx: 1 }} />
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
          <div style={{ cursor: 'pointer', zIndex: '12', position: 'absolute', width: '100%', height: '82px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', bottom: '0px', flexDirection: "column-reverse", display: 'flex' }}
            onClick={() => { setOpen(!open) }}
          >
            <Badge color="primary" overlap="circular" badgeContent={Object.values(data).length} sx={{right: '5% !important', position: 'absolute', top: '14px', animation: "fadeIn 0.5s"}}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}>

            </Badge>
          </div>

          <div style={{ backgroundColor: '#121212', zIndex: '-1', position: 'absolute', width: '100%', height: '92px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', bottom: '0px', flexDirection: "column-reverse", display: 'flex' }}
          >
          </div>
        </>
      }

      <Backdrop open={open} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }} onClick={() => { setOpen(!open) }}>
      </Backdrop>
    </Box>
  )
}
