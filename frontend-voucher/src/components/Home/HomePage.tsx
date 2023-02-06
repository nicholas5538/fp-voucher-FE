import { Fragment } from 'react';
import classes from './HomePage.module.css';
import { ReactComponent as PersonalIcon } from '../../assets/personal-icon.svg';
import { ReactComponent as LocationIcon } from '../../assets/location-icon.svg';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/auth';

const Home = () => {
  //   const [auth, setAuth] = useAuth();
  return (
    <Fragment>
      <section className='mt-5 font-light'>
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
            }}
          />
        </div>
        <div className={classes['form']}>
          <div className={classes['location-form']}>
            <label htmlFor='address'>Enter your street or postal code</label>
            <button className={classes['location-icon']}>
              <LocationIcon />
            </button>
            <input
              id='address'
              placeholder='Enter your street or postal code'
            ></input>
          </div>
          <div className={classes.mode}>
            <Link to='/delivery'>
              <button>Delivery</button>
            </Link>

            <p>or</p>

            <Link to='/delivery'>
              <button>Pick-up</button>
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
