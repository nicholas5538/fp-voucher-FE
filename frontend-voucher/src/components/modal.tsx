import DoneIcon from '@mui/icons-material/Done';
import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction } from 'react';
import ButtonComponent from './button';
import icons from './voucher-form/icons';

type ModalProps = {
  clickHandler: () => void;
  isSubmitting?: boolean;
  modalTitle: string;
  modalDesc: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const modalStyle = {
  display: 'grid',
  placeItems: 'center',
};

const boxStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  py: 2,
  px: 4,
};

const ModalComponent = ({
  clickHandler,
  isSubmitting,
  modalTitle,
  modalDesc,
  openModal,
  setOpenModal,
}: ModalProps) => {
  console.log(clickHandler);
  const firstButtonProps =
    modalTitle === 'Are you sure you want to delete the voucher?'
      ? {
          startIcon: icons.delete,
          isLoadingButton: true,
          isSubmitting: isSubmitting,
          label: 'Delete',
          onClick: clickHandler,
        }
      : {
          startIcon: <DoneIcon />,
          isLoadingButton: false,
          label: 'Yes',
          onClick: clickHandler,
        };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={modalStyle}
    >
      <Box sx={boxStyle}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {modalTitle}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2, mb: 2 }}>
          {modalDesc}
        </Typography>
        <ButtonGroup color='secondary' aria-label='secondary button group'>
          <ButtonComponent {...firstButtonProps} />
          <ButtonComponent
            startIcon={icons.cancel}
            isLoadingButton={false}
            label='No'
            onClick={() => setOpenModal((prevState) => !prevState)}
          />
        </ButtonGroup>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
