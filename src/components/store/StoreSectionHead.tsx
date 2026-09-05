import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_LUXE } from './storeUtils';

interface Props {
  index: number; // section number, 1-based of 9
  kicker: string;
  title: string;
  centered?: boolean;
  className?: string;
}

/** Section heading: kicker + hairline + display H2 with line-mask reveal + section index counter. */
export default function StoreSectionHead({ index, kicker, title, centered, className }: Props) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className ?? ''}`}>
      <motion.div
        className={`mb-6 flex items-center gap-4 ${centered ? 'justify-center' : ''}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="hairline w-10"
          style={{ background: 'var(--store-primary)', originX: 0 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
        />
        <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
          {kicker}
        </span>
        <span className="font-mono text-xs text-cream-faint" dir="ltr">
          {String(index).padStart(2, '0')} / 09
        </span>
      </motion.div>
      <h2 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
        <span className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block text-h2 text-cream will-change-transform"
            initial={{ y: '110%', rotate: 2 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: EASE_LUXE }}
          >
            {title as ReactNode}
          </motion.span>
        </span>
      </h2>
    </div>
  );
}
