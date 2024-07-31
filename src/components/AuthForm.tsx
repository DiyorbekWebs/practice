import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

interface AuthFormData {
  username: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const { register, handleSubmit } = useForm<AuthFormData>();
  const dispatch = useDispatch();

  const onSubmit = async (data: AuthFormData) => {
    // Mock authentication
    if (data.username === 'user' && data.password === 'password') {
      dispatch(login('mock-token'));
      console.log(data);
      
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Username" />
      <input type="password" {...register('password')} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthForm;
