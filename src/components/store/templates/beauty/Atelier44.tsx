import { motion } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreReviews from '@/components/store/StoreReviews';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { Marquee, Reveal } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, EASE_LUXE, Kicker, ShaderBackdrop, serif } from './shared';

/**
 * ATELIER 44 — Guéliz, Marrakech (French-first LTR). Boutique-vitrine:
 * giant outlined «44» behind the vitrine hero, tilted side frames,
 * a polaroid gallery with tape, and shelf-tag service cards.
 */
export default function Atelier44({ store }: { store: StorePageTheme }) {
  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — la vitrine: giant 44 ghost, tilted side frames */}
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
        <ShaderBackdrop store={store} intensity={0.7} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none leading-none"
          style={{
            ...serif,
            fontSize: 'clamp(18rem, 44vw, 42rem)',
            color: 'transparent',
            WebkitTextStroke: '1px color-mix(in srgb, var(--store-primary) 30%, transparent)',
          }}
        >
          44
        </span>
        {/* tilted vitrine frames */}
        <motion.div
          aria-hidden
          className="absolute left-[4%] top-1/2 hidden w-52 -translate-y-1/2 overflow-hidden shadow-2xl lg:block xl:w-64"
          initial={{ opacity: 0, rotate: -10, y: 60 }}
          animate={{ opacity: 1, rotate: -6, y: 0 }}
          transition={{ duration: 1.3, delay: 0.7, ease: EASE_LUXE }}
        >
          <img src={store.gallery[0]?.src ?? store.heroImage} alt="" className="aspect-[3/4] w-full object-cover" />
        </motion.div>
        <motion.div
          aria-hidden
          className="absolute right-[4%] top-1/2 hidden w-52 -translate-y-1/2 overflow-hidden shadow-2xl lg:block xl:w-64"
          initial={{ opacity: 0, rotate: 10, y: 60 }}
          animate={{ opacity: 1, rotate: 5, y: 0 }}
          transition={{ duration: 1.3, delay: 0.85, ease: EASE_LUXE }}
        >
          <img src={store.gallery[1]?.src ?? store.aboutImage} alt="" className="aspect-[3/4] w-full object-cover" />
        </motion.div>

        <div className="container-atelier relative z-10 flex max-w-3xl flex-col items-center gap-6 py-32 text-center">
          <motion.span
            className="kicker"
            dir="ltr"
            style={{ color: 'var(--store-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {store.content?.taglineFr ?? 'Marrakech'}
          </motion.span>
          <h1 className="m-0 italic text-cream" style={{ ...serif, fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)', lineHeight: 1.1 }}>
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
          <motion.p
            className="m-0 max-w-xl leading-relaxed text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXE }}>
            <BookCta store={store} />
          </motion.div>
        </div>
      </section>

      {/* word ribbon */}
      <section aria-hidden className="border-y py-4" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 20%, transparent)' }}>
        <Marquee duration={36} dir="ltr">
          {[store.tagline, ...store.services.map((s) => s.title)].map((w, i) => (
            <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap">
              <span className="italic text-cream-muted" style={{ ...serif, fontSize: '1.15rem' }}>
                {w}
              </span>
              <span style={{ color: 'var(--store-primary)' }}>✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* GALLERY — polaroids with tape */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-32 lg:py-36">
        <div className="container-atelier">
          <Kicker className="mb-3">{t(store, 'galleryKicker')}</Kicker>
          <h2 className="m-0 mb-14 italic text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
            {t(store, 'gallery')}
          </h2>
          <div className="flex flex-wrap items-start justify-center gap-8 md:gap-10">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={i}
                className="relative m-0 w-64 bg-[#F5F1E8] p-3 pb-14 shadow-xl md:w-72"
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 6 : -6 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2.5 : -2.5 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_LUXE }}
              >
                {/* tape */}
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 opacity-70"
                  style={{ background: 'color-mix(in srgb, var(--store-primary) 45%, #fff8)' }}
                />
                <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-square w-full object-cover" />
                {g.caption && (
                  <figcaption className="mt-3 text-center text-sm italic text-[#4a3b32]" style={serif}>
                    {g.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* STORY — two arch portraits (mère & fille) + narrow column */}
      <section id="store-story" className="py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-2">
          <div className="relative flex items-end justify-center gap-6">
            <Reveal className="w-1/2">
              <div className="overflow-hidden rounded-t-full" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 40%, transparent)' }}>
                <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[3/4.4] w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="-ms-10 w-1/2 lg:-ms-16">
              <div className="mb-10 overflow-hidden rounded-t-full" style={{ border: '1px solid color-mix(in srgb, var(--store-accent) 55%, transparent)' }}>
                <img src={store.gallery[2]?.src ?? store.heroImage} alt={store.name} loading="lazy" className="aspect-[3/4.4] w-full object-cover" />
              </div>
            </Reveal>
          </div>
          <div>
            <Kicker>{t(store, 'storyKicker')}</Kicker>
            <h2 className="m-0 mt-6 italic text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', lineHeight: 1.15 }}>
              {store.story.title}
            </h2>
            <div className="mt-8 space-y-5 leading-loose text-cream-muted">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <p className="m-0">{p}</p>
                </Reveal>
              ))}
            </div>
            {store.story.quote && (
              <Reveal delay={0.2}>
                <blockquote className="m-0 mt-10 border-s-2 ps-6 text-xl italic leading-relaxed text-cream md:text-2xl" style={{ ...serif, borderColor: 'var(--store-primary)' }}>
                  {store.story.quote.text}
                  <footer className="mt-3 font-mono text-xs not-italic uppercase tracking-[0.2em] text-cream-faint" dir="ltr">
                    — {store.story.quote.author}
                  </footer>
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES — boutique shelf tags */}
      <section id="store-menu" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier">
          <div className="mb-14 text-center">
            <Kicker className="justify-center">{t(store, 'menuKicker')}</Kicker>
            <h2 className="m-0 mt-6 italic text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
              {t(store, 'menu')}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {store.services.map((s, i) => (
              <motion.article
                key={i}
                className="group relative flex flex-col gap-4 border p-8 transition-transform duration-500 hover:-translate-y-1.5"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: (i % 3) * 0.08, ease: EASE_LUXE }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint" dir="ltr">
                  N° {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="m-0 text-2xl italic text-cream" style={serif}>
                  {s.title}
                </h3>
                <p className="m-0 flex-1 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                {/* price tag */}
                <span
                  className="mt-2 inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm transition-colors group-hover:text-cream"
                  style={{ borderColor: 'var(--store-accent)', color: 'var(--store-primary)', ...serif }}
                >
                  {s.price}
                </span>
              </motion.article>
            ))}
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
