import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/navigation/MainNavigation';
import UserProvider from '../hooks/useUserContext';

function RootLayout() {
  return (
    <UserProvider>
      <MainNavigation />
      <main className='w-full'>
        <Outlet />
      </main>
    </UserProvider>
  );
}

export default RootLayout;
