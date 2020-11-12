import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password });

    axios
      .post(`http://localhost:8080/api/register`, {
        name,
        email,
        password,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          className='form-control'
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
        {registerForm()}
      </div>
    </Layout>
  );
};

export default Register;
