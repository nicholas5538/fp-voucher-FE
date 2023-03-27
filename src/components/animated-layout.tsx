import { AnimatePresence, motion } from 'framer-motion';
import { childrenNode } from '../constants/globalTypes';

const AnimatedLayout = ({ children, className }: childrenNode) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
