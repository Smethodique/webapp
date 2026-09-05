import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShaderHero } from '@/components/shaders';
import { scrollToTarget } from '@/hooks/useLenis';
import type { StorePageTheme } from '@/data/stores';
import { EASE_LUXE, openState, t } from './storeUtils';

interface Props {
  store: StorePageTheme;
}

function MetaStrip({ store, className }: { store: StorePageTheme; className?: string }) {
  const state = openState(store.hours);
  const first = store.hours.find((h) => !h.closed);
  return (
    <motion.div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-cream-muted ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      {first && <span dir="ltr">{first.time}</span>}
      {first && <span className="text-cream-faint">·</span>}
      <span className="max-w-[38ch] truncate">{store.address}</span>
      <span className="text-cream-faint">·</span>
      <span className="inline-flex items-center gap-2" style={{ color: state.open ? 'var(--store-primary)' : 'var(--text-muted)' }}>
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${state.open ? 'animate-pulse-dot' : ''}`}
          style={{ background: state.open ? 'var(--store-primary)' : 'var(--text-faint)' }}
        />
        {state.open ? t(store, 'openNow') : state.nextOpen ? `${t(store, 'opensAt')} ${state.nextOpen}` : t(store, 'closedNow')}
      </span>
    </motion.div>
  );
}

function HeroContent({ store, centered }: { store: StorePageTheme; centered?: boolean }) {
  return (
    <>
      <motion.span
        className="kicker"
        style={{ color: 'var(--store-accent)' }}
        dir="ltr"
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: 1, letterSpacing: '0.28em' }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE_LUXE }}
      >
        {store.sectorLabel} — {store.city.toUpperCase()}
      </motion.span>
      <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
        {store.heroTitle.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className={`block text-display-xl text-cream will-change-transform ${centered ? 'text-[clamp(3.85rem,9.9vw,9.35rem)]' : ''}`}
              initial={{ y: '110%', rotate: 2 }}
              animate={{ y: '0%', rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: EASE_LUXE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.p
        className={`text-lead max-w-[52ch] text-cream-muted ${centered ? 'mx-auto' : ''}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE_LUXE }}
      >
        {store.heroSub}
      </motion.p>
      <motion.div
        className={`flex flex-wrap items-center gap-4 ${centered ? 'justify-center' : ''}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.25, ease: EASE_LUXE }}
      >
        <button
          onClick={() => scrollToTarget('#store-booking')}
          className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
          style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)', fontFamily: 'var(--font-body)' }}
        >
          {t(store, 'bookNow')}
        </button>
        <button
          onClick={() => scrollToTarget('#store-story')}
          className="rounded-full border border-line px-8 py-4 text-cream transition-colors duration-300 hover:border-[var(--store-primary)]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t(store, 'discover')}
        </button>
      </motion.div>
    </>
  );
}

export default function StoreHero({ store }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.75], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const variant = store.layoutVariant;

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden" aria-label={store.name}>
      {variant === 'mosaic' ? (
        /* Variant C — split hero: shader 60% inline-end, tinted panel 40% inline-start */
        <div className="grid min-h-[100dvh] lg:grid-cols-5">
          <div
            className="relative z-10 order-last flex flex-col justify-center gap-6 px-8 py-24 lg:order-first lg:col-span-2 lg:px-14"
            style={{ background: 'linear-gradient(var(--store-surface-tint), var(--store-surface-tint)), var(--store-bg, #141009)' }}
          >
            <div className="absolute inset-y-0 end-0 hidden w-px lg:block" style={{ background: 'var(--store-primary)', opacity: 0.3 }} />
            <HeroContent store={store} />
            <MetaStrip store={store} className="mt-6" />
          </div>
          <div className="relative min-h-[60dvh] lg:col-span-3 lg:min-h-[100dvh]">
            <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={1} className="absolute inset-0" />
          </div>
        </div>
      ) : (
        <>
          <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={1} className="absolute inset-0" />
          {/* scrim */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, color-mix(in srgb, var(--store-bg, #0E0C0A) 88%, transparent), color-mix(in srgb, var(--store-bg, #0E0C0A) 18%, transparent) 55%)',
            }}
          />
          <motion.div
            className={`container-atelier relative z-10 flex min-h-[100dvh] flex-col gap-6 py-28 ${
              variant === 'immersive' ? 'items-center justify-center text-center' : 'justify-end pb-24'
            }`}
            style={reduced ? undefined : { y, opacity }}
          >
            <HeroContent store={store} centered={variant === 'immersive'} />
            {variant === 'editorial' && <MetaStrip store={store} className="mt-4" />}
            {variant === 'immersive' && <MetaStrip store={store} className="mt-6 justify-center" />}
          </motion.div>
        </>
      )}
      {/* scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden h-10 w-px -translate-x-1/2 bg-cream-faint/40 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden
      >
        <span className="absolute top-0 h-2 w-2 -translate-x-1/2 animate-scroll-dot rounded-full" style={{ background: 'var(--store-primary)' }} />
      </motion.div>
    </section>
  );
}
