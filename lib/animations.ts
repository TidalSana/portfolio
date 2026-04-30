import type { Variants } from 'framer-motion';

export const springConfig = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 50,
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springConfig, delay: 0.1 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springConfig },
};

export const slideInRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springConfig },
};
