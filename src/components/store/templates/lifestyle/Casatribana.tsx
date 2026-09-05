import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { gsap, StoreShell, Stars, MapEmbed, ContactLinks, LUXE } from './shared';

/** Radiating sun lines, slowly rotating (GSAP). */
function SunRays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        const inner = 62;
        const outer = i % 2 === 0 ? 96 : 82;
        return (
          <line
            key={i}
            x1={100 + inner * Math.cos(a)}
            y1={100 + inner * Math.sin(a)}
            x2={100 + outer * Math.cos(a)}
            y2={100 + outer * Math.sin(a)}
            stroke="var(--store-accent)"
            strokeWidth="1"
            opacity="0.5"
          />
        );
      })}
      <circle cx="100" cy="100" r="56" fill="none" stroke="var(--store-accent)" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

const ARCH = '999px 999px 0 0';

/**
 * CASATRIBANA — boho-chic, sun-washed. Arched imagery, rotating sun rays,
 * masonry gallery, polaroid reviews, arch-top service cards.
 */
export default function Casatribana({ store }: { store: StorePageTheme }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (sunRef.current) gsap.to(sunRef.current, { rotation: 360, duration: 140, repeat: -1, ease: 'none' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <StoreShell store={store}>
      <div ref={rootRef} className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — sun arch ─────────────────────────────────── */}
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-end overflow-hidden pb-0" aria-label={store.name}>
          {/* warm wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 70% at 50% 20%, color-mix(in srgb, var(--store-primary) 16%, var(--store-bg)) 0%, var(--store-bg) 70%)',
            }}
            aria-hidden
          />
          {/* rotating sun */}
          <div ref={sunRef} className="pointer-events-none absolute left-1/2 top-[16%] h-[42rem] w-[42rem] -translate-x-1/2 opacity-60" aria-hidden>
            <SunRays className="h-full w-full" />
          </div>

          <div className="container-atelier relative z-10 flex flex-col items-center pt-32 text-center">
            <motion.span
              className="kicker mb-6"
              style={{ color: 'var(--store-accent)' }}
              dir="ltr"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {store.name} — SIDI GHANEM
            </motion.span>
            <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block leading-[1.15] text-cream will-change-transform"
                    style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.8rem)', color: i === 1 ? 'var(--store-accent)' : undefined }}
                    initial={{ y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, delay: 0.4 + i * 0.14, ease: LUXE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mt-6 max-w-[50ch] text-lead text-cream-muted"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: LUXE }}
            >
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.04]"
                style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
              <button
                onClick={() => scrollToTarget('#store-gallery')}
                className="rounded-full border px-8 py-4 text-cream transition-colors hover:border-[var(--store-accent)]"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 45%, transparent)' }}
              >
                {t(store, 'gallery')}
              </button>
            </motion.div>

            {/* arch image rising from the fold */}
            <motion.div
              className="relative mt-14 w-full max-w-2xl"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.7, ease: LUXE }}
            >
              <div className="overflow-hidden border border-b-0 p-3 pb-0" style={{ borderRadius: ARCH, borderColor: 'color-mix(in srgb, var(--store-accent) 45%, transparent)' }}>
                <img src={store.heroImage} alt={store.name} className="aspect-[4/3] w-full object-cover" style={{ borderRadius: ARCH }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES — arch-top cards ───────────────────────── */}
        <section id="store-menu" className="py-24 md:py-32">
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <span className="kicker" style={{ color: 'var(--store-accent)' }} dir="ltr">
                PIÈCES &amp; SERVICES
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                {t(store, 'menu')}
              </h2>
            </div>
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-5 lg:overflow-visible">
              {store.services.map((s, i) => (
                <motion.article
                  key={s.title}
                  className="group flex w-[78vw] shrink-0 snap-center flex-col border p-7 pt-12 text-center transition-transform duration-300 hover:-translate-y-2 sm:w-[46vw] lg:w-auto"
                  style={{
                    borderRadius: ARCH,
                    borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)',
                    background: i % 2 ? 'var(--store-surface)' : 'var(--store-surface-tint)',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: LUXE }}
                >
                  <span
                    className="mx-auto mb-6 flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm"
                    style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 text-xl font-bold text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.title}
                  </h3>
                  <p className="mb-0 mt-3 flex-1 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                  {s.price && (
                    <p className="mb-0 mt-6 font-mono text-sm font-bold" style={{ color: 'var(--store-accent)' }}>
                      {s.price}
                    </p>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── STORY — arch panel ──────────────────────────────── */}
        <section id="store-story" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div
              className="mx-auto max-w-5xl border p-8 md:p-16"
              style={{ borderRadius: ARCH, borderColor: 'color-mix(in srgb, var(--store-accent) 40%, transparent)' }}
            >
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: LUXE }}
                >
                  <img src={store.aboutImage} alt={store.story.title} className="aspect-[3/4] w-full object-cover" style={{ borderRadius: ARCH }} loading="lazy" />
                </motion.div>
                <div>
                  <span className="kicker" style={{ color: 'var(--store-accent)' }} dir="ltr">
                    {t(store, 'storyKicker')}
                  </span>
                  <h2 className="m-0 mb-8 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 3.8vw, 3rem)' }}>
                    {store.story.title}
                  </h2>
                  <div className="space-y-5">
                    {store.story.body.map((p, i) => (
                      <motion.p
                        key={i}
                        className="m-0 leading-loose text-cream-muted"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: i * 0.08, ease: LUXE }}
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>
                  {store.story.quote && (
                    <motion.blockquote
                      className="m-0 mt-8 border-s-2 ps-5"
                      style={{ borderColor: 'var(--store-accent)' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9 }}
                    >
                      <p className="m-0 text-xl italic leading-snug text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                        «{store.story.quote.text}»
                      </p>
                      <footer className="mt-3 text-sm text-cream-faint">— {store.story.quote.author}</footer>
                    </motion.blockquote>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY — sun-washed masonry ────────────────────── */}
        <section id="store-gallery" className="py-24 md:py-32">
          <div className="container-atelier">
            <div className="mb-14 flex items-end justify-between gap-6">
              <div>
                <span className="kicker" style={{ color: 'var(--store-accent)' }} dir="ltr">
                  LE MONDE CASATRIBANA
                </span>
                <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                  {t(store, 'gallery')}
                </h2>
              </div>
              {store.instagram && (
                <a href={store.instagram} target="_blank" rel="noreferrer" className="hidden font-mono text-xs uppercase tracking-widest text-cream-muted transition-colors hover:text-[var(--store-accent)] md:block" dir="ltr">
                  @casatribana ↗
                </a>
              )}
            </div>
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
              {store.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className="m-0 break-inside-avoid"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: LUXE }}
                >
                  <img
                    src={g.src}
                    alt={g.caption ?? store.name}
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ borderRadius: i % 2 === 0 ? ARCH : '12px', aspectRatio: i % 2 === 0 ? '3/4' : '4/3' }}
                  />
                  {g.caption && <figcaption className="mt-3 text-sm text-cream-muted">{g.caption}</figcaption>}
                </motion.figure>
              ))}
              {/* interleaved manifesto tile */}
              {store.story.quote && (
                <motion.div
                  className="break-inside-avoid border p-8 text-center"
                  style={{ borderRadius: '12px', borderColor: 'color-mix(in srgb, var(--store-accent) 40%, transparent)', background: 'var(--store-surface-tint)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: LUXE }}
                >
                  <p className="m-0 text-xl italic leading-snug text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {store.tagline}
                  </p>
                  <p className="mb-0 mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint" dir="ltr">
                    Boho-chic · Maroc
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── REVIEWS — polaroids ─────────────────────────────── */}
        <section id="store-reviews" className="overflow-hidden py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <span className="kicker" style={{ color: 'var(--store-accent)' }} dir="ltr">
                {t(store, 'reviewsKicker')} — INSTAGRAM
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                {t(store, 'reviews')}
              </h2>
            </div>
            <div className="flex flex-wrap items-start justify-center gap-8">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 w-full max-w-sm p-6 pb-8 shadow-xl sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                  style={{ background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: [-2.5, 1.5, -1][i % 3] }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                  whileHover={{ rotate: 0, scale: 1.03 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Stars rating={r.rating} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cream-faint" dir="ltr">
                      {r.source ?? 'DM'}
                    </span>
                  </div>
                  <p className="m-0 leading-relaxed text-cream">{r.text}</p>
                  <footer className="mt-6 border-t border-line/50 pt-4 text-sm font-bold" style={{ color: 'var(--store-accent)' }}>
                    {r.author}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING ─────────────────────────────────────────── */}
        <StoreBooking store={store} />

        {/* ── VISIT — arch map ────────────────────────────────── */}
        <section id="store-location" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              className="order-last lg:order-first"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: LUXE }}
            >
              <div className="overflow-hidden border p-3" style={{ borderRadius: ARCH, borderColor: 'color-mix(in srgb, var(--store-accent) 45%, transparent)' }}>
                <MapEmbed store={store} className="h-[400px]" />
              </div>
            </motion.div>
            <div>
              <span className="kicker" style={{ color: 'var(--store-accent)' }} dir="ltr">
                SUR RENDEZ-VOUS
              </span>
              <h2 className="m-0 mb-8 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {t(store, 'location')}
              </h2>
              <div className="space-y-4">
                {store.hours.map((h, i) => (
                  <motion.div
                    key={h.days}
                    className="flex items-center justify-between gap-4 border-b border-line/50 pb-4"
                    initial={{ opacity: 0, x: store.dir === 'rtl' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  >
                    <span className="text-cream">{h.days}</span>
                    <span className="font-mono text-sm" style={{ color: /مغلق/.test(h.time) ? 'var(--text-faint)' : 'var(--store-accent)' }}>
                      {h.time}
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 text-cream-muted">{store.address}</p>
              <ContactLinks store={store} className="mt-6" />
            </div>
          </div>
        </section>

        <StoreFooter store={store} />
      </div>
    </StoreShell>
  );
}
