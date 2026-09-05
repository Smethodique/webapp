import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { ShaderHero } from '@/components/shaders';
import { CurtainImage, Marquee, Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, EASE_SNAP, t } from '../../storeUtils';
import { DirectionsLink, HoursRows, KickerLine, OpenChip, Stars, WaveDivider } from './atoms';

/**
 * 06 · Nono Sea Taste — Mediterranean airy seafood.
 * Split photo/panel hero over a shader "horizon" strip with a wave divider;
 * tabbed catch-of-the-day menu; overlapping-images story; auto slider with
 * thumbnail rail; horizontal review cards.
 */
export default function NonoSeaTaste({ store }: { store: StorePageTheme }) {
  const tabs = store.menuTabs ?? [];
  const [tab, setTab] = useState(tabs[0] ?? '');
  const items = tabs.length ? store.services.filter((s) => s.group === tab) : store.services;

  const slides = store.gallery;
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · split photo / airy panel ——— */}
      <section className="relative min-h-[100dvh] overflow-hidden" aria-label={store.name}>
        <div className="grid min-h-[100dvh] lg:grid-cols-12">
          <div className="relative order-first min-h-[52dvh] lg:col-span-7 lg:min-h-[100dvh]">
            <CurtainImage src={store.heroImage} alt={store.name} className="absolute inset-0 h-full w-full" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to left, color-mix(in srgb, var(--store-bg) 55%, transparent), transparent 45%)' }}
            />
          </div>
          <div className="relative z-10 flex flex-col justify-center gap-7 px-8 py-20 md:px-14 lg:col-span-5">
            <motion.span
              className="kicker"
              style={{ color: 'var(--store-accent)' }}
              dir="ltr"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_LUXE }}
            >
              {store.sectorLabel}
            </motion.span>
            <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block text-display-lg text-cream will-change-transform"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: EASE_LUXE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="m-0 max-w-[46ch] leading-relaxed text-cream-muted"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE_LUXE }}
            >
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
              <OpenChip store={store} />
            </motion.div>
            {store.reservationNote && (
              <motion.p
                className="m-0 border-s-2 ps-4 font-mono text-xs leading-relaxed text-cream-faint"
                style={{ borderColor: 'var(--store-accent)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {store.reservationNote}
              </motion.p>
            )}
          </div>
        </div>

        {/* horizon strip: shader + marquee between hero and content */}
        <div className="relative">
          <div className="relative h-24 overflow-hidden md:h-32">
            <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={0.8} className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center">
              <Marquee duration={34} dir={store.dir}>
                {[store.tagline, ...store.services.slice(0, 3).map((s) => s.title)].map((w, i) => (
                  <span key={i} className="mx-8 whitespace-nowrap text-xl text-cream md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {w} <span className="mx-2" style={{ color: 'var(--store-primary)' }}>〜</span>
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
          <WaveDivider className="bg-transparent" />
        </div>
      </section>

      {/* ——— MENU · catch of the day, tabbed rows ——— */}
      <section id="store-menu" className="py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'menuKicker')}</KickerLine>
          <h2 className="m-0 mb-12 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'menu')}
          </h2>
          {tabs.length > 0 && (
            <div className="mb-14 flex flex-wrap justify-center gap-2" role="tablist">
              {tabs.map((label) => (
                <button
                  key={label}
                  role="tab"
                  aria-selected={tab === label}
                  onClick={() => setTab(label)}
                  className="relative rounded-full px-6 py-2.5 text-sm transition-colors duration-300"
                  style={{ color: tab === label ? 'var(--store-on-primary)' : 'var(--text-muted)' }}
                >
                  {tab === label && (
                    <motion.span
                      layoutId="nono-tab"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--store-accent)' }}
                      transition={{ duration: 0.4, ease: EASE_SNAP }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className="mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE_LUXE }}
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group flex items-baseline justify-between gap-6 border-b border-line/50 py-6"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_LUXE }}
                >
                  <div className="min-w-0">
                    <h3 className="m-0 text-h3 text-cream transition-colors duration-300 group-hover:text-[var(--store-accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <p className="mb-0 mt-1.5 text-sm text-cream-muted">{item.desc}</p>
                    {item.note && (
                      <p className="mb-0 mt-1 font-mono text-[11px]" style={{ color: 'var(--store-primary)' }}>
                        ◦ {item.note}
                      </p>
                    )}
                  </div>
                  {item.price && (
                    <span className="shrink-0 font-mono text-base" style={{ color: 'var(--store-accent)' }} dir="auto">
                      {item.price}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ——— STORY · overlapping images ——— */}
      <section id="store-story" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <CurtainImage src={store.aboutImage} alt={store.name} className="aspect-[4/5] w-4/5" />
            <motion.div
              className="absolute -bottom-10 end-0 w-3/5 border-8"
              style={{ borderColor: 'var(--store-bg)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE_LUXE }}
            >
              <img src={store.gallery[1]?.src ?? store.heroImage} alt={store.gallery[1]?.caption ?? store.name} loading="lazy" className="aspect-square w-full object-cover" />
            </motion.div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
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
            {store.story.quote && (
              <blockquote className="m-0 mt-10">
                <WaveDivider className="mb-6 h-6" />
                <p className="m-0 text-xl italic text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  «{store.story.quote.text}»
                </p>
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* ——— GALLERY · auto slider + thumbnail rail ——— */}
      <section id="store-gallery" className="py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine>{t(store, 'galleryKicker')}</KickerLine>
          <h2 className="m-0 mb-12 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'gallery')}
          </h2>
          <div className="relative aspect-[16/9] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={slide}
                src={slides[slide].src}
                alt={slides[slide].caption ?? store.name}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: EASE_LUXE }}
              />
            </AnimatePresence>
            <div
              className="absolute inset-x-0 bottom-0 px-6 py-4 text-sm text-cream"
              style={{ background: 'linear-gradient(to top, rgba(6,5,4,0.8), transparent)' }}
            >
              {slides[slide].caption}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {slides.map((g, i) => (
              <button
                key={g.src}
                onClick={() => setSlide(i)}
                className="relative aspect-[16/9] overflow-hidden transition-opacity"
                style={{ opacity: i === slide ? 1 : 0.45, outline: i === slide ? '2px solid var(--store-accent)' : 'none', outlineOffset: 2 }}
                aria-label={g.caption ?? `${i + 1}`}
              >
                <img src={g.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · horizontal card row ——— */}
      <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine>{t(store, 'reviewsKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'reviews')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className="m-0 flex flex-col border-t-2 p-7"
                style={{ borderColor: 'var(--store-accent)', background: 'var(--store-surface)' }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_LUXE }}
              >
                <Stars rating={r.rating} className="mb-4" />
                <blockquote className="m-0 flex-1 leading-relaxed text-cream">{r.text}</blockquote>
                <figcaption className="mt-6 font-mono text-xs text-cream-faint">
                  {r.author}
                  {r.source && <span dir="ltr"> · {r.source}</span>}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <StoreBooking store={store} />

      {/* ——— LOCATION · airy hours panel ——— */}
      <section id="store-location" className="py-24 md:py-36">
        <div className="container-atelier grid gap-12 lg:grid-cols-2">
          <HoursRows store={store} className="self-start border-y border-line/60" />
          <div>
            <KickerLine>{t(store, 'locationKicker')}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {t(store, 'location')}
            </h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-cream-muted">{store.address}</p>
            <div className="mt-5">
              <OpenChip store={store} />
            </div>
            <DirectionsLink store={store} className="mt-8" />
          </div>
        </div>
      </section>

      <StoreFooter store={store} />
    </>
  );
}
