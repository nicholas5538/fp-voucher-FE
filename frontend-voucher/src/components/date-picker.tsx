import { useMemo, useState } from 'react';
import {
  MobileDatePicker,
  MobileDatePickerProps,
} from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Controller } from 'react-hook-form';
import type { DateValidationError } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type MobileDateProps = MobileDatePickerProps<Date> & {
  control: any;
  disabled: boolean;
  disablePast?: boolean;
  title: string;
  name: string;
};

const DateSelector = ({ control, disabled, title, name }: MobileDateProps) => {
  const [error, setError] = useState<DateValidationError | null>(null);
  const minDate = name === 'expiryDate' ? dayjs() : null;

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'minDate': {
        return 'Do not select a date earlier than today';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
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
          <DesktopDatePicker
            className='hidden md:block'
            label={title}
            minDate={minDate}
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
          <MobileDatePicker
            className='md:hidden'
            label={title}
            minDate={minDate}
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
