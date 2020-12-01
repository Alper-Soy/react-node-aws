import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../config';
import Link from 'next/link';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';

const Read = ({ user, token }) => {
  const [state, setState] = useState({
    error: '',
    success: '',
    categories: [],
  });

  const { error, success, categories } = state;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, categories: response.data });
  };

  const confirmDelete = (slug) => {
    console.log('delete > ', slug);
  };

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
              <div className='col-md-3'>
                <img
                  src={c.image && c.image.url}
                  alt={c.name}
                  style={{ width: '100px', height: 'auto' }}
                  className='pr-3'
                />
              </div>
              <div className='col-md-6'>
                <h3 style={{ color: '#383838' }}>{c.name}</h3>
              </div>
              <div className='col-md-3'>
                <Link href={`/admin/category/${c.slug}`}>
                  <button className='btn btn-sm btn-outline-success btn-block mb-1'>
                    Update
                  </button>
                </Link>

                <button
                  onClick={() => confirmDelete(c.slug)}
                  className='btn btn-sm btn-outline-danger btn-block'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </a>
      </Link>
    ));

  return (
    <Layout>
      <div className='row'>
        <div className='col'>
          <h1>List of categories</h1>
          <br />
        </div>
      </div>

      <div className='row'>{listCategories()}</div>
    </Layout>
  );
};

export default withAdmin(Read);
