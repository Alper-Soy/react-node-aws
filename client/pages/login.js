import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { showErrorMessage, showSuccessMessage } from '../helpers/alerts';
import { API } from '../config';

const Login = () => {
  const [state, setState] = useState({
    email: 'massam.sammas89@gmail.com',
    password: '123456',
    error: '',
    success: '',
    buttonText: 'Login',
  });

  const { email, password, buttonText, success, error } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
      error: '',
      success: '',
      buttonText: 'Login',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: 'Logging in' });

    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: 'Login',
        error: error.response.data.error,
        success: '',
      });
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          className='form-control'
          required
          type='email'
          placeholder='Type your email'
          name='email'
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <input
          className='form-control'
          required
          type='password'
          placeholder='Type your password'
          name='password'
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <button className='btn btn-outline-info '>{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <h1>Login</h1>
        <br />
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        {loginForm()}
      </div>
    </Layout>
  );
};

export default Login;
