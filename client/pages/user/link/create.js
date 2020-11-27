import React from 'react';
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

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value, error: '', success: '' });
  };

  const handleURLChange = (e) => {
    setState({ ...state, url: e.target.value, error: '', success: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ title, url, categories, type, medium });
  };

  const handleTypeClick = (e) => {
    setState({ ...state, type: e.target.value, error: '', success: '' });
  };

  const handleMediumClick = (e) => {
    setState({ ...state, medium: e.target.value, success: '', error: '' });
  };

  const showMedium = () => (
    <React.Fragment>
      <div className='form-check ml-3'>
        <label className='form-check-label'>
          <input
            type='radio'
            onClick={handleMediumClick}
            checked={medium === 'video'}
            value='video'
            className='from-check-input'
            name='medium'
          />{' '}
          Video
        </label>
      </div>

      <div className='form-check ml-3'>
        <label className='form-check-label'>
          <input
            type='radio'
            onClick={handleMediumClick}
            checked={medium === 'book'}
            value='book'
            className='from-check-input'
            name='medium'
          />{' '}
          Book
        </label>
      </div>
    </React.Fragment>
  );

  const showTypes = () => (
    <React.Fragment>
      <div className='form-check ml-3'>
        <label className='form-check-label'>
          <input
            type='radio'
            onClick={handleTypeClick}
            checked={type === 'free'}
            value='free'
            className='from-check-input'
            name='type'
          />{' '}
          Free
        </label>
      </div>

      <div className='form-check ml-3'>
        <label className='form-check-label'>
          <input
            type='radio'
            onClick={handleTypeClick}
            checked={type === 'paid'}
            value='paid'
            className='from-check-input'
            name='type'
          />{' '}
          Paid
        </label>
      </div>
    </React.Fragment>
  );

  const handleToggle = (c) => () => {
    // return the first index or -1
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];

    clickedCategory === -1 ? all.push(c) : all.splice(clickedCategory, 1);

    setState({ ...state, categories: all, success: '', error: '' });
  };

  // show categories > checkbox
  const showCategories = () => {
    return (
      loadedCategories &&
      loadedCategories.map((c) => (
        <li className='list-unstyled' key={c._id}>
          <input
            type='checkbox'
            onChange={handleToggle(c._id)}
            className='mr-2'
          />
          <label className='form-check-label'>{c.name}</label>
        </li>
      ))
    );
  };

  // link create form
  const submitLinkForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Title</label>
        <input
          type='text'
          className='form-control'
          onChange={handleTitleChange}
          value={title}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>URL</label>
        <input
          type='url'
          className='form-control'
          onChange={handleURLChange}
          value={url}
        />
      </div>
      <div>
        <button className='btn btn-outline-info' type='submit'>
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-12'>
          <h1>Submit Link/URL</h1>
          <br />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <div className='form-group'>
            <label className='text-muted ml-4'>Category</label>
            <ul style={{ maxHeight: '100px', overflowY: 'auto' }}>
              {showCategories()}
            </ul>
          </div>

          <div className='form-group'>
            <label className='text-muted ml-4'>Type</label>
            {showTypes()}
          </div>

          <div className='form-group'>
            <label className='text-muted ml-4'>Medium</label>
            {showMedium()}
          </div>
        </div>
        <div className='col-md-8'>{submitLinkForm()}</div>
      </div>
    </Layout>
  );
};

export default Create;
