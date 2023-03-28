import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup';
import { Control, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TradioLabels, voucherFormValues } from '../../constants/globalTypes';

type RadioInputsProps = RadioGroupProps & {
  control: Control<voucherFormValues>;
  disabled?: boolean;
  label: string;
  labelsObject: TradioLabels;
  name: keyof voucherFormValues;
};

const createRadioInputs = ({
  disabled,
  labelsObject,
}: {
  disabled: boolean;
  labelsObject: TradioLabels;
}): JSX.Element[] => {
  return Object.entries(labelsObject).map(([label, value], index) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const clickHandler =
      (label === 'update' || label === 'delete') && id
        ? () => navigate(`/vouchers/${id}/${label}`, { replace: true })
        : undefined;

    return (
      <FormControlLabel
        key={index}
        disabled={disabled}
        value={value}
        control={
          <Radio
            size='small'
            className='text-pink-500'
            onClick={clickHandler}
          />
        }
        label={label[0].toUpperCase() + label.substring(1)}
      />
    );
  });
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
              {createRadioInputs({ disabled: disabled ?? false, labelsObject })}
            </RadioGroup>
          </>
        )}
      />
    </div>
  );
};

export default RadioInputs;
