import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 34,
  padding: 8,
  '& .MuiSwitch-switchBase': {
    top: 6,
    margin: 1,
    padding: 0,
    transform: 'translateX(4px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(30px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#e21b70',
    width: 20,
    height: 20,
    '&:before': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
    borderRadius: 20 / 2,
    border: '1px solid #ccc',
  },
}));

type Props = {
  onChange?: () => void;
};

const ToggleSwitch = ({ onChange }: Props) => {
  return <MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={onChange} />;
};

export default ToggleSwitch;
