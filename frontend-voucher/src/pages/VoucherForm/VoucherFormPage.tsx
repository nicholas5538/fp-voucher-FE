import { yupResolver } from '@hookform/resolvers/yup';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { lazy, Suspense, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import downArrow from '../../assets/down-arrow.json';
import ButtonComponent from '../../components/button';
import DateSelector from '../../components/form-inputs/date-picker';
import RadioInputs from '../../components/form-inputs/radio-inputs';
import TextFieldComponent from '../../components/form-inputs/text-field';
import VoucherCard from '../../components/form-inputs/voucher-card';
import ModalComponent from '../../components/modal';
import { actionLabels, categoryLabels } from '../../constants/form-labels';
import voucherFormSchema from '../../constants/form-schema';
import { voucherFormValues } from '../../constants/globalTypes';
import icons from './icons';
import SkeletonForm from './SkeletonForm';

const Lottie = lazy(() => import('lottie-react'));

const VoucherFormPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(() => false);
  const [openDeleteModal, setDeleteModal] = useState(() => false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm<voucherFormValues>({
    defaultValues: {
      action: actionLabels['create'],
      category: categoryLabels['delivery'],
      description: '',
      discount: 5,
      minSpending: 0,
      promoCode: '',
      startDate: dayjs(),
      expiryDate: dayjs().add(1, 'day'),
    },
    mode: 'all',
    resolver: yupResolver(voucherFormSchema),
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      return { value, name };
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const watchVoucherCard = watch([
    'description',
    'discount',
    'expiryDate',
    'minSpending',
    'promoCode',
  ]);
  const watchAction = watch('action') ?? 'Create';
  const disabledWatchAction = watchAction === 'Delete';
  // Need to change this onSubmit function in the future
  const onSubmit: SubmitHandler<voucherFormValues> = (data) => {
    const modifiedData = { ...data, id: uuidv4() };
    console.log(modifiedData);
  };
  // Convert minSpending to number before sending data

  return (
    <section className='mx-auto mt-8 flex max-w-7xl flex-col items-center px-4 xl:flex-row xl:justify-between'>
      <Suspense fallback={<SkeletonForm />}>
        <Paper
          elevation={3}
          className='mx-auto max-w-2xl rounded-lg py-4 lg:mx-0 xl:max-w-3xl'
        >
          <div className='mb-4 border-0 border-b border-solid border-gray-700 pb-2'>
            <h2 className='ml-3 font-sans text-2xl font-semibold tracking-wider text-gray-700 xl:text-3xl'>
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
              disabled={disabledWatchAction}
              label='Select a category'
              labelsObject={categoryLabels}
              name='category'
            />
            <div className='mb-6 grid grid-cols-1 space-y-6 md:grid-cols-3 md:space-y-0 md:space-x-4'>
              <TextFieldComponent
                className='md:col-span-2'
                control={control}
                disabled={disabledWatchAction}
                error={errors.description === undefined ? false : true}
                helperText={errors.description?.message}
                icon={icons.desc}
                label='Description'
                multiline
                maxRows={2}
                name='description'
                placeholder='5% off pick-up on Pizza Hut'
                type='text'
              />
              <TextFieldComponent
                className='col-span-1'
                control={control}
                disabled={disabledWatchAction}
                error={errors.promoCode === undefined ? false : true}
                helperText={errors.promoCode?.message}
                icon={icons.discount}
                label='Promo code'
                name='promoCode'
                placeholder='PIZZAHUT5'
                type='text'
              />
            </div>
            <div className='mb-6 grid grid-cols-1 space-y-6 md:grid-cols-2 md:space-y-0 md:space-x-4'>
              <TextFieldComponent
                className='col-span-1'
                control={control}
                disabled={disabledWatchAction}
                error={errors.minSpending === undefined ? false : true}
                helperText={errors.minSpending?.message}
                icon={icons.attachMoney}
                label='Minimum spending'
                name='minSpending'
                type='number'
              />
              <TextFieldComponent
                className='col-span-1'
                control={control}
                disabled={disabledWatchAction}
                error={errors.discount === undefined ? false : true}
                helperText={errors.discount?.message}
                icon={icons.percent}
                label='Discount'
                name='discount'
                type='number'
              />
            </div>
            <div className='mb-6 flex flex-col items-start space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-5'>
              <DateSelector
                action={watchAction}
                control={control}
                disabled={disabledWatchAction}
                disablePast={false}
                title='Select start date'
                name='startDate'
              />
              <DateSelector
                action={watchAction}
                control={control}
                disabled={disabledWatchAction}
                disablePast={true}
                title='Select expiry date'
                name='expiryDate'
              />
            </div>
            <ButtonGroup
              color='secondary'
              aria-label='contained secondary button group'
            >
              {disabledWatchAction ? (
                <>
                  <ButtonComponent
                    endIcon={icons.delete}
                    isLoadingButton={false}
                    label='Delete'
                    onClick={() => setDeleteModal(true)}
                  />
                  <ModalComponent
                    modalTitle='Are you sure you want to delete the voucher?'
                    modalDesc='Warning, all actions are irreversible.'
                    // Note to myself: Need to change the line below to handle DELETE API
                    clickHandler={() => console.log('Deleted')}
                    openModal={openDeleteModal}
                    setOpenModal={setDeleteModal}
                  />
                </>
              ) : (
                <>
                  <ButtonComponent
                    disabled={!isDirty || !isValid}
                    endIcon={icons.send}
                    isLoadingButton={true}
                    isSubmitting={isSubmitting}
                    label='Looks Good'
                  />
                  <ButtonComponent
                    disabled={!isDirty}
                    endIcon={icons.reset}
                    isLoadingButton={false}
                    label='Reset'
                    onClick={() => reset()}
                  />
                </>
              )}
              <ButtonComponent
                endIcon={icons.cancel}
                isLoadingButton={false}
                label='Cancel'
                onClick={() => setOpenModal(true)}
              />
            </ButtonGroup>
            <ModalComponent
              modalTitle='Are you sure you want to cancel?'
              modalDesc='Warning, all changes are not saved upon clicking on Yes.'
              clickHandler={() => navigate('/')}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </form>
        </Paper>
        <aside className='hidden w-[25%] rounded-lg xl:flex xl:w-3/6 xl:max-w-md xl:flex-col xl:items-center xl:justify-around'>
          <h1 className='rounded-md bg-pink-400 py-4 px-6 text-center font-mont text-2xl text-gray-100 xl:text-3xl'>
            Voucher
          </h1>
          <Lottie className='max-w-[200px]' animationData={downArrow} />
          <VoucherCard voucherParticulars={watchVoucherCard} />
        </aside>
      </Suspense>
    </section>
  );
};

export default VoucherFormPage;
