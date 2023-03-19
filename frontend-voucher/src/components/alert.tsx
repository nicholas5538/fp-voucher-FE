import Alert, { type AlertProps } from '@mui/material/Alert';

type AlertComponentProps = AlertProps & {
  text: string;
};

const AlertComponent = ({ text, ...props }: AlertComponentProps) => {
  return <Alert {...props}>{text}</Alert>;
};

export default AlertComponent;
