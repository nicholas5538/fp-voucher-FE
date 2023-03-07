import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Paper from '@mui/material/Paper';
import { useForm, SubmitHandler } from 'react-hook-form';
import RadioInputs from '../components/radio-inputs';
import { actionLabels, categoryLabels } from '../constants/form-labels';
import { voucherFormSchema, voucherFormValues } from '../constants/form-schema';
import dayjs from 'dayjs';
import DateSelector from '../components/date-picker';

const VoucherFormPage = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      action: actionLabels['create'],
      category: categoryLabels['delivery'],
      startDate: dayjs(),
      expiryDate: dayjs().add(1, 'day'),
    },
    resolver: yupResolver(voucherFormSchema),
  });
  const watchAction = watch('action');

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      return { value, name };
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Need to change this onSubmit function in the future
  const onSubmit: SubmitHandler<voucherFormValues> = (data) =>
    console.log(data);

  return (
    <section className='mx-auto mt-8 max-w-7xl px-4'>
      <Paper elevation={2} className='mx-auto max-w-3xl rounded-lg py-4'>
        <div className='mb-4 border-0 border-b border-solid border-gray-700 pb-2'>
          <h2 className='ml-3 font-sans text-2xl font-semibold tracking-wider text-gray-700'>
            {watchAction} voucher
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='px-3'>
          <RadioInputs
            control={control}
            label='Select an action'
            labelsObject={actionLabels}
            name='action'
          />
          <RadioInputs
            control={control}
            label='Select a category'
            labelsObject={categoryLabels}
            name='category'
          />
          <div className='flex flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-8'>
            <DateSelector
              control={control}
              disabled={false}
              disablePast={false}
              title='Select start date'
              name='startDate'
            />
            <DateSelector
              control={control}
              disabled={false}
              disablePast={true}
              title='Select expiry date'
              name='expiryDate'
            />
          </div>
        </form>
      </Paper>
    </section>
  );
};

export default VoucherFormPage;
