import { motion, useReducedMotion } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreReviews from '@/components/store/StoreReviews';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { Reveal } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, Chip, EASE_LUXE, Kicker, ShaderBackdrop, serif } from './shared';

/**
 * BEAUTY BY RIIHAAB — Taddart, Agadir (French-first LTR). Glow editorial:
 * blush radial glow, gently floating frames, services as « la carte »
 * with right-aligned prices, lookbook gallery with italic captions.
 */
export default function BeautyByRiihaab({ store }: { store: StorePageTheme }) {
  const reduced = useReducedMotion();

  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — glow: blush aura + floating frames */}
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
        <ShaderBackdrop store={store} intensity={0.55} scrim={false} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--store-primary) 26%, transparent), transparent 70%), linear-gradient(to top, color-mix(in srgb, var(--store-bg) 88%, transparent), transparent 45%)',
          }}
        />
        {/* floating frames */}
        {store.gallery.slice(0, 2).map((g, i) => (
          <motion.img
            key={i}
            src={g.src}
            alt=""
            aria-hidden
            loading="lazy"
            className={`absolute hidden w-44 object-cover shadow-2xl md:block xl:w-56 ${i === 0 ? 'left-[6%] top-[16%]' : 'right-[6%] bottom-[14%]'}`}
            style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 40%, transparent)', borderRadius: '999px 999px 12px 12px' }}
            initial={{ opacity: 0, y: 60 }}
            animate={reduced ? { opacity: 0.85 } : { opacity: 0.85, y: [0, -16, 0] }}
            transition={{
              opacity: { duration: 1.2, delay: 0.6 + i * 0.2 },
              y: reduced ? undefined : { duration: 7 + i * 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        <div className="container-atelier relative z-10 flex max-w-3xl flex-col items-center gap-7 py-32 text-center">
          <motion.span
            className="kicker"
            dir="ltr"
            style={{ color: 'var(--store-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            {store.content?.taglineFr ?? 'Agadir'}
          </motion.span>
          <h1 className="m-0 italic text-cream" style={{ ...serif, fontSize: 'clamp(3rem, 8vw, 6.4rem)', lineHeight: 1.05 }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.15, delay: 0.4 + i * 0.14, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE_LUXE }}
          >
            <span style={{ color: 'var(--store-primary)', letterSpacing: '0.2em' }}>★★★★★</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
              5,0 — Welia
            </span>
          </motion.div>
          <motion.p
            className="m-0 max-w-xl leading-relaxed text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.15, ease: EASE_LUXE }}>
            <BookCta store={store} />
          </motion.div>
        </div>
      </section>

      {/* LA CARTE — thin separators, right-aligned prices, hover glow */}
      <section id="store-menu" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier max-w-4xl">
          <div className="mb-14">
            <Kicker>{t(store, 'menuKicker')}</Kicker>
            <h2 className="m-0 mt-6 italic text-cream" style={{ ...serif, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              {t(store, 'menu')}
            </h2>
          </div>
          <ul className="m-0 list-none p-0">
            {store.services.map((s, i) => (
              <motion.li
                key={i}
                className="group border-b py-8 transition-all duration-500 first:border-t hover:ps-4"
                style={{
                  borderColor: 'color-mix(in srgb, var(--store-primary) 18%, transparent)',
                }}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.75, delay: i * 0.05, ease: EASE_LUXE }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <h3 className="m-0 text-2xl italic text-cream transition-colors md:text-3xl" style={serif}>
                    {s.title}
                  </h3>
                  <span className="flex items-baseline gap-4">
                    {s.duration && <Chip>{s.duration}</Chip>}
                    <span className="whitespace-nowrap text-xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                      {s.price}
                    </span>
                  </span>
                </div>
                <p className="m-0 mt-2 max-w-xl text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                <span
                  aria-hidden
                  className="mt-4 block h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: 'linear-gradient(to right, var(--store-primary), transparent)', boxShadow: '0 0 12px color-mix(in srgb, var(--store-primary) 60%, transparent)' }}
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* LOOKBOOK — large portraits, alternating offsets, big captions */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <Kicker className="mb-16">{t(store, 'galleryKicker')}</Kicker>
          <div className="space-y-20 md:space-y-28">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={i}
                className={`m-0 md:w-[62%] ${i % 2 ? 'md:ms-auto' : ''}`}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.1, ease: EASE_LUXE }}
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={g.src}
                    alt={g.caption ?? store.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover md:aspect-[16/10]"
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: EASE_LUXE }}
                  />
                </div>
                <figcaption className={`mt-5 flex items-baseline gap-4 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                  <span className="text-4xl italic" style={{ ...serif, color: 'var(--store-primary)' }} dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg italic text-cream-muted" style={serif}>
                    {g.caption}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* STORY — centered narrow column */}
      <section id="store-story" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier mx-auto max-w-2xl text-center">
          <Kicker className="justify-center">{t(store, 'storyKicker')}</Kicker>
          <h2 className="m-0 mt-6 italic text-cream" style={{ ...serif, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.2 }}>
            {store.story.title}
          </h2>
          <div className="mt-10 space-y-5 text-start leading-loose text-cream-muted">
            {store.story.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="m-0">{p}</p>
              </Reveal>
            ))}
          </div>
          {store.story.quote && (
            <Reveal delay={0.15}>
              <blockquote className="m-0 mt-12 text-2xl italic leading-relaxed text-cream md:text-3xl" style={serif}>
                <span style={{ color: 'var(--store-primary)' }}>«</span> {store.story.quote.text}{' '}
                <span style={{ color: 'var(--store-primary)' }}>»</span>
                <footer className="mt-4 font-mono text-xs not-italic uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
                  — {store.story.quote.author}
                </footer>
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      <StoreReviews store={store} />
      <StoreBooking store={store} />
      <StoreMapHours store={store} />
      <StoreFooter store={store} />
    </>
  );
}
