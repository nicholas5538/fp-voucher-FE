import { createRoutesFromElements, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CreateVoucherForm from './pages/CreateVoucherForm';
import EditVoucherForm from './pages/EditVoucherForm';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './pages/ProtectedRoute';
import RootLayout from './pages/RootLayout';
import VoucherTable from './pages/VoucherTable';

const routesConfig = createRoutesFromElements(
  <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
    <Route index element={<HomePage />} />
    <Route
      path='carts'
      element={
        <ProtectedRoute>
          <CartPage />
        </ProtectedRoute>
      }
    />
    <Route
      path='vouchers'
      loader={() => {
        const offset = sessionStorage.getItem('offset') ?? '0';
        const limit = sessionStorage.getItem('limit') ?? '10';
        return { offset, limit };
      }}
      element={
        <ProtectedRoute>
          <VoucherTable />
        </ProtectedRoute>
      }
    />
    <Route
      path='vouchers/create'
      element={
        <ProtectedRoute>
          <CreateVoucherForm />
        </ProtectedRoute>
      }
    />
    <Route
      caseSensitive
      path='vouchers/:id/update'
      loader={({ params }) => {
        return { action: 'Update', id: params.id };
      }}
      element={
        <ProtectedRoute>
          <EditVoucherForm />
        </ProtectedRoute>
      }
    />
    <Route
      caseSensitive
      path='vouchers/:id/delete'
      loader={({ params }) => {
        return { action: 'Delete', id: params.id };
      }}
      element={
        <ProtectedRoute>
          <EditVoucherForm />
        </ProtectedRoute>
      }
    />
  </Route>,
);

export default routesConfig;
