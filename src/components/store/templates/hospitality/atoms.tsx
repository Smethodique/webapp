import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { openState, t } from '../../storeUtils';

/** Small open/closed live chip (Africa/Casablanca aware). */
export function OpenChip({ store, className }: { store: StorePageTheme; className?: string }) {
  const state = openState(store.hours);
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs ${className ?? ''}`}
      style={{ color: state.open ? 'var(--store-primary)' : 'var(--text-faint)' }}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${state.open ? 'animate-pulse-dot' : ''}`}
        style={{ background: state.open ? 'var(--store-primary)' : 'var(--text-faint)' }}
      />
      {state.open ? t(store, 'openNow') : state.nextOpen ? `${t(store, 'opensAt')} ${state.nextOpen}` : t(store, 'closedNow')}
    </span>
  );
}

/** Animated star row. */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`flex gap-1 leading-none ${className ?? ''}`} aria-label={`${rating}/5`} dir="ltr">
      {[1, 2, 3, 4, 5].map((s) => (
        <motion.span
          key={s}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: s * 0.06 }}
          style={{ color: s <= rating ? 'var(--store-primary)' : 'var(--text-faint)' }}
        >
          ★
        </motion.span>
      ))}
    </span>
  );
}

/** Compact hours rows with closed state. */
export function HoursRows({ store, className }: { store: StorePageTheme; className?: string }) {
  return (
    <div className={`divide-y divide-line/60 ${className ?? ''}`}>
      {store.hours.map((h, i) => (
        <motion.div
          key={h.days}
          className="flex items-center justify-between gap-6 py-3.5 font-mono text-sm"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.06 }}
        >
          <span className={h.closed ? 'text-cream-faint' : 'text-cream'}>{h.days}</span>
          <span dir="ltr" style={{ color: h.closed ? 'var(--text-faint)' : 'var(--store-primary)' }}>
            {h.closed ? t(store, 'closed') : h.time}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** Google Maps directions pill link. */
export function DirectionsLink({ store, className }: { store: StorePageTheme; className?: string }) {
  return (
    <a
      href={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-block rounded-full border border-line px-6 py-3 text-sm text-cream transition-colors hover:border-[var(--store-primary)] ${className ?? ''}`}
    >
      {t(store, 'directions')}
    </a>
  );
}

/** Kicker label + growing hairline, in-view. */
export function KickerLine({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <motion.div
      className={`mb-6 flex items-center gap-4 ${centered ? 'justify-center' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className="hairline w-10"
        style={{ background: 'var(--store-primary)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
        {children}
      </span>
    </motion.div>
  );
}

/** Masked line-reveal heading (display font). */
export function MaskedTitle({ lines, className, as = 'h2' }: { lines: React.ReactNode[]; className?: string; as?: 'h2' | 'h3' }) {
  const Tag = as;
  return (
    <Tag className={`m-0 ${className ?? ''}`} style={{ fontFamily: 'var(--font-display)' }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block text-h2 text-cream will-change-transform"
            initial={{ y: '110%', rotate: 2 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.05, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Decorative corner tape for polaroid/sticker looks. */
export function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-6 w-20 rotate-[-4deg] ${className ?? ''}`}
      style={{ background: 'color-mix(in srgb, var(--store-accent) 55%, transparent)', backdropFilter: 'blur(2px)' }}
    />
  );
}

/** Wavy SVG divider. */
export function WaveDivider({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-14 ${flip ? 'rotate-180' : ''} ${className ?? ''}`}
    >
      <path
        d="M0 30 C 240 60 480 0 720 30 C 960 60 1200 0 1440 30"
        fill="none"
        stroke="var(--store-primary)"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  );
}
