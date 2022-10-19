import React from 'react'
import NavBar from './NavBar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import PublicPage from '../assets/PublicPage.png'
import Card from '@mui/material/Card';

export default function LandingPage() {
  return (
    <>
    <NavBar />
    <Paper elevation={3} sx={{margin: 1, padding: 3, borderRadius: '25px'}}>
        <Typography variant="h3" sx={{fontSize: "48px"}}><strong>Gym rat?</strong></Typography>
        <Typography variant="h3" sx={{fontSize: "48px"}} gutterBottom><strong>Fitness Influencer?</strong></Typography>
        <Typography variant="h5" sx={{fontSize: "16px", lineHeight: "24px"}} gutterBottom>We are no longer gate keeping workout plans in 2022. Create yours and share it with the world!</Typography>
    </Paper>
    {/* <br style={{lineHeight: "0px"}}></br> */}
    <Paper elevation={24} sx={{margin: 1, display: "flex",flexDirection: "row-reverse", justifyContent: "space-around", borderRadius: '25px', alignItems: "center", padding: 3, flexWrap: "wrap"}}>
      <img src={PublicPage} style={{width: "50%", minWidth: "250px",  borderRadius: '20px', height: "70%"}}/>
      <div style={{ maxWidth: 250, backgroundColor: ''}}>
        <Typography variant="h3" sx={{fontSize: "2rem", marginTop: "0.35em"}} gutterBottom><strong>No Nonsense</strong></Typography>
        <Typography variant="h5" sx={{fontSize: "1rem", lineHeight: "24px"}} >Workouts, Exercises and Reps. Everything you need straight to the point.</Typography>
      </div>
    </Paper>
    </>
  )
}
