import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import OnlyGainsLogo from '../assets/OnlyGainsLogo.png'

const NavBar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar variant="dense">
          <img src={OnlyGainsLogo} style={{height: 45}} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button color="inherit" href="/sign-up">Sign Up</Button>
          <Button color="inherit" href="/login">Login</Button>
          <LogoutButton />
        </Toolbar>
    </AppBar>


    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
