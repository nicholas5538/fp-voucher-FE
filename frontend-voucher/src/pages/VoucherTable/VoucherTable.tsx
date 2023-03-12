import { LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getVouchers } from '../../utils/api';
import CustomToolBar from './CustomToolbar';
import NoRows from './NoRows';
import SkeletonTable from './SkeletonTable';
import tableColumns from './table-columns';

const VoucherTable = () => {
  document.title = 'Foodpanda Voucher Table';
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['vouchers', paginationModel],
    queryFn: () => getVouchers(paginationModel),
    keepPreviousData: true,
  });

  const [rowCountState, setRowCountState] = useState<number>(data?.total || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.total !== undefined ? data?.total : prevRowCountState
    );
  }, [data?.total, setRowCountState]);

  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <section className='mx-auto mt-8 flex max-w-7xl items-center px-4'>
      <div className='w-full'>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <DataGrid
            autoHeight
            columns={tableColumns}
            rows={data.vouchers}
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
            loading={isLoading}
            pageSizeOptions={[5, 10, 25, 50]}
            paginationModel={paginationModel}
            paginationMode='server'
            onPaginationModelChange={setPaginationModel}
          />
        )}
      </div>
    </section>
  );
};

export default VoucherTable;
