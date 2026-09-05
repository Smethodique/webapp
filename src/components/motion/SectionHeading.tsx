import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface SectionHeadingProps {
  /** Latin/French kicker label */
  kicker?: string;
  /** heading lines — each line rises from its mask */
  lines: ReactNode[];
  className?: string;
  as?: 'h1' | 'h2';
  /** run animation on mount instead of in-view (for heroes) */
  immediate?: boolean;
  baseDelay?: number;
}

/** Section heading with kicker line-grow + per-line mask reveal. */
export default function SectionHeading({ kicker, lines, className, as = 'h2', immediate = false, baseDelay = 0 }: SectionHeadingProps) {
  const Tag = as;
  const anim = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0.6 } as const };

  return (
    <div className={className}>
      {kicker && (
        <div className="mb-6 flex items-center gap-4">
          <motion.span
            className="hairline w-10 origin-right bg-gold-500"
            initial={{ scaleX: 0 }}
            {...anim}
            variants={{ visible: { scaleX: 1 } }}
            transition={{ duration: 0.8, delay: baseDelay, ease: EASE_LUXE }}
          />
          <motion.span
            className="kicker text-gold-500"
            dir="ltr"
            lang="fr"
            initial={{ opacity: 0 }}
            {...anim}
            variants={{ visible: { opacity: 1 } }}
            transition={{ duration: 0.6, delay: baseDelay + 0.15 }}
          >
            {kicker}
          </motion.span>
        </div>
      )}
      <Tag className="m-0">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block will-change-transform"
              initial={{ y: '110%', rotate: 2 }}
              {...anim}
              variants={{ visible: { y: '0%', rotate: 0 } }}
              transition={{ duration: 1.1, delay: baseDelay + 0.1 + i * 0.09, ease: EASE_LUXE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
