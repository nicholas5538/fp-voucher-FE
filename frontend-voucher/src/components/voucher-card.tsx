import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Dayjs } from 'dayjs';
import clsx from 'clsx';
import { calculateDateDifference, formatDate } from '../utils/date';

type VoucherCardProps = {
  voucherParticulars: [string, number, Dayjs, number, string];
};

const VoucherCard = ({ voucherParticulars }: VoucherCardProps) => {
  const minSpend = (
    Math.round(Number(voucherParticulars[3]) * 100) / 100
  ).toFixed(2);
  const promoCode = voucherParticulars[4].toUpperCase();
  const moreThanThree = calculateDateDifference(voucherParticulars[2]);
  const expiryDate = formatDate({
    date: voucherParticulars[2],
    dateFormat: 'DD MMM YYYY',
  });

  return (
    <Card>
      <CardContent className='px-0 py-0'>
        <div className='grid grid-cols-5 grid-rows-5'>
          <div className='col-span-1 row-start-1 row-end-6 h-full w-full border-y-0 border-l-0 border-r border-dashed border-gray-300 py-4'>
            <div className='grid h-full place-items-center'>
              <ConfirmationNumberIcon color='secondary' />
            </div>
          </div>
          <div className='col-span-3 row-start-1 row-end-4'>
            <div className='flex h-full w-full flex-col items-start justify-between p-4'>
              <h3 className='font-mont text-base font-semibold text-black'>
                {voucherParticulars[0]}
              </h3>
              <h4 className='font-mont text-sm font-normal text-neutral-600'>
                Min. spend S$ {minSpend}
              </h4>
            </div>
          </div>
          <div className='col-span-4 row-start-5 row-end-6'>
            <div className='flex flex-row items-center justify-between space-x-4 px-4'>
              <h4
                className={clsx('font-mont text-sm font-light', {
                  'text-neutral-500': moreThanThree,
                  'text-pink-500': !moreThanThree,
                })}
              >
                {`${moreThanThree ? 'Use by' : 'Expires on'} ${expiryDate}`}
              </h4>
              <h4 className='font-mont text-sm font-light text-neutral-500'>
                {promoCode}
              </h4>
            </div>
          </div>
          <div className='col-span-1 row-start-1 row-end-3'>
            <div className='flex h-full w-full items-center justify-center'>
              <h4 className='font-mono font-semibold text-pink-600'>
                {voucherParticulars[1]} %
              </h4>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
