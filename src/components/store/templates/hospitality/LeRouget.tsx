import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { ShaderHero } from '@/components/shaders';
import { Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, EASE_SNAP, t } from '../../storeUtils';
import { KickerLine, Stars } from './atoms';

/** Art Déco corner ornament. */
function Corner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute h-8 w-8 ${className ?? ''}`} style={{ color: 'var(--store-accent)' }} fill="none" aria-hidden>
      <path d="M2 38 V12 Q2 2 12 2 H38" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 38 V16 Q8 8 16 8 H38" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
    </svg>
  );
}

/**
 * 05 · Le Rouget de l'Isle — French fine-dining villa.
 * Centered hero inside an Art Déco double frame over the dune shader; tabbed
 * « carte » with dot leaders; full-bleed gallery slider; rotating salon quotes.
 */
export default function LeRouget({ store }: { store: StorePageTheme }) {
  const tabs = store.menuTabs ?? [];
  const [tab, setTab] = useState(tabs[0] ?? '');
  const items = tabs.length ? store.services.filter((s) => s.group === tab) : store.services;

  const slides = [store.gallery[0], store.gallery[1], store.gallery[2], { src: store.heroImage, caption: store.name }].filter(Boolean);
  const [slide, setSlide] = useState(0);

  const quotes = store.reviews;
  const [quote, setQuote] = useState(0);

  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · shader + Art Déco framed card ——— */}
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5" aria-label={store.name}>
        <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={0.85} className="absolute inset-0" />
        <motion.div
          className="relative z-10 m-4 w-full max-w-3xl border px-8 py-16 text-center md:px-16 md:py-20"
          style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 55%, transparent)', background: 'color-mix(in srgb, var(--store-bg) 62%, transparent)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE_LUXE }}
        >
          <Corner className="left-2 top-2" />
          <Corner className="right-2 top-2 -scale-x-100" />
          <Corner className="bottom-2 left-2 -scale-y-100" />
          <Corner className="bottom-2 right-2 -scale-100" />

          <motion.p
            className="m-0 font-mono text-[11px] uppercase tracking-[0.4em]"
            style={{ color: 'var(--store-accent)' }}
            dir="ltr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {store.sectorLabel}
          </motion.p>
          <div className="mx-auto my-6 h-px w-24" style={{ background: 'var(--store-accent)' }} />
          <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="block text-cream will-change-transform"
                  style={{ fontSize: 'clamp(2.4rem, 5.6vw, 4.8rem)', lineHeight: 1.15 }}
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.55 + i * 0.14, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mx-auto mb-0 mt-7 max-w-[52ch] text-cream-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          {store.reservationNote && (
            <motion.p
              className="mx-auto mb-0 mt-6 max-w-[46ch] font-mono text-[11px] uppercase tracking-[0.18em] text-cream-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {store.reservationNote}
            </motion.p>
          )}
          <motion.div
            className="mt-9 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: EASE_LUXE }}
          >
            <button
              onClick={() => scrollToTarget('#store-booking')}
              className="rounded-full px-9 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
            >
              {t(store, 'bookNow')}
            </button>
            <button
              onClick={() => scrollToTarget('#store-menu')}
              className="rounded-full border px-9 py-4 text-cream transition-colors"
              style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 50%, transparent)' }}
            >
              {t(store, 'menu')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ——— STORY · centered column, drop cap, framed portrait ——— */}
      <section id="store-story" className="py-24 md:py-36">
        <div className="container-atelier">
          <div className="mx-auto max-w-3xl text-center">
            <KickerLine centered>{store.sectorLabel}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {store.story.title}
            </h2>
            <div className="mx-auto my-8 h-px w-16" style={{ background: 'var(--store-accent)' }} />
          </div>
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="space-y-6 text-lg leading-relaxed text-cream-muted lg:col-span-7">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <p className={`m-0 ${i === 0 ? 'first-letter:float-start first-letter:me-3 first-letter:text-6xl first-letter:leading-[0.9] first-letter:text-[var(--store-accent)]' : ''}`} style={i === 0 ? { fontFamily: 'inherit' } : undefined}>
                    {p}
                  </p>
                </Reveal>
              ))}
              {store.story.quote && (
                <blockquote className="m-0 pt-4 text-center">
                  <p className="m-0 text-2xl italic text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    « {store.story.quote.text} »
                  </p>
                  <footer className="mt-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--store-accent)' }}>
                    — {store.story.quote.author}
                  </footer>
                </blockquote>
              )}
            </div>
            <motion.div
              className="lg:col-span-4 lg:col-start-9"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE_LUXE }}
            >
              <div className="border p-3" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 45%, transparent)' }}>
                <div className="border p-2" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 25%, transparent)' }}>
                  <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                </div>
              </div>
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-cream-faint">Villa Cara — {store.city}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— MENU · la carte, tabbed with dot leaders ——— */}
      <section id="store-menu" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <div className="mx-auto max-w-3xl border px-6 py-12 md:px-14" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 40%, transparent)', background: 'color-mix(in srgb, var(--store-bg) 60%, transparent)' }}>
            <div className="text-center">
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: 'var(--store-accent)' }} dir="ltr">
                {t(store, 'menuKicker')}
              </p>
              <h2 className="m-0 mt-4 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                {t(store, 'menu')}
              </h2>
              <div className="mx-auto my-7 h-px w-16" style={{ background: 'var(--store-accent)' }} />
            </div>
            {tabs.length > 0 && (
              <div className="mb-12 flex flex-wrap justify-center gap-6" role="tablist">
                {tabs.map((label) => (
                  <button
                    key={label}
                    role="tab"
                    aria-selected={tab === label}
                    onClick={() => setTab(label)}
                    className="relative pb-2 text-sm uppercase tracking-[0.15em] transition-colors"
                    style={{ color: tab === label ? 'var(--store-accent)' : 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {label}
                    {tab === label && (
                      <motion.span
                        layoutId="rouget-tab"
                        className="absolute inset-x-0 bottom-0 h-px"
                        style={{ background: 'var(--store-accent)' }}
                        transition={{ duration: 0.4, ease: EASE_SNAP }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_LUXE }}
              >
                {items.map((item, i) => (
                  <div key={item.title} className="py-5">
                    <div className="flex items-baseline gap-4">
                      <h3 className="m-0 text-xl text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                        {item.title}
                      </h3>
                      <span aria-hidden className="mx-1 flex-1 border-b border-dotted" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 40%, transparent)' }} />
                      {item.price && (
                        <span className="shrink-0 font-mono text-base" style={{ color: 'var(--store-accent)' }}>
                          {item.price}
                        </span>
                      )}
                    </div>
                    <p className="mb-0 mt-1.5 max-w-[52ch] text-sm text-cream-muted">{item.desc}</p>
                    {item.note && <p className="mb-0 mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-cream-faint">{item.note}</p>}
                    {i < items.length - 1 && <span aria-hidden className="mt-5 block h-px bg-line/30" />}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ——— GALLERY · full-bleed slider ——— */}
      <section id="store-gallery" className="relative h-[80dvh] overflow-hidden md:h-[90dvh]" aria-label={t(store, 'gallery')}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={slide}
            src={slides[slide]!.src}
            alt={slides[slide]!.caption ?? store.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE_LUXE }}
          />
        </AnimatePresence>
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,5,4,0.75), transparent 45%)' }} />
        <div className="container-atelier absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 pb-10">
          <div>
            <p className="kicker m-0" style={{ color: 'var(--store-accent)' }} dir="ltr">
              {t(store, 'galleryKicker')}
            </p>
            <p className="mb-0 mt-3 text-xl text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {slides[slide]!.caption}
            </p>
          </div>
          <div className="flex items-center gap-4" dir="ltr">
            <button
              aria-label="previous"
              onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-[var(--store-accent)]"
            >
              ←
            </button>
            <span className="font-mono text-xs text-cream">
              {String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <button
              aria-label="next"
              onClick={() => setSlide((s) => (s + 1) % slides.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-[var(--store-accent)]"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · rotating salon quotes ——— */}
      <section id="store-reviews" className="py-24 md:py-36">
        <div className="container-atelier mx-auto max-w-3xl text-center">
          <KickerLine centered>{t(store, 'reviewsKicker')}</KickerLine>
          <div className="relative min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quote}
                className="m-0"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.7, ease: EASE_LUXE }}
              >
                <Stars rating={quotes[quote].rating} className="mb-6 justify-center" />
                <p className="m-0 text-2xl italic leading-relaxed text-cream md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                  « {quotes[quote].text} »
                </p>
                <footer className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-cream-faint">
                  {quotes[quote].author}
                  {quotes[quote].source && <span dir="ltr"> — {quotes[quote].source}</span>}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex justify-center gap-3">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuote(i)}
                aria-label={`${i + 1}`}
                className="h-2 w-2 rounded-full transition-all"
                style={{ background: i === quote ? 'var(--store-accent)' : 'var(--line)', transform: i === quote ? 'scale(1.4)' : undefined }}
              />
            ))}
          </div>
        </div>
      </section>

      <StoreBooking store={store} />
      <StoreMapHours store={store} />
      <StoreFooter store={store} />
    </>
  );
}
