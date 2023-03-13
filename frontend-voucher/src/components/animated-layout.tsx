import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

type childrenNode = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

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
