import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { Marquee, Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, t } from '../../storeUtils';
import { KickerLine, OpenChip, Stars } from './atoms';

/**
 * 03 · Kesh Cup — hole-in-the-wall poster.
 * Full-bleed photo-poster hero with parallax + bottom-anchored display type;
 * horizontal snap-scroll menu cards; filmstrip gallery; stacked review ledger.
 */
export default function KeshCup({ store }: { store: StorePageTheme }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <>
      {/* scoped: hide chrome scrollbars on the horizontal rails */}
      <style>{`.kc-rail::-webkit-scrollbar{display:none}.kc-rail{scrollbar-width:none}`}</style>
      <StoreHeader store={store} />

      {/* ——— HERO · full-bleed photo poster ——— */}
      <section ref={heroRef} className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden" aria-label={store.name}>
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <img src={store.heroImage} alt={store.name} className="h-full w-full object-cover" />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, color-mix(in srgb, var(--store-bg) 92%, transparent) 8%, color-mix(in srgb, var(--store-bg) 30%, transparent) 55%, transparent)',
          }}
        />
        {/* top meta ticker */}
        <motion.div
          className="absolute inset-x-0 top-20 z-10 border-b border-cream/10 py-3"
          style={{ background: 'color-mix(in srgb, var(--store-bg) 45%, transparent)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Marquee duration={30} dir="ltr">
            {[store.sectorLabel, store.address, store.tagline].map((w, i) => (
              <span key={i} className="mx-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-cream-muted">
                {w} <span className="mx-2" style={{ color: 'var(--store-primary)' }}>●</span>
              </span>
            ))}
          </Marquee>
        </motion.div>

        <div className="container-atelier relative z-10 pb-16">
          <motion.span
            className="mb-5 inline-block rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em]"
            style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_LUXE }}
          >
            {store.category} — {store.city}
          </motion.span>
          <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block text-cream will-change-transform"
                  style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)', lineHeight: 1.02, fontWeight: 600 }}
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <motion.p
              className="m-0 max-w-[50ch] text-cream-muted"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: EASE_LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: EASE_LUXE }}
            >
              <OpenChip store={store} />
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— MENU · horizontal snap-scroll cards ——— */}
      <section id="store-menu" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <KickerLine>{t(store, 'menuKicker')}</KickerLine>
              <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                {t(store, 'menu')}
              </h2>
            </div>
            <p className="m-0 font-mono text-xs text-cream-faint" dir="ltr">
              ← scroll →
            </p>
          </div>
        </div>
        <div className="kc-rail overflow-x-auto pb-6">
          <div className="flex w-max snap-x snap-mandatory gap-5 px-[max(20px,5vw)]">
            {store.services.map((item, i) => (
              <motion.article
                key={item.title}
                className="flex w-[19rem] shrink-0 snap-start flex-col justify-between border border-line/60 p-7 md:w-[22rem]"
                style={{ background: 'var(--store-surface)' }}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: EASE_LUXE }}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm"
                    style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.price && (
                    <span className="font-mono text-lg" style={{ color: 'var(--store-primary)' }}>
                      {item.price}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="m-0 text-h3 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h3>
                  <p className="mb-0 mt-3 text-sm leading-relaxed text-cream-muted">{item.desc}</p>
                </div>
                <span className="mt-8 block h-px w-full" style={{ background: 'var(--store-primary)', opacity: 0.4 }} />
              </motion.article>
            ))}
            {/* end CTA card */}
            <button
              onClick={() => scrollToTarget('#store-booking')}
              className="flex w-[16rem] shrink-0 snap-start items-center justify-center border border-dashed border-line text-cream-muted transition-colors hover:border-[var(--store-primary)] hover:text-cream"
            >
              {t(store, 'bookNow')} ↗
            </button>
          </div>
        </div>
      </section>

      {/* ——— STORY · split with arch photo ——— */}
      <section id="store-story" className="py-24 md:py-36">
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <KickerLine>{store.sectorLabel}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {store.story.title}
            </h2>
            <div className="mt-8 space-y-5 text-cream-muted">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="m-0 leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
            {store.story.quote && (
              <blockquote className="m-0 mt-10 border border-line/60 p-6" style={{ background: 'var(--store-surface)' }}>
                <p className="m-0 text-lg italic text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  «{store.story.quote.text}»
                </p>
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
          <motion.div
            className="lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE_LUXE }}
          >
            <div className="overflow-hidden rounded-t-full border border-line/50">
              <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </div>
            <p className="mt-4 text-center font-mono text-xs text-cream-faint">{store.address}</p>
          </motion.div>
        </div>
      </section>

      {/* ——— GALLERY · filmstrip ——— */}
      <section id="store-gallery" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-12">
          <KickerLine>{t(store, 'galleryKicker')}</KickerLine>
          <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'gallery')}
          </h2>
        </div>
        <div className="kc-rail overflow-x-auto pb-4">
          <div className="flex w-max items-stretch gap-4 px-[max(20px,5vw)]">
            {[store.gallery[0], store.gallery[1], store.gallery[2], { src: store.heroImage, caption: store.name }].filter(Boolean).map((g, i) => (
              <motion.figure
                key={i}
                className="group relative m-0 h-[22rem] w-[17rem] shrink-0 overflow-hidden md:h-[26rem] md:w-[20rem]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_LUXE }}
              >
                <img src={g!.src} alt={g!.caption ?? store.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* sprocket holes */}
                <span aria-hidden className="absolute inset-x-0 top-0 flex h-5 items-center justify-around bg-ink-950/80">
                  {[...Array(6)].map((_, j) => (
                    <span key={j} className="h-2 w-3 rounded-[2px] bg-cream/25" />
                  ))}
                </span>
                <figcaption
                  className="absolute inset-x-0 bottom-0 px-4 py-3 font-mono text-xs text-cream"
                  style={{ background: 'linear-gradient(to top, rgba(6,5,4,0.85), transparent)' }}
                >
                  {String(i + 1).padStart(2, '0')} / {g!.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · stacked ledger ——— */}
      <section id="store-reviews" className="py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine>{t(store, 'reviewsKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'reviews')}
          </h2>
          <div className="border-t border-line/60">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className="m-0 grid gap-4 border-b border-line/60 py-8 md:grid-cols-12 md:items-baseline"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_LUXE }}
              >
                <div className="md:col-span-2">
                  <Stars rating={r.rating} />
                </div>
                <blockquote className="m-0 text-lg leading-relaxed text-cream md:col-span-7" style={{ fontFamily: 'var(--font-display)' }}>
                  «{r.text}»
                </blockquote>
                <figcaption className="font-mono text-xs text-cream-faint md:col-span-3 md:text-end">
                  {r.author}
                  {r.source && <span className="block" dir="ltr">{r.source}</span>}
                </figcaption>
              </motion.figure>
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
