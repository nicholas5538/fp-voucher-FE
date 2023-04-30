import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import AnimatedLayout from '../components/animated-layout';
import { TPagination } from '../constants/globalTypes';
import SkeletonTable from '../components/table/SkeletonTable';
import DataTable from '../components/table/DataTable';
import useTitle from '../hooks/useTitle';

const VoucherTable = () => {
  useTitle('foodpanda Voucher Table');
  const [ref, { height }] = useMeasure();
  const pageInfo = useLoaderData() as TPagination;

  return (
    <AnimatedLayout className='mx-auto mt-8 flex max-w-7xl flex-col items-start space-y-6 px-6'>
      <div className='flex flex-row items-center'>
        <TableViewTwoToneIcon className='w-[40px]' />
        <h1>Voucher Data Table</h1>
      </div>
      <motion.div
        animate={{ height }}
        transition={{ duration: 0.4 }}
        className='w-full overflow-y-hidden'
      >
        <div ref={ref}>
          <Suspense fallback={<SkeletonTable />}>
            <DataTable {...pageInfo} />
          </Suspense>
        </div>
      </motion.div>
    </AnimatedLayout>
  );
};

export default VoucherTable;
