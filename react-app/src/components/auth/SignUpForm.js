import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

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
    return <Redirect to='/' />;
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
      sx={{
        '& > :not(style)': { mx: "auto", width: '25ch' },
        display: 'flex',
        justifyContent: 'center',
        top: '50%'
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSignUp}
    >
      <Stack
        spacing={2}
      >
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
        <Button variant="contained" type='submit'>Submit</Button>
      </Stack>
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
