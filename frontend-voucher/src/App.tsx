import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartPage from './pages/CartPage';
import FavouritesPage from './pages/FavouritesPage';

import HomePage from './pages/HomePage';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import FoodDeliveryPage from './pages/FoodDeliveryPage';
import FoodPickupPage from './pages/FoodPickupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/favourites',
        element: <FavouritesPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/delivery',
        element: <FoodDeliveryPage />,
      },
      {
        path: '/pick-up',
        element: <FoodPickupPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
