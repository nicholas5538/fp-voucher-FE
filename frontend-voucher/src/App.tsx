import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import RootLayout from './pages/RootLayout';

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
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
