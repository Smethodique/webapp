import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { Marquee } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, Chip, EASE_LUXE, Kicker, ReviewCard, serif } from './shared';

/**
 * ALI BARBERSHOP — Sidi El Khadir, Casablanca (French-first LTR). Sleek
 * urban concept: diagonal split hero with parallax cut image, minimal
 * invert-on-hover service table, « à domicile » marquee band, masonry
 * gallery, review cards row.
 */
export default function AliBarbershop({ store }: { store: StorePageTheme }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — diagonal split */}
      <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
        {/* image half with diagonal clip */}
        <motion.div
          className="absolute inset-y-0 right-0 w-full lg:w-[58%]"
          style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          <motion.img src={store.heroImage} alt="" aria-hidden style={{ y: imgY }} className="h-[115%] w-full object-cover opacity-70" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, var(--store-bg) 4%, transparent 55%), linear-gradient(to top, color-mix(in srgb, var(--store-bg) 80%, transparent), transparent 60%)' }}
          />
        </motion.div>
        {/* accent slash */}
        <span
          aria-hidden
          className="absolute inset-y-0 right-[54%] hidden w-[3px] lg:block"
          style={{ background: 'var(--store-accent)', transform: 'skewX(-10deg)', boxShadow: '0 0 24px color-mix(in srgb, var(--store-accent) 60%, transparent)' }}
        />
        <div className="container-atelier relative z-10 flex min-h-[100dvh] flex-col justify-center gap-7 py-32 lg:max-w-[46%]">
          <motion.span
            className="kicker"
            dir="ltr"
            style={{ color: 'var(--store-accent)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {store.content?.taglineFr ?? 'Casablanca'}
          </motion.span>
          <h1 className="m-0 text-cream" style={{ ...serif, fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.08 }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.4 + i * 0.13, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span style={{ color: 'var(--store-accent)', letterSpacing: '0.2em' }}>★★★★★</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
              5,0 — 395 avis Welia
            </span>
          </motion.div>
          <motion.p
            className="m-0 max-w-md leading-relaxed text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div
            className="mt-2 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE_LUXE }}
          >
            <BookCta store={store} />
            <Chip>{store.city}</Chip>
          </motion.div>
        </div>
      </section>

      {/* SERVICE TABLE — invert on hover */}
      <section id="store-menu" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <Kicker>{t(store, 'menuKicker')}</Kicker>
              <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
                {t(store, 'menu')}
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint md:block" dir="ltr">
              salon — domicile
            </span>
          </div>
          <ul className="m-0 list-none border-t p-0" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}>
            {store.services.map((s, i) => {
              const isHome = /domicile/i.test(s.title);
              return (
                <motion.li
                  key={i}
                  className="group relative overflow-hidden border-b transition-colors duration-500 hover:bg-[var(--store-primary)]"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.75, delay: i * 0.05, ease: EASE_LUXE }}
                >
                  {isHome && (
                    <span aria-hidden className="absolute inset-y-0 start-0 w-1" style={{ background: 'var(--store-accent)' }} />
                  )}
                  <div className="grid gap-3 px-4 py-7 transition-colors duration-500 group-hover:text-[var(--store-on-primary)] md:grid-cols-[3.5rem_1fr_auto_auto] md:items-baseline md:gap-8 md:px-8">
                    <span className="font-mono text-xs text-cream-faint transition-colors group-hover:text-[var(--store-on-primary)]" dir="ltr">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <h3 className="m-0 text-2xl text-cream transition-colors duration-500 group-hover:text-[var(--store-on-primary)] md:text-3xl" style={serif}>
                        {s.title}
                      </h3>
                      <p className="m-0 mt-1.5 max-w-xl text-sm leading-relaxed text-cream-muted transition-colors duration-500 group-hover:text-[var(--store-on-primary)]/80">
                        {s.desc}
                      </p>
                    </span>
                    {s.duration && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-faint transition-colors group-hover:text-[var(--store-on-primary)]/70" dir="ltr">
                        {s.duration}
                      </span>
                    )}
                    <span className="whitespace-nowrap text-xl transition-colors duration-500" style={{ ...serif, color: 'var(--store-accent)' }}>
                      {s.price}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* À DOMICILE — band */}
      <section aria-hidden className="py-5" style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}>
        <Marquee duration={30} dir="ltr">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em]">
              service à domicile <span aria-hidden>✦</span> casablanca <span aria-hidden>✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* GALLERY — masonry columns */}
      <section id="store-gallery" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier">
          <Kicker className="mb-12">{t(store, 'galleryKicker')}</Kicker>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={i}
                className="group relative m-0 mb-5 break-inside-avoid overflow-hidden"
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE_LUXE }}
              >
                <img
                  src={g.src}
                  alt={g.caption ?? store.name}
                  loading="lazy"
                  className={`w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 ${i % 2 ? 'aspect-square' : 'aspect-[3/4]'}`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-full items-baseline gap-3 bg-black/70 px-4 py-3 backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--store-accent)' }} dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-cream">{g.caption}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* STORY — split, sharp */}
      <section id="store-story" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid gap-14 lg:grid-cols-2">
          <div>
            <Kicker>{t(store, 'storyKicker')}</Kicker>
            <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', lineHeight: 1.15 }}>
              {store.story.title}
            </h2>
            {store.story.quote && (
              <blockquote className="m-0 mt-10 border-s-2 ps-6 text-xl leading-relaxed text-cream md:text-2xl" style={{ ...serif, borderColor: 'var(--store-accent)' }}>
                {store.story.quote.text}
                <footer className="mt-3 font-mono text-xs text-cream-faint" dir="ltr">
                  — {store.story.quote.author}
                </footer>
              </blockquote>
            )}
          </div>
          <div className="space-y-5 leading-loose text-cream-muted lg:pt-16">
            {store.story.body.map((p, i) => (
              <motion.p
                key={i}
                className="m-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_LUXE }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS — cards row */}
      <section id="store-reviews" className="py-24 md:py-32">
        <div className="container-atelier">
          <Kicker className="mb-12">{t(store, 'reviewsKicker')}</Kicker>
          <div className="grid gap-6 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <ReviewCard
                key={i}
                review={r}
                className="border p-8 transition-transform duration-500 hover:-translate-y-1.5"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
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
