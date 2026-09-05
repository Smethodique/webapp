import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { gsap, StoreShell, Stars, ROMAN, LUXE } from './shared';

function Laurel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" className={className} fill="none" stroke="var(--store-accent)" strokeWidth="1" aria-hidden>
      <path d="M10 20 Q 40 4 58 12" />
      <path d="M110 20 Q 80 4 62 12" />
      {[14, 24, 34, 44].map((x, i) => (
        <ellipse key={x} cx={x} cy={17 - i * 2} rx="4.5" ry="2" transform={`rotate(-30 ${x} ${17 - i * 2})`} fill="var(--store-accent)" stroke="none" opacity="0.8" />
      ))}
      {[106, 96, 86, 76].map((x, i) => (
        <ellipse key={x} cx={x} cy={17 - i * 2} rx="4.5" ry="2" transform={`rotate(30 ${x} ${17 - i * 2})`} fill="var(--store-accent)" stroke="none" opacity="0.8" />
      ))}
      <circle cx="60" cy="12" r="2" fill="var(--store-accent)" stroke="none" />
    </svg>
  );
}

/**
 * SPARTACUS FIGHT FITNESS — gladiator-dark cinematic template.
 * Letterboxed hero with slow Ken Burns push, roman-numeral program list,
 * parallax triptych, laurel-framed quotes.
 */
export default function SpartacusFight({ store }: { store: StorePageTheme }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const tripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      /* slow cinematic push on the hero still */
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { scale: 1.18, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: heroImgRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
          },
        );
      }
      /* triptych parallax — three panels at three speeds */
      if (tripRef.current) {
        gsap.utils.toArray<HTMLElement>('[data-triptych]', tripRef.current).forEach((panel, i) => {
          gsap.fromTo(
            panel,
            { yPercent: [6, -10, 10][i % 3] },
            {
              yPercent: [-6, 8, -12][i % 3],
              ease: 'none',
              scrollTrigger: { trigger: tripRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
            },
          );
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <StoreShell store={store}>
      <div ref={rootRef} className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — cinematic letterbox ──────────────────────── */}
        <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden" aria-label={store.name}>
          <img ref={heroImgRef} src={store.heroImage} alt={store.name} className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 60% at 50% 55%, color-mix(in srgb, var(--store-bg) 20%, transparent), color-mix(in srgb, var(--store-bg) 88%, transparent) 90%)',
            }}
            aria-hidden
          />
          {/* letterbox bars */}
          <motion.div className="absolute inset-x-0 top-0 z-20 bg-black" initial={{ height: 0 }} animate={{ height: 'clamp(28px, 6vh, 64px)' }} transition={{ duration: 1.4, delay: 0.2, ease: LUXE }} aria-hidden />
          <motion.div className="absolute inset-x-0 bottom-0 z-20 bg-black" initial={{ height: 0 }} animate={{ height: 'clamp(28px, 6vh, 64px)' }} transition={{ duration: 1.4, delay: 0.2, ease: LUXE }} aria-hidden />

          <div className="container-atelier relative z-10 py-32 text-center">
            <motion.p
              className="kicker mb-8"
              style={{ color: 'var(--store-accent)', letterSpacing: '0.5em' }}
              dir="ltr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              SPARTACVS · MAÂRIF · CASABLANCA
            </motion.p>
            <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`block leading-[1.15] text-cream will-change-transform ${i === 1 ? 'italic' : ''}`}
                    style={{ fontSize: 'clamp(2.6rem, 7vw, 6.5rem)', color: i === 1 ? 'var(--store-primary)' : undefined }}
                    initial={{ y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.2, delay: 0.9 + i * 0.16, ease: LUXE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: LUXE }}
            >
              <Laurel className="mx-auto mt-8 h-6 w-40" />
            </motion.div>
            <motion.p
              className="mx-auto mt-8 max-w-[54ch] text-lead text-cream-muted"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6, ease: LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.75, ease: LUXE }}
            >
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-9 py-4 font-semibold transition-transform duration-300 hover:scale-[1.04]"
                style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
              <button
                onClick={() => scrollToTarget('#store-story')}
                className="rounded-full border px-9 py-4 text-cream transition-colors hover:border-[var(--store-accent)]"
                style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 50%, transparent)' }}
              >
                {t(store, 'discover')}
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── STORY — Act I, drop cap ─────────────────────────── */}
        <section id="store-story" className="py-28 md:py-40">
          <div className="container-atelier">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                className="kicker"
                style={{ color: 'var(--store-accent)', letterSpacing: '0.5em' }}
                dir="ltr"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                ACT I — {store.sectorLabel}
              </motion.span>
              <h2 className="m-0 mt-6 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                {store.story.title}
              </h2>
              <Laurel className="mx-auto mt-8 h-6 w-40" />
            </div>
            <div className="mx-auto mt-14 max-w-2xl space-y-8">
              {store.story.body.map((p, i) => (
                <motion.p
                  key={i}
                  className="m-0 text-lg leading-loose text-cream-muted"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: LUXE }}
                >
                  {i === 0 ? (
                    <>
                      <span
                        className="float-start me-4 mt-1 leading-[0.8]"
                        style={{ fontFamily: 'var(--font-display)', fontSize: '4.6rem', color: 'var(--store-primary)' }}
                        aria-hidden
                      >
                        {p.trim().charAt(0)}
                      </span>
                      {p.trim().slice(1)}
                    </>
                  ) : (
                    p
                  )}
                </motion.p>
              ))}
              {store.story.quote && (
                <motion.blockquote
                  className="m-0 border-y py-10 text-center"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-accent) 40%, transparent)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                >
                  <p className="m-0 text-2xl italic leading-snug text-cream md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
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

        {/* ── PROGRAM — roman numerals ────────────────────────── */}
        <section id="store-menu" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
                  THE PROGRAM
                </span>
                <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                  {t(store, 'menu')}
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-cream-faint" dir="ltr">
                {ROMAN[store.services.length - 1]} disciplines
              </span>
            </div>
            <div className="border-t" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}>
              {store.services.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="group grid gap-2 border-b py-8 transition-colors duration-300 md:grid-cols-[120px_1fr_auto] md:items-baseline md:gap-10"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: LUXE }}
                >
                  <span
                    className="font-mono text-2xl italic transition-transform duration-300 group-hover:-translate-y-1 md:text-3xl"
                    style={{ color: 'var(--store-accent)', fontFamily: 'var(--font-display)' }}
                    dir="ltr"
                  >
                    {ROMAN[i]}.
                  </span>
                  <span>
                    <span className="block text-2xl text-cream transition-colors duration-300 group-hover:text-[var(--store-primary)] md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-[62ch] text-sm leading-relaxed text-cream-muted">{s.desc}</span>
                  </span>
                  {s.price && (
                    <span className="font-mono text-sm tracking-wider text-cream-muted" dir="ltr">
                      {s.price}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRIPTYCH — parallax panels ──────────────────────── */}
        <section id="store-gallery" ref={tripRef} className="overflow-hidden py-28 md:py-40">
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
                THE ARENA
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                {t(store, 'gallery')}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {store.gallery.map((g, i) => (
                <figure key={g.src} className={`m-0 ${i === 1 ? 'md:mt-16' : ''}`} data-triptych>
                  <div className="overflow-hidden">
                    <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                  </div>
                  {g.caption && (
                    <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-[0.25em] text-cream-faint">
                      <span style={{ color: 'var(--store-accent)' }} dir="ltr">
                        {ROMAN[i]} ·{' '}
                      </span>
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS — laurel pull quotes ────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-14 text-center">
              <span className="kicker" style={{ color: 'var(--store-accent)', letterSpacing: '0.4em' }} dir="ltr">
                {t(store, 'reviewsKicker')} — 5.0
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                {t(store, 'reviews')}
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                >
                  <Laurel className="mx-auto mb-6 h-5 w-32" />
                  <p className="m-0 text-lg italic leading-relaxed text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    «{r.text}»
                  </p>
                  <footer className="mt-6">
                    <Stars rating={r.rating} className="justify-center" />
                    <span className="mt-2 block font-mono text-xs uppercase tracking-[0.25em] text-cream-faint">
                      {r.author}
                      {r.source ? ` — ${r.source}` : ''}
                    </span>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING + MAP/HOURS ─────────────────────────────── */}
        <StoreBooking store={store} />
        <StoreMapHours store={store} />
        <StoreFooter store={store} />
      </div>
    </StoreShell>
  );
}
