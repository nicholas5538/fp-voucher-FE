import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import dayjs from 'dayjs';

type VoucherCardProps = {
  watchVoucherCard: [string, number, dayjs.Dayjs, number, string];
};

const VoucherCard = ({ watchVoucherCard }: VoucherCardProps) => {
  const minSpend = (
    Math.round(Number(watchVoucherCard[3]) * 100) / 100
  ).toFixed(2);
  const expiryDate = watchVoucherCard[2].format('DD MMM YYYY');
  const promoCode = watchVoucherCard[4].toUpperCase();

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
                {watchVoucherCard[0]}
              </h3>
              <h4 className='font-mont text-sm font-normal text-neutral-600'>
                Min. spend S$ {minSpend}
              </h4>
            </div>
          </div>
          <div className='col-span-4 row-start-5 row-end-6'>
            <div className='flex flex-row items-center justify-between px-4'>
              <h4 className='font-mont text-sm font-light text-neutral-500'>
                Use by {expiryDate}
              </h4>
              <h4 className='font-mont text-sm font-light text-neutral-500'>
                {promoCode}
              </h4>
            </div>
          </div>
          <div className='col-span-1 row-start-1 row-end-3'>
            <div className='flex h-full w-full items-center justify-center'>
              <h4 className='font-mono font-semibold text-pink-600'>
                {watchVoucherCard[1]} %
              </h4>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
