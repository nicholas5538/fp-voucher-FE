import { useLoaderData } from 'react-router-dom';
import { useQuery} from '@tanstack/react-query';
import AnimatedLayout from '../components/animated-layout';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import { getVoucherData, voucherFormValues } from '../constants/globalTypes';
import { useUserContext } from '../hooks/useUserContext';
import { getVoucher } from '../utils/api';
import { convertToDayjs } from '../utils/date';

const EditVoucherForm = () => {
  const { cookies } = useUserContext();
  const { action, id } = useLoaderData() as {
    action: voucherFormValues['action'];
    id: string;
  };

  const { data, isFetched} = useQuery({
    queryKey: ['voucher', id],
    queryFn: ({ signal }) => getVoucher({ id, signal, token: cookies.jwt }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 15000,
    gcTime: 15 * (60 * 1000),
  });

  let defaultValues = {} as unknown as voucherFormValues;
  if (isFetched && data) {
    const { category, description, discount, minSpending, promoCode, startDate, expiryDate } = data as unknown as getVoucherData['results'][][0];
    defaultValues = {
      action,
      id,
      category,
      description,
      discount,
      minSpending,
      promoCode,
      startDate: convertToDayjs(startDate ?? new Date()).format(
        'YYYY-MM-DD',
      ),
      expiryDate: convertToDayjs(expiryDate ?? new Date()).format(
        'YYYY-MM-DD',
      ),
    }
  }

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
