import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { ShaderHero } from '@/components/shaders';
import { Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, t } from '../../storeUtils';
import { DirectionsLink, HoursRows, KickerLine, OpenChip, Stars } from './atoms';

/** Gold rule with center gem. */
function GoldRule({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ''}`} aria-hidden>
      <span className="h-px w-14" style={{ background: 'var(--store-accent)' }} />
      <span style={{ color: 'var(--store-accent)' }}>◆</span>
      <span className="h-px w-14" style={{ background: 'var(--store-accent)' }} />
    </div>
  );
}

/**
 * 09 · Lahlou & Co — haute pâtisserie vitrine.
 * Petal-shader hero with an arch-topped « vitrine » panel; menu as display-
 * case cards with gold caps; arch-masked gallery trio; salon-style reviews;
 * boutique info card.
 */
export default function LahlouCo({ store }: { store: StorePageTheme }) {
  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · petal shader + arch vitrine ——— */}
      <section className="relative flex min-h-[100dvh] items-end justify-center overflow-hidden px-5 pb-16 pt-32" aria-label={store.name}>
        <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={1} className="absolute inset-0" />
        <motion.div
          className="relative z-10 w-full max-w-2xl rounded-t-full border px-8 pb-14 pt-24 text-center md:px-14 md:pt-32"
          style={{
            borderColor: 'color-mix(in srgb, var(--store-accent) 60%, transparent)',
            borderBottom: 'none',
            background: 'linear-gradient(to top, color-mix(in srgb, var(--store-bg) 78%, transparent) 55%, color-mix(in srgb, var(--store-bg) 35%, transparent))',
            backdropFilter: 'blur(6px)',
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE_LUXE }}
        >
          <motion.p
            className="m-0 font-mono text-[11px] uppercase tracking-[0.4em]"
            style={{ color: 'var(--store-accent)' }}
            dir="ltr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {store.sectorLabel}
          </motion.p>
          <GoldRule className="my-6" />
          <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="block text-cream will-change-transform"
                  style={{ fontSize: 'clamp(2.4rem, 5.8vw, 4.6rem)', lineHeight: 1.12 }}
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.6 + i * 0.14, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mx-auto mb-0 mt-6 max-w-[50ch] text-cream-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
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
              style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 55%, transparent)' }}
            >
              {t(store, 'menu')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ——— MENU · vitrine display cards ——— */}
      <section id="store-menu" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <div className="text-center">
            <KickerLine centered>{t(store, 'menuKicker')}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {t(store, 'menu')}
            </h2>
            <GoldRule className="my-8" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {store.services.map((item, i) => (
              <motion.article
                key={item.title}
                className={`group relative flex flex-col border border-line/50 p-8 text-center transition-transform duration-500 hover:-translate-y-2 ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                style={{ background: 'var(--store-surface)' }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_LUXE }}
              >
                {/* gold vitrine cap */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: 'linear-gradient(to right, transparent, var(--store-accent), transparent)' }} />
                <span aria-hidden className="mx-auto mb-5 mt-1 text-lg" style={{ color: 'var(--store-accent)' }}>
                  ✦
                </span>
                <h3 className="m-0 text-xl text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </h3>
                <p className="mb-6 mt-3 flex-1 text-sm leading-relaxed text-cream-muted">{item.desc}</p>
                {item.note && (
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--store-primary)' }}>
                    {item.note}
                  </p>
                )}
                {item.price && (
                  <span className="font-mono text-base" style={{ color: 'var(--store-accent)' }}>
                    {item.price}
                  </span>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ——— STORY · arch portrait flanked by text ——— */}
      <section id="store-story" className="py-24 md:py-36">
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4 lg:col-start-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE_LUXE }}
          >
            <div className="overflow-hidden rounded-t-full border p-2" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 50%, transparent)' }}>
              <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[3/4] w-full rounded-t-full object-cover" />
            </div>
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
              {store.address}
            </p>
          </motion.div>
          <div className="lg:col-span-5 lg:col-start-7">
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
              <blockquote className="m-0 mt-10 text-center">
                <GoldRule className="mb-6" />
                <p className="m-0 text-2xl italic text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  « {store.story.quote.text} »
                </p>
                <footer className="mt-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--store-accent)' }}>
                  — {store.story.quote.author}
                </footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* ——— GALLERY · arch trio in the vitrine ——— */}
      <section id="store-gallery" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <div className="text-center">
            <KickerLine centered>{t(store, 'galleryKicker')}</KickerLine>
            <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {t(store, 'gallery')}
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl items-end gap-8 sm:grid-cols-3">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={g.src}
                className={`m-0 ${i === 1 ? 'sm:-translate-y-10' : ''}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: i === 1 ? undefined : 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.95, delay: i * 0.14, ease: EASE_LUXE }}
              >
                <span className="block overflow-hidden rounded-t-full border p-1.5" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 45%, transparent)', background: 'var(--store-surface)' }}>
                  <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[3/4] w-full rounded-t-full object-cover transition-transform duration-700 hover:scale-105" />
                </span>
                <figcaption className="mt-4 text-center font-mono text-xs text-cream-faint">{g.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · salon column ——— */}
      <section id="store-reviews" className="py-24 md:py-36">
        <div className="container-atelier mx-auto max-w-3xl">
          <div className="text-center">
            <KickerLine centered>{t(store, 'reviewsKicker')}</KickerLine>
            <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {t(store, 'reviews')}
            </h2>
          </div>
          <div className="space-y-10">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className="m-0 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_LUXE }}
              >
                <Stars rating={r.rating} className="mb-4 justify-center" />
                <blockquote className="m-0 text-xl italic leading-relaxed text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  « {r.text} »
                </blockquote>
                <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-cream-faint">
                  {r.author}
                  {r.source && <span dir="ltr"> — {r.source}</span>}
                </figcaption>
                {i < store.reviews.length - 1 && <GoldRule className="mt-10" />}
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <StoreBooking store={store} />

      {/* ——— LOCATION · boutique card ——— */}
      <section id="store-location" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <div className="mx-auto max-w-4xl border p-8 md:p-14" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 45%, transparent)', background: 'color-mix(in srgb, var(--store-bg) 55%, transparent)' }}>
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: 'var(--store-accent)' }} dir="ltr">
                  {t(store, 'locationKicker')}
                </p>
                <h2 className="m-0 mt-4 text-h3 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  {store.name}
                </h2>
                <p className="mt-5 leading-relaxed text-cream-muted">{store.address}</p>
                <div className="mt-5">
                  <OpenChip store={store} />
                </div>
                <DirectionsLink store={store} className="mt-8" />
              </div>
              <HoursRows store={store} className="self-center border-y border-line/50" />
            </div>
          </div>
        </div>
      </section>

      <StoreFooter store={store} />
    </>
  );
}
