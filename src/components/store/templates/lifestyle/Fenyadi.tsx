import { motion } from 'framer-motion';
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
 * MAISON FENYADI — French-first luxury showroom editorial.
 * Thin rules, numbered collection index, magazine two-column story,
 * asymmetric galerie with plate captions. LTR.
 */
export default function Fenyadi({ store }: { store: StorePageTheme }) {
  return (
    <StoreShell store={store}>
      <div className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — showroom editorial ───────────────────────── */}
        <section className="relative min-h-[100dvh] overflow-hidden" aria-label={store.name}>
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={store.shaderIntensity ?? 0.8}
            className="absolute inset-0 opacity-60"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--store-bg) 30%, color-mix(in srgb, var(--store-bg) 40%, transparent))' }} aria-hidden />

          <div className="container-atelier relative z-10 grid min-h-[100dvh] items-center gap-16 py-32 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <motion.div
                className="mb-10 flex items-center justify-between border-y py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-cream-faint"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span>N°219 — Sidi Ghanem</span>
                <span style={{ color: 'var(--store-primary)' }}>Maison &amp; Objet, Paris</span>
              </motion.div>

              <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
                {store.heroTitle.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className={`block leading-[1.08] text-cream will-change-transform ${i === 1 ? 'italic' : ''}`}
                      style={{ fontSize: 'clamp(3rem, 7.5vw, 6.8rem)', color: i === 1 ? 'var(--store-primary)' : undefined }}
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
                className="mt-8 max-w-[50ch] text-lg leading-relaxed text-cream-muted"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: LUXE }}
              >
                {store.heroSub}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.25, ease: LUXE }}
              >
                <button
                  onClick={() => scrollToTarget('#store-booking')}
                  className="border px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[var(--store-primary)] hover:text-[var(--store-on-primary)]"
                  style={{ borderColor: 'var(--store-primary)', color: 'var(--store-primary)' }}
                >
                  {t(store, 'bookNow')}
                </button>
                <button
                  onClick={() => scrollToTarget('#store-menu')}
                  className="text-sm uppercase tracking-[0.2em] text-cream-muted underline decoration-[var(--store-primary)] underline-offset-8 transition-colors hover:text-cream"
                >
                  {t(store, 'discover')}
                </button>
              </motion.div>

              <motion.div
                className="mt-14 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cream-faint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <span>{store.hours[0]?.days} · {store.hours[0]?.time}</span>
                <span>{store.city}</span>
              </motion.div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <CurtainImage src={store.heroImage} alt={store.name} className="aspect-[3/4] shadow-2xl" />
              <motion.p
                className="mt-4 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-cream-faint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <span className="italic normal-case tracking-normal" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                  {store.tagline}
                </span>
                <span>Pl. I</span>
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── COLLECTIONS — editorial index ───────────────────── */}
        <section id="store-menu" className="py-24 md:py-36">
          <div className="container-atelier">
            <div className="mb-16 grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                  Collections
                </span>
                <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}>
                  Le catalogue <em className="italic" style={{ color: 'var(--store-primary)' }}>Fenyadi</em>
                </h2>
              </div>
              <p className="m-0 font-mono text-xs uppercase tracking-[0.25em] text-cream-faint lg:col-span-4 lg:text-right">
                Éditions limitées — {store.services.length} lignes
              </p>
            </div>

            <div className="border-t" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
              {store.services.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="group grid gap-3 border-b py-9 transition-all duration-300 hover:bg-[var(--store-surface-tint)] md:grid-cols-[90px_1.1fr_1.3fr_auto] md:items-baseline md:gap-10 md:px-6"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: LUXE }}
                >
                  <span className="font-mono text-sm text-cream-faint transition-colors group-hover:text-[var(--store-primary)]">
                    N°{String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-2xl text-cream transition-transform duration-300 group-hover:translate-x-2 md:text-3xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {s.title}
                  </span>
                  <span className="max-w-[56ch] text-sm leading-relaxed text-cream-muted">{s.desc}</span>
                  {s.price && (
                    <span className="font-mono text-sm italic" style={{ color: 'var(--store-primary)' }}>
                      {s.price}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALERIE — asymmetric plates ─────────────────────── */}
        <section id="store-gallery" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-16 flex items-center justify-between gap-6">
              <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                Galerie
              </span>
              <span className="hairline flex-1" style={{ background: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }} />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream-faint">Pl. II — IV</span>
            </div>
            <div className="grid gap-8 lg:grid-cols-12">
              <motion.figure
                className="m-0 lg:col-span-7"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease: LUXE }}
              >
                <CurtainImage src={store.gallery[0]?.src ?? store.heroImage} alt={store.gallery[0]?.caption ?? store.name} className="aspect-[4/3]" />
                <figcaption className="mt-3 flex items-baseline justify-between text-sm text-cream-muted">
                  <span className="italic" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>
                    {store.gallery[0]?.caption}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint">Pl. II</span>
                </figcaption>
              </motion.figure>
              <div className="grid content-between gap-8 lg:col-span-5">
                {store.gallery.slice(1).map((g, i) => (
                  <motion.figure
                    key={g.src}
                    className="m-0"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.15, ease: LUXE }}
                  >
                    <CurtainImage src={g.src} alt={g.caption ?? store.name} className="aspect-[16/10]" delay={0.1 + i * 0.1} />
                    <figcaption className="mt-3 flex items-baseline justify-between text-sm text-cream-muted">
                      <span className="italic" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>
                        {g.caption}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint">Pl. {['III', 'IV'][i]}</span>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STORY — magazine columns ────────────────────────── */}
        <section id="store-story" className="py-24 md:py-36">
          <div className="container-atelier">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                  {t(store, 'storyKicker')}
                </span>
                <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                  {store.story.title}
                </h2>
              </div>
              <motion.div
                className="gap-12 text-[1.05rem] leading-loose text-cream-muted md:columns-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: LUXE }}
              >
                {store.story.body.map((p, i) => (
                  <p key={i} className={i === 0 ? 'mt-0' : ''} style={{ breakInside: 'avoid' }}>
                    {i === 0 ? (
                      <>
                        <span
                          className="float-left me-3 mt-1 leading-[0.8]"
                          style={{ fontFamily: 'var(--font-display)', fontSize: '4.4rem', color: 'var(--store-primary)' }}
                          aria-hidden
                        >
                          {p.charAt(0)}
                        </span>
                        {p.slice(1)}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}
              </motion.div>
              {store.story.quote && (
                <motion.blockquote
                  className="m-0 mt-16 border-y py-10 text-center"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 40%, transparent)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                >
                  <p className="m-0 text-2xl italic leading-snug text-cream md:text-[2rem]" style={{ fontFamily: 'var(--font-display)' }}>
                    «&nbsp;{store.story.quote.text}&nbsp;»
                  </p>
                  <footer className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-cream-faint">{store.story.quote.author}</footer>
                </motion.blockquote>
              )}
            </div>
          </div>
        </section>

        {/* ── AVIS — footnote quotes ──────────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-16 flex items-center justify-between gap-6">
              <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                {t(store, 'reviewsKicker')}
              </span>
              <span className="hairline flex-1" style={{ background: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }} />
              <Stars rating={5} />
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 border-t-2 pt-8"
                  style={{ borderColor: 'var(--store-primary)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: LUXE }}
                >
                  <span className="font-mono text-xs text-cream-faint">({i + 1})</span>
                  <p className="mb-0 mt-3 text-lg italic leading-relaxed text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {r.text}
                  </p>
                  <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-cream-faint">
                    {r.author}
                    {r.source ? ` — ${r.source}` : ''}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING ─────────────────────────────────────────── */}
        <StoreBooking store={store} />

        {/* ── ADRESSE — showroom card + map ───────────────────── */}
        <section id="store-location" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="kicker" style={{ color: 'var(--store-primary)' }}>
                {t(store, 'locationKicker')}
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
                {store.address}
              </h2>
              <div className="mt-10 space-y-0 divide-y divide-line/60 border-y" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
                {store.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between py-4 text-sm">
                    <span className="text-cream">{h.days}</span>
                    <span className="font-mono" style={{ color: /fermé/i.test(h.time) ? 'var(--text-faint)' : 'var(--store-primary)' }}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm uppercase tracking-[0.2em] underline decoration-[var(--store-primary)] underline-offset-8 transition-colors hover:text-[var(--store-primary)]"
                >
                  {t(store, 'directions')}
                </a>
                {store.phone && (
                  <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="font-mono text-sm text-cream-muted transition-colors hover:text-[var(--store-primary)]">
                    {store.phone}
                  </a>
                )}
              </div>
            </div>
            <motion.div
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              whileInView={{ clipPath: 'inset(0 0 0 0%)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: LUXE }}
            >
              <MapEmbed store={store} className="h-[420px] border" />
            </motion.div>
          </div>
        </section>

        <StoreFooter store={store} />
      </div>
    </StoreShell>
  );
}
