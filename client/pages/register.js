import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { showErrorMessage, showSuccessMessage } from '../helpers/alerts';
import { API } from '../config';

const Register = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
    buttonText: 'Register',
  });

  const { name, email, password, buttonText, success, error } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
      error: '',
      success: '',
      buttonText: 'Register',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: 'Registering' });

    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password,
      });

      setState({
        ...state,
        name: '',
        email: '',
        password: '',
        buttonText: 'Submitted',
        success: response.data.message,
        error: '',
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: 'Register',
        error: error.response.data.error || error.response.data.message,
        success: '',
      });
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          className='form-control'
          required
          type='text'
          placeholder='Type your name'
          name='name'
          value={name}
          onChange={handleChange}
        />
      </div>
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
        <button className='btn btn-outline-info  btn-block'>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <h1>Register</h1>
        <br />
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        {registerForm()}
      </div>
    </Layout>
  );
};

export default Register;
