import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Paper from '@mui/material/Paper';
import { useForm, SubmitHandler } from 'react-hook-form';
import RadioInputs from '../components/radio-inputs';
import { actionLabels, categoryLabels } from '../constants/form-labels';
import { voucherFormSchema, voucherFormValues } from '../constants/form-schema';

const VoucherFormPage = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      action: actionLabels['create'],
      category: categoryLabels['delivery'],
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
          <h2 className='ml-3 text-2xl font-semibold tracking-wider text-gray-700'>
            {watchAction} voucher
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='pl-3'>
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
        </form>
      </Paper>
    </section>
  );
};

export default VoucherFormPage;
