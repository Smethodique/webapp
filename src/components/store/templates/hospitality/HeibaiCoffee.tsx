import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { ShaderHero } from '@/components/shaders';
import { CurtainImage, Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, t } from '../../storeUtils';
import { DirectionsLink, HoursRows, KickerLine, OpenChip, Stars } from './atoms';

/**
 * 01 · HeiBai Coffee — Japanese-minimal grid.
 * Fullscreen steam shader hero with fine hairline grid + vertical edge labels;
 * numbered minimal menu; asymmetric gallery; one oversized rotating quote.
 */
export default function HeibaiCoffee({ store }: { store: StorePageTheme }) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setQuoteIdx((q) => (q + 1) % store.reviews.length), 6500);
    return () => clearInterval(id);
  }, [store.reviews.length]);
  const review = store.reviews[quoteIdx];

  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · centered type over steam shader, hairline grid overlay ——— */}
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden" aria-label={store.name}>
        <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={0.9} className="absolute inset-0" />
        {/* hairline grid — Japanese minimal frame */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[5]">
          {[1, 2, 3].map((i) => (
            <span key={`v${i}`} className="absolute inset-y-0 w-px bg-cream/10" style={{ insetInlineStart: `${i * 25}%` }} />
          ))}
          <span className="absolute inset-x-0 top-1/4 h-px bg-cream/10" />
          <span className="absolute inset-x-0 top-3/4 h-px bg-cream/10" />
          {/* crosshair marks at intersections */}
          {[25, 50, 75].map((x) =>
            [25, 75].map((y) => (
              <span key={`${x}-${y}`} className="absolute font-mono text-[10px] text-cream-faint" style={{ insetInlineStart: `calc(${x}% - 4px)`, top: `calc(${y}% - 7px)` }}>
                +
              </span>
            )),
          )}
        </div>
        {/* vertical edge labels */}
        <motion.div
          aria-hidden
          className="absolute inset-y-0 right-6 z-10 hidden items-center md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span className="font-mono text-[11px] tracking-[0.5em] text-cream-faint" style={{ writingMode: 'vertical-rl' }} dir="ltr">
            黒 白 — HEIBAI COFFEE
          </span>
        </motion.div>
        <motion.div
          aria-hidden
          className="absolute inset-y-0 left-6 z-10 hidden items-center md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span className="font-mono text-[11px] tracking-[0.5em] text-cream-faint" style={{ writingMode: 'vertical-rl' }} dir="ltr">
            {store.sectorLabel} · {store.city.toUpperCase()}
          </span>
        </motion.div>

        <div className="container-atelier relative z-10 flex flex-col items-center gap-7 py-28 text-center">
          <motion.span
            className="kicker"
            style={{ color: 'var(--store-accent)' }}
            dir="ltr"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.28em' }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_LUXE }}
          >
            {store.tagline}
          </motion.span>
          <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-display-xl text-cream will-change-transform"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.15, delay: 0.45 + i * 0.13, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="text-lead max-w-[46ch] text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE_LUXE }}
          >
            <button
              onClick={() => scrollToTarget('#store-booking')}
              className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
            >
              {t(store, 'bookNow')}
            </button>
            <OpenChip store={store} />
          </motion.div>
        </div>
      </section>

      {/* ——— STORY · strict grid, oversized pull quote ——— */}
      <section id="store-story" className="py-24 md:py-36">
        <div className="container-atelier grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <KickerLine>{store.sectorLabel}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {store.story.title}
            </h2>
            <div className="mt-8 space-y-5 text-cream-muted">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="m-0 leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <CurtainImage src={store.aboutImage} alt={store.name} className="aspect-[4/5] w-full" />
            {store.story.quote && (
              <blockquote className="m-0 mt-10 border-s-2 ps-6" style={{ borderColor: 'var(--store-primary)' }}>
                <p className="m-0 text-h3 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  «{store.story.quote.text}»
                </p>
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* ——— MENU · numbered minimal list ——— */}
      <section id="store-menu" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'menuKicker')}</KickerLine>
          <h2 className="m-0 mb-16 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'menu')}
          </h2>
          <div className="mx-auto max-w-4xl">
            {store.services.map((item, i) => (
              <motion.div
                key={item.title}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-5 border-b border-line/50 py-7 transition-colors duration-300 hover:bg-[var(--store-surface-tint)]"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_LUXE }}
              >
                <span className="font-mono text-sm text-cream-faint" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-h3 text-cream transition-transform duration-300 rtl:group-hover:-translate-x-2 ltr:group-hover:translate-x-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-cream-muted">{item.desc}</span>
                </span>
                {item.price && (
                  <span className="font-mono text-base" style={{ color: 'var(--store-primary)' }} dir="auto">
                    {item.price}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— GALLERY · asymmetric zen grid ——— */}
      <section id="store-gallery" className="py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine>{t(store, 'galleryKicker')}</KickerLine>
          <div className="grid gap-5 md:grid-cols-12">
            <div className="md:col-span-7">
              <CurtainImage src={store.gallery[0]?.src ?? store.heroImage} alt={store.gallery[0]?.caption ?? store.name} className="aspect-[4/3] w-full" />
              <p className="mt-3 font-mono text-xs text-cream-faint">01 — {store.gallery[0]?.caption}</p>
            </div>
            <div className="flex flex-col gap-5 md:col-span-5 md:pt-20">
              {store.gallery.slice(1).map((g, i) => (
                <div key={g.src}>
                  <CurtainImage src={g.src} alt={g.caption ?? store.name} className="aspect-[4/3] w-full" delay={0.15 + i * 0.1} />
                  <p className="mt-3 font-mono text-xs text-cream-faint" dir="ltr">
                    {String(i + 2).padStart(2, '0')} — {g.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · one oversized rotating quote ——— */}
      <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier text-center">
          <KickerLine centered>{t(store, 'reviewsKicker')}</KickerLine>
          <div className="relative mx-auto min-h-[15rem] max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quoteIdx}
                className="m-0"
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                transition={{ duration: 0.8, ease: EASE_LUXE }}
              >
                <Stars rating={review.rating} className="mb-6 justify-center" />
                <p className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  «{review.text}»
                </p>
                <footer className="mt-6 font-mono text-xs text-cream-faint">
                  {review.author} {review.source ? `· ${review.source}` : ''}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {store.reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                aria-label={`${i + 1}`}
                className="h-1 w-8 rounded-full transition-colors"
                style={{ background: i === quoteIdx ? 'var(--store-primary)' : 'var(--line)' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ——— BOOKING ——— */}
      <StoreBooking store={store} />

      {/* ——— LOCATION · minimal facts, no map frame ——— */}
      <section id="store-location" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid gap-12 lg:grid-cols-2">
          <div>
            <KickerLine>{t(store, 'locationKicker')}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {t(store, 'location')}
            </h2>
            <p className="mt-6 max-w-[44ch] text-cream-muted">{store.address}</p>
            <div className="mt-6">
              <OpenChip store={store} />
            </div>
            <DirectionsLink store={store} className="mt-8" />
          </div>
          <HoursRows store={store} className="self-center border-y border-line/60" />
        </div>
      </section>

      <StoreFooter store={store} />
    </>
  );
}
