import { motion } from 'framer-motion';
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
 * 10 · Les 3 Dou'soeurs — warm British-style salon de thé.
 * Cozy split hero with a big rounded photo card + floating badges; « menu du
 * salon » two-column panel; auto-scrolling image river gallery; quote-mark
 * review grid.
 */
export default function Les3Dousoeurs({ store }: { store: StorePageTheme }) {
  const riverImages = [...store.gallery, { src: store.heroImage, caption: store.name }, { src: store.aboutImage, caption: store.story.title }];

  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · cozy split, rounded photo card ——— */}
      <section className="relative min-h-[100dvh] overflow-hidden" aria-label={store.name}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(90% 70% at 80% 10%, var(--store-surface-tint), transparent 60%)' }}
        />
        <div className="container-atelier relative z-10 grid min-h-[100dvh] items-center gap-12 py-28 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.span
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-cream-muted"
              dir="ltr"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_LUXE }}
            >
              {store.sectorLabel} · {store.city.toUpperCase()}
            </motion.span>
            <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block text-display-lg text-cream will-change-transform"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: EASE_LUXE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mb-0 mt-6 max-w-[48ch] leading-relaxed text-cream-muted"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: EASE_LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: EASE_LUXE }}
            >
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
              <OpenChip store={store} />
            </motion.div>
          </div>

          <motion.div
            className="relative lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE_LUXE }}
          >
            <div className="overflow-hidden rounded-[2.5rem] border border-line/50 shadow-2xl">
              <motion.img
                src={store.heroImage}
                alt={store.name}
                className="aspect-[4/3] w-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, delay: 0.5, ease: EASE_LUXE }}
              />
            </div>
            {/* floating badges */}
            <motion.span
              className="absolute -top-5 end-6 rounded-full px-4 py-2 font-mono text-[11px] shadow-xl"
              style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
              initial={{ opacity: 0, y: 14, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 0.8, delay: 1.3, ease: EASE_LUXE }}
            >
              {store.category}
            </motion.span>
            <motion.span
              className="absolute -bottom-5 start-6 max-w-[24ch] rounded-2xl px-5 py-3 text-sm text-cream shadow-xl"
              style={{ background: 'var(--store-surface)', border: '1px solid var(--line)' }}
              initial={{ opacity: 0, y: 14, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.8, delay: 1.45, ease: EASE_LUXE }}
            >
              {store.tagline}
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ——— STORY · teatime split ——— */}
      <section id="store-story" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem]">
              <motion.img
                src={store.aboutImage}
                alt={store.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: EASE_LUXE }}
              />
            </div>
            <span aria-hidden className="absolute -bottom-6 -end-4 text-6xl" style={{ color: 'var(--store-primary)' }}>
              ❦
            </span>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
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
              <blockquote className="m-0 mt-10 rounded-2xl border border-line/60 p-6" style={{ background: 'var(--store-surface)' }}>
                <p className="m-0 text-lg text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  «{store.story.quote.text}»
                </p>
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* ——— MENU · menu du salon panel ——— */}
      <section id="store-menu" className="py-24 md:py-36">
        <div className="container-atelier">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-line/60 p-8 md:p-14" style={{ background: 'var(--store-surface-tint)' }}>
            <div className="mb-12 text-center">
              <span aria-hidden className="mb-4 block text-3xl" style={{ color: 'var(--store-primary)' }}>
                ❦
              </span>
              <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                {t(store, 'menu')}
              </h2>
              <p className="mb-0 mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cream-faint" dir="ltr">
                {t(store, 'menuKicker')}
              </p>
            </div>
            <div className="grid gap-x-12 sm:grid-cols-2">
              {store.services.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="border-b border-line/50 py-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_LUXE }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="m-0 text-lg font-semibold text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    {item.price && (
                      <span className="shrink-0 font-mono text-sm" style={{ color: 'var(--store-primary)' }} dir="auto">
                        {item.price}
                      </span>
                    )}
                  </div>
                  <p className="mb-0 mt-1.5 text-sm text-cream-muted">{item.desc}</p>
                  {item.note && (
                    <p className="mb-0 mt-1 font-mono text-[11px]" style={{ color: 'var(--store-accent)' }}>
                      ✳ {item.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— GALLERY · auto-scrolling image river ——— */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-12">
          <KickerLine>{t(store, 'galleryKicker')}</KickerLine>
          <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'gallery')}
          </h2>
        </div>
        <Marquee duration={45} dir={store.dir === 'rtl' ? 'rtl' : 'ltr'}>
          {riverImages.map((g, i) => (
            <figure key={i} className="relative mx-3 h-64 w-80 shrink-0 overflow-hidden rounded-3xl md:h-72 md:w-96">
              <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="h-full w-full object-cover" />
              <figcaption
                className="absolute inset-x-0 bottom-0 px-5 py-3 text-sm text-cream"
                style={{ background: 'linear-gradient(to top, rgba(6,5,4,0.85), transparent)' }}
              >
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </section>

      {/* ——— REVIEWS · quote-mark grid ——— */}
      <section id="store-reviews" className="py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'reviewsKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'reviews')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className="m-0 rounded-3xl border border-line/50 p-8"
                style={{ background: 'var(--store-surface)' }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_LUXE }}
              >
                <span aria-hidden className="block leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--store-primary)', opacity: 0.4 }}>
                  ”
                </span>
                <blockquote className="m-0 mt-2 leading-relaxed text-cream">{r.text}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-cream-faint">
                    {r.author}
                    {r.source && <span dir="ltr"> · {r.source}</span>}
                  </span>
                  <Stars rating={r.rating} />
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
