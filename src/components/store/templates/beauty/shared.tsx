import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ShaderHero } from '@/components/shaders';
import { MagneticButton } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import type { StorePageTheme } from '@/data/stores';
import { EASE_LUXE, readableOn, t } from '../../storeUtils';

export { EASE_LUXE, readableOn, t };

export const serif: CSSProperties = { fontFamily: 'var(--font-display)' };
export const body: CSSProperties = { fontFamily: 'var(--font-body)' };

export type BeautyStore = StorePageTheme;

/** Full-bleed animated shader canvas + legibility scrim for hero sections. */
export function ShaderBackdrop({
  store,
  intensity = 1,
  scrim = true,
  className = '',
}: {
  store: BeautyStore;
  intensity?: number;
  scrim?: boolean;
  className?: string;
}) {
  return (
    <>
      <ShaderHero
        variant={store.shader}
        colors={[store.colors.shaderA, store.colors.shaderB]}
        intensity={intensity}
        className={`absolute inset-0 ${className}`}
      />
      {scrim && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, color-mix(in srgb, var(--store-bg) 92%, transparent), color-mix(in srgb, var(--store-bg) 14%, transparent) 55%, color-mix(in srgb, var(--store-bg) 55%, transparent))',
          }}
        />
      )}
    </>
  );
}

/** Latin mono kicker with a growing hairline. */
export function Kicker({
  children,
  className = '',
  line = true,
}: {
  children: ReactNode;
  className?: string;
  line?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {line && (
        <motion.span
          aria-hidden
          className="hairline w-10 origin-right bg-gold-500 ltr:origin-left"
          style={{ background: 'var(--store-primary)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
        />
      )}
      <span className="kicker" dir="ltr" style={{ color: 'var(--store-primary)' }}>
        {children}
      </span>
    </div>
  );
}

/** Accent booking CTA with magnetic hover, scrolls to the booking section. */
export function BookCta({
  store,
  children,
  className = '',
}: {
  store: BeautyStore;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <MagneticButton className={className} onClick={() => scrollToTarget('#store-booking')}>
      <span
        className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold transition-transform"
        style={{ background: 'var(--store-accent)', color: readableOn(store.colors.accent), ...body }}
      >
        {children ?? t(store, 'bookNow')} <span aria-hidden>↗</span>
      </span>
    </MagneticButton>
  );
}

/** ★ rating row in the store primary color. */
export function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={className} style={{ color: 'var(--store-primary)', letterSpacing: '0.25em' }} aria-label={`${rating}/5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

/** Gold filigree divider — hairlines + diamond flourish. */
export function Filigree({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden style={{ color: 'var(--store-primary)' }}>
      <span className="h-px flex-1" style={{ background: 'linear-gradient(to left, currentColor, transparent)' }} />
      <svg width="46" height="20" viewBox="0 0 46 20" fill="none" className="shrink-0">
        <path d="M23 1 L28 10 L23 19 L18 10 Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="23" cy="10" r="2" fill="currentColor" />
        <path d="M1 10 H14 M32 10 H45" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="10" r="1.4" fill="currentColor" />
        <circle cx="38" cy="10" r="1.4" fill="currentColor" />
      </svg>
      <span className="h-px flex-1" style={{ background: 'linear-gradient(to right, currentColor, transparent)' }} />
    </div>
  );
}

/** Small mono chip (duration, meta). */
export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${className}`}
      style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)', color: 'var(--store-primary)' }}
      dir="ltr"
    >
      {children}
    </span>
  );
}

/** Default review card used by several templates (styled per template via className). */
export function ReviewCard({
  review,
  className = '',
  style,
}: {
  review: { text: string; author: string; rating: number; source?: string };
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.figure
      className={`m-0 ${className}`}
      style={style}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE_LUXE }}
    >
      <Stars rating={review.rating} className="mb-4 block text-sm" />
      <blockquote className="m-0 text-base leading-relaxed text-cream md:text-lg" style={serif}>
        “{review.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 font-mono text-xs text-cream-faint">
        <span className="text-cream-muted">{review.author}</span>
        {review.source && (
          <>
            <span aria-hidden style={{ color: 'var(--store-primary)' }}>
              ✦
            </span>
            <span dir="ltr">{review.source}</span>
          </>
        )}
      </figcaption>
    </motion.figure>
  );
}

/** Section heading combining kicker + masked display lines. */
export function Head({
  kicker,
  lines,
  className = '',
}: {
  kicker: string;
  lines: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <Kicker>{kicker}</Kicker>
      <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', lineHeight: 1.12 }}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 1, delay: i * 0.08, ease: EASE_LUXE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}
