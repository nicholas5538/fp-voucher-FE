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
    <Route
      caseSensitive
      path='vouchers/:id/update'
      loader={({ params }) => {
        return { action: 'Update', id: params.id };
      }}
      element={<EditVoucherForm />}
    />
    <Route
      caseSensitive
      path='vouchers/:id/delete'
      loader={({ params }) => {
        return { action: 'Delete', id: params.id };
      }}
      element={<EditVoucherForm />}
    />
  </Route>,
);

export default routesConfig;
