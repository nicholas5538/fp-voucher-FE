import { DataGrid, type GridPaginationModel } from '@mui/x-data-grid';
import { useSuspenseQuery } from '@tanstack/react-query';
import { lazy, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TPagination } from '../../constants/globalTypes';
import CustomToolBar from './CustomToolbar';
import { useUserContext } from '../../hooks/useUserContext';
import tableColumns from './table-columns';
import { getVouchers } from '../../utils/api';

const LinearProgress = lazy(() =>
  import('@mui/material').then((module) => ({
    default: module.LinearProgress,
  })),
);
const NoRows = lazy(() => import('./NoRows'));

const DataTable = ({ offset, limit }: TPagination) => {
  const { cookies } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams({
    offset,
    limit,
  });
  const [paginationSettings, setPaginationSettings] = useState(() => {
    return {
      offset: Number(searchParams.get('offset')),
      limit: Number(searchParams.get('limit')),
    };
  });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationSettings.offset / paginationSettings.limit,
    pageSize: paginationSettings.limit,
  });

  const { data } = useSuspenseQuery({
    queryKey: ['vouchers', { ...paginationSettings, token: cookies.jwt }],
    queryFn: ({ signal }) =>
      getVouchers({
        ...paginationSettings,
        signal,
        token: cookies.jwt!,
      }),
    gcTime: 2 * 60 * 1000,
    retry: 2,
    retryOnMount: true,
    staleTime: 0,
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
      setPaginationSettings({
        offset: Number(newOffset),
        limit: Number(newLimit),
      });
      sessionStorage.setItem('offset', newOffset);
      sessionStorage.setItem('limit', newLimit);
    },
    [paginationModel],
  );

  const [rowCountState, setRowCountState] = useState(data?.totalVouchers ?? 0);
  useEffect(() => {
    setRowCountState((prevState) => {
      return data?.totalVouchers ? data?.totalVouchers : prevState;
    });
  }, [data?.totalVouchers]);

  return (
    <DataGrid
      autoHeight
      columns={tableColumns}
      disableRowSelectionOnClick={true}
      getEstimatedRowHeight={() => 60}
      getRowHeight={() => 'auto'}
      getRowId={(row) => row['id']}
      rows={(data?.results as unknown as readonly never[]) ?? []}
      rowCount={rowCountState}
      pageSizeOptions={[5, 10, 25, 50]}
      paginationModel={paginationModel}
      paginationMode="server"
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
