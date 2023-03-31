import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import { GridRowId } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../button';

type ActionButtonsParams = {
  id: GridRowId;
};

const ActionButtons = ({ id }: ActionButtonsParams) => {
  const navigate = useNavigate();
  const actions = [
    { label: 'Update', icon: <EditOutlinedIcon /> },
    { label: 'Delete', icon: <DeleteForeverOutlinedIcon /> },
  ];
  const actionButtons = (id: ActionButtonsParams['id']) =>
    actions.map(({ label, icon }, index) => (
      <ButtonComponent
        key={index + 1}
        isLoadingButton={false}
        label={label}
        onClick={() => {
          navigate(`${id}/${label.toLowerCase()}`);
        }}
        startIcon={icon}
      />
    ));

  return (
    <ButtonGroup aria-label='action buttons group'>
      {actionButtons(id)}
    </ButtonGroup>
  );
};

export default ActionButtons;
