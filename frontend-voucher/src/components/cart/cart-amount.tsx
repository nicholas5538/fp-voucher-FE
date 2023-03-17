import { FC } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import styled from 'styled-components';

type CartAmountProps = {
  subTotal: number;
  platformFee: number;
};

const StyledIcon = styled(InfoOutlinedIcon)`
  cursor: pointer;
  stroke: white;
  stroke-width: 0.8px;
`;

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 220,
    padding: 10,
    backgroundColor: 'rgba(86, 97, 106, 1)',
    fontSize: 14,
  },
});

const CartAmount: FC<CartAmountProps> = ({ subTotal, platformFee }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOnClick = () => {
    setOpen(!open);
  };

  const total = subTotal + platformFee;

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' marginBottom={1}>
        <Typography fontWeight={100}>Subtotal</Typography>
        <Typography fontWeight={100}>S$ {subTotal.toFixed(2)}</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between' marginBottom={1}>
        <Box display='flex'>
          <Typography fontWeight={100} marginRight={1}>
            Platform fee
          </Typography>
          <CustomWidthTooltip
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            title='This fee goes into providing you better customer care and app experience
             '
            placement='top-start'
            arrow
          >
            <StyledIcon onClick={handleOnClick} />
          </CustomWidthTooltip>
        </Box>
        <Typography fontWeight={100}>S$ {platformFee.toFixed(2)}</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex'>
          <Typography marginRight={1}>Total</Typography>
          <Typography fontWeight={100} fontSize={10} alignSelf='center'>
            (incl. GST where applicable)
          </Typography>
        </Box>
        <Typography>S$ {total.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default CartAmount;
