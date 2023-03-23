import { Suspense } from 'react';
import AnimatedLayout from '../components/animated-layout';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import { createDefaultValues } from '../constants/form-labels';

const CreateVoucherForm = () => {
  return (
    <Suspense
      fallback={
        <section className='form-container'>
          <SkeletonForm />
        </section>
      }
    >
      <AnimatedLayout className='form-container'>
        <MemoVoucherForm defaultValues={createDefaultValues} />
      </AnimatedLayout>
    </Suspense>
  );
};

export default CreateVoucherForm;
