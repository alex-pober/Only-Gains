import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user.id === +props.computedMatch.params.userId)? props.children  : <Redirect to='/login' />}
    </Route>
  )
};


export default ProtectedRoute;
