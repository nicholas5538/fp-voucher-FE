import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import { createDefaultValues } from '../constants/form-labels';
import AnimatedLayout from '../components/animated-layout';

const CreateVoucherForm = () => {
  return (
    <AnimatedLayout className='form-container'>
      <MemoVoucherForm defaultValues={createDefaultValues} />
    </AnimatedLayout>
  );
};

export default CreateVoucherForm;
