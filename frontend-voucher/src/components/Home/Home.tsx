import React, { Fragment } from 'react';
// import classes from './PandaHome.module.css';
import { ReactComponent as PersonalIcon } from '../../assets/personal-icon.svg';
import Card from '../UI/Card';
import { ReactComponent as LocationIcon } from '../../assets/location-icon.svg';
// import Button from '../UI/Button';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/auth';

const Home: React.FC = () => {
  //   const [auth, setAuth] = useAuth();
  return (
    <Fragment>
      <section className='mt-5 font-light'>
        {/* <div className='absolute rounded-lg w-10/12 p-4 bg-white drop-shadow-xl h-24 mt-80 ml-12 mr-96 z-10'>
          <form className='flex mx-2 '>
            <input
              className='border border-gray-400 p-2 w-full rounded-lg focus:border-black h-14 mt-2'
              type='text'
              placeholder='Enter your street or postal code'
            />
            <div className='flex items-center justify-between my-2 ml-4'>
              <button className='px-8 py-4 bg-pink-500 text-white rounded-lg text-center'>
                Submit
              </button>
              <span className='ml-2 mr-2'>or</span>
              <button className='px-8 py-4 bg-pink-500 text-white rounded-lg text-center'>
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className='flex'>
          <div className='relative -z-negative-10 lg:mx-12 md:mx-10 ml-6 bg-transparent '>
            <ul>
              <li className='flex items-end w-28'>
                <button className='flex border-b border-pink-500 w-full '>
                  <PersonalIcon />
                  <h3 className='font-medium font-open-sans cursor-pointer mb-0 ml-2'>
                    Personal
                  </h3>
                </button>
              </li>
            </ul>
            <div className='lg:text-4xl w-full text-center lg:my-32 lg:text-3xl md:text-2xl md:my-24 text-l my-12 break-words'>
              <h1>It's the food and groceries you love, delivered</h1>
            </div>
          </div>
          <img
            src='https://images.deliveryhero.io/image/foodpanda/hero-home-sg.jpg?width=2000&height=1280'
            alt='banner home'
            className='lg:h-96 lg:w-64 md:h-80 md:w-56 w-40 h-40 ml-auto object-cover -z-negative-100 overflow-x-hidden'
            style={{
              objectPosition: '30% 0',
              transform: 'translateX(20%)',
            }}
          />
        </div> */}
      </section>
    </Fragment>
  );
};

export default Home;

