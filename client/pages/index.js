import Layout from '../components/Layout';
import axios from 'axios';
import { API } from '../config';
import Link from 'next/link';

const Home = ({ categories }) => {
  const listCategories = () =>
    categories.map((c, i) => (
      <Link key={i} href='/'>
        <a
          style={{
            textDecoration: 'none',
            border: '1px solid #EEEEEE',
            backgroundColor: '#FFFFFF',
            borderRadius: '6px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
            transition: '.1s linear all',
            color: 'black',
          }}
          className='bg-light p-3 col-md-4 m-2'
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
          <h1 className='font-weight-bold'>Browse Categories</h1>
        </div>
      </div>

      <div className='row'>{listCategories()}</div>
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
