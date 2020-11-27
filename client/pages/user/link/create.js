import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../../../config';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import Layout from '../../../components/Layout';

const Create = () => {
  const [state, setState] = useState({
    title: '',
    url: '',
    categories: [],
    loadedCategories: [],
    success: '',
    error: '',
    type: '',
    medium: '',
  });

  const {
    title,
    url,
    categories,
    loadedCategories,
    success,
    error,
    type,
    medium,
  } = state;

  useEffect(() => {
    loadCategories();
  }, [success]);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, loadedCategories: response.data });
  };

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-12'>
          <h1>Submit Link/URL</h1>
          <br />
          {JSON.stringify(loadedCategories)}
        </div>
      </div>
    </Layout>
  );
};

export default Create;
