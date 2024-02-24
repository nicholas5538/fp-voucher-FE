import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Paper from '@mui/material/Paper';
import { motion, MotionConfig } from 'framer-motion';
import type { LottieRefCurrentProps } from 'lottie-light-react';
import { memo, useEffect, useRef } from 'react';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import AlertComponent from '../alert';
import voucherFormSchema from '../../constants/form-schema';
import type { voucherFormValues } from '../../constants/globalTypes';
import FormAnimation from './FormAnimation';
import FormButtonsModals from './FormButtonsModals';
import FormHeader from './FormHeader';
import FormInputs from './FormInputs';
import { useUserContext } from '../../hooks/useUserContext';
import useTitle from '../../hooks/useTitle';
import { modifyData } from '../../utils/api';

type VoucherFormProps = {
  defaultValues: voucherFormValues;
};

const VoucherFormComponent = ({ defaultValues }: VoucherFormProps) => {
  useTitle(`${defaultValues.action} Foodpanda Voucher`);
  const { cookies, userInfo } = useUserContext();
  const navigate = useNavigate();
  const [ref, { height }] = useMeasure();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  lottieRef.current?.setSpeed(0.6);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isDirty,
      isSubmitting,
      isSubmitSuccessful,
      isValid,
      dirtyFields,
    },
  } = useForm<voucherFormValues>({
    defaultValues: defaultValues,
    mode: 'all',
    resolver: yupResolver(voucherFormSchema) as unknown as Resolver<
      voucherFormValues,
      unknown
    >,
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

  const onSubmit: SubmitHandler<voucherFormValues> = (data) => {
    const token = cookies.jwt!;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    clearTimeout(timeoutId ?? undefined);

    if (data.action === 'Create') {
      modifyData({
        data: {
          ...data,
          userId: userInfo.userId,
        },
        token,
      });
    } else if (data.action === 'Delete') {
      modifyData({
        data: { action: data.action, id: data.id },
        token,
      });
    } else {
      const modifiedData: Partial<voucherFormValues> = {
        action: data.action,
        id: data.id,
        userId: userInfo.userId,
      };
      for (const field of Object.keys(dirtyFields)) {
        // @ts-expect-error "modifiedData might not accept field prop"
        modifiedData[field] = data[field];
      }

      if (Object.hasOwn(dirtyFields, 'expiryDate')) {
        modifiedData.startDate = data.startDate;
      } else if (Object.hasOwn(dirtyFields, 'startDate')) {
        modifiedData.expiryDate = data.expiryDate;
      }
      modifyData({
        data: modifiedData,
        token,
      });
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      navigate('/vouchers', { replace: true });
    }, 4000);
    return;
  };

  return (
    <MotionConfig transition={{ duration: 0.4 }}>
      <Paper
        elevation={3}
        className='mx-auto max-w-2xl rounded-lg pb-8 pt-4 lg:mx-0 xl:max-w-3xl'
      >
        <FormHeader
          isSubmitSuccessful={isSubmitSuccessful}
          watchAction={watchAction}
        />
        <motion.div animate={{ height }} className='overflow-y-hidden'>
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
              <FormInputs
                control={control}
                disabledWatchAction={disabledWatchAction}
                errors={errors}
                watchAction={watchAction}
              />
              <FormButtonsModals
                disabledWatchAction={disabledWatchAction}
                handleSubmit={handleSubmit}
                navigate={navigate}
                isDirty={isDirty}
                isValid={isValid}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
                reset={reset}
              />
            </form>
          </div>
        </motion.div>
      </Paper>
      <FormAnimation
        lottieRef={lottieRef}
        watchVoucherCard={watchVoucherCard}
      />
    </MotionConfig>
  );
};

const MemoVoucherForm = memo(VoucherFormComponent);

export default MemoVoucherForm;
