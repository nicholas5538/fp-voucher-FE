import type { DateValidationError } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { voucherFormValues } from '../../constants/globalTypes';

type DateSelectorProps = DatePickerProps<Date> & {
  action: string;
  control: Control<voucherFormValues>;
  title: string;
  name: keyof voucherFormValues;
};

const DateSelector = ({ action, control, title, name }: DateSelectorProps) => {
  const [error, setError] = useState<DateValidationError | null>(null);
  const maxDate = action !== 'Delete' ? dayjs().add(5, 'year') : null;
  const minDate = action !== 'Delete' && name === 'expiryDate' ? dayjs() : null;

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate': {
        return 'Date should not be 5 years from now';
      }
      case 'minDate': {
        return 'Do not select a date earlier than today';
      }
      default: {
        return 'DD-MM-YYYY';
      }
    }
  }, [error]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className='flex w-full flex-col'>
          <DatePicker
            label={title}
            minDate={minDate}
            maxDate={maxDate}
            onChange={onChange}
            onError={(newError) => setError(newError)}
            openTo='day'
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
            sx={{
              '& .Mui-focused': {
                color: 'hsl(334, 79%, 48%)',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'hsl(334, 79%, 58%)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'hsl(334, 79%, 48%)',
                },
              },
            }}
            value={value}
            views={['year', 'month', 'day']}
            disabled={action === 'Delete'}
          />
        </div>
      )}
    />
  );
};

export default DateSelector;
