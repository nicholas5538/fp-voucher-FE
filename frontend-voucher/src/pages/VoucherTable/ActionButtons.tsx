import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import { GridRowId } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import ButtonComponent from '../../components/button';
import { voucherFormValues } from '../../constants/globalTypes';

type ActionButtonsParams = {
  id: GridRowId;
  row: voucherFormValues;
};

const ActionButtons = ({ id, row }: ActionButtonsParams) => {
  const navigate = useNavigate();
  const actions = [
    { label: 'Update', icon: <EditOutlinedIcon /> },
    { label: 'Delete', icon: <DeleteForeverOutlinedIcon /> },
  ];
  const actionButtons = (
    id: ActionButtonsParams['id'],
    row: ActionButtonsParams['row']
  ) =>
    actions.map(({ label, icon }, index) => (
      <ButtonComponent
        key={index + 1}
        endIcon={icon}
        isLoadingButton={false}
        label={label}
        onClick={() => {
          navigate(`${id}/${label.toLowerCase()}`, {
            state: {
              action: label,
              id: id,
            },
          });
        }}
      />
    ));

  return (
    <ButtonGroup aria-label='action buttons group'>
      {actionButtons(id, row)}
    </ButtonGroup>
  );
};

export default ActionButtons;
