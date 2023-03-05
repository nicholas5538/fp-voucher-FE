import { Controller } from 'react-hook-form';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props<RadioGroupProps> = RadioGroupProps & {
  control: any;
  label: string;
  labelsObject: string[];
  name: string;
};

const createRadioInputs = (
  labelsObject: Props<RadioGroupProps>['labelsObject']
) => {
  return labelsObject.map((label, index) => (
    <FormControlLabel
      key={index}
      value={label}
      control={<Radio size='medium' className='text-pink-500' />}
      label={label}
    />
  ));
};

const RadioInputs = ({
  labelsObject,
  control,
  label,
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
