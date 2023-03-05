import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/navigation/MainNavigation';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className='w-full'>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
