import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ButtonComponent from './button';

type ModalProps = {
  clickHandler: () => void;
  modalTitle: string;
  modalDesc: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  modalTitle,
  modalDesc,
  openModal,
  setOpenModal,
}: ModalProps) => {
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
          <ButtonComponent
            endIcon={<DoneIcon />}
            isLoadingButton={false}
            label='Yes'
            onClick={clickHandler}
          />
          <ButtonComponent
            endIcon={<CancelIcon />}
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
