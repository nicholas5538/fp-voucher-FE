import styled from 'styled-components';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { ReactComponent as VoucherIcon } from '../../assets/voucher.svg';
import { convertToDayjs, formatDate } from '../../utils/date';
import { FC } from 'react';

const StyledCard = styled(Card)<{ $isSelected: boolean; $isDisabled: boolean }>`
  display: flex;
  height: fit-content;
  box-shadow: rgba(150, 150, 150, 0.4) 0.2px 0.5px 3px 1px;
  margin-top: 0.6rem;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed !important' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? '0.5' : '1')};
  border: ${({ $isSelected }) => ($isSelected ? '1px solid #e21b70' : 'none')};
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 0.8px dotted grey;
  width: 100%;
  &.css-46bh2p-MuiCardContent-root:last-child {
    padding: 12px 16px;
  }
`;

const StyledVoucherIcon = styled(VoucherIcon)`
  align-self: center;
  margin: 0 1rem;
`;

const Title = styled(Typography)<{ $isSelected: boolean }>`
  font-weight: bold;
  white-space: nowrap;
  font-size: 1rem;
  margin-bottom: 2px;
  color: ${({ $isSelected }) => ($isSelected ? '#e21b70' : 'black')};
`;

const Discount = styled(Typography)`
  font-size: 1rem;
  display: inline-block;
  font-weight: 500;
  margin-left: auto;
`;

const Description = styled(Typography)`
  font-size: 0.9rem;
  margin-right: auto;
  font-weight: 200;
`;

const ExpiryDate = styled(Typography)`
  font-style: italic;
  font-size: 0.6rem;
  align-self: end;
  margin-left: 1rem;
`;

const MinSpending = styled(Typography)`
  font-style: italic;
  font-size: 0.7rem;
  font-weight: 400;
  align-self: end;
`;

type VoucherCardProps = {
  title: string;
  description: string;
  expiryDate: string;
  discount: number;
  id: string;
  minSpending: number;
  onSelect: () => void;
  isSelected: boolean;
  isDisabled?: boolean;
};

const VoucherCard: FC<VoucherCardProps> = ({
  title,
  description,
  expiryDate,
  discount,
  minSpending,
  onSelect,
  isSelected,
  isDisabled = false,
}) => {
  const formattedExpiryDate = formatDate({
    date: convertToDayjs(expiryDate),
    dateFormat: 'DD MMM YYYY',
  });

  return (
    <StyledCard
    onClick={() => {
      if (!isDisabled) {
        onSelect();
      }
    }}
    $isSelected={isSelected}
    $isDisabled={isDisabled}
  >
  
      <StyledVoucherIcon />
      <StyledCardContent>
        <Box display='flex'>
          <Title $isSelected={isSelected}>{title}</Title>
          <Discount color='primary'>{discount}%</Discount>
        </Box>
        <Box>
          <MinSpending textAlign='right'>Min. spend S${minSpending}</MinSpending>
        </Box>
        <Box display='flex'>
          <Description>{description}</Description>
          <ExpiryDate>Expires on {formattedExpiryDate}</ExpiryDate>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default VoucherCard;
