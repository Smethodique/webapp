import { motion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  /** seconds between characters */
  stagger?: number;
  baseDelay?: number;
  once?: boolean;
}

/** Kinetic characters: opacity 0→1, y 24→0, blur 8→0, per-character stagger. */
export default function KineticText({ text, className, stagger = 0.03, baseDelay = 0, once = true }: KineticTextProps) {
  const chars = Array.from(text);
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
      transition={{ staggerChildren: stagger, delayChildren: baseDelay }}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
