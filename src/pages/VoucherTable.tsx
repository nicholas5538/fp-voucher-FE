/* eslint-disable @typescript-eslint/no-non-null-assertion */
import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone';
import { LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import AnimatedLayout from '../components/animated-layout';
import CustomToolBar from '../components/table/CustomToolbar';
import NoRows from '../components/table/NoRows';
import SkeletonTable from '../components/table/SkeletonTable';
import tableColumns from '../components/table/table-columns';
import useTitle from '../hooks/useTitle';
import { getVouchers } from '../utils/api';

const VoucherTable = () => {
  useTitle('foodpanda Voucher Table');
  const [ref, { height }] = useMeasure();
  const [searchParams, setSearchParams] = useSearchParams({
    offset: '0',
    limit: '10',
  });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: Number(searchParams.get('limit')),
  });

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ['vouchers', paginationModel],
    queryFn: ({ signal }) => getVouchers({ ...paginationModel, signal }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const [rowCountState, setRowCountState] = useState<number>(data?.total || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.total !== undefined ? data?.total : prevRowCountState,
    );
    setSearchParams({
      offset: `${paginationModel.page * paginationModel.pageSize}`,
      limit: paginationModel.pageSize.toString(),
    });
  }, [data?.total, setRowCountState, paginationModel]);

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
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <DataGrid
              autoHeight
              getRowHeight={() => 'auto'}
              columns={tableColumns}
              rows={data!.vouchers}
              slots={{
                loadingOverlay: LinearProgress,
                noRowsOverlay: NoRows,
                toolbar: CustomToolBar,
              }}
              slotProps={{
                columnsPanel: {
                  disableHideAllButton: true,
                },
              }}
              sx={{
                boxShadow: 4,
                border: 2,
                borderColor: 'hsl(334, 79%, 50%)',
                fontFamily: 'Montserrat',
                '& .MuiDataGrid-cell:hover': {
                  color: 'hsl(334, 79%, 43%)',
                  backgroundColor: 'transparent',
                },
                overflowX: 'scroll',
              }}
              disableRowSelectionOnClick={true}
              rowCount={rowCountState}
              loading={isPreviousData}
              pageSizeOptions={[5, 10, 25, 50]}
              paginationModel={paginationModel}
              paginationMode='server'
              onPaginationModelChange={setPaginationModel}
            />
          )}
        </div>
      </motion.div>
    </AnimatedLayout>
  );
};

export default VoucherTable;
