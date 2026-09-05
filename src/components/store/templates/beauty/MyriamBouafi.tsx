import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
 * MYRIAM BOUAFI — Bourgogne, Casablanca. Fashion-magazine editorial:
 * oversized Cormorant masthead + parallax portrait, quote-led 3-column
 * story, services as a magazine index, staggered overlapping gallery.
 */
export default function MyriamBouafi({ store }: { store: StorePageTheme }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — masthead + parallax portrait, editorial split */}
      <section ref={heroRef} className="relative overflow-hidden">
        <ShaderBackdrop store={store} intensity={0.8} />
        <div className="container-atelier relative z-10 grid min-h-[100dvh] items-center gap-10 py-28 lg:grid-cols-12">
          <motion.div style={{ y: titleY }} className="lg:col-span-7">
            <Kicker>{store.content?.taglineFr ?? 'Casablanca'}</Kicker>
            {/* Latin masthead — outlined ghost */}
            <motion.p
              aria-hidden
              dir="ltr"
              className="m-0 mt-8 select-none leading-[0.85]"
              style={{
                ...serif,
                fontSize: 'clamp(3.4rem, 8.5vw, 8rem)',
                color: 'transparent',
                WebkitTextStroke: '1px color-mix(in srgb, var(--store-primary) 55%, transparent)',
              }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE_LUXE }}
            >
              Myriam
              <br />
              Bouafi
            </motion.p>
            <h1 className="m-0 -mt-4 text-cream lg:-mt-8" style={{ ...serif, fontSize: 'clamp(2rem, 4.6vw, 4.2rem)', lineHeight: 1.25 }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: EASE_LUXE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="m-0 mt-8 max-w-xl leading-relaxed text-cream-muted"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE_LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXE }}
            >
              <BookCta store={store} />
              <Chip>{store.content?.taglineFr ?? store.city}</Chip>
            </motion.div>
          </motion.div>

          <div className="relative lg:col-span-5">
            <motion.div style={{ y: imgY }} className="relative">
              <motion.div
                className="overflow-hidden"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                transition={{ duration: 1.3, delay: 0.4, ease: EASE_LUXE }}
              >
                <img src={store.heroImage} alt={store.name} className="aspect-[3/4] w-full object-cover" />
              </motion.div>
              <span
                aria-hidden
                className="absolute -bottom-5 end-6 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.25em]"
                style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
                dir="ltr"
              >
                {store.city} — Atelier
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY — quote-led magazine, 3-column body with drop cap */}
      <section id="store-story" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier">
          {store.story.quote && (
            <Reveal>
              <blockquote
                className="m-0 mx-auto max-w-4xl text-center leading-snug text-cream"
                style={{ ...serif, fontSize: 'clamp(1.8rem, 4.2vw, 3.4rem)' }}
              >
                <span style={{ color: 'var(--store-primary)' }}>«</span>
                {store.story.quote.text}
                <span style={{ color: 'var(--store-primary)' }}>»</span>
                <footer className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
                  — {store.story.quote.author}
                </footer>
              </blockquote>
            </Reveal>
          )}
          <div className="mx-auto mt-16 max-w-5xl">
            <Kicker className="mb-8">{t(store, 'storyKicker')}</Kicker>
            <h2 className="m-0 mb-10 text-3xl text-cream md:text-5xl" style={serif}>
              {store.story.title}
            </h2>
            <div className="gap-10 leading-loose text-cream-muted md:columns-3">
              {store.story.body.map((p, i) => (
                <p key={i} className={`m-0 mb-6 break-inside-avoid ${i === 0 ? 'first-letter:float-start first-letter:me-3 first-letter:text-6xl first-letter:leading-none first-letter:text-cream' : ''}`} style={i === 0 ? { ...serif } : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — magazine index with ghost numerals */}
      <section id="store-menu" className="relative py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <Kicker>{t(store, 'menuKicker')}</Kicker>
              <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
                {t(store, 'menu')}
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint md:block" dir="ltr">
              Index — {store.services.length}
            </span>
          </div>
          <ol className="m-0 list-none p-0">
            {store.services.map((s, i) => (
              <motion.li
                key={i}
                className="group relative overflow-hidden border-t py-10 last:border-b"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 20%, transparent)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.85, delay: i * 0.04, ease: EASE_LUXE }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-6 end-0 select-none leading-none transition-transform duration-700 group-hover:-translate-y-2"
                  dir="ltr"
                  style={{
                    ...serif,
                    fontSize: 'clamp(5rem, 12vw, 10rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1px color-mix(in srgb, var(--store-primary) 22%, transparent)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-baseline">
                  <div>
                    <h3 className="m-0 text-2xl text-cream transition-colors md:text-4xl" style={serif}>
                      {s.title}
                    </h3>
                    <p className="m-0 mt-3 max-w-xl text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                  </div>
                  <p className="m-0 whitespace-nowrap text-xl md:text-2xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                    {s.price}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* GALLERY — staggered overlapping editorial plates */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="container-atelier">
          <Kicker className="mb-4">{t(store, 'galleryKicker')}</Kicker>
          <div className="relative grid gap-8 md:grid-cols-12">
            {store.gallery.map((g, i) => {
              const layouts = [
                'md:col-span-5 md:mt-0',
                'md:col-span-4 md:col-start-7 md:mt-32',
                'md:col-span-5 md:col-start-3 md:-mt-16',
              ];
              return (
                <motion.figure
                  key={i}
                  className={`relative m-0 ${layouts[i % 3]}`}
                  initial={{ opacity: 0, y: 70, rotate: i % 2 ? 1.5 : -1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.1, delay: i * 0.1, ease: EASE_LUXE }}
                >
                  <div className="overflow-hidden shadow-2xl">
                    <motion.img
                      src={g.src}
                      alt={g.caption ?? store.name}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover"
                      initial={{ scale: 1.18 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE_LUXE }}
                    />
                  </div>
                  {g.caption && (
                    <figcaption className="mt-4 text-sm italic text-cream-muted" style={serif}>
                      — {g.caption}
                    </figcaption>
                  )}
                </motion.figure>
              );
            })}
          </div>
        </div>
      </section>

      <StoreReviews store={store} />
      <StoreBooking store={store} />
      <StoreMapHours store={store} />
      <StoreFooter store={store} />
    </>
  );
}
