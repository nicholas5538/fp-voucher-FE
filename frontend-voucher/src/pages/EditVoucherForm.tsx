import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import { getVouchers } from '../utils/api';
import { convertToDayjs } from '../utils/date';

const EditVoucherForm = () => {
  const { action, id } = useLoaderData() as {
    action: string;
    id: string | undefined;
  };

  const { data: voucher, isLoading } = useQuery({
    queryKey: ['vouchers', id],
    queryFn: ({ signal }) => {
      const fetchVoucher = getVouchers({ page: 0, pageSize: 1, signal }, id);
      if (!fetchVoucher) {
        throw new Error('No data found');
      }
      return fetchVoucher;
    },
    keepPreviousData: true,
  });

  return isLoading ? (
    <div className='form-container'>
      <SkeletonForm />
    </div>
  ) : (
    <section className='form-container'>
      <MemoVoucherForm
        defaultValues={{
          ...voucher,
          action: action,
          startDate: convertToDayjs(voucher.startDate),
          expiryDate: convertToDayjs(voucher.expiryDate),
        }}
      />
    </section>
  );
};

export default EditVoucherForm;