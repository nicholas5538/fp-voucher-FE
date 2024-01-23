import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AnimatedLayout from '../components/animated-layout';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import { voucherFormValues } from '../constants/globalTypes';
import { useUserContext } from '../hooks/useUserContext';
import { getVoucher } from '../utils/api';
import { convertToDayjs } from '../utils/date';

const EditVoucherForm = () => {
  const { cookies } = useUserContext();
  const { action, id } = useLoaderData() as {
    action: voucherFormValues['action'];
    id: string;
  };

  const { data, isFetched } = useQuery({
    queryKey: ['voucher', { id, token: cookies.jwt }],
    queryFn: ({ signal }) => getVoucher({ id, signal, token: cookies.jwt! }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 15000,
    gcTime: 15 * (60 * 1000),
  });

  const voucherData = data?.results[0];
  const defaultValues = {
    ...voucherData,
    action,
    id,
    startDate: convertToDayjs(voucherData?.startDate ?? new Date()).format(
      'YYYY-MM-DD',
    ),
    expiryDate: convertToDayjs(voucherData?.expiryDate ?? new Date()).format(
      'YYYY-MM-DD',
    ),
  } as voucherFormValues;

  // console.log(defaultValues);

  return (
    <AnimatedLayout className='form-container'>
      {!isFetched ? (
        <SkeletonForm />
      ) : (
        <MemoVoucherForm defaultValues={defaultValues} />
      )}
    </AnimatedLayout>
  );
};

export default EditVoucherForm;
