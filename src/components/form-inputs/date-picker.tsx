import type { DateValidationError } from '@mui/x-date-pickers';
import {
  DatePicker,
  type DatePickerProps,
  type PickersShortcutsItem,
} from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { voucherFormValues } from '../../constants/globalTypes';

type DateSelectorProps = DatePickerProps<Date> & {
  action: voucherFormValues['action'];
  control: Control<voucherFormValues>;
  title: string;
  name: keyof voucherFormValues;
};

const shortcutsItems: PickersShortcutsItem<Dayjs | null>[] = [
  {
    // eslint-disable-next-line quotes
    label: "New Year's Day",
    getValue: () => {
      return dayjs().month(0).date(1);
    },
  },
  {
    label: 'Chinese New Year',
    getValue: () => {
      return dayjs().month(0).date(22);
    },
  },
  {
    label: 'Hari Raya Puasa',
    getValue: () => {
      return dayjs().month(3).date(22);
    },
  },
  {
    label: 'Labour Day',
    getValue: () => {
      return dayjs().month(4).date(1);
    },
  },
  {
    label: 'Vesak Day',
    getValue: () => {
      return dayjs().month(5).date(2);
    },
  },
  {
    label: 'Deepavali',
    getValue: () => {
      return dayjs().month(10).date(12);
    },
  },
  {
    label: 'Christmas Day',
    getValue: () => {
      return dayjs().month(11).date(25);
    },
  },
];

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
              shortcuts: {
                items: shortcutsItems,
              },
            }}
            sx={{
              '& .Mui-focused': {
                borderColor: 'hsl(334, 79%, 48%)',
                color: 'hsl(334, 79%, 48%)',
                '&.MuiInputLabel-root': {
                  color: 'hsl(334, 79%, 48%)',
                },
              },
              '& .MuiOutlinedInput-root': {
                color: 'hsl(0, 0%, 20%)',
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
