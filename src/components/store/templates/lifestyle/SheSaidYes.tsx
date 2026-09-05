import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { ShaderHero } from '@/components/shaders';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { StoreShell, Stars, MapEmbed, LUXE } from './shared';

/** Intertwined rings ornament. */
function Rings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 40" className={className} fill="none" aria-hidden>
      <circle cx="26" cy="22" r="14" stroke="var(--store-accent)" strokeWidth="1.4" />
      <circle cx="46" cy="22" r="14" stroke="var(--store-primary)" strokeWidth="1.4" />
      <path d="M26 4 L30 10 L22 10 Z" fill="var(--store-accent)" />
    </svg>
  );
}

/** Flourish divider. */
function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 20" className={className} fill="none" aria-hidden>
      <path d="M0 10 Q 50 0 92 10" stroke="var(--store-accent)" strokeWidth="1" />
      <path d="M200 10 Q 150 20 108 10" stroke="var(--store-accent)" strokeWidth="1" />
      <circle cx="100" cy="10" r="3" fill="var(--store-primary)" />
      <circle cx="86" cy="10" r="1.4" fill="var(--store-accent)" />
      <circle cx="114" cy="10" r="1.4" fill="var(--store-accent)" />
    </svg>
  );
}

/** Floating petal dots (framer infinite float, staggered). */
function Petals() {
  const petals = [
    { top: '18%', insetStart: '8%', size: 10, delay: 0, dur: 7 },
    { top: '32%', insetStart: '86%', size: 7, delay: 1.2, dur: 9 },
    { top: '58%', insetStart: '14%', size: 6, delay: 0.6, dur: 8 },
    { top: '70%', insetStart: '78%', size: 9, delay: 2, dur: 10 },
    { top: '12%', insetStart: '60%', size: 5, delay: 1.6, dur: 7.5 },
    { top: '80%', insetStart: '40%', size: 8, delay: 0.3, dur: 8.5 },
  ];
  return (
    <>
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute z-10 rounded-full"
          style={{
            top: p.top,
            insetInlineStart: p.insetStart,
            width: p.size,
            height: p.size * 1.4,
            background: 'var(--store-primary)',
            opacity: 0.5,
            borderRadius: '50% 50% 50% 0',
          }}
          animate={{ y: [0, -26, 0], rotate: [0, 24, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      ))}
    </>
  );
}

/**
 * SHE SAID YES — cinematic petal romance. Petal shader hero with floating
 * petals and a ghost «نعم», double-gold-bordered scenario cards, film-reel
 * gallery, wax-seal love-letter reviews.
 */
export default function SheSaidYes({ store }: { store: StorePageTheme }) {
  return (
    <StoreShell store={store}>
      <div className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — petal cinema ─────────────────────────────── */}
        <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden" aria-label={store.name}>
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={store.shaderIntensity ?? 0.9}
            className="absolute inset-0"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(75% 60% at 50% 45%, transparent 30%, color-mix(in srgb, var(--store-bg) 82%, transparent) 95%)' }}
            aria-hidden
          />
          {/* ghost نعم */}
          <motion.span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14rem, 38vw, 34rem)', color: 'var(--store-primary)', opacity: 0.07, lineHeight: 1 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            نعم
          </motion.span>
          <Petals />

          <div className="container-atelier relative z-20 py-32 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: LUXE }}>
              <Rings className="mx-auto mb-8 h-12 w-20" />
            </motion.div>
            <motion.span
              className="kicker mb-6 block"
              style={{ color: 'var(--store-accent)', letterSpacing: '0.45em' }}
              dir="ltr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              SHE SAID YES — MARRAKECH
            </motion.span>
            <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block leading-[1.2] text-cream will-change-transform"
                    style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.6rem)', color: i === 1 ? 'var(--store-primary)' : undefined }}
                    initial={{ y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.2, delay: 0.6 + i * 0.16, ease: LUXE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mx-auto mt-8 max-w-[54ch] text-lead text-cream-muted"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.35, ease: LUXE }}
            >
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-9 py-4 font-semibold transition-transform duration-300 hover:scale-[1.05]"
                style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)', boxShadow: '0 10px 40px -10px var(--store-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
              <button
                onClick={() => scrollToTarget('#store-menu')}
                className="rounded-full border px-9 py-4 text-cream transition-colors hover:border-[var(--store-accent)]"
                style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 55%, transparent)' }}
              >
                {t(store, 'discover')}
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── SCENARIOS (services) ────────────────────────────── */}
        <section id="store-menu" className="py-24 md:py-36">
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <Rings className="mx-auto mb-6 h-10 w-16" />
              <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
                LES SCÉNARIOS
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
                {t(store, 'menu')}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {store.services.map((s, i) => (
                <motion.article
                  key={s.title}
                  className="group relative p-9 text-center transition-transform duration-500 hover:-translate-y-2"
                  style={{
                    background: 'var(--store-surface)',
                    border: '1px solid color-mix(in srgb, var(--store-accent) 45%, transparent)',
                    outline: '1px solid color-mix(in srgb, var(--store-accent) 22%, transparent)',
                    outlineOffset: '6px',
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: LUXE }}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: 'var(--store-accent)' }} dir="ltr">
                    Scène {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 mt-4 text-2xl font-bold text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.title}
                  </h3>
                  <Flourish className="mx-auto mt-5 h-4 w-32" />
                  <p className="mb-0 mt-5 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                  {s.price && (
                    <p className="mb-0 mt-6 font-mono text-sm font-bold" style={{ color: 'var(--store-primary)' }}>
                      {s.price}
                    </p>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── FILM REEL (gallery) ─────────────────────────────── */}
        <section id="store-gallery" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier mb-12 text-center">
            <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
              MOMENTS — 13K FOLLOW THE STORY
            </span>
            <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
              {t(store, 'gallery')}
            </h2>
          </div>
          {/* sprocket strip */}
          <div className="border-y py-3" style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 30%, transparent)', background: 'var(--store-bg)' }}>
            <div className="h-3" style={{ background: 'repeating-linear-gradient(90deg, transparent 0 18px, color-mix(in srgb, var(--store-primary) 35%, transparent) 18px 34px)' }} aria-hidden />
            <div className="mt-3 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:px-[12vw]">
              {store.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className="m-0 w-[80vw] shrink-0 snap-center sm:w-[52vw] lg:w-[36vw]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: LUXE }}
                >
                  <div className="overflow-hidden">
                    <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between text-sm text-cream-muted">
                    <span className="italic" style={{ fontFamily: 'var(--font-display)' }}>
                      {g.caption}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint" dir="ltr">
                      FRAME {String(i + 1).padStart(2, '0')}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
            <div className="mt-2 h-3" style={{ background: 'repeating-linear-gradient(90deg, transparent 0 18px, color-mix(in srgb, var(--store-primary) 35%, transparent) 18px 34px)' }} aria-hidden />
          </div>
        </section>

        {/* ── STORY — the proposal ────────────────────────────── */}
        <section id="store-story" className="py-24 md:py-36">
          <div className="container-atelier">
            <div className="mx-auto max-w-2xl text-center">
              <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
                {t(store, 'storyKicker')}
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                {store.story.title}
              </h2>
              <Flourish className="mx-auto mt-8 h-5 w-48" />
              <div className="mt-12 space-y-7 text-start">
                {store.story.body.map((p, i) => (
                  <motion.p
                    key={i}
                    className="m-0 text-lg leading-loose text-cream-muted"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: LUXE }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              {store.story.quote && (
                <motion.blockquote
                  className="m-0 mt-14"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, ease: LUXE }}
                >
                  <Rings className="mx-auto mb-6 h-10 w-16" />
                  <p className="m-0 text-2xl italic leading-snug text-cream md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                    «{store.story.quote.text}»
                  </p>
                  <footer className="mt-5 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--store-accent)' }}>
                    {store.story.quote.author}
                  </footer>
                </motion.blockquote>
              )}
            </div>
          </div>
        </section>

        {/* ── LOVE LETTERS (reviews) ──────────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
                LETTRES D'AMOUR
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                {t(store, 'reviews')}
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="relative m-0 p-9 pt-14 text-center"
                  style={{ background: 'var(--store-surface)', border: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                >
                  {/* wax seal */}
                  <span
                    className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-lg font-bold shadow-lg"
                    style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)', fontFamily: 'var(--font-display)' }}
                    aria-hidden
                  >
                    {r.author.trim().charAt(0)}
                  </span>
                  <Stars rating={r.rating} className="justify-center" />
                  <p className="mb-0 mt-5 leading-relaxed text-cream">{r.text}</p>
                  <footer className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-cream-faint">
                    {r.author}
                    {r.source ? ` · ${r.source}` : ''}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING ─────────────────────────────────────────── */}
        <StoreBooking store={store} />

        {/* ── COVERAGE + MAP ──────────────────────────────────── */}
        <section id="store-location" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-start">
              <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
                {t(store, 'locationKicker')}
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {t(store, 'location')}
              </h2>
              <p className="mt-6 text-lg text-cream-muted">{store.address}</p>
              <div className="mx-auto mt-8 max-w-md space-y-0 divide-y divide-line/50 lg:mx-0">
                {store.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between py-4 text-sm">
                    <span className="text-cream">{h.days}</span>
                    <span className="font-mono" style={{ color: /مغلق/.test(h.time) ? 'var(--text-faint)' : 'var(--store-primary)' }}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full border px-7 py-3 text-sm transition-colors hover:border-[var(--store-accent)]"
                style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 55%, transparent)' }}
              >
                {t(store, 'directions')}
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: LUXE }}
              className="p-3"
              style={{ border: '1px solid color-mix(in srgb, var(--store-accent) 45%, transparent)', outline: '1px solid color-mix(in srgb, var(--store-accent) 22%, transparent)', outlineOffset: '6px' }}
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
