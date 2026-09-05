import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { Reveal } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, Chip, EASE_LUXE, Kicker, ReviewCard, ShaderBackdrop, serif } from './shared';

/**
 * STUDIO GLEM — Guéliz, Marrakech. One-chair concept: giant outlined
 * watermark hero, a vertical RITUAL TIMELINE with sticky portrait, and a
 * free-scroll snap filmstrip gallery. Dark, quiet, deliberate.
 */
export default function StudioGlem({ store }: { store: StorePageTheme }) {
  const ritualRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ritualRef, offset: ['start center', 'end center'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — dark room, outlined watermark, whisper-quiet */}
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
        <ShaderBackdrop store={store} intensity={0.7} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none text-center leading-[1.05]"
          style={{
            ...serif,
            fontSize: 'clamp(6rem, 17vw, 16rem)',
            color: 'transparent',
            WebkitTextStroke: '1px color-mix(in srgb, var(--store-primary) 14%, transparent)',
          }}
        >
          {store.heroTitle[0]}
        </span>
        <div className="container-atelier relative z-10 flex max-w-2xl flex-col items-center gap-7 py-32 text-center">
          <motion.span
            className="kicker"
            dir="ltr"
            style={{ color: 'var(--store-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {store.content?.taglineFr ?? 'Marrakech'}
          </motion.span>
          <h1 className="m-0 text-cream" style={{ ...serif, fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: 1.25 }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.15, delay: 0.45 + i * 0.16, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="m-0 leading-relaxed text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25, ease: EASE_LUXE }}
          >
            <BookCta store={store} />
            {store.whatsapp && (
              <Chip>
                WhatsApp {store.whatsapp}
              </Chip>
            )}
          </motion.div>
        </div>
      </section>

      {/* RITUAL TIMELINE — sticky portrait + growing line */}
      <section id="store-menu" ref={ritualRef} className="py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid gap-14 lg:grid-cols-12">
          {/* sticky portrait */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Kicker>{t(store, 'menuKicker')}</Kicker>
              <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.2 }}>
                {t(store, 'menu')}
              </h2>
              <Reveal className="mt-10 hidden lg:block">
                <div className="overflow-hidden" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
                  <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
                  {store.address}
                </p>
              </Reveal>
            </div>
          </div>
          {/* steps */}
          <div className="relative lg:col-span-7">
            <motion.span
              aria-hidden
              className="absolute inset-y-0 start-4 w-px origin-top md:start-5"
              style={{ background: 'var(--store-primary)', scaleY: lineScale }}
            />
            <ol className="m-0 list-none space-y-14 p-0">
              {store.services.map((s, i) => (
                <motion.li
                  key={i}
                  className="relative ps-14 md:ps-20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.85, ease: EASE_LUXE }}
                >
                  <span
                    className="absolute start-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] md:h-10 md:w-10"
                    style={{ borderColor: 'var(--store-primary)', color: 'var(--store-primary)', background: 'var(--store-bg)' }}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="m-0 text-2xl text-cream md:text-3xl" style={serif}>
                      {s.title}
                    </h3>
                    {s.duration && <Chip>{s.duration}</Chip>}
                  </div>
                  <p className="m-0 mt-3 max-w-lg text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                  <p className="m-0 mt-3 text-xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                    {s.price}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* STORY — quiet single column, big craftsman quote */}
      <section id="store-story" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier mx-auto max-w-3xl">
          <Kicker>{t(store, 'storyKicker')}</Kicker>
          <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.2 }}>
            {store.story.title}
          </h2>
          <div className="mt-10 space-y-5 leading-loose text-cream-muted">
            {store.story.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="m-0">{p}</p>
              </Reveal>
            ))}
          </div>
          {store.story.quote && (
            <Reveal delay={0.15}>
              <blockquote
                className="m-0 mt-14 border-y py-10 text-center text-2xl leading-relaxed text-cream md:text-3xl"
                style={{ ...serif, borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}
              >
                {store.story.quote.text}
                <footer className="mt-4 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      {/* GALLERY — free snap filmstrip */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-10 flex items-end justify-between">
          <Kicker>{t(store, 'galleryKicker')}</Kicker>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint" dir="ltr">
            drag →
          </span>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-24">
          {store.gallery.map((g, i) => (
            <figure key={i} className="m-0 w-[70vw] shrink-0 snap-center md:w-[34vw]">
              <div className="overflow-hidden" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 25%, transparent)' }}>
                <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-sm text-cream-muted">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
                  № {String(i + 1).padStart(2, '0')}
                </span>
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* REVIEWS — quiet dark cards */}
      <section id="store-reviews" className="py-24 md:py-32">
        <div className="container-atelier">
          <Kicker className="mb-12">{t(store, 'reviewsKicker')}</Kicker>
          <div className="grid gap-8 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <ReviewCard
                key={i}
                review={r}
                className="border-t-2 pt-8"
                style={{ borderColor: 'var(--store-primary)' }}
              />
            ))}
          </div>
        </div>
      </section>

      <StoreBooking store={store} />
      <StoreMapHours store={store} />
      <StoreFooter store={store} />
    </>
  );
}
