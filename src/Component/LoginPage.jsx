import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPageCss.css';
import useStore from '../Store';
import { useGetEmployeesQuery, useLoginUserMutation } from '../Service/Query';
import Swal from 'sweetalert2';
import useAuthStore from './store/authStore';

const LoginPage = () => {
  // const setLogin = useStore((state) => state.setLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { data: loginData, isSuccess: loginSuccess, isLoading: loginLoading, isError: loginError, error }] = useLoginUserMutation()
  const navigate = useNavigate();
  const { isLoggedIn, setLogin, setEmpInfo,setActiveRole } = useAuthStore()

  if (isLoggedIn) {
    // Redirect to dashboard or homepage if the user is already logged in
    return <Navigate to="/" />;
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await loginUser({ email, password })

    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      setLogin(true)
      setEmpInfo(loginData)
      setActiveRole(loginData?.empRole[0])

      navigate('/')

    }


  }, [loginSuccess, loginData])



  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='loginH2'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>
          <button type="submit" className="btn" >Login</button>
        </form>
        {error && <p className="error">{error?.data?.message}</p>}
        <p className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</p>
      </div>
    </div>
  );
};

export default LoginPage;
