import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { ShaderHero } from '@/components/shaders';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { scrollToTarget } from '@/hooks/useLenis';
import { t } from '@/components/store/storeUtils';
import { StoreShell, Stars, LUXE } from './shared';

/** Berber zigzag divider band. */
function ZigzagBand({ flip }: { flip?: boolean }) {
  return (
    <div className="overflow-hidden py-1" aria-hidden style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <svg viewBox="0 0 240 24" className="h-6 w-full" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0 20 L15 4 L30 20 L45 4 L60 20 L75 4 L90 20 L105 4 L120 20 L135 4 L150 20 L165 4 L180 20 L195 4 L210 20 L225 4 L240 20"
          fill="none"
          stroke="var(--store-primary)"
          strokeWidth="2"
          opacity="0.55"
        />
        <path
          d="M0 22 L15 6 L30 22 L45 6 L60 22 L75 6 L90 22 L105 6 L120 22 L135 6 L150 22 L165 6 L180 22 L195 6 L210 22 L225 6 L240 22"
          fill="none"
          stroke="var(--store-accent)"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

/** Diamond motif separator. */
function Diamond({ className }: { className?: string }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rotate-45 ${className ?? ''}`}
      style={{ background: 'var(--store-primary)' }}
      aria-hidden
    />
  );
}

/** A rug hung on a wooden rod with strand fringe. */
function HangingRug({
  src,
  caption,
  className,
  ratio = 'aspect-[3/4]',
  delay = 0,
}: {
  src: string;
  caption?: string;
  className?: string;
  ratio?: string;
  delay?: number;
}) {
  return (
    <motion.figure
      className={`m-0 ${className ?? ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: LUXE }}
    >
      {/* rod */}
      <div className="relative mx-auto h-2.5 w-[104%] -translate-x-[2%] rounded-full" style={{ background: 'linear-gradient(to bottom, #6b4a2e, #3d2817)' }}>
        <span className="absolute -start-1.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" style={{ background: '#3d2817' }} />
        <span className="absolute -end-1.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" style={{ background: '#3d2817' }} />
      </div>
      <div className="group relative overflow-hidden shadow-2xl">
        <img
          src={src}
          alt={caption ?? 'Fadma Rugs'}
          loading="lazy"
          className={`${ratio} w-full object-cover transition-transform duration-700 group-hover:scale-105`}
        />
        {/* woven edge */}
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: 'repeating-linear-gradient(90deg, var(--store-primary) 0 10px, var(--store-accent) 10px 20px)' }} aria-hidden />
      </div>
      {/* fringe */}
      <div
        className="mx-auto h-3.5 w-full"
        style={{ background: 'repeating-linear-gradient(90deg, color-mix(in srgb, var(--store-primary) 70%, white) 0 3px, transparent 3px 8px)' }}
        aria-hidden
      />
      {caption && (
        <figcaption className="mx-auto mt-4 w-fit border px-4 py-1.5 font-mono text-[11px] tracking-wider text-cream-muted" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 40%, transparent)', background: 'var(--store-surface)' }}>
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

/**
 * FADMA RUGS — warm Berber souk-gallery. Hanging-rug frames with rods and
 * fringe, zigzag motif bands, catalog cards with diamond bullets.
 */
export default function FadmaRugs({ store }: { store: StorePageTheme }) {
  return (
    <StoreShell store={store}>
      <div className="relative">
        <StoreHeader store={store} />

        {/* ── HERO — souk wall ────────────────────────────────── */}
        <section className="relative min-h-[100dvh] overflow-hidden" aria-label={store.name}>
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={store.shaderIntensity ?? 0.8}
            className="absolute inset-0 opacity-70"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, var(--store-bg) 12%, color-mix(in srgb, var(--store-bg) 45%, transparent))' }}
            aria-hidden
          />
          <div className="container-atelier relative z-10 grid min-h-[100dvh] items-center gap-14 py-32 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div
                className="mb-6 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Diamond />
                <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
                  RAHBA KEDIMA — MARRAKECH MEDINA
                </span>
                <Diamond />
              </motion.div>
              <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
                {store.heroTitle.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block leading-[1.15] text-cream will-change-transform"
                      style={{ fontSize: 'clamp(2.8rem, 7vw, 6.2rem)' }}
                      initial={{ y: '112%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.1, delay: 0.4 + i * 0.14, ease: LUXE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
              {/* woven underline */}
              <motion.svg
                viewBox="0 0 300 14"
                className="mt-4 h-3.5 w-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                aria-hidden
              >
                <motion.path
                  d="M2 10 L20 4 L38 10 L56 4 L74 10 L92 4 L110 10 L128 4 L146 10 L164 4 L182 10 L200 4 L218 10 L236 4 L254 10 L272 4 L298 10"
                  fill="none"
                  stroke="var(--store-primary)"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 1.2, ease: 'easeInOut' }}
                />
              </motion.svg>
              <motion.p
                className="mt-6 max-w-[52ch] text-lead text-cream-muted"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: LUXE }}
              >
                {store.heroSub}
              </motion.p>
              <motion.div
                className="mt-9 flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15, ease: LUXE }}
              >
                <button
                  onClick={() => scrollToTarget('#store-booking')}
                  className="rounded-sm px-8 py-4 font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
                >
                  {t(store, 'bookNow')}
                </button>
                <button
                  onClick={() => scrollToTarget('#store-gallery')}
                  className="group flex items-center gap-3 text-cream transition-colors hover:text-[var(--store-primary)]"
                >
                  <Diamond className="transition-transform duration-300 group-hover:rotate-[135deg]" />
                  {t(store, 'gallery')}
                </button>
              </motion.div>
            </div>

            {/* hanging hero rug */}
            <div className="lg:col-span-5">
              <HangingRug src={store.heroImage} caption={store.tagline} delay={0.5} />
            </div>
          </div>
        </section>

        <ZigzagBand />

        {/* ── CATALOG (services) ──────────────────────────────── */}
        <section id="store-menu" className="py-24 md:py-32">
          <div className="container-atelier">
            <div className="mb-14 flex items-center gap-5">
              <Diamond />
              <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
                THE COLLECTION — ATLAS COOPERATIVES
              </span>
              <span className="hairline flex-1" style={{ background: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }} />
            </div>
            <h2 className="m-0 mb-14 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
              {t(store, 'menu')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {store.services.map((s, i) => (
                <motion.article
                  key={s.title}
                  className="group relative border p-8 transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)',
                    background: 'var(--store-surface)',
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: LUXE }}
                >
                  {/* diamond corner */}
                  <span className="absolute -top-1.5 start-8 h-3 w-3 rotate-45 transition-colors" style={{ background: 'var(--store-primary)' }} aria-hidden />
                  <h3 className="m-0 flex items-start gap-3 text-xl font-bold text-cream md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.title}
                  </h3>
                  <p className="mb-0 mt-4 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                  {s.price && (
                    <p className="mb-0 mt-6 flex items-center gap-3">
                      <span className="hairline w-6" style={{ background: 'var(--store-accent)' }} />
                      <span className="font-mono text-sm font-bold" style={{ color: 'var(--store-primary)' }}>
                        {s.price}
                      </span>
                    </p>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <ZigzagBand flip />

        {/* ── STORY — tea & tales ─────────────────────────────── */}
        <section id="store-story" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier grid items-start gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <HangingRug src={store.aboutImage} ratio="aspect-[4/5]" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="mb-6 flex items-center gap-4">
                <Diamond />
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
                  className="relative m-0 mt-12 p-10 text-center"
                  style={{ background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease: LUXE }}
                >
                  {['-top-2 -start-2', '-top-2 -end-2', '-bottom-2 -start-2', '-bottom-2 -end-2'].map((pos) => (
                    <span key={pos} className={`absolute ${pos} h-4 w-4 rotate-45`} style={{ background: 'var(--store-primary)' }} aria-hidden />
                  ))}
                  <p className="m-0 text-2xl leading-snug text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    «{store.story.quote.text}»
                  </p>
                  <footer className="mt-5 font-mono text-xs tracking-widest text-cream-faint">— {store.story.quote.author}</footer>
                </motion.blockquote>
              )}
            </div>
          </div>
        </section>

        {/* ── GALLERY — the rug wall ──────────────────────────── */}
        <section id="store-gallery" className="py-24 md:py-32">
          <div className="container-atelier">
            <div className="mb-14 text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <Diamond />
                <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
                  THE RUG WALL
                </span>
                <Diamond />
              </div>
              <h2 className="m-0 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
                {t(store, 'gallery')}
              </h2>
            </div>
            <div className="grid items-start gap-8 md:grid-cols-3">
              {store.gallery.map((g, i) => (
                <HangingRug key={g.src} src={g.src} caption={g.caption} delay={i * 0.15} className={i === 1 ? 'md:mt-14' : ''} />
              ))}
            </div>
          </div>
        </section>

        <ZigzagBand />

        {/* ── REVIEWS — guestbook ─────────────────────────────── */}
        <section id="store-reviews" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
          <div className="container-atelier">
            <div className="mb-14 text-center">
              <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
                GUESTBOOK — {t(store, 'reviewsNote').toUpperCase()}
              </span>
              <h2 className="m-0 mt-4 text-cream" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                {t(store, 'reviews')}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {store.reviews.map((r, i) => (
                <motion.blockquote
                  key={r.author}
                  className="m-0 border p-8"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)', background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, y: 40, rotate: i === 1 ? 1 : -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: LUXE }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <Stars rating={r.rating} />
                    <Diamond />
                  </div>
                  <p className="m-0 leading-relaxed text-cream">{r.text}</p>
                  <footer className="mt-6 flex items-center justify-between border-t pt-4 text-sm" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}>
                    <span className="font-bold" style={{ color: 'var(--store-primary)' }}>
                      {r.author}
                    </span>
                    {r.source && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-cream-faint" dir="ltr">
                        via {r.source}
                      </span>
                    )}
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
