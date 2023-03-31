import {
  type GridColDef,
  type GridValueFormatterParams,
} from '@mui/x-data-grid';
import { Dayjs } from 'dayjs';
import { formatDate } from '../../utils/date';
import ActionButtons from './ActionButtons';

const headerClassName = 'font-mont text-pink-400';
const valueFormatterDate = (date: Dayjs) =>
  formatDate({ date: date, dateFormat: 'DD MMM YYYY' });

const tableColumns: GridColDef[] = [
  {
    field: 'category',
    headerName: 'Category',
    minWidth: 100,
    align: 'left',
    headerAlign: 'left',
    headerClassName: headerClassName,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    maxWidth: 200,
    align: 'left',
    headerAlign: 'left',
    headerClassName: headerClassName,
  },
  {
    field: 'discount',
    headerName: 'Discount',
    minWidth: 120,
    align: 'left',
    headerAlign: 'left',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      `${params.value} %`,
  },
  {
    field: 'minSpending',
    headerName: 'Min. Spending',
    minWidth: 120,
    align: 'left',
    headerAlign: 'left',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      `S$ ${params.value}`,
  },
  {
    field: 'promoCode',
    headerName: 'Promo Code',
    minWidth: 140,
    align: 'left',
    headerAlign: 'left',
    headerClassName: headerClassName,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    minWidth: 160,
    align: 'left',
    headerAlign: 'left',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<Dayjs>) =>
      valueFormatterDate(params.value),
  },
  {
    field: 'expiryDate',
    headerName: 'Expiry Date',
    minWidth: 160,
    align: 'left',
    headerAlign: 'left',
    headerClassName: headerClassName,
    valueFormatter: (params: GridValueFormatterParams<Dayjs>) =>
      valueFormatterDate(params.value),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    disableExport: true,
    hideable: false,
    filterable: false,
    sortable: false,
    minWidth: 220,
    align: 'center',
    headerAlign: 'center',
    headerClassName: headerClassName,
    renderCell: ActionButtons,
  },
];

export default tableColumns;
