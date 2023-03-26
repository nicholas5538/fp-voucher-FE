import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import { ErrorResponse } from '@remix-run/router';
import Lottie from 'lottie-react';
import { useNavigate, useRouteError } from 'react-router-dom';
import errorAnimation from '../assets/error.json';
import errorNotFound from '../assets/error_not_found.json';
import ButtonComponent from '../components/button';
import MainNavigation from '../components/navigation/MainNavigation';
import AnimatedLayout from '../components/animated-layout';

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const errorResponseStatus =
    error instanceof ErrorResponse && error.status === 404;
  const animationData = errorResponseStatus ? errorNotFound : errorAnimation;
  const errorText = `Uh oh, ${
    errorResponseStatus ? 'page not found.' : 'something went wrong.'
  }`;

  console.error(error);

  return (
    <AnimatedLayout className=''>
      <MainNavigation />
      <section className='mx-auto mt-8 flex max-w-7xl px-6'>
        <Box className='flex w-full flex-col items-center space-y-2 lg:space-y-4'>
          <Lottie animationData={animationData} className='max-h-80' />
          <h2 className='text-lg lg:text-2xl'>{errorText}</h2>
          {error instanceof Response && (
            <h3 className='text-base lg:text-xl'>{`${error.statusText}; Status: ${error.status}`}</h3>
          )}
          <div className='flex flex-row items-center space-x-4'>
            <h4 className='text-sm lg:text-lg'>Please redirect to</h4>
            <ButtonComponent
              isLoadingButton={false}
              label='Home page'
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
            />
          </div>
        </Box>
      </section>
    </AnimatedLayout>
  );
}

export default ErrorPage;
