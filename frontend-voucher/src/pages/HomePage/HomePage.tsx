import classes from './HomePage.module.css';
import { ReactComponent as PersonalIcon } from '../../assets/personal-icon.svg';
import { ReactComponent as LocationIcon } from '../../assets/location-icon.svg';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/auth';

const HomePage = () => {
  //   const [auth, setAuth] = useAuth();
  return (
    <>
      <section className='mt-5 font-light'>
        <div className='flex'>
          <div className='relative -z-negative-10 ml-6 bg-transparent md:mx-10 lg:mx-12'>
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
            <div className='text-center text-l my-12 break-words w-full md:text-2xl md:my-24 lg:my-32 lg:text-4xl'>
              <h1>It's the food and groceries you love, delivered</h1>
            </div>
          </div>
          <img
            src='https://images.deliveryhero.io/image/foodpanda/hero-home-sg.jpg?width=2000&height=1280'
            alt='banner home'
            className='ml-auto object-cover -z-negative-100 overflow-x-hidden w-40 h-40 md:h-80 md:w-56 lg:h-96 lg:w-64'
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

            <Link to='/pick-up'>
              <button>Pick-up</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
