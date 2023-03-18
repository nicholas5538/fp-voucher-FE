import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/navigation/MainNavigation';
import UserProvider from '../hooks/useUserContext';
import Footer from '../components/footer';

function RootLayout() {
  return (
    <UserProvider>
      <MainNavigation />
      <main className='mb-16'>
        <Outlet />
      </main>
      <Footer />
    </UserProvider>
  );
}

export default RootLayout;
