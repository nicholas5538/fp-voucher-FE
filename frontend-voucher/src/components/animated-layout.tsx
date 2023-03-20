import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { childrenNode } from '../constants/globalTypes';

const AnimatedLayout = ({ children, className }: childrenNode) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode='wait'>
        <m.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={className}
        >
          {children}
        </m.section>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default AnimatedLayout;
