import classes from './HomePage.module.css';
import { Link } from 'react-router-dom';
import AnimatedLayout from '../../components/animated-layout';
// import { useAuth } from '../../context/auth';

const HomePage = () => {
  //   const [auth, setAuth] = useAuth();
  return (
    <AnimatedLayout className='mt-5 font-light'>
      <div className='flex'>
        <div className='-z-negative-10 relative ml-6 bg-transparent md:mx-10 lg:mx-12'>
          <ul>
            <li className='flex w-28 items-end'>
              <button className='flex w-full border-b border-pink-500 '>
                <h3 className='font-open-sans mb-0 ml-2 cursor-pointer font-medium'>
                  Personal
                </h3>
              </button>
            </li>
          </ul>
          <div className='text-l my-12 w-full break-words text-center md:my-24 md:text-2xl lg:my-32 lg:text-4xl'>
            <h1>It's the food and groceries you love, delivered</h1>
          </div>
        </div>
        <img
          src='https://images.deliveryhero.io/image/foodpanda/hero-home-sg.jpg?width=2000&height=1280'
          alt='banner home'
          className='-z-negative-100 ml-auto h-40 w-40 overflow-x-hidden object-cover md:h-80 md:w-56 lg:h-96 lg:w-64'
          style={{
            objectPosition: '30% 0',
          }}
        />
      </div>
      <div className={classes['form']}>
        <div className={classes['location-form']}>
          <label htmlFor='address'>Enter your street or postal code</label>
          <button className={classes['location-icon']}></button>
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
    </AnimatedLayout>
  );
};

export default HomePage;
