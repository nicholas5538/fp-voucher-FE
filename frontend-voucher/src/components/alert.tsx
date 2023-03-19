import Alert, { type AlertProps } from '@mui/material/Alert';
import { AnimatePresence, motion } from 'framer-motion';

type AlertComponentProps = AlertProps & {
  text: string;
  shouldRender: boolean;
};

const AlertComponent = ({
  text,
  shouldRender,
  ...props
}: AlertComponentProps) => {
  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.aside
          className='w-full'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
        >
          <Alert {...props}>{text}</Alert>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default AlertComponent;
