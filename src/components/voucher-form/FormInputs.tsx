import type {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  GlobalError,
} from 'react-hook-form';
import type { voucherFormValues } from '../../constants/globalTypes';
import RadioInputs from '../form-inputs/radio-inputs';
import { actionLabels, categoryLabels } from '../../constants/form-labels';
import TextFieldComponent from '../form-inputs/text-field';
import DateSelector from '../form-inputs/date-picker';
import icons from './icons';

type FormInputsProps = {
  control: Control<voucherFormValues | any>;
  disabledWatchAction: boolean;
  errors: Partial<FieldErrorsImpl<DeepRequired<voucherFormValues>>> & {
    root?: Record<string, GlobalError> & GlobalError;
  };
  watchAction: 'Create' | 'Update' | 'Delete';
};

export default function FormInputs({
  control,
  disabledWatchAction,
  errors,
  watchAction,
}: FormInputsProps) {
  return (
    <>
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
      <div className='mb-6 grid grid-cols-1 space-y-6 md:grid-cols-3 md:space-x-4 md:space-y-0'>
        <TextFieldComponent
          className='md:col-span-2'
          control={control}
          disabled={disabledWatchAction}
          error={!!errors.description}
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
          error={!!errors.promoCode}
          helperText={errors.promoCode?.message}
          icon={icons.discount}
          label='Promo code'
          name='promoCode'
          placeholder='PIZZAHUT5'
          type='text'
        />
      </div>
      <div className='mb-6 grid grid-cols-1 space-y-6 md:grid-cols-2 md:space-x-4 md:space-y-0'>
        <TextFieldComponent
          className='col-span-1'
          control={control}
          disabled={disabledWatchAction}
          error={!!errors.minSpending}
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
          error={!!errors.discount}
          helperText={errors.discount?.message}
          icon={icons.percent}
          label='Discount'
          name='discount'
          type='number'
        />
      </div>
      <div className='mb-6 flex flex-col items-start space-y-6 md:flex-row md:items-center md:justify-between md:space-x-5 md:space-y-0'>
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
    </>
  );
}
