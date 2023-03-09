import { createRoutesFromElements, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import RootLayout from './pages/RootLayout';
import VoucherFormPage from './pages/VoucherForm/VoucherFormPage';

const routesConfig = createRoutesFromElements(
  <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
    <Route index element={<HomePage />} />
    <Route path='carts' element={<CartPage />} />
    {/* The route below 'vouchers' is for GET voucher */}
    {/* <Route path='vouchers' element={<Vouchers />} */}
    {/* The route 'voucher' is for POST, PUT & DELETE voucher request */}
    <Route path='voucher' element={<VoucherFormPage />} />
  </Route>
);

export default routesConfig;
