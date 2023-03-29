import AddIcon from '@mui/icons-material/Add';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import TableViewIcon from '@mui/icons-material/TableView';
import Lottie, { type LottieRefCurrentProps } from 'lottie-light-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import homeAnimation from '../assets/home_page.json';
import AnimatedLayout from '../components/animated-layout';
import ButtonComponent from '../components/button';
import { useUserContext } from '../hooks/useUserContext';

const HomePage = () => {
  document.title = 'Foodpanda Voucher Admin Home Page';
  const navigate = useNavigate();
  const { token, login } = useUserContext();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  lottieRef.current?.setSpeed(0.7);

  const viewHandler = () => {
    return navigate('/vouchers');
  };
  const createHandler = () => {
    return navigate('/vouchers/create');
  };

  return (
    <AnimatedLayout className='mx-auto mt-16 w-full max-w-7xl px-6 md:grid md:grid-cols-2 md:items-center'>
      <aside className='mx-auto mb-6 w-9/12 max-w-lg md:order-2 md:col-span-1 md:m-0 md:mb-12 md:justify-self-end'>
        <Lottie lottieRef={lottieRef} animationData={homeAnimation} />
      </aside>
      <div className='md:order-1 md:col-span-1 md:flex md:flex-col md:space-y-8'>
        <h2 className='mb-6 text-center md:mb-0 md:text-start md:text-3xl'>
          Welcome to <span className='text-[#e21b70]'>foodpanda</span> voucher
          management portal.
        </h2>
        <div className='flex flex-col items-center md:items-start md:space-y-8'>
          <h3 className='mb-6 text-center text-lg font-medium md:mb-0 md:text-start md:text-xl'>
            {`A place where you could easily create, edit, delete and view vouchers in foodpanda. ${
              token
                ? 'Click on the features below to get started.'
                : 'Click below or sign in to get started.'
            }`}
          </h3>
          {!token && (
            <ButtonComponent
              isLoadingButton={false}
              startIcon={<LoginOutlinedIcon />}
              label='Get Started'
              variant='contained'
              onClick={() => login()}
            />
          )}
          {token && (
            <div className='flex flex-col items-center space-y-6 md:items-start lg:flex-row lg:space-y-0 lg:space-x-6'>
              <ButtonComponent
                isLoadingButton={false}
                startIcon={<TableViewIcon />}
                label='View / Edit / Delete vouchers'
                variant='contained'
                onClick={viewHandler}
                disableElevation
              />
              <ButtonComponent
                isLoadingButton={false}
                startIcon={<AddIcon />}
                label='Create voucher'
                variant='contained'
                onClick={createHandler}
                disableElevation
              />
            </div>
          )}
        </div>
      </div>
    </AnimatedLayout>
  );
};

export default HomePage;
