import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** px pull radius */
  radius?: number;
  /** max px translation */
  strength?: number;
  onClick?: () => void;
}

/** Magnetic CTA: translates toward cursor, inner label counter-translates. Springs back on leave. */
export default function MagneticButton({ children, className, radius = 120, strength = 8, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12 });
  const sy = useSpring(y, { stiffness: 150, damping: 12 });
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);
  const isx = useSpring(ix, { stiffness: 150, damping: 12 });
  const isy = useSpring(iy, { stiffness: 150, damping: 12 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      const pull = 1 - dist / radius;
      x.set(dx * pull * (strength / radius) * 4);
      y.set(dy * pull * (strength / radius) * 4);
      ix.set(-dx * pull * 0.06);
      iy.set(-dy * pull * 0.06);
    } else {
      x.set(0); y.set(0); ix.set(0); iy.set(0);
    }
  };
  const onLeave = () => { x.set(0); y.set(0); ix.set(0); iy.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
    >
      <motion.span style={{ x: isx, y: isy, display: 'inline-block' }}>{children}</motion.span>
    </motion.div>
  );
}
