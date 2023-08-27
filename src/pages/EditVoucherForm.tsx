import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import AnimatedLayout from '../components/animated-layout';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import { useUserContext } from '../hooks/useUserContext';
import { getVoucher } from '../utils/api';
import { convertToDayjs } from '../utils/date';
import { voucherFormValues } from '../constants/globalTypes';

const EditVoucherForm = () => {
  const { cookies } = useUserContext();
  const { action, id } = useLoaderData() as {
    action: voucherFormValues['action'];
    id: string;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['voucher', id, cookies.jwt],
    queryFn: ({ signal }) => getVoucher({ id, signal, token: cookies.jwt }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 15000,
    cacheTime: 15 * (60 * 1000),
  });

  let defaultValues;
  if (data) {
    defaultValues = {
      action,
      id: data?.['_id'],
      category: data?.category,
      description: data?.description,
      discount: data?.discount,
      minSpending: data?.minSpending,
      promoCode: data?.promoCode,
      startDate: convertToDayjs(data?.startDate ?? new Date()).format(
        'YYYY-MM-DD',
      ),
      expiryDate: convertToDayjs(data?.expiryDate ?? new Date()).format(
        'YYYY-MM-DD',
      ),
    };
  }

  return (
    <AnimatedLayout className='form-container'>
      {isLoading ? (
        <SkeletonForm />
      ) : (
        <MemoVoucherForm defaultValues={defaultValues as voucherFormValues} />
      )}
    </AnimatedLayout>
  );
};

export default EditVoucherForm;
