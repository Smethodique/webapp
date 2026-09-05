import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { ShaderHero } from '@/components/shaders';
import { Marquee } from '@/components/motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { gsap, StoreShell, Stars, KickerRow, MapEmbed, HoursRows, ContactLinks, LUXE } from './shared';

/**
 * KRISS BOXING — old-school boxing-poster template.
 * Squared edges, volt-on-ink fight card, outlined Anton headlines,
 * diagonal-cut hero image, ghost "KRISS" scrubbing behind the story.
 */
export default function KrissBoxing({ store }: { store: StorePageTheme }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  /* ghost word drifts horizontally with scroll — scrubbed, never pinned */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const ghost = ghostRef.current;
    if (!root || !ghost) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ghost,
        { xPercent: store.dir === 'rtl' ? 12 : -12 },
        {
          xPercent: store.dir === 'rtl' ? -12 : 12,
          ease: 'none',
          scrollTrigger: { trigger: ghost, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [store.dir]);

  return (
    <StoreShell store={store}>
      <div ref={rootRef} className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — fight poster ─────────────────────────────── */}
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
                'linear-gradient(to top, color-mix(in srgb, var(--store-bg) 92%, transparent), color-mix(in srgb, var(--store-bg) 30%, transparent) 60%)',
            }}
            aria-hidden
          />

          {/* diagonal-cut action image, inline-end */}
          <motion.div
            className="absolute inset-y-0 end-0 hidden w-[42%] lg:block"
            style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)' }}
            initial={{ opacity: 0, x: store.dir === 'rtl' ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: LUXE }}
          >
            <img src={store.heroImage} alt={store.name} className="h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to left, transparent 55%, var(--store-bg))', opacity: 0.55 }}
              aria-hidden
            />
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'var(--store-primary)', opacity: 0.14 }} aria-hidden />
          </motion.div>

          <div className="container-atelier relative z-10 flex flex-1 flex-col justify-between py-24 md:py-28">
            {/* poster top strip */}
            <motion.div
              className="flex items-center justify-between border-y py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream-muted"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span dir="ltr">{store.name} — EST. GUÉLIZ</span>
              <span className="hidden sm:inline" style={{ color: 'var(--store-primary)' }}>
                ✦
              </span>
              <span>{store.city}</span>
            </motion.div>

            {/* headline block */}
            <div className="max-w-3xl">
              <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
                {store.heroTitle.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block uppercase leading-[0.95] will-change-transform"
                      style={{
                        fontSize: 'clamp(3.4rem, 10vw, 9rem)',
                        color: i === 0 ? 'var(--store-primary)' : 'transparent',
                        WebkitTextStroke: i === 0 ? undefined : '2px var(--store-primary)',
                      }}
                      initial={{ y: '112%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1, delay: 0.35 + i * 0.14, ease: LUXE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                className="mt-6 max-w-[46ch] text-lead text-cream-muted"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: LUXE }}
              >
                {store.heroSub}
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15, ease: LUXE }}
              >
                <button
                  onClick={() => scrollToTarget('#store-booking')}
                  className="px-8 py-4 font-bold uppercase tracking-wider transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)', fontFamily: 'var(--font-body)' }}
                >
                  {t(store, 'bookNow')}
                </button>
                <button
                  onClick={() => scrollToTarget('#store-menu')}
                  className="border-2 px-8 py-4 font-bold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-[var(--store-primary)] hover:text-[var(--store-on-primary)]"
                  style={{ borderColor: 'var(--store-primary)' }}
                >
                  {t(store, 'menu')}
                </button>
              </motion.div>
            </div>

            {/* poster bottom strip */}
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-muted"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <span>{store.address}</span>
              <span style={{ color: 'var(--store-primary)' }}>✦</span>
              <span dir="ltr">{store.hours[0]?.time}</span>
              {store.phone && (
                <>
                  <span style={{ color: 'var(--store-primary)' }}>✦</span>
                  <span dir="ltr">{store.phone}</span>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── VOLT MARQUEE BAND ───────────────────────────────── */}
        <section aria-hidden className="py-4" style={{ background: 'var(--store-primary)' }}>
          <Marquee duration={26} dir={store.dir}>
            {[store.tagline, ...store.services.map((s) => s.title)].map((w, i) => (
              <span key={i} className="mx-8 flex items-center gap-8 whitespace-nowrap">
                <span
                  className="text-xl font-black uppercase tracking-wide md:text-2xl"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--store-on-primary)' }}
                >
                  {w}
                </span>
                <span style={{ color: 'var(--store-on-primary)' }}>✦</span>
              </span>
            ))}
          </Marquee>
        </section>

        {/* ── FIGHT CARD (services) ───────────────────────────── */}
        <section id="store-menu" className="py-24 md:py-32">
          <div className="container-atelier">
            <KickerRow text="FIGHT CARD" index={`${store.services.length} BOUTS`} />
            <h2 className="m-0 mb-14 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: LUXE }}
                >
                  {t(store, 'menu')}
                </motion.span>
              </span>
            </h2>

            <div className="border-t" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
              {store.services.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="group grid cursor-default grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b py-7 transition-colors duration-300 hover:bg-[var(--store-primary)] md:grid-cols-[110px_1fr_auto] md:px-6"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: LUXE }}
                >
                  <span
                    className="font-mono text-sm transition-colors group-hover:text-[var(--store-on-primary)]"
                    style={{ color: 'var(--store-primary)' }}
                    dir="ltr"
                  >
                    FIGHT {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className="block text-2xl uppercase text-cream transition-colors group-hover:text-[var(--store-on-primary)] md:text-3xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {s.title}
                    </span>
                    <span className="mt-1 block max-w-[60ch] text-sm text-cream-muted transition-colors group-hover:text-[var(--store-on-primary)]/80">
                      {s.desc}
                    </span>
                  </span>
                  {s.price && (
                    <span
                      className="col-start-2 border-2 px-4 py-1.5 font-mono text-sm font-bold transition-colors group-hover:border-[var(--store-on-primary)] group-hover:text-[var(--store-on-primary)] md:col-start-3"
                      style={{ borderColor: 'var(--store-primary)', color: 'var(--store-primary)' }}
                    >
                      {s.price}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STORY — corner quote vs. tale of the tape ───────── */}
        <section id="store-story" className="relative overflow-hidden py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          {/* ghost word */}
          <div
            ref={ghostRef}
            aria-hidden
            className="pointer-events-none absolute top-8 start-0 select-none whitespace-nowrap uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(8rem, 22vw, 20rem)',
              color: 'transparent',
              WebkitTextStroke: '1px color-mix(in srgb, var(--store-primary) 22%, transparent)',
              lineHeight: 1,
            }}
          >
            {store.name}
          </div>

          <div className="container-atelier relative grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <KickerRow text="THE CORNER" />
                {store.story.quote && (
                  <motion.blockquote
                    className="m-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: LUXE }}
                  >
                    <span className="block leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', color: 'var(--store-primary)' }} aria-hidden>
                      ”
                    </span>
                    <p className="m-0 text-2xl font-bold uppercase leading-snug text-cream md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {store.story.quote.text}
                    </p>
                    <footer className="mt-5 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--store-accent)' }}>
                      — {store.story.quote.author}
                    </footer>
                  </motion.blockquote>
                )}
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: LUXE }}
                >
                  <img src={store.aboutImage} alt={store.story.title} className="aspect-[4/5] w-full border-2 object-cover" style={{ borderColor: 'var(--store-primary)' }} loading="lazy" />
                </motion.div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="m-0 mb-10 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}>
                {store.story.title}
              </h2>
              <div className="space-y-6">
                {store.story.body.map((p, i) => (
                  <motion.p
                    key={i}
                    className="m-0 text-lg leading-relaxed text-cream-muted"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: LUXE }}
                  >
                    <span className="me-3 font-mono text-xs" style={{ color: 'var(--store-primary)' }} dir="ltr">
                      R{i + 1}
                    </span>
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY — triptych from the ring ────────────────── */}
        <section id="store-gallery" className="py-24 md:py-32">
          <div className="container-atelier">
            <KickerRow text="FROM THE RING" index="03 FRAMES" />
            <div className="grid gap-6 md:grid-cols-3">
              {store.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className={`group m-0 ${i === 1 ? 'md:translate-y-10' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                >
                  <div className="relative overflow-hidden border border-line/60">
                    <img
                      src={g.src}
                      alt={g.caption ?? store.name}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    {/* corner ticks */}
                    <span className="absolute start-2 top-2 h-4 w-4 border-s-2 border-t-2" style={{ borderColor: 'var(--store-primary)' }} aria-hidden />
                    <span className="absolute bottom-2 end-2 h-4 w-4 border-b-2 border-e-2" style={{ borderColor: 'var(--store-primary)' }} aria-hidden />
                  </div>
                  {g.caption && (
                    <figcaption className="mt-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cream-faint">
                      <span style={{ color: 'var(--store-primary)' }} dir="ltr">
                        IMG_{String(i + 1).padStart(2, '0')}
                      </span>
                      {g.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS — judges' scorecards ────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <KickerRow text="SCORECARDS" index={`${store.reviews.length} JUDGES`} />
            <div className="grid gap-6 md:grid-cols-3">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 flex flex-col border-2 p-7"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)', background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, y: 40, rotate: i === 1 ? 1.5 : -1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: LUXE }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-3xl font-black" style={{ color: 'var(--store-primary)' }} dir="ltr">
                      {r.rating}.0
                    </span>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="m-0 flex-1 text-cream">{r.text}</p>
                  <footer className="mt-6 flex items-center justify-between border-t pt-4 font-mono text-xs uppercase tracking-widest text-cream-faint" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}>
                    <span className="text-cream">{r.author}</span>
                    {r.source && <span dir="ltr">{r.source}</span>}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING ─────────────────────────────────────────── */}
        <StoreBooking store={store} />

        {/* ── GYM SCHEDULE + MAP ──────────────────────────────── */}
        <section id="store-location" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid gap-12 lg:grid-cols-2">
            <div>
              <KickerRow text="TRAINING CAMP" />
              <h2 className="m-0 mb-8 uppercase text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {t(store, 'location')}
              </h2>
              <HoursRows store={store} />
              <p className="mt-8 text-cream-muted">{store.address}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors hover:bg-[var(--store-primary)] hover:text-[var(--store-on-primary)]"
                  style={{ borderColor: 'var(--store-primary)', color: 'var(--store-primary)' }}
                >
                  {t(store, 'directions')}
                </a>
              </div>
              <ContactLinks store={store} className="mt-8" />
            </div>
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: LUXE }}
            >
              <MapEmbed store={store} className="h-full min-h-[380px] border-2" />
            </motion.div>
          </div>
        </section>

        <StoreFooter store={store} />
      </div>
    </StoreShell>
  );
}
