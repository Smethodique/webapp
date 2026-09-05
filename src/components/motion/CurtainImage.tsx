import { motion } from 'framer-motion';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface CurtainImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}

/** Curtain reveal: ink panel slides away (RTL-aware via logical origin) while image scales 1.15 → 1. */
export default function CurtainImage({ src, alt, className, imgClassName, delay = 0 }: CurtainImageProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, delay, ease: EASE_LUXE }}
      />
      <motion.div
        className="absolute inset-0 origin-right bg-ink-950 ltr:origin-left"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: delay + 0.1, ease: EASE_LUXE }}
      />
    </div>
  );
}
