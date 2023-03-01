import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { login } from '../../store/session';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LogoDark from '../../assets/LogoDark.png'
import LogoLight from '../../assets/LogoLight.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/user/${user?.id}`}/>;
  }

  return (
    <Box
    component="form"
    onSubmit={onLogin}
  >
    <Paper elevation={3}
    sx={{ mx: "auto", mt: "20vh", p: 3, width: '90vw', maxWidth: "350px", borderRadius: "15px",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {prefersDarkMode ? (<img src={LogoDark} alt="Dark Logo"/>) : (<img src={LogoLight} alt="Light Logo"/>)}
      <Typography variant="h4" sx={{fontWeight: 800}} >Login</Typography>
      <TextField label="Email" variant="outlined" margin="normal" required
        error={errors.length>0 ? true : false}
        type='email'
        value={email}
        onChange={updateEmail}/>
      <TextField label="Password" variant="outlined" margin="normal" required
        error={errors.length>0 ? true : false}
        type='password'
        value={password}
        onChange={updatePassword}/>
      <Button variant="contained" type='submit' sx={{my: 1}}>Login</Button>
      <NavLink to="/sign-up" exact={true} style={{textDecoration:"none", margin:"auto", marginTop:"25px"}}>
        <Link>Don't have an account</Link>
      </NavLink>
    </Paper>
  </Box>
  );
};

export default LoginForm;
