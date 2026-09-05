import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { ShaderHero } from '@/components/shaders';
import { Marquee } from '@/components/motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { StoreShell, Stars, KickerRow, MapEmbed, LUXE } from './shared';

/** Animated stat counter (mono digits, count up on first view). */
function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, value]);
  const shown = value % 1 !== 0 ? n.toFixed(1) : Math.round(n).toLocaleString('en-US');
  return (
    <div ref={ref} className="border-s-2 ps-5" style={{ borderColor: 'var(--store-primary)' }}>
      <div className="font-mono text-5xl font-black leading-none md:text-6xl" style={{ color: 'var(--store-primary)' }} dir="ltr">
        {shown}
        {suffix && <span className="text-2xl md:text-3xl">{suffix}</span>}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream-faint" dir="ltr">
        {label}
      </div>
    </div>
  );
}

/**
 * CROSSFIT SIROCCO — athletic data template. HUD framing, huge mono stats,
 * leaderboard services table, chalkboard-WOD story block.
 */
export default function CrossfitSirocco({ store }: { store: StorePageTheme }) {
  return (
    <StoreShell store={store}>
      <div className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — HUD + stats ──────────────────────────────── */}
        <section className="relative flex min-h-[100dvh] flex-col overflow-hidden" aria-label={store.name}>
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={store.shaderIntensity ?? 1}
            className="absolute inset-0"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, color-mix(in srgb, var(--store-bg) 70%, transparent), color-mix(in srgb, var(--store-bg) 88%, transparent))',
            }}
            aria-hidden
          />
          {/* HUD corner brackets */}
          {['top-24 start-6 border-t-2 border-s-2', 'top-24 end-6 border-t-2 border-e-2', 'bottom-6 start-6 border-b-2 border-s-2', 'bottom-6 end-6 border-b-2 border-e-2'].map(
            (pos) => (
              <span key={pos} className={`pointer-events-none absolute z-10 hidden h-10 w-10 md:block ${pos}`} style={{ borderColor: 'var(--store-primary)' }} aria-hidden />
            ),
          )}

          <div className="container-atelier relative z-10 flex flex-1 flex-col justify-center py-32">
            <motion.div
              className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-cream-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              dir="ltr"
            >
              <span style={{ color: 'var(--store-primary)' }}>● REC</span>
              <span>{store.nameFr} — BOX MARRAKECH</span>
              <span>EST. RUE DAR EL BEIDA</span>
            </motion.div>

            <h1 className="m-0 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block leading-[0.9] will-change-transform"
                    style={{
                      fontSize: 'clamp(3.6rem, 13vw, 12rem)',
                      color: i === 0 ? 'var(--text-primary)' : 'var(--store-primary)',
                    }}
                    initial={{ y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1, delay: 0.35 + i * 0.12, ease: LUXE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-[52ch] text-lead text-cream-muted"
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
                className="px-8 py-4 font-mono font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-[1.04]"
                style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')} →
              </button>
              <button
                onClick={() => scrollToTarget('#store-menu')}
                className="border px-8 py-4 font-mono uppercase tracking-widest text-cream transition-colors hover:border-[var(--store-primary)]"
                style={{ borderColor: 'var(--line)' }}
              >
                {t(store, 'menu')}
              </button>
            </motion.div>

            {/* stat band — figures from store copy */}
            <motion.div
              className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3, ease: LUXE }}
            >
              <Stat value={4.8} suffix="/5" label="Google rating" />
              <Stat value={191} label="Athlete reviews" />
              <Stat value={7400} suffix="+" label="Community" />
              <Stat value={7} suffix="h" label="Daily from" />
            </motion.div>
          </div>
        </section>

        {/* ── TICKER ──────────────────────────────────────────── */}
        <section aria-hidden className="border-y py-4 font-mono" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
          <Marquee duration={24} dir="ltr">
            {store.services.map((s, i) => (
              <span key={i} className="mx-8 flex items-center gap-8 whitespace-nowrap uppercase tracking-widest">
                <span className="text-lg text-cream md:text-xl">{s.title}</span>
                <span className="text-sm" style={{ color: 'var(--store-primary)' }} dir="ltr">
                  [{s.price}]
                </span>
              </span>
            ))}
          </Marquee>
        </section>

        {/* ── LEADERBOARD (services) ──────────────────────────── */}
        <section id="store-menu" className="py-24 md:py-32">
          <div className="container-atelier">
            <KickerRow text="LEADERBOARD" index="RX / SCALED" />
            <h2 className="m-0 mb-14 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)' }}>
              {t(store, 'menu')}
            </h2>
            <div className="border-t-2" style={{ borderColor: 'var(--store-primary)' }}>
              {store.services.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-1 border-b border-line/60 px-2 py-6 transition-colors duration-200 hover:bg-[var(--store-surface-tint)] md:grid-cols-[90px_1.2fr_1.6fr_auto] md:gap-x-10 md:px-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: LUXE }}
                >
                  <span
                    className="font-mono text-4xl font-black leading-none md:text-5xl"
                    style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--store-primary)' }}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl font-bold uppercase tracking-wide text-cream md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.title}
                  </span>
                  <span className="col-span-2 text-sm leading-relaxed text-cream-muted md:col-span-1">{s.desc}</span>
                  {s.price && (
                    <span className="col-start-2 font-mono text-base font-bold md:col-start-4" style={{ color: 'var(--store-primary)' }} dir="ltr">
                      {s.price}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STORY — the whiteboard ──────────────────────────── */}
        <section id="store-story" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mx-auto max-w-4xl border-2 p-8 md:p-14" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 45%, transparent)', background: 'var(--store-bg)' }}>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-dashed pb-6" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 40%, transparent)' }}>
                <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
                  TODAY'S WOD — THE STORY
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-cream-faint" dir="ltr">
                  AMRAP ∞
                </span>
              </div>
              <h2 className="m-0 mb-10 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                {store.story.title}
              </h2>
              <div className="space-y-6">
                {store.story.body.map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: store.dir === 'rtl' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: LUXE }}
                  >
                    <span className="mt-1 font-mono text-sm font-bold" style={{ color: 'var(--store-primary)' }} dir="ltr">
                      {i + 1}.
                    </span>
                    <p className="m-0 text-lg leading-relaxed text-cream-muted">{p}</p>
                  </motion.div>
                ))}
              </div>
              {store.story.quote && (
                <motion.div
                  className="mt-10 border-2 border-dashed p-6"
                  style={{ borderColor: 'var(--store-primary)' }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: LUXE }}
                >
                  <span className="kicker" style={{ color: 'var(--store-accent)' }} dir="ltr">
                    COACH'S NOTE
                  </span>
                  <p className="mb-0 mt-3 text-xl font-bold leading-snug text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    «{store.story.quote.text}»
                  </p>
                  <p className="mb-0 mt-2 font-mono text-xs uppercase tracking-widest text-cream-faint">— {store.story.quote.author}</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── GALLERY — training log frames ───────────────────── */}
        <section id="store-gallery" className="py-24 md:py-32">
          <div className="container-atelier">
            <KickerRow text="TRAINING LOG" index="03 SETS" />
            <div className="grid gap-6 lg:grid-cols-3">
              {store.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className="group m-0 border border-line/60 p-3"
                  style={{ background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: LUXE }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={g.src}
                      alt={g.caption ?? store.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className="absolute start-3 top-3 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
                      style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
                      dir="ltr"
                    >
                      SET {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {g.caption && (
                    <figcaption className="flex items-center justify-between px-1 pt-3 font-mono text-xs text-cream-faint">
                      <span>{g.caption}</span>
                      <span style={{ color: 'var(--store-primary)' }} dir="ltr">
                        ✓ DONE
                      </span>
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS — athlete logbook ───────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <KickerRow text="LOGBOOK" index={`${store.reviews.length} ENTRIES`} />
            <div className="grid gap-6 md:grid-cols-3">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 border-t-4 p-7"
                  style={{ borderColor: 'var(--store-primary)', background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: LUXE }}
                >
                  <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-cream-faint">
                    <span dir="ltr">ENTRY_{String(i + 1).padStart(3, '0')}</span>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="m-0 leading-relaxed text-cream">{r.text}</p>
                  <footer className="mt-6 font-mono text-sm font-bold" style={{ color: 'var(--store-primary)' }}>
                    — {r.author}
                    {r.source && (
                      <span className="ms-2 text-xs font-normal text-cream-faint" dir="ltr">
                        / {r.source}
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

        {/* ── SCHEDULE BOARD + MAP ────────────────────────────── */}
        <section id="store-location" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid gap-12 lg:grid-cols-2">
            <div>
              <KickerRow text="BOX SCHEDULE" />
              <h2 className="m-0 mb-8 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {t(store, 'location')}
              </h2>
              <div className="divide-y divide-line/60 font-mono">
                {store.hours.map((h, i) => (
                  <motion.div
                    key={h.days}
                    className="flex items-center justify-between gap-4 py-5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                  >
                    <span className="flex items-center gap-4 text-cream">
                      <span className="text-xs" style={{ color: 'var(--store-primary)' }} dir="ltr">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {h.days}
                    </span>
                    <span dir="ltr" className="font-bold" style={{ color: /مغلق/.test(h.time) ? 'var(--text-faint)' : 'var(--store-primary)' }}>
                      {h.time}
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 text-cream-muted">{store.address}</p>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block border px-6 py-3 font-mono text-sm uppercase tracking-widest transition-colors hover:border-[var(--store-primary)] hover:text-[var(--store-primary)]"
                style={{ borderColor: 'var(--line)' }}
              >
                {t(store, 'directions')}
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: LUXE }}
              className="border-2"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 45%, transparent)' }}
            >
              <MapEmbed store={store} className="h-full min-h-[380px]" />
            </motion.div>
          </div>
        </section>

        <StoreFooter store={store} />
      </div>
    </StoreShell>
  );
}
