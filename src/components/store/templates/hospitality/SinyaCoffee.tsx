import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { ShaderHero } from '@/components/shaders';
import { KineticText, Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, t } from '../../storeUtils';
import { KickerLine, OpenChip, Stars } from './atoms';

/**
 * 04 · Sinya Coffee — roastery spec-sheet.
 * Dune-shader hero anchored bottom with a technical data strip; menu as a
 * mono "spec table"; masonry gallery; offset alternating reviews.
 */
export default function SinyaCoffee({ store }: { store: StorePageTheme }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const first = store.hours.find((h) => !h.closed);

  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · dune shader, bottom-anchored editorial + data strip ——— */}
      <section ref={heroRef} className="relative flex min-h-[100dvh] flex-col overflow-hidden" aria-label={store.name}>
        <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={1} className="absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in srgb, var(--store-bg) 55%, transparent), transparent 22%), linear-gradient(to top, color-mix(in srgb, var(--store-bg) 85%, transparent), transparent 55%)',
          }}
        />

        {/* top strip: brand + open state */}
        <motion.div
          className="container-atelier relative z-10 flex items-center justify-between gap-6 pt-28 font-mono text-xs text-cream-faint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span dir="ltr">{store.name} — {store.city.toUpperCase()}</span>
          <OpenChip store={store} />
        </motion.div>

        <motion.div className="container-atelier relative z-10 mt-auto pb-14 pt-40" style={{ y, opacity }}>
          <span className="kicker mb-6 block" style={{ color: 'var(--store-accent)' }} dir="ltr">
            {store.sectorLabel}
          </span>
          <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-display-xl text-cream will-change-transform"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="text-lead mt-6 max-w-[54ch] text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE_LUXE }}
          >
            <button
              onClick={() => scrollToTarget('#store-booking')}
              className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
            >
              {t(store, 'bookNow')}
            </button>
            <button
              onClick={() => scrollToTarget('#store-menu')}
              className="rounded-full border border-line px-8 py-4 text-cream transition-colors hover:border-[var(--store-primary)]"
            >
              {t(store, 'menu')}
            </button>
          </motion.div>

          {/* technical data strip */}
          <motion.div
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line/60 font-mono text-xs md:grid-cols-4"
            style={{ background: 'var(--line)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.35, ease: EASE_LUXE }}
          >
            {[
              ['SECTOR', store.sectorLabel],
              ['CITY', store.city.toUpperCase()],
              ['HOURS', first?.time ?? '—'],
              ['TAGLINE', store.tagline],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-4" style={{ background: 'color-mix(in srgb, var(--store-bg) 88%, transparent)' }}>
                <span className="block tracking-[0.25em] text-cream-faint" dir="ltr">
                  {k}
                </span>
                <span className="mt-2 block truncate text-cream" dir="auto">
                  {v}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ——— MENU · spec table ——— */}
      <section id="store-menu" className="py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine>{t(store, 'menuKicker')}</KickerLine>
          <h2 className="m-0 mb-4 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'menu')}
          </h2>
          <p className="mb-14 font-mono text-xs tracking-[0.2em] text-cream-faint" dir="ltr">
            SPEC SHEET — {store.services.length} ITEMS
          </p>
          <div className="overflow-hidden border border-line/60">
            {/* header row */}
            <div className="hidden grid-cols-[4rem_1fr_1fr_8rem] gap-6 border-b border-line/60 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint md:grid" dir="ltr">
              <span>REF</span>
              <span>ITEM</span>
              <span>NOTES</span>
              <span className="text-end">PRICE</span>
            </div>
            {store.services.map((item, i) => (
              <motion.div
                key={item.title}
                className="group grid gap-2 border-b border-line/40 px-6 py-5 transition-colors last:border-b-0 hover:bg-[var(--store-surface-tint)] md:grid-cols-[4rem_1fr_1fr_8rem] md:items-baseline md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_LUXE }}
              >
                <span className="font-mono text-sm" style={{ color: 'var(--store-primary)' }} dir="ltr">
                  S-{String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-lg font-semibold text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </span>
                <span className="text-sm text-cream-muted">{item.desc}</span>
                {item.price && (
                  <span className="font-mono text-base text-cream md:text-end" dir="auto">
                    {item.price}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— GALLERY · masonry columns ——— */}
      <section id="store-gallery" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'galleryKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'gallery')}
          </h2>
          <div className="columns-2 gap-5 md:columns-3 [&>*]:mb-5">
            {[...store.gallery, { src: store.aboutImage, caption: store.name }, { src: store.heroImage, caption: store.tagline }].map((g, i) => (
              <motion.figure
                key={i}
                className="group relative m-0 break-inside-avoid overflow-hidden"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE_LUXE }}
              >
                <img
                  src={g.src}
                  alt={g.caption ?? store.name}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 1 ? 'aspect-[3/4]' : i % 3 === 2 ? 'aspect-square' : 'aspect-[4/3]'}`}
                />
                {g.caption && (
                  <figcaption
                    className="absolute inset-x-0 bottom-0 translate-y-full px-4 py-3 font-mono text-xs text-cream transition-transform duration-500 group-hover:translate-y-0"
                    style={{ background: 'linear-gradient(to top, rgba(6,5,4,0.9), transparent)' }}
                  >
                    {g.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— STORY · kinetic title + clipped image ——— */}
      <section id="store-story" className="py-24 md:py-36">
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ clipPath: 'polygon(0 0, 100% 6%, 100% 100%, 0 94%)', opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE_LUXE }}
          >
            <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[4/5] w-full object-cover" style={{ clipPath: 'polygon(0 0, 100% 6%, 100% 100%, 0 94%)' }} />
          </motion.div>
          <div className="lg:col-span-6 lg:col-start-7">
            <KickerLine>{store.sectorLabel}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              <KineticText text={store.story.title} stagger={0.015} />
            </h2>
            <div className="mt-8 space-y-5 text-cream-muted">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="m-0 leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
            {store.story.quote && (
              <blockquote className="m-0 mt-10 border-s-2 ps-6" style={{ borderColor: 'var(--store-accent)' }}>
                <p className="m-0 text-lg italic text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  «{store.story.quote.text}»
                </p>
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · alternating offsets ——— */}
      <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine>{t(store, 'reviewsKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'reviews')}
          </h2>
          <div className="space-y-6">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className={`m-0 max-w-2xl border border-line/60 p-8 ${i % 2 ? 'md:ms-auto md:me-[8%]' : 'md:me-auto md:ms-[4%]'}`}
                style={{ background: 'var(--store-surface)' }}
                initial={{ opacity: 0, x: i % 2 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE_LUXE }}
              >
                <Stars rating={r.rating} className="mb-4" />
                <blockquote className="m-0 leading-relaxed text-cream">{r.text}</blockquote>
                <figcaption className="mt-5 font-mono text-xs text-cream-faint">
                  {r.author}
                  {r.source && <span dir="ltr"> · {r.source}</span>}
                </figcaption>
              </motion.figure>
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
