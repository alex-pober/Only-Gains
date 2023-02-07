import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AccountInfo from './components/AccountInfo';
import LinkManager from './components/LinkManager';
import PublicPage from './components/PublicPage';
import LandingPage from './components/LandingPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // mode: prefersDarkMode ? 'dark' : 'light',
          mode: 'dark'
        },
      }),
    [],
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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Container maxWidth="sm" disableGutters>
            <Switch>
                <Route path='/' exact={true} >
                  <LandingPage />
                </Route>
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
                  <LinkManager/>
                </ProtectedRoute>
                <Route path='/:userName' exact={true}>
                  <PublicPage />
                </Route>
            </Switch>
          </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
