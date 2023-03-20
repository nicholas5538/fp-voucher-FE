import AnimatedLayout from '../components/animated-layout';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import homeAnimation from '../assets/home_page.json';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import ButtonComponent from '../components/button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useRef } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const { token, login } = useUserContext();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  lottieRef.current?.setSpeed(0.75);

  const viewHandler = () => {
    return navigate('/vouchers');
  };
  const createHandler = () => {
    return navigate('/vouchers/create');
  };

  return (
    <AnimatedLayout className='mx-auto mt-16 w-full max-w-7xl px-6 md:grid md:grid-cols-2 md:items-center'>
      <aside className='mx-auto mb-6 w-4/5 max-w-lg md:order-2 md:col-span-1 md:m-0 md:mb-12 md:justify-self-end'>
        <Lottie lottieRef={lottieRef} animationData={homeAnimation} />
      </aside>
      <div className='md:order-1 md:col-span-1 md:flex md:flex-col md:space-y-4'>
        <h2 className='mb-6 text-center md:mb-0 md:text-start md:text-xl lg:text-3xl'>
          Welcome to <span className='text-pink-600'>foodpanda</span> voucher
          management portal.
        </h2>
        <div className='flex flex-col items-center md:items-start md:space-y-4'>
          <h3 className='mb-6 text-center text-lg font-medium md:mb-0 md:text-start md:text-base lg:text-xl'>
            {`${
              token
                ? 'This portal provides the following features.'
                : 'Click below or sign in to get started.'
            }`}
          </h3>
          {!token && (
            <ButtonComponent
              isLoadingButton={false}
              startIcon={<LoginOutlinedIcon />}
              label='Get Started'
              onClick={() => login()}
            />
          )}
          {token && (
            <div className='flex flex-col items-center space-y-4 md:items-start'>
              <div className='flex flex-row space-x-4'>
                <Chip
                  color='primary'
                  label='View all vouchers'
                  variant='outlined'
                  onClick={viewHandler}
                />
                <Chip
                  color='primary'
                  label='Create voucher'
                  variant='outlined'
                  onClick={createHandler}
                />
              </div>
              <div className='flex flex-row space-x-4'>
                <Chip
                  color='primary'
                  label='Update voucher'
                  variant='outlined'
                  onClick={viewHandler}
                />
                <Chip
                  color='primary'
                  label='Delete voucher'
                  variant='outlined'
                  onClick={viewHandler}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedLayout>
  );
};

export default HomePage;
