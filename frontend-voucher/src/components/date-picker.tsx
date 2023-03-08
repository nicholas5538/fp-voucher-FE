import { useMemo, useState } from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import type { DateValidationError } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type DateSelectorProps = DatePickerProps<Date> & {
  action: string;
  control: any;
  disabled: boolean;
  disablePast?: boolean;
  title: string;
  name: string;
};

const DateSelector = ({
  action,
  control,
  disabled,
  title,
  name,
}: DateSelectorProps) => {
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
            value={value}
            views={['year', 'month', 'day']}
            disabled={disabled}
          />
        </div>
      )}
    />
  );
};

export default DateSelector;
