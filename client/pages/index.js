import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config';
import Link from 'next/link';
import moment from 'moment';
import 'react-quill/dist/quill.bubble.css';

const Home = ({ categories }) => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    const response = await axios.get(`${API}/link/popular`);
    // console.log(response);
    setPopular(response.data);
  };

  const handleClick = async (linkId) => {
    const response = await axios.put(`${API}/click-count`, { linkId });
    loadPopular();
  };

  const listOfLinks = () =>
    popular.map((l, i) => (
      <div
        key={i}
        style={{
          textDecoration: 'none',
          border: '2px solid #EEEEEE',
          backgroundColor: '#FFFFFF',
          borderRadius: '6px',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
          transition: '.1s linear all',
          color: 'black',
        }}
        className='row alert alert-secondary p-2'
      >
        <div className='col-md-8' onClick={() => handleClick(l._id)}>
          <a href={l.url} target='_blank'>
            <h5 className='pt-2'>{l.title}</h5>
            <h6 className='pt-2 text-danger' style={{ fontSize: '12px' }}>
              {l.url}
            </h6>
          </a>
        </div>

        <div className='col-md-4 pt-2'>
          <span className='pull-right'>
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}
          </span>
        </div>

        <div className='col-md-12'>
          <span className='badge text-dark'>
            {l.type} {l.medium}
          </span>
          {l.categories.map((c, i) => (
            <span key={i} className='badge text-success'>
              {c.name}
            </span>
          ))}
          <span className='badge text-secondary pull-right'>
            {l.clicks} clicks
          </span>
        </div>
      </div>
    ));

  const listCategories = () =>
    categories.map((c) => (
      <Link key={c._id} href={`/links/${c.slug}`}>
        <a
          style={{
            textDecoration: 'none',
            border: '2px solid #EEEEEE',
            backgroundColor: '#FFFFFF',
            borderRadius: '6px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
            transition: '.1s linear all',
            color: 'black',
          }}
          className='bg-light p-3 col-md-4'
        >
          <div>
            <div className='row'>
              <div className='col-md-4'>
                <img
                  src={c.image && c.image.url}
                  alt={c.name}
                  style={{ width: '100px', height: 'auto' }}
                  className='pr-3'
                />
              </div>
              <div className='col-md-8'>
                <h3 style={{ color: '#383838' }}>{c.name}</h3>
              </div>
            </div>
          </div>
        </a>
      </Link>
    ));

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='font-weight-bold '>Browse Categories</h1>
          <br />
        </div>
      </div>

      <div className='row'>{listCategories()}</div>

      <div className='row pt-5'>
        <h2 className='font-weight-bold pb-3'>Trending {popular.length} </h2>
        <div className='col-md-12 overflow-hidden'>{listOfLinks()}</div>
      </div>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`);
  return {
    categories: response.data,
  };
};

export default Home;
