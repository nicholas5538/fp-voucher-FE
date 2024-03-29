import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Lottie from 'lottie-light-react';
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';
import errorAnimation from '../assets/error.json';
import errorNotFound from '../assets/error_404.json';
import AnimatedLayout from '../components/animated-layout';
import ButtonComponent from '../components/button';
import useTitle from '../hooks/useTitle';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const errorResponseStatus =
    isRouteErrorResponse(error) && error.status === 404;
  const animationData = errorResponseStatus ? errorNotFound : errorAnimation;
  const errorText = errorResponseStatus
    ? 'Page not found.'
    : 'Something went wrong.';

  useTitle(`${errorText} | foodpanda voucher management portal`);

  console.error(error);

  return (
    <AnimatedLayout className=''>
      <section className='mx-auto mt-8 flex max-w-7xl px-6'>
        <Box className='flex w-full flex-col items-center space-y-2 lg:space-y-4'>
          <Lottie animationData={animationData} className='max-h-80' />
          <h2 className='text-lg lg:text-2xl'>{`Uh oh, ${errorText.toLowerCase()}`}</h2>
          {error instanceof Response && (
            <h3 className='text-base lg:text-xl'>{`${error.statusText}; Status: ${error.status}`}</h3>
          )}
          <div className='flex flex-row items-center space-x-4'>
            <h4 className='text-sm lg:text-lg'>Please redirect to</h4>
            <ButtonComponent
              isLoadingButton={false}
              label='home page'
              onClick={() => navigate('/', { replace: true })}
              startIcon={<HomeIcon />}
            />
          </div>
        </Box>
      </section>
    </AnimatedLayout>
  );
};

export default ErrorPage;
