import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { Control, Controller } from 'react-hook-form';
import { TradioLabels } from '../../constants/form-labels';
import { voucherFormValues } from '../../constants/globalTypes';

type RadioInputsProps = RadioGroupProps & {
  control: Control<voucherFormValues>;
  disabled?: boolean;
  label: string;
  labelsObject: TradioLabels;
  name: keyof voucherFormValues;
};

const createRadioInputs = (
  disabled: boolean,
  labelsObject: RadioInputsProps['labelsObject'],
) => {
  return Object.entries(labelsObject).map(([label, value], index) => (
    <FormControlLabel
      key={index}
      disabled={disabled}
      value={value}
      control={<Radio size='small' className='text-pink-500' />}
      label={label[0].toUpperCase() + label.substring(1)}
    />
  ));
};

const RadioInputs = ({
  control,
  disabled,
  label,
  labelsObject,
  name,
}: RadioInputsProps) => {
  return (
    <div className='mb-4 flex flex-col'>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <FormLabel id={name} required className='text-base'>
              {label}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby={name}
              name={name}
              value={value}
              onChange={onChange}
            >
              {createRadioInputs(disabled ?? false, labelsObject)}
            </RadioGroup>
          </>
        )}
      />
    </div>
  );
};

export default RadioInputs;
