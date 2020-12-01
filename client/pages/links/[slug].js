import { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import axios from 'axios';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Links = ({
  query,
  category,
  links,
  totalLinks,
  linksLimit,
  linkSkip,
}) => {
  const [allLinks, setAllLinks] = useState(links);

  const listOfLinks = () =>
    allLinks.map((l, i) => (
      <div
        key={l._id}
        className='row alert alert-light p-2'
        style={{ border: '1px solid #EEEEEE' }}
      >
        <div className='col-md-8'>
          <a href={l.url} target='_blank'>
            <h5 className='pt-2'>{l.title}</h5>
            <h6 className='pt-2 text-danger' style={{ fontSize: '12px' }}>
              {l.url}
            </h6>
          </a>
        </div>
        <div className='col-md-4 pt-2 text-dark font-weight-bold'>
          <span className='pull-right'>
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}
          </span>
        </div>
        <div className='col-md-12'>
          <span className='badge text-dark'>
            {l.type} / {l.medium}
          </span>
          {l.categories.map((c, i) => (
            <span key={i} className='badge text-success'>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    ));

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-8'>
          <h1 className='display-4 font-weight-bold'>
            {category.name} - URL/Links
          </h1>
          <div className='lead alert alert-light pt-4'>
            {renderHTML(category.content || '')}
          </div>
        </div>
        <div className='col-md-4'>
          <img
            src={category.image.url}
            alt={category.name}
            style={{ width: 'auto', maxHeight: '200px' }}
          />
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-8'>{listOfLinks()}</div>
        <div className='col-md-4'>
          <h2 className='lead'>Most popular in {category.name}</h2>
          <p>show popular links</p>
        </div>
      </div>

      <p>load more button</p>
    </Layout>
  );
};

Links.getInitialProps = async ({ query, req }) => {
  let skip = 0;
  let limit = 1;

  const response = await axios.post(`${API}/category/${query.slug}`, {
    skip,
    limit,
  });
  return {
    query,
    category: response.data.category,
    links: response.data.links,
    totalLinks: response.data.links.length,
    linksLimit: limit,
    linkSkip: skip,
  };
};

export default Links;
