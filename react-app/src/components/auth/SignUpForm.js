import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import { createWorkout } from '../../store/workout';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LogoDark from '../../assets/LogoDark.png'
import LogoLight from '../../assets/LogoLight.png'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();



  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, name));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  if (user) {
    return <Redirect to={`/user/${user?.id}`}/>;
  }

  return (
    <>
    {errors.map((error, ind) => (
      // <div key={ind}>{error}</div>
      <Snackbar
        anchorOrigin = {{ vertical: 'top', horizontal: 'center' }}
        open={true}
        key={ind}
        // message = {error}
        autoHideDuration = {500}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
         {error}
        </Alert>
      </Snackbar>
    ))}
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSignUp}
    >
      <Paper elevation={3}
      sx={{ mx: "auto", my: 7, p: 3, width: '90vw', maxWidth: "350px", borderRadius: "15px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
          {prefersDarkMode ? (<img src={LogoDark} alt="Dark Logo"/>) : (<img src={LogoLight} alt="Light Logo"/>)}
          <Typography variant="h4" sx={{fontWeight: 800}} >Create Account</Typography>
          <TextField label="Username" variant="outlined" margin="normal"
            type='text'
            value={username}
            onChange={updateUsername}/>
          <TextField label="Email" variant="outlined" margin="normal"
            type='text'
            value={email}
            onChange={updateEmail}/>
          <TextField label="Password" variant="outlined" margin="normal"
            type='password'
            value={password}
            onChange={updatePassword}/>
          <TextField label="Repeat Password" variant="outlined" margin="normal" required
            type='password'
            value={repeatPassword}
            onChange={updateRepeatPassword}/>
          <TextField label="Display Name" variant="outlined" margin="normal" required
            type='text'
            value={name}
            onChange={updateName}/>
          <Button variant="contained" type='submit' sx={{my: 1}}>Submit</Button>
          <NavLink to="/login" exact={true} style={{textDecoration:"none", margin:"auto", marginTop:"25px"}}>
            <Link>Already have account</Link>
          </NavLink>
      </Paper>
    </Box>
    {/* <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form> */}
    </>
  );
};

export default SignUpForm;
