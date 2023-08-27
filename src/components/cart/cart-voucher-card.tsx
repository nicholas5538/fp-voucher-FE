import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { ReactComponent as VoucherIcon } from '../../assets/voucher.svg';
import { formatDate } from '../../utils/date';
import type { dataReceivedType } from '../../constants/globalTypes';

const StyledCard = styled(Card)<{ $isSelected: boolean; $isDisabled: boolean }>`
  display: flex;
  height: fit-content;
  box-shadow: rgba(150, 150, 150, 0.4) 0.2px 0.5px 3px 1px;
  margin-top: 0.6rem;
  cursor: ${({ $isDisabled }) =>
    $isDisabled ? 'not-allowed !important' : 'pointer'};
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

  @media (max-width: 500px) {
    display: none;
  }
`;
const ExpiryDate = styled(Typography)`
  font-style: italic;
  font-size: 0.6rem;
  align-self: end;
  margin-left: 1rem;
  @media (max-width: 500px) {
    text-align: right;
  }
`;

const MinSpending = styled(Typography)`
  font-style: italic;
  font-size: 0.7rem;
  font-weight: 400;
  align-self: end;
  text-align: right;
  @media (max-width: 500px) {
    text-align: left;
  }
`;

const StyledBold = styled.b`
  font-weight: 600;
`;

const ExtraInfo = styled(Box)`
  @media (max-width: 500px) {
    display: flex;
    justify-content: space-between;
  }
`;

type VoucherCardProps = Omit<
  dataReceivedType,
  'action' | 'startDate' | 'promoCode' | 'category' | 'expiryDate'
> & {
  expiryDate: Date;
  title: string;
  onSelect: () => void;
  isSelected: boolean;
  isDisabled?: boolean;
};

const VoucherCard = ({
  title,
  description,
  expiryDate,
  discount,
  minSpending,
  onSelect,
  isSelected,
  isDisabled = false,
}: VoucherCardProps) => {
  const formattedExpiryDate = formatDate({
    date: expiryDate,
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
        <Box display='flex' justifyContent='space-between'>
          <Box alignSelf='end'>
            <Description>{description}</Description>
          </Box>
          <ExtraInfo>
            <MinSpending>
              Min. spend S$<StyledBold>{minSpending}</StyledBold>
            </MinSpending>
            <ExpiryDate>
              Expires on <StyledBold>{formattedExpiryDate}</StyledBold>
            </ExpiryDate>
          </ExtraInfo>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default VoucherCard;
