import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { isAuth, logout } from '../helpers/auth';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({ children }) => {
  const head = () => (
    <React.Fragment>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
          integrity='sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2'
          crossOrigin='anonymous'
        />

        <link rel='stylesheet' href='/static/css/styles.css' />
      </Head>
    </React.Fragment>
  );

  const nav = () => (
    <ul className='nav nav-tabs p-1 bg-info'>
      <li className='nav-item'>
        <Link href='/'>
          <a className='nav-link text-white '>Home</a>
        </Link>
      </li>

      <li className='nav-item'>
        <Link href='/user/link/create'>
          <a
            className='nav-link text-muted  btn btn-warning ml-4'
            style={{ borderRadius: '0px' }}
          >
            Submit a Link
          </a>
        </Link>
      </li>

      {!isAuth() && (
        <>
          <li className='nav-item ml-auto'>
            <Link href='/login'>
              <a className='nav-link text-white '>Login</a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/register'>
              <a className='nav-link  text-white'>Register</a>
            </Link>
          </li>
        </>
      )}

      {isAuth() && isAuth().role === 'admin' && (
        <li className='nav-item ml-auto'>
          <Link href='/admin'>
            <a className='nav-link  text-white'>{isAuth().name}</a>
          </Link>
        </li>
      )}
      {isAuth() && isAuth().role !== 'admin' && (
        <li className='nav-item ml-auto '>
          <Link href='/user'>
            <a className='nav-link  text-white'>{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className='nav-item'>
          <a
            style={{ cursor: 'pointer' }}
            className='nav-link  text-white'
            onClick={logout}
          >
            Logout
          </a>
        </li>
      )}
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
