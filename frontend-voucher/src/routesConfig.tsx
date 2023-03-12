import { createRoutesFromElements, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CreateVoucherForm from './pages/CreateVoucherForm';
import EditVoucherForm from './pages/EditVoucherForm';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import RootLayout from './pages/RootLayout';
import VoucherTable from './pages/VoucherTable/VoucherTable';

const routesConfig = createRoutesFromElements(
  <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
    <Route index element={<HomePage />} />
    <Route path='carts' element={<CartPage />} />
    <Route path='vouchers' element={<VoucherTable />} />
    <Route path='vouchers/create' element={<CreateVoucherForm />} />
    <Route path='vouchers/:id/:action' element={<EditVoucherForm />} />
  </Route>
);

export default routesConfig;
