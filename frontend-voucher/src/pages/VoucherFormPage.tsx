import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../components/button';
import DateSelector from '../components/date-picker';
import RadioInputs from '../components/radio-inputs';
import { actionLabels, categoryLabels } from '../constants/form-labels';
import { voucherFormSchema, voucherFormValues } from '../constants/form-schema';
import ModalComponent from '../components/modal';

const VoucherFormPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      action: actionLabels['create'],
      category: categoryLabels['delivery'],
      startDate: dayjs(),
      expiryDate: dayjs().add(1, 'day'),
    },
    resolver: yupResolver(voucherFormSchema),
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      return { value, name };
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const watchAction = watch('action');
  const disabledWatchAction = watchAction === 'Delete';
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
            disabled={disabledWatchAction}
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
          <div className='mb-4 flex flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-8'>
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
            // Note to myself: Need to change line 130 to handle DELETE API
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
