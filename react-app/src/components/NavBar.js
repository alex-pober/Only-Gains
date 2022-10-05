import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoDark from '../assets/LogoDark.png'
import LogoLight from '../assets/LogoLight.png'
import useMediaQuery from '@mui/material/useMediaQuery';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <AppBar position="static" color="inherit">
      <Toolbar variant="dense">
          {prefersDarkMode ? (<img src={LogoDark} style={{height: 45}} />) : (<img src={LogoLight} style={{height: 45}} />)}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          </Typography>
          {(user)
          ? <LogoutButton />
          : <div>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
              <Button color="inherit" href="/login">Login</Button>
            </div>
          }


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
