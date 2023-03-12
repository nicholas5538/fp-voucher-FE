import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import { createDefaultValues } from '../constants/form-labels';

const CreateVoucherForm = () => {
  return (
    <section className='form-container'>
      <MemoVoucherForm defaultValues={createDefaultValues} />
    </section>
  );
};

export default CreateVoucherForm;
