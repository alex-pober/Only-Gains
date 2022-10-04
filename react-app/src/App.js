import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AccountInfo from './components/AccountInfo';
import EditLinks from './components/LinkManager';

function App() {
  const [loaded, setLoaded] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="sm" disableGutters>
          <NavBar />
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path='/users' exact={true} >
              <UsersList/>
            </ProtectedRoute>
            <ProtectedRoute path='/user/:userId' exact={true} >
              <User />
            </ProtectedRoute>
            <ProtectedRoute path='/user/:userId/account-info' exact={true} >
              <AccountInfo/>
            </ProtectedRoute>
            <ProtectedRoute path='/user/:userId/edit-links' exact={true} >
              <EditLinks/>
            </ProtectedRoute>
            <ProtectedRoute path='/' exact={true} >
              {/* <h1>My Home Page</h1> */}
            </ProtectedRoute>
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
