import { DataGrid, type GridPaginationModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { lazy, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TPagination } from '../../constants/globalTypes';
import CustomToolBar from './CustomToolbar';
import tableColumns from './table-columns';
import { getVouchers } from '../../utils/api';

const LinearProgress = lazy(() =>
  import('@mui/material').then((module) => ({
    default: module.LinearProgress,
  })),
);
const NoRows = lazy(() => import('./NoRows'));

const DataTable = ({ offset, limit }: TPagination) => {
  const [searchParams, setSearchParams] = useSearchParams({
    offset,
    limit,
  });
  const [paginationModel, setPaginationModel] = useState({
    page: Number(offset) / Number(searchParams.get('limit')),
    pageSize: Number(searchParams.get('limit')),
  });

  const { data, isPreviousData } = useQuery({
    queryKey: ['vouchers', paginationModel],
    queryFn: ({ signal }) => getVouchers({ ...paginationModel, signal }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 2,
    suspense: true,
  });

  const handlePaginationModelChange = useCallback(
    (newPaginationModel: GridPaginationModel) => {
      const newOffset = `${
        newPaginationModel.page * newPaginationModel.pageSize
      }`;
      const newLimit = newPaginationModel.pageSize.toString();
      setPaginationModel(newPaginationModel);
      setSearchParams({
        offset: newOffset,
        limit: newLimit,
      });
      sessionStorage.setItem('offset', newOffset);
      sessionStorage.setItem('limit', newLimit);
    },
    [paginationModel],
  );

  const [rowCountState, setRowCountState] = useState<number>(data?.total || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.total !== undefined ? data?.total : prevRowCountState,
    );
  }, [data?.total, setRowCountState]);

  return (
    <DataGrid
      autoHeight
      columns={tableColumns}
      disableRowSelectionOnClick={true}
      getEstimatedRowHeight={() => 60}
      getRowHeight={() => 'auto'}
      loading={isPreviousData}
      rows={data?.vouchers ?? []}
      rowCount={rowCountState}
      pageSizeOptions={[5, 10, 25, 50]}
      paginationModel={paginationModel}
      paginationMode='server'
      onPaginationModelChange={handlePaginationModelChange}
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
    />
  );
};

export default DataTable;
