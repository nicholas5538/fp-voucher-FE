import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { Controller } from 'react-hook-form';
import { TradioLabels } from '../constants/form-labels';

type Props<RadioGroupProps> = RadioGroupProps & {
  control: any;
  label: string;
  labelsObject: TradioLabels;
  name: string;
};

const createRadioInputs = (
  labelsObject: Props<RadioGroupProps>['labelsObject']
) => {
  return Object.entries(labelsObject).map(([label, value], index) => (
    <FormControlLabel
      key={index}
      value={value}
      control={<Radio size='medium' className='text-pink-500' />}
      label={label}
    />
  ));
};

const RadioInputs = ({
  control,
  label,
  labelsObject,
  name,
}: Props<RadioGroupProps>) => {
  return (
    <div className='flex flex-col'>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <FormLabel id={name} required className='text-lg'>
              {label}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby={name}
              name={name}
              value={value}
              onChange={onChange}
            >
              {createRadioInputs(labelsObject)}
            </RadioGroup>
          </>
        )}
      />
    </div>
  );
};

export default RadioInputs;
