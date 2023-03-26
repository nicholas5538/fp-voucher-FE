import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import MainNavigation from '../components/navigation/MainNavigation';
import UserProvider from '../hooks/useUserContext';

const RootLayout = () => {
  return (
    <UserProvider>
      <MainNavigation />
      <main className='mb-16 md:mb-8'>
        <Outlet />
      </main>
      <Footer />
    </UserProvider>
  );
};

export default RootLayout;
