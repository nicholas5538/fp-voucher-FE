import { yupResolver } from '@hookform/resolvers/yup';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import SendIcon from '@mui/icons-material/Send';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../components/button';
import DateSelector from '../components/form-inputs/date-picker';
import RadioInputs from '../components/form-inputs/radio-inputs';
import TextFieldComponent from '../components/form-inputs/text-field';
import ModalComponent from '../components/modal';
import { actionLabels, categoryLabels } from '../constants/form-labels';
import voucherFormSchema from '../constants/form-schema';
import { voucherFormValues } from '../constants/globalTypes';

const VoucherFormPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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

  const watchAction = watch('action') ?? 'Create';
  const disabledWatchAction = watchAction === 'Delete';
  // Need to change this onSubmit function in the future
  const onSubmit: SubmitHandler<voucherFormValues> = (data) =>
    // Convert minSpending to number before sending data
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
            disabled={disabledWatchAction}
            label='Select a category'
            labelsObject={categoryLabels}
            name='category'
          />
          <div className='mb-6 flex w-full flex-col space-y-6'>
            <div className='grid grid-cols-1 space-y-6 md:grid-cols-3 md:space-y-0 md:space-x-4'>
              <TextFieldComponent
                className='md:col-span-2'
                control={control}
                disabled={disabledWatchAction}
                error={errors.description === undefined ? false : true}
                helperText={errors.description?.message}
                icon={<DescriptionOutlinedIcon />}
                label='Description'
                multiline
                maxRows={3}
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
                icon={<DiscountOutlinedIcon />}
                label='Promo code'
                name='promoCode'
                placeholder='PIZZAHUT5'
                type='text'
              />
            </div>
            <div className='grid grid-cols-1 space-y-6 md:grid-cols-2 md:space-y-0 md:space-x-4'>
              <TextFieldComponent
                className='col-span-1'
                control={control}
                disabled={disabledWatchAction}
                error={errors.minSpending === undefined ? false : true}
                helperText={errors.minSpending?.message}
                icon={<AttachMoneyOutlinedIcon />}
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
                icon={<PercentOutlinedIcon />}
                label='Discount'
                name='discount'
                type='number'
              />
            </div>
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
              <ButtonComponent
                endIcon={<DeleteForeverIcon />}
                isLoadingButton={true}
                isSubmitting={isSubmitting}
                label='Delete'
              />
            ) : (
              <>
                <ButtonComponent
                  disabled={!isDirty || !isValid}
                  endIcon={<SendIcon />}
                  isLoadingButton={true}
                  isSubmitting={isSubmitting}
                  label='Looks Good'
                />
                <ButtonComponent
                  disabled={!isDirty}
                  endIcon={<RestartAltIcon />}
                  isLoadingButton={false}
                  label='Reset'
                  onClick={() => reset()}
                />
              </>
            )}
            <ButtonComponent
              endIcon={<CancelIcon />}
              isLoadingButton={false}
              label='Cancel'
              onClick={() => setOpenModal(true)}
            />
          </ButtonGroup>
          <ModalComponent
            modalTitle='Are you sure you want to cancel?'
            modalDesc='Warning, all changes are not saved upon clicking on Yes.'
            // Note to myself: Need to change the line below to handle DELETE API
            clickHandler={() => navigate('/')}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </form>
      </Paper>
    </section>
  );
};

export default VoucherFormPage;
