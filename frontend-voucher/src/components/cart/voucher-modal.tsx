import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as VoucherIcon } from '/Users/r.chua/Desktop/react/fp-capstone/frontend-voucher/src/assets/voucher.svg';
import { Close } from '@mui/icons-material';

const StyledButton = styled(Button)`
  width: 100%;
  height: 3rem;
  box-shadow: none;
`;

const VoucherModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display='flex' marginY={6}>
        <VoucherIcon />
        <Typography
          sx={{ cursor: 'pointer' }}
          color='primary'
          marginLeft={2}
          onClick={handleClickOpen}
        >
          Apply a voucher
        </Typography>
      </Box>
      <Dialog
        sx={{ padding: 32, maxWidth: '768px', marginX: 'auto' }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography>Enter or select a voucher code</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContentText marginBottom={30}>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <DialogActions>
          <StyledButton
            variant='contained'
            onClick={() => {
              console.log('apply voucher');
            }}
          >
            <Typography variant='body2' fontFamily=''>
              Apply
            </Typography>
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VoucherModal;
