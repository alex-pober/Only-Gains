import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
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
        type='email'
        value={email}
        onChange={updateEmail}/>
      <TextField label="Password" variant="outlined" margin="normal" required
        type='password'
        value={password}
        onChange={updatePassword}/>
      <Button variant="contained" type='submit' sx={{my: 1}}>Login</Button>
      <Link href="/sign-up" sx={{m: "auto", my: 3}}>Don't have an account</Link>
    </Paper>
  </Box>
    // <form onSubmit={onLogin}>
    //   <div>
    //     {errors.map((error, ind) => (
    //       <div key={ind}>{error}</div>
    //     ))}
    //   </div>
    //   <div>
    //     <label htmlFor='email'>Email</label>
    //     <input
    //       name='email'
    //       type='text'
    //       placeholder='Email'
    //       value={email}
    //       onChange={updateEmail}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor='password'>Password</label>
    //     <input
    //       name='password'
    //       type='password'
    //       placeholder='Password'
    //       value={password}
    //       onChange={updatePassword}
    //     />
    //     <button type='submit'>Login</button>
    //   </div>
    // </form>
  );
};

export default LoginForm;
