import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
  <Link to="/">
    <Tooltip title="Logout">
      <IconButton>
          <LogoutIcon onClick={onLogout}/>
      </IconButton>
    </Tooltip>
  </Link>
  )
};

export default LogoutButton;
