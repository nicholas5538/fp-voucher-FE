import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { Dayjs } from 'dayjs';
import { formatDate } from '../../utils/date';
import ActionButtons from './ActionButtons';

const headerClassName = 'text-pink-400 tracking-widest';

const tableColumns: GridColDef[] = [
  {
    field: 'category',
    headerName: 'Category',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
  },
  {
    field: 'discount',
    headerName: 'Discount',
    width: 130,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      `${params.value} %`,
  },
  {
    field: 'minSpending',
    headerName: 'Min. Spending',
    width: 130,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      `S$ ${params.value}`,
  },
  {
    field: 'promoCode',
    headerName: 'Promo Code',
    width: 140,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 160,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<Dayjs>) =>
      formatDate({ date: params.value, dateFormat: 'DD MMM YYYY' }),
  },
  {
    field: 'expiryDate',
    headerName: 'Expiry Date',
    width: 160,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<Dayjs>) =>
      formatDate({ date: params.value, dateFormat: 'DD MMM YYYY' }),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    disableExport: true,
    sortable: false,
    hideable: false,
    width: 200,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
    renderCell: ActionButtons,
  },
];

export default tableColumns;
