import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import { m, MotionConfig } from 'framer-motion';
import Lottie, { type LottieRefCurrentProps } from 'lottie-light-react';
import { memo, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import downArrow from '../../assets/down_arrow.json';
import { actionLabels, categoryLabels } from '../../constants/form-labels';
import voucherFormSchema from '../../constants/form-schema';
import { voucherFormValues } from '../../constants/globalTypes';
import { apiSubmitHandler } from '../../utils/api';
import AlertComponent from '../alert';
import ButtonComponent from '../button';
import DateSelector from '../form-inputs/date-picker';
import RadioInputs from '../form-inputs/radio-inputs';
import TextFieldComponent from '../form-inputs/text-field';
import ModalComponent from '../modal';
import VoucherCard from '../voucher-card';
import icons from './icons';

type VoucherFormProps = {
  defaultValues: voucherFormValues;
};

const VoucherFormComponent = ({ defaultValues }: VoucherFormProps) => {
  document.title = `${defaultValues.action} Foodpanda Voucher`;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(() => false);
  const [openDeleteModal, setDeleteModal] = useState(() => false);
  const [ref, { height }] = useMeasure();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  lottieRef.current?.setSpeed(0.6);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<voucherFormValues>({
    defaultValues: defaultValues,
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

  const onSubmit: SubmitHandler<Partial<voucherFormValues>> = (data) => {
    return apiSubmitHandler({ data, navigate });
  };

  return (
    <MotionConfig transition={{ duration: 0.4 }}>
      <Paper
        elevation={3}
        className='mx-auto max-w-2xl rounded-lg pt-4 pb-8 lg:mx-0 xl:max-w-3xl'
      >
        <div
          className={clsx(
            'border-0 border-b border-solid border-gray-700 pb-2',
            { 'mb-0': isSubmitSuccessful, 'mb-4': !isSubmitSuccessful },
          )}
        >
          <h2 className='ml-3 text-2xl font-semibold tracking-wider text-gray-700 xl:text-3xl'>
            {watchAction} voucher
          </h2>
        </div>
        <m.div animate={{ height }} className='overflow-y-hidden'>
          <div ref={ref}>
            <AlertComponent
              className='mb-4 px-2'
              iconMapping={{
                success: <CheckCircleOutlineIcon fontSize='inherit' />,
              }}
              shouldRender={isSubmitSuccessful}
              text={`The voucher has been successfully ${watchAction.toLowerCase()}d! You'll be redirected shortly.`}
            />
            <form onSubmit={handleSubmit(onSubmit)} className='px-3'>
              {watchAction !== 'Create' && (
                <RadioInputs
                  control={control}
                  label='Select an action'
                  labelsObject={actionLabels}
                  name='action'
                />
              )}
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
                  error={errors.description ? true : false}
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
                  error={errors.promoCode ? true : false}
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
                  error={errors.minSpending ? true : false}
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
                  error={errors.discount ? true : false}
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
                      isLoadingButton={false}
                      label='Delete'
                      onClick={() => setDeleteModal(true)}
                      startIcon={icons.delete}
                    />
                    <ModalComponent
                      modalTitle='Are you sure you want to delete the voucher?'
                      modalDesc='Warning, all actions are irreversible.'
                      clickHandler={() => {
                        handleSubmit(onSubmit)();
                        setDeleteModal((prevState) => !prevState);
                      }}
                      openModal={openDeleteModal}
                      setOpenModal={setDeleteModal}
                    />
                  </>
                ) : (
                  <>
                    <ButtonComponent
                      disabled={!isDirty || !isValid}
                      isLoadingButton={true}
                      isSubmitting={isSubmitting}
                      label='Confirm'
                      startIcon={icons.send}
                    />
                    <ButtonComponent
                      disabled={!isDirty}
                      isLoadingButton={false}
                      label='Reset'
                      onClick={() => reset()}
                      startIcon={icons.reset}
                    />
                  </>
                )}
                <ButtonComponent
                  isLoadingButton={false}
                  label='Cancel'
                  onClick={() => setOpenModal(true)}
                  startIcon={icons.cancel}
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
          </div>
        </m.div>
      </Paper>
      <aside className='hidden w-[25%] rounded-lg xl:flex xl:w-3/6 xl:max-w-md xl:flex-col xl:items-center xl:justify-around'>
        <h1 className='cursor-default rounded-md bg-pink-400 py-4 px-6 text-center font-mont text-2xl text-gray-100 xl:text-3xl'>
          Voucher
        </h1>
        <Lottie
          lottieRef={lottieRef}
          className='max-w-[200px]'
          animationData={downArrow}
        />
        <VoucherCard voucherParticulars={watchVoucherCard} />
      </aside>
    </MotionConfig>
  );
};

const MemoVoucherForm = memo(VoucherFormComponent);

export default MemoVoucherForm;
