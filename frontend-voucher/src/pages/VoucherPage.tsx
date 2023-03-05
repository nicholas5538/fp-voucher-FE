import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import RadioInputs from '../components/radio-inputs';

const VoucherPage = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      action: 'Create',
    },
  });
  const watchAction = watch('action');

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <section className='mx-auto mt-16 max-w-7xl px-4'>
      <Paper elevation={2} className='mx-auto max-w-3xl rounded-lg py-4'>
        <div className='mb-4 border-0 border-b border-solid border-gray-700 pb-2'>
          <h2 className='ml-3 text-2xl font-bold tracking-wider text-gray-700'>
            {watchAction} voucher
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='pl-3'>
          <RadioInputs
            control={control}
            label='Select an action'
            labelsObject={['Create', 'Update', 'Delete']}
            name='action'
          />
        </form>
      </Paper>
    </section>
  );
};

export default VoucherPage;
