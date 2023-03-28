import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import AnimatedLayout from '../components/animated-layout';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import { queryFnSignal } from '../constants/globalTypes';
import { getVoucher } from '../utils/api';
import { convertToDayjs } from '../utils/date';

const EditVoucherForm = () => {
  const { action, id } = useLoaderData() as {
    action: string;
    id: string | undefined;
  };

  const { data: voucher, isLoading } = useQuery({
    queryKey: ['voucher', id],
    queryFn: ({ signal }: queryFnSignal) => getVoucher({ id, signal }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 15000,
    cacheTime: 15 * (60 * 1000),
  });

  return (
    <AnimatedLayout className='form-container'>
      {isLoading ? (
        <SkeletonForm />
      ) : (
        <MemoVoucherForm
          defaultValues={{
            ...voucher,
            action: action,
            startDate: convertToDayjs(voucher.startDate),
            expiryDate: convertToDayjs(voucher.expiryDate),
          }}
        />
      )}
    </AnimatedLayout>
  );
};

export default EditVoucherForm;
