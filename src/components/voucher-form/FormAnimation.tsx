import type { MutableRefObject } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-light-react';
import downArrow from '../../assets/down_arrow.json';
import VoucherCard from '../voucher-card';

type FormAnimationProps = {
  lottieRef: MutableRefObject<LottieRefCurrentProps | null>;
  watchVoucherCard: [string, number, string, number, string];
};

export default function FormAnimation({
  lottieRef,
  watchVoucherCard,
}: FormAnimationProps) {
  return (
    <aside className='hidden w-[25%] rounded-lg xl:flex xl:w-3/6 xl:max-w-md xl:flex-col xl:items-center xl:justify-around'>
      <h1 className='cursor-default rounded-md bg-pink-400 px-6 py-4 text-center font-mont text-2xl text-gray-100 xl:text-3xl'>
        Voucher
      </h1>
      <Lottie
        lottieRef={lottieRef}
        className='max-w-[200px]'
        animationData={downArrow}
      />
      <VoucherCard voucherParticulars={watchVoucherCard} />
    </aside>
  );
}
