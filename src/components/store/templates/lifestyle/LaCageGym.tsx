import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { ShaderHero } from '@/components/shaders';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { gsap, StoreShell, KickerRow, LUXE } from './shared';

const OCTAGON = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';

function OctagonOutline({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <polygon
        points="30,1 70,1 99,30 99,70 70,99 30,99 1,70 1,30"
        fill="none"
        stroke="var(--store-primary)"
        strokeWidth="0.6"
      />
      <polygon
        points="33,8 67,8 92,33 92,67 67,92 33,92 8,67 8,33"
        fill="none"
        stroke="var(--store-primary)"
        strokeWidth="0.3"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * LA CAGE GYM — cage-octagon geometry. Octagon-clipped imagery, rotating
 * cage outlines, corner-bracket discipline cards, hard MMA energy.
 */
export default function LaCageGym({ store }: { store: StorePageTheme }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringA = useRef<HTMLDivElement>(null);
  const ringB = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (ringA.current) gsap.to(ringA.current, { rotation: 360, duration: 90, repeat: -1, ease: 'none' });
      if (ringB.current) gsap.to(ringB.current, { rotation: -360, duration: 120, repeat: -1, ease: 'none' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <StoreShell store={store}>
      <div ref={rootRef} className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — enter the octagon ────────────────────────── */}
        <section className="relative flex min-h-[100dvh] items-center overflow-hidden" aria-label={store.name}>
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={store.shaderIntensity ?? 0.7}
            className="absolute inset-0"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'color-mix(in srgb, var(--store-bg) 55%, transparent)' }}
            aria-hidden
          />

          {/* rotating cage outlines */}
          <div ref={ringA} className="pointer-events-none absolute -end-40 -top-40 h-[34rem] w-[34rem] opacity-30" aria-hidden>
            <OctagonOutline className="h-full w-full" />
          </div>
          <div ref={ringB} className="pointer-events-none absolute -bottom-48 -start-48 h-[38rem] w-[38rem] opacity-20" aria-hidden>
            <OctagonOutline className="h-full w-full" />
          </div>

          <div className="container-atelier relative z-10 grid items-center gap-12 py-28 lg:grid-cols-2">
            {/* copy side */}
            <div>
              <motion.div
                className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em]"
                style={{ color: 'var(--store-primary)' }}
                initial={{ opacity: 0, x: store.dir === 'rtl' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: LUXE }}
              >
                <span className="inline-block h-2.5 w-2.5" style={{ background: 'var(--store-primary)', clipPath: OCTAGON }} aria-hidden />
                <span dir="ltr">{store.sectorLabel} — AGADIR</span>
              </motion.div>
              <h1 className="m-0 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                {store.heroTitle.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block leading-[0.95] will-change-transform"
                      style={{ fontSize: 'clamp(3rem, 8.5vw, 7.5rem)', color: i === 1 ? 'var(--store-primary)' : 'var(--text-primary)' }}
                      initial={{ y: '112%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.13, ease: LUXE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                className="mt-6 max-w-[48ch] text-lead text-cream-muted"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: LUXE }}
              >
                {store.heroSub}
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15, ease: LUXE }}
              >
                <button
                  onClick={() => scrollToTarget('#store-booking')}
                  className="px-8 py-4 font-bold uppercase tracking-wider transition-transform duration-300 hover:scale-[1.04]"
                  style={{
                    background: 'var(--store-primary)',
                    color: 'var(--store-on-primary)',
                    clipPath: 'polygon(12% 0, 100% 0, 100% 70%, 88% 100%, 0 100%, 0 30%)',
                  }}
                >
                  {t(store, 'bookNow')}
                </button>
                <button
                  onClick={() => scrollToTarget('#store-story')}
                  className="border px-8 py-4 font-bold uppercase tracking-wider text-cream transition-colors hover:border-[var(--store-primary)]"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {t(store, 'discover')}
                </button>
              </motion.div>
            </div>

            {/* octagon image */}
            <motion.div
              className="relative mx-auto aspect-square w-full max-w-[520px]"
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.3, delay: 0.6, ease: LUXE }}
            >
              <div className="absolute -inset-4 opacity-40" style={{ clipPath: OCTAGON, border: 'none', background: 'transparent' }} aria-hidden>
                <OctagonOutline className="h-full w-full" />
              </div>
              <img
                src={store.heroImage}
                alt={store.name}
                className="h-full w-full object-cover"
                style={{ clipPath: OCTAGON }}
              />
              <div
                className="absolute inset-0"
                style={{ clipPath: OCTAGON, background: 'linear-gradient(to top, color-mix(in srgb, var(--store-bg) 55%, transparent), transparent 55%)' }}
                aria-hidden
              />
              {/* corner badge */}
              <div
                className="absolute -bottom-2 end-6 flex h-24 w-24 flex-col items-center justify-center text-center"
                style={{ clipPath: OCTAGON, background: 'var(--store-primary)' }}
              >
                <span className="font-mono text-2xl font-black leading-none" style={{ color: 'var(--store-on-primary)' }} dir="ltr">
                  5.0
                </span>
                <span className="mt-1 px-2 text-[9px] font-bold uppercase leading-tight tracking-wider" style={{ color: 'var(--store-on-primary)' }}>
                  Google
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STORY — inside the cage ─────────────────────────── */}
        <section id="store-story" className="relative py-24 md:py-32">
          <div className="container-atelier">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <KickerRow text="INSIDE THE CAGE" />
                <h2 className="m-0 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
                  {store.story.title}
                </h2>
                <motion.div
                  className="mt-10 hidden lg:block"
                  initial={{ opacity: 0, rotate: 6 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: LUXE }}
                >
                  <img src={store.aboutImage} alt={store.story.title} className="aspect-square w-full object-cover" style={{ clipPath: OCTAGON }} loading="lazy" />
                </motion.div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="space-y-6">
                  {store.story.body.map((p, i) => (
                    <motion.p
                      key={i}
                      className="m-0 border-s-2 ps-6 text-lg leading-relaxed text-cream-muted"
                      style={{ borderColor: 'var(--store-primary)' }}
                      initial={{ opacity: 0, x: store.dir === 'rtl' ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: LUXE }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
                {store.story.quote && (
                  <motion.blockquote
                    className="m-0 mt-12 p-8"
                    style={{ background: 'var(--store-surface-tint)', clipPath: 'polygon(4% 0, 100% 0, 100% 92%, 96% 100%, 0 100%, 0 8%)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: LUXE }}
                  >
                    <p className="m-0 text-xl font-bold leading-snug text-cream md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      «{store.story.quote.text}»
                    </p>
                    <footer className="mt-4 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--store-primary)' }}>
                      — {store.story.quote.author}
                    </footer>
                  </motion.blockquote>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── DISCIPLINES — corner-bracket cards ──────────────── */}
        <section id="store-menu" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <KickerRow text="DISCIPLINES" index={`0${store.services.length}`} />
            <h2 className="m-0 mb-14 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
              {t(store, 'menu')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {store.services.map((s, i) => (
                <motion.article
                  key={s.title}
                  className="group relative p-8 pt-10 transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: LUXE }}
                >
                  {/* corner brackets — cage corners */}
                  <span className="absolute start-0 top-0 h-5 w-5 border-s-2 border-t-2 transition-all duration-300 group-hover:h-8 group-hover:w-8" style={{ borderColor: 'var(--store-primary)' }} aria-hidden />
                  <span className="absolute end-0 top-0 h-5 w-5 border-e-2 border-t-2 transition-all duration-300 group-hover:h-8 group-hover:w-8" style={{ borderColor: 'var(--store-primary)' }} aria-hidden />
                  <span className="absolute bottom-0 start-0 h-5 w-5 border-b-2 border-s-2 transition-all duration-300 group-hover:h-8 group-hover:w-8" style={{ borderColor: 'var(--store-primary)' }} aria-hidden />
                  <span className="absolute bottom-0 end-0 h-5 w-5 border-b-2 border-e-2 transition-all duration-300 group-hover:h-8 group-hover:w-8" style={{ borderColor: 'var(--store-primary)' }} aria-hidden />

                  <span
                    className="mb-6 flex h-12 w-12 items-center justify-center font-mono text-lg font-black"
                    style={{ clipPath: OCTAGON, background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 text-2xl uppercase text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.title}
                  </h3>
                  <p className="mb-0 mt-3 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                  {s.price && (
                    <p className="mb-0 mt-5 font-mono text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--store-primary)' }}>
                      {s.price}
                    </p>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY — octagon frames ────────────────────────── */}
        <section id="store-gallery" className="py-24 md:py-32">
          <div className="container-atelier">
            <KickerRow text="THE CAGE" index="03" centered />
            <div className="grid gap-8 md:grid-cols-3">
              {store.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className="m-0 text-center"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                >
                  <div className="group relative mx-auto aspect-square w-full max-w-[380px]">
                    <img
                      src={g.src}
                      alt={g.caption ?? store.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ clipPath: OCTAGON }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ clipPath: OCTAGON, boxShadow: 'inset 0 0 0 2px var(--store-primary)' }}
                      aria-hidden
                    />
                  </div>
                  {g.caption && (
                    <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-cream-faint">{g.caption}</figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS — cage-side shouts ──────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <KickerRow text="CAGESIDE" index={t(store, 'reviewsKicker')} />
            <div className="space-y-0 border-t" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 grid gap-4 border-b py-8 md:grid-cols-12 md:items-center"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                  initial={{ opacity: 0, x: store.dir === 'rtl' ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: LUXE }}
                >
                  <div className="flex items-center gap-4 md:col-span-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center font-mono text-sm font-black"
                      style={{ clipPath: OCTAGON, background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
                      dir="ltr"
                    >
                      {r.rating}★
                    </span>
                    <span className="font-bold text-cream">{r.author}</span>
                  </div>
                  <p className="m-0 text-lg leading-relaxed text-cream-muted md:col-span-8">{r.text}</p>
                  {r.source && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cream-faint md:col-span-1 md:text-end" dir="ltr">
                      {r.source}
                    </span>
                  )}
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
