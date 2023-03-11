import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import { getVouchers } from '../utils/api';

const EditVoucherForm = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['vouchers', { page: 0, pageSize: 10 }, params.id],
    queryFn: () => getVouchers({ page: 0, pageSize: 10 }, params.id),
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
          ...data,
          action:
            (params.action as string)[0].toUpperCase() +
            params.action?.substring(1),
          startDate: dayjs(data.startDate),
          expiryDate: dayjs(data.expiryDate),
        }}
      />
    </section>
  );
};

export default EditVoucherForm;
