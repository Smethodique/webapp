import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { ShaderHero } from '@/components/shaders';
import { CurtainImage } from '@/components/motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { StoreShell, Stars, MapEmbed, LUXE } from './shared';

/**
 * YOUR EVENTS — French-first planner portfolio. Minimal editorial hero,
 * hover-preview service index (sticky image swaps per row), alternating
 * full-bleed galerie plates, monogram reviews. LTR.
 */
export default function YourEvents({ store }: { store: StorePageTheme }) {
  const [active, setActive] = useState(0);
  const previewSrcs = [store.aboutImage, ...store.gallery.map((g) => g.src)];

  return (
    <StoreShell store={store}>
      <div className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — portfolio cover ──────────────────────────── */}
        <section className="relative min-h-[100dvh] overflow-hidden" aria-label={store.name}>
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={store.shaderIntensity ?? 0.9}
            className="absolute inset-0 opacity-50"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--store-bg) 55%, transparent), var(--store-bg) 92%)' }} aria-hidden />

          <div className="container-atelier relative z-10 flex min-h-[100dvh] flex-col justify-center py-32">
            <motion.div
              className="mb-10 flex items-center justify-between border-b pb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-cream-faint"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span>Wedding planners — Rabat</span>
              <span className="hidden sm:inline">De Tanger à Marrakech</span>
            </motion.div>

            <div className="grid items-end gap-14 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
                  {store.heroTitle.map((line, i) => (
                    <span key={i} className="block overflow-hidden">
                      <motion.span
                        className={`block leading-[1.06] text-cream will-change-transform ${i === 1 ? 'italic' : ''}`}
                        style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7.6rem)', color: i === 1 ? 'var(--store-primary)' : undefined }}
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
                  className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cream-muted"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1, ease: LUXE }}
                >
                  {store.heroSub}
                </motion.p>
                {/* signature */}
                <motion.p
                  className="mt-8 text-2xl italic"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--store-accent)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1.3, ease: LUXE }}
                >
                  — Fattouma &amp; Soufiane
                </motion.p>
                <motion.div
                  className="mt-10 flex flex-wrap items-center gap-6"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.45, ease: LUXE }}
                >
                  <button
                    onClick={() => scrollToTarget('#store-booking')}
                    className="rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:scale-[1.04]"
                    style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
                  >
                    {t(store, 'bookNow')}
                  </button>
                  <button
                    onClick={() => scrollToTarget('#store-gallery')}
                    className="text-sm uppercase tracking-[0.2em] text-cream-muted underline decoration-[var(--store-accent)] underline-offset-8 transition-colors hover:text-cream"
                  >
                    {t(store, 'gallery')}
                  </button>
                </motion.div>
              </div>

              <motion.div
                className="hidden lg:col-span-4 lg:block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.8, ease: LUXE }}
              >
                <div className="overflow-hidden" style={{ borderRadius: '999px 999px 0 0' }}>
                  <img src={store.heroImage} alt={store.name} className="aspect-[3/4] w-full object-cover" />
                </div>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint">{store.tagline}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES — hover-preview index ──────────────────── */}
        <section id="store-menu" className="py-24 md:py-36">
          <div className="container-atelier grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                Prestations
              </span>
              <h2 className="m-0 mb-12 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                Ce que nous <em className="italic" style={{ color: 'var(--store-primary)' }}>orchestrons</em>
              </h2>
              <div className="border-t" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
                {store.services.map((s, i) => (
                  <motion.button
                    key={s.title}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => scrollToTarget('#store-booking')}
                    className={`group block w-full border-b py-7 text-start transition-colors duration-300 ${active === i ? 'bg-[var(--store-surface-tint)]' : ''}`}
                    style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: LUXE }}
                  >
                    <span className="flex items-baseline justify-between gap-6 px-2 md:px-4">
                      <span className="flex items-baseline gap-5">
                        <span className="font-mono text-xs text-cream-faint">0{i + 1}</span>
                        <span
                          className={`text-xl transition-all duration-300 md:text-2xl ${active === i ? 'translate-x-2' : ''}`}
                          style={{ fontFamily: 'var(--font-display)', color: active === i ? 'var(--store-primary)' : 'var(--text-primary)' }}
                        >
                          {s.title}
                        </span>
                      </span>
                      {s.price && (
                        <span className="shrink-0 font-mono text-xs italic text-cream-muted">{s.price}</span>
                      )}
                    </span>
                    <span className={`mt-2 block max-w-[58ch] px-2 text-sm leading-relaxed text-cream-muted transition-opacity duration-300 md:px-4 md:ps-12 ${active === i ? 'opacity-100' : 'opacity-60'}`}>
                      {s.desc}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* sticky preview */}
            <div className="hidden lg:col-span-5 lg:block">
              <div className="sticky top-28">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={active}
                      src={previewSrcs[active % previewSrcs.length]}
                      alt={store.services[active]?.title ?? store.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: LUXE }}
                    />
                  </AnimatePresence>
                </div>
                <p className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint">
                  <span>{store.services[active]?.title}</span>
                  <span>N°0{active + 1}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALERIE — alternating plates ────────────────────── */}
        <section id="store-gallery" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-20 flex items-center justify-between gap-6">
              <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                Portfolio
              </span>
              <span className="hairline flex-1" style={{ background: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }} />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream-faint">N°01 — 03</span>
            </div>
            <div className="space-y-24">
              {store.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className={`m-0 grid items-center gap-10 lg:grid-cols-12 ${i % 2 ? '' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1, ease: LUXE }}
                >
                  <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                    <CurtainImage src={g.src} alt={g.caption ?? store.name} className="aspect-[16/10]" />
                  </div>
                  <figcaption className={`lg:col-span-5 ${i % 2 ? 'lg:order-1 lg:text-right' : ''}`}>
                    <span
                      className="block leading-none"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 8vw, 7rem)', color: 'transparent', WebkitTextStroke: '1px var(--store-primary)' }}
                      aria-hidden
                    >
                      N°0{i + 1}
                    </span>
                    <span className="mt-4 block text-2xl italic text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                      {g.caption}
                    </span>
                    <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.3em] text-cream-faint">
                      {store.nameFr}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── STORY — the duo interview ───────────────────────── */}
        <section id="store-story" className="py-24 md:py-36">
          <div className="container-atelier grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                  {t(store, 'storyKicker')}
                </span>
                <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}>
                  {store.story.title}
                </h2>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-cream-faint">
                  Repérés par Shoelifer — « 4 pros à connaître »
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-8">
                {store.story.body.map((p, i) => (
                  <motion.p
                    key={i}
                    className="m-0 border-t pt-8 text-lg leading-loose text-cream-muted"
                    style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: LUXE }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              {store.story.quote && (
                <motion.blockquote
                  className="m-0 mt-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                >
                  <p className="m-0 text-2xl italic leading-snug text-cream md:text-[1.8rem]" style={{ fontFamily: 'var(--font-display)' }}>
                    «&nbsp;{store.story.quote.text}&nbsp;»
                  </p>
                  <footer className="mt-5 text-xl italic" style={{ fontFamily: 'var(--font-display)', color: 'var(--store-accent)' }}>
                    — {store.story.quote.author}
                  </footer>
                </motion.blockquote>
              )}
            </div>
          </div>
        </section>

        {/* ── REVIEWS — monograms ─────────────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-16 text-center">
              <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                {t(store, 'reviewsKicker')}
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                Ils nous ont confié leur jour J
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
                  <span
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border text-2xl italic"
                    style={{ borderColor: 'var(--store-primary)', color: 'var(--store-primary)', fontFamily: 'var(--font-display)' }}
                    aria-hidden
                  >
                    {r.author.trim().charAt(0)}
                  </span>
                  <p className="m-0 leading-relaxed text-cream">{r.text}</p>
                  <footer className="mt-6">
                    <Stars rating={r.rating} className="justify-center" />
                    <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.3em] text-cream-faint">
                      {r.author}
                      {r.source ? ` · ${r.source}` : ''}
                    </span>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING ─────────────────────────────────────────── */}
        <StoreBooking store={store} />

        {/* ── CONTACT — minimal ───────────────────────────────── */}
        <section id="store-location" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                {t(store, 'locationKicker')}
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {store.address}
              </h2>
              <div className="mt-10 divide-y divide-line/50 border-y" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
                {store.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between py-4 text-sm">
                    <span className="text-cream">{h.days}</span>
                    <span className="font-mono" style={{ color: /fermé/i.test(h.time) ? 'var(--text-faint)' : 'var(--store-primary)' }}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-8">
                {store.phone && (
                  <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="font-mono text-sm text-cream-muted transition-colors hover:text-[var(--store-primary)]">
                    {store.phone}
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm uppercase tracking-[0.2em] underline decoration-[var(--store-primary)] underline-offset-8 transition-colors hover:text-[var(--store-primary)]"
                >
                  {t(store, 'directions')}
                </a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: LUXE }}
            >
              <MapEmbed store={store} className="h-[380px] border" />
            </motion.div>
          </div>
        </section>

        <StoreFooter store={store} />
      </div>
    </StoreShell>
  );
}
