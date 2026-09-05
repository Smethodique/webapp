import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { ShaderHero } from '@/components/shaders';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { gsap, StoreShell, Stars, MapEmbed, ContactLinks, LUXE } from './shared';

/** Eight-point zellige star. */
function ZelligeStar({ className, color = 'var(--store-primary)' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <path
        d="M20 2 L24 12 L34 6 L28 16 L38 20 L28 24 L34 34 L24 28 L20 38 L16 28 L6 34 L12 24 L2 20 L12 16 L6 6 L16 12 Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1" />
    </svg>
  );
}

/** Zellige star lattice strip. */
function StarLattice() {
  return (
    <div className="flex items-center justify-center gap-6 py-6" aria-hidden>
      {Array.from({ length: 7 }).map((_, i) => (
        <ZelligeStar key={i} className={`h-5 w-5 ${i % 2 ? 'opacity-30' : 'opacity-60'}`} />
      ))}
    </div>
  );
}

/**
 * UP2YOU EVENT — Moroccan celebration journey. Royal bordeaux & gold,
 * henna→dakhla vertical timeline with a scroll-drawn gold thread,
 * double-framed gallery plates, zellige star lattice.
 */
export default function Up2youEvent({ store }: { store: StorePageTheme }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      /* golden thread draws itself down the journey */
      if (threadRef.current && timelineRef.current) {
        gsap.fromTo(
          threadRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 70%', end: 'bottom 55%', scrub: 1 },
          },
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <StoreShell store={store}>
      <div ref={rootRef} className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — royal frame ──────────────────────────────── */}
        <section className="relative flex min-h-[100dvh] items-center overflow-hidden" aria-label={store.name}>
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={store.shaderIntensity ?? 0.9}
            className="absolute inset-0"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, var(--store-bg) 8%, color-mix(in srgb, var(--store-bg) 35%, transparent) 60%)' }}
            aria-hidden
          />
          <div className="container-atelier relative z-10 grid items-center gap-14 py-32 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div
                className="mb-8 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <ZelligeStar className="h-7 w-7" />
                <span className="kicker" style={{ color: 'var(--store-primary)', letterSpacing: '0.4em' }} dir="ltr">
                  UP2YOU — GUÉLIZ · 4.9/5
                </span>
              </motion.div>
              <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
                {store.heroTitle.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block leading-[1.2] text-cream will-change-transform"
                      style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.6rem)', color: i === 1 ? 'var(--store-primary)' : undefined }}
                      initial={{ y: '112%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.2, delay: 0.45 + i * 0.15, ease: LUXE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                className="mt-8 max-w-[52ch] text-lead text-cream-muted"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: LUXE }}
              >
                {store.heroSub}
              </motion.p>
              <motion.div
                className="mt-10 flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.25, ease: LUXE }}
              >
                <button
                  onClick={() => scrollToTarget('#store-booking')}
                  className="px-9 py-4 font-bold transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, var(--store-primary), color-mix(in srgb, var(--store-primary) 70%, #fff))',
                    color: 'var(--store-on-primary)',
                    boxShadow: '0 12px 44px -12px var(--store-primary)',
                  }}
                >
                  {t(store, 'bookNow')}
                </button>
                <button
                  onClick={() => scrollToTarget('#store-menu')}
                  className="border px-9 py-4 text-cream transition-colors hover:border-[var(--store-primary)]"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 50%, transparent)' }}
                >
                  {t(store, 'discover')}
                </button>
              </motion.div>
            </div>

            {/* royal arch frame */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.7, ease: LUXE }}
            >
              <div
                className="p-3"
                style={{
                  border: '1px solid color-mix(in srgb, var(--store-primary) 65%, transparent)',
                  outline: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)',
                  outlineOffset: '7px',
                  borderRadius: '999px 999px 0 0',
                }}
              >
                <img src={store.heroImage} alt={store.name} className="aspect-[3/4] w-full object-cover" style={{ borderRadius: '999px 999px 0 0' }} />
              </div>
              <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-cream-faint">{store.city}</p>
            </motion.div>
          </div>
        </section>

        <StarLattice />

        {/* ── THE JOURNEY — henna → dakhla timeline ───────────── */}
        <section id="store-menu" className="py-24 md:py-36">
          <div className="container-atelier">
            <div className="mb-20 text-center">
              <ZelligeStar className="mx-auto mb-6 h-8 w-8" />
              <span className="kicker" style={{ color: 'var(--store-primary)', letterSpacing: '0.4em' }} dir="ltr">
                THE JOURNEY
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
                {store.heroTitle.join(' ')}
              </h2>
              <p className="mx-auto mt-4 max-w-[46ch] text-cream-muted">{store.tagline}</p>
            </div>

            <div ref={timelineRef} className="relative mx-auto max-w-4xl">
              {/* golden thread */}
              <div className="absolute inset-y-0 left-[19px] w-px md:left-1/2" style={{ background: 'color-mix(in srgb, var(--store-primary) 18%, transparent)' }} aria-hidden>
                <div
                  ref={threadRef}
                  className="h-full w-full origin-top"
                  style={{ background: 'linear-gradient(to bottom, var(--store-primary), var(--store-accent))' }}
                />
              </div>

              <div className="space-y-16 md:space-y-24">
                {store.services.map((s, i) => {
                  const leftSide = i % 2 === 0; // visual alternation (logical via order classes)
                  return (
                    <motion.article
                      key={s.title}
                      className={`relative grid items-center gap-6 pl-14 md:grid-cols-2 md:gap-16 md:pl-0`}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.9, ease: LUXE }}
                    >
                      {/* node */}
                      <span
                        className="absolute left-[1px] top-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs font-bold md:left-1/2 md:-translate-x-1/2"
                        style={{ background: 'var(--store-bg)', borderColor: 'var(--store-primary)', color: 'var(--store-primary)' }}
                        dir="ltr"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className={leftSide ? '' : 'md:order-2'}>
                        <h3 className="m-0 text-2xl font-bold text-cream md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                          {s.title}
                        </h3>
                        <p className="mb-0 mt-3 leading-relaxed text-cream-muted">{s.desc}</p>
                        {s.price && (
                          <p className="mb-0 mt-4">
                            <span
                              className="inline-block border px-4 py-1.5 font-mono text-sm font-bold"
                              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 55%, transparent)', color: 'var(--store-primary)' }}
                            >
                              {s.price}
                            </span>
                          </p>
                        )}
                      </div>
                      <div className={`hidden md:block ${leftSide ? 'md:order-2' : ''}`} aria-hidden>
                        <ZelligeStar className={`h-10 w-10 opacity-40 ${leftSide ? 'ms-auto me-2' : 'ms-2'}`} color="var(--store-accent)" />
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <StarLattice />

        {/* ── STORY — the boutique ────────────────────────────── */}
        <section id="store-story" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid items-center gap-14 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: LUXE }}
            >
              <div
                className="p-3"
                style={{
                  border: '1px solid color-mix(in srgb, var(--store-primary) 55%, transparent)',
                  outline: '1px solid color-mix(in srgb, var(--store-primary) 25%, transparent)',
                  outlineOffset: '7px',
                }}
              >
                <img src={store.aboutImage} alt={store.story.title} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              </div>
            </motion.div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="mb-6 flex items-center gap-4">
                <ZelligeStar className="h-5 w-5" />
                <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
                  {t(store, 'storyKicker')}
                </span>
              </div>
              <h2 className="m-0 mb-10 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                {store.story.title}
              </h2>
              <div className="space-y-6">
                {store.story.body.map((p, i) => (
                  <motion.p
                    key={i}
                    className="m-0 text-lg leading-loose text-cream-muted"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: LUXE }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              {store.story.quote && (
                <motion.blockquote
                  className="m-0 mt-10 border-y py-8 text-center"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 40%, transparent)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                >
                  <p className="m-0 text-2xl leading-snug text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    «{store.story.quote.text}»
                  </p>
                  <footer className="mt-4 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--store-accent)' }}>
                    {store.story.quote.author}
                  </footer>
                </motion.blockquote>
              )}
            </div>
          </div>
        </section>

        {/* ── GALLERY — royal plates ──────────────────────────── */}
        <section id="store-gallery" className="py-24 md:py-36">
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <span className="kicker" style={{ color: 'var(--store-primary)', letterSpacing: '0.4em' }} dir="ltr">
                SALLES &amp; DÉCORS
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
                {t(store, 'gallery')}
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {store.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className={`m-0 ${i === 1 ? 'md:mt-12' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                >
                  <div
                    className="p-2.5"
                    style={{
                      border: '1px solid color-mix(in srgb, var(--store-primary) 55%, transparent)',
                      outline: '1px solid color-mix(in srgb, var(--store-primary) 22%, transparent)',
                      outlineOffset: '5px',
                    }}
                  >
                    <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                  </div>
                  {g.caption && (
                    <figcaption className="mt-5 flex items-center justify-center gap-3 text-center text-sm text-cream-muted">
                      <ZelligeStar className="h-3.5 w-3.5 opacity-60" />
                      {g.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS — bordeaux cards ────────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <ZelligeStar className="mx-auto mb-5 h-7 w-7" />
              <span className="kicker" style={{ color: 'var(--store-primary)', letterSpacing: '0.4em' }} dir="ltr">
                4.9/5 — GOOGLE
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                {t(store, 'reviews')}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 p-8"
                  style={{ background: 'color-mix(in srgb, var(--store-accent) 26%, var(--store-surface))', border: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                >
                  <Stars rating={r.rating} />
                  <p className="mb-0 mt-5 leading-relaxed text-cream">{r.text}</p>
                  <footer className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}>
                    <span className="font-bold" style={{ color: 'var(--store-primary)' }}>
                      {r.author}
                    </span>
                    {r.source && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-cream-faint" dir="ltr">
                        {r.source}
                      </span>
                    )}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING ─────────────────────────────────────────── */}
        <StoreBooking store={store} />

        {/* ── VISIT ───────────────────────────────────────────── */}
        <section id="store-location" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <ZelligeStar className="h-5 w-5" />
                <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
                  {t(store, 'locationKicker')}
                </span>
              </div>
              <h2 className="m-0 mb-8 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {t(store, 'location')}
              </h2>
              <div className="divide-y divide-line/50 border-y" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
                {store.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between py-4 text-sm">
                    <span className="text-cream">{h.days}</span>
                    <span className="font-mono" style={{ color: /مغلق/.test(h.time) ? 'var(--text-faint)' : 'var(--store-primary)' }}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-cream-muted">{store.address}</p>
              <ContactLinks store={store} className="mt-6" />
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block border px-7 py-3 text-sm transition-colors hover:border-[var(--store-primary)] hover:text-[var(--store-primary)]"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 50%, transparent)' }}
              >
                {t(store, 'directions')}
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: LUXE }}
              className="p-3"
              style={{
                border: '1px solid color-mix(in srgb, var(--store-primary) 55%, transparent)',
                outline: '1px solid color-mix(in srgb, var(--store-primary) 22%, transparent)',
                outlineOffset: '6px',
              }}
            >
              <MapEmbed store={store} className="h-[400px]" />
            </motion.div>
          </div>
        </section>

        <StoreFooter store={store} />
      </div>
    </StoreShell>
  );
}
