import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => {
  const head = () => (
    <link
      rel='stylesheet'
      href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
      integrity='sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2'
      crossorigin='anonymous'
    />
  );

  const nav = () => (
    <ul className='nav nav-tabs' style={{ backgroundColor: '#7952b3' }}>
      <li className='nav-item'>
        <a
          className='nav-link '
          href=''
          style={{ color: 'rgba(255,255,255,.85)' }}
        >
          Home
        </a>
      </li>
      <li className='nav-item ml-auto'>
        <a
          className='nav-link '
          href=''
          style={{ color: 'rgba(255,255,255,.85)' }}
        >
          Login
        </a>
      </li>
      <li className='nav-item'>
        <a
          className='nav-link '
          href=''
          style={{ color: 'rgba(255,255,255,.85)' }}
        >
          Register
        </a>
      </li>
    </ul>
  );

  return (
    <React.Fragment>
      {head()}
      {nav()}
      <div className='container pt-5 pb-5'>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
