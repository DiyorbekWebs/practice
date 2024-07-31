import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice';
import { AppDispatch } from '../store/store';
import { TextField, Button } from '@mui/material';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace with actual authentication logic
    dispatch(login('username'));
    navigate('/todos');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      <TextField label="Username" variant="outlined" fullWidth margin="normal" />
      <Button onClick={handleLogin} variant="contained" color="primary" className="mt-4">
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
