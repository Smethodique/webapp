import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/** Simple in-view reveal: fade + rise. */
export default function Reveal({ children, delay = 0, y = 40, duration = 0.9, className, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: EASE_LUXE }}
    >
      {children}
    </motion.div>
  );
}
