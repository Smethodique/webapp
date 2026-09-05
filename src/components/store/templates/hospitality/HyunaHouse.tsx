import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { CurtainImage, Marquee, Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, t } from '../../storeUtils';
import { KickerLine, OpenChip, Stars, Tape } from './atoms';

/**
 * 02 · Hyuna House — Korean-Scandi hideaway.
 * Split hero (text panel / full-height photo) with a vertical keyword marquee
 * seam; bento menu cards; sticky-note story quote; polaroid-scatter gallery.
 */
export default function HyunaHouse({ store }: { store: StorePageTheme }) {
  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · split: warm panel + full-height photo, vertical marquee seam ——— */}
      <section className="relative min-h-[100dvh] overflow-hidden" aria-label={store.name}>
        <div className="grid min-h-[100dvh] lg:grid-cols-2">
          <div
            className="relative z-10 flex flex-col justify-center gap-7 px-8 pb-16 pt-32 md:px-14 lg:pb-24"
            style={{ background: 'linear-gradient(var(--store-surface-tint), var(--store-surface-tint)), var(--store-bg)' }}
          >
            <motion.span
              className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-cream-muted"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 40%, transparent)' }}
              dir="ltr"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_LUXE }}
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
              className="m-0 max-w-[46ch] text-cream-muted"
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
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
              <OpenChip store={store} />
            </motion.div>
            <motion.p
              className="m-0 font-mono text-xs text-cream-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              {store.address}
            </motion.p>
          </div>

          <div className="relative min-h-[55dvh] lg:min-h-[100dvh]">
            <CurtainImage src={store.heroImage} alt={store.name} className="absolute inset-0 h-full w-full" imgClassName="object-cover" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--store-bg) 55%, transparent), transparent 40%)' }}
            />
            {/* tagline chip on photo */}
            <motion.span
              className="absolute bottom-8 start-8 max-w-[26ch] rounded-2xl px-5 py-3 text-sm text-cream"
              style={{ background: 'color-mix(in srgb, var(--store-bg) 72%, transparent)', backdropFilter: 'blur(10px)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.4, ease: EASE_LUXE }}
            >
              {store.tagline}
            </motion.span>
          </div>
        </div>

        {/* vertical keyword marquee along the seam */}
        <div
          aria-hidden
          className="absolute inset-y-0 z-20 hidden w-12 items-center justify-center overflow-hidden border-s border-line/50 lg:flex"
          style={{ insetInlineStart: 'calc(50% - 24px)', background: 'var(--store-bg)' }}
        >
          <motion.div
            className="flex flex-col items-center gap-8 font-mono text-[11px] tracking-[0.3em] text-cream-faint"
            style={{ writingMode: 'vertical-rl' }}
            animate={{ y: ['0%', '-50%'] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            dir="ltr"
          >
            {[...store.services.map((s) => s.title), ...store.services.map((s) => s.title)].map((w, i) => (
              <span key={i} className="whitespace-nowrap">
                {w} ✦
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— tagline marquee strip ——— */}
      <section aria-hidden className="border-y border-line/60 py-5" style={{ background: 'var(--store-surface-tint)' }}>
        <Marquee duration={38} dir={store.dir}>
          {[store.tagline, store.category, store.city].map((w, i) => (
            <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap text-xl md:text-2xl" style={{ fontFamily: 'var(--font-display)', color: i % 2 ? 'var(--store-primary)' : undefined }}>
              {w} <span style={{ color: 'var(--store-primary)' }}>✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ——— MENU · bento board cards ——— */}
      <section id="store-menu" className="py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine>{t(store, 'menuKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'menu')}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {store.services.map((item, i) => (
              <motion.article
                key={item.title}
                className="group relative flex min-h-[13rem] flex-col justify-between rounded-3xl border border-line/50 p-7 transition-all duration-300 hover:-translate-y-1.5"
                style={{ background: i === 0 ? 'color-mix(in srgb, var(--store-primary) 16%, var(--store-surface))' : 'var(--store-surface)' }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, delay: i * 0.07, ease: EASE_LUXE }}
              >
                <span className="font-mono text-xs text-cream-faint" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="m-0 text-h3 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h3>
                  <p className="mb-0 mt-2 text-sm text-cream-muted">{item.desc}</p>
                </div>
                {item.price && (
                  <span
                    className="mt-4 inline-flex w-fit rounded-full px-3 py-1 font-mono text-sm"
                    style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
                    dir="auto"
                  >
                    {item.price}
                  </span>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ——— STORY · bookshelf split + sticky-note quote ——— */}
      <section id="store-story" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid items-start gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <CurtainImage src={store.aboutImage} alt={store.name} className="aspect-[3/4] w-full rounded-3xl" />
            {store.story.quote && (
              <motion.blockquote
                className="absolute -bottom-8 end-[-1rem] m-0 max-w-[24ch] rounded-xl p-6 shadow-2xl md:end-[-3rem]"
                style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)', rotate: '-3deg' }}
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: EASE_LUXE }}
              >
                <Tape className="-top-3 start-8" />
                <p className="m-0 text-lg font-semibold leading-snug">«{store.story.quote.text}»</p>
                <footer className="mt-3 font-mono text-xs opacity-75">{store.story.quote.author}</footer>
              </motion.blockquote>
            )}
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
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
          </div>
        </div>
      </section>

      {/* ——— GALLERY · polaroid scatter ——— */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'galleryKicker')}</KickerLine>
          <h2 className="m-0 mb-16 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'gallery')}
          </h2>
          <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-8">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={g.src}
                className="m-0 w-72 bg-[#F5F2EC] p-3 pb-5 shadow-2xl"
                style={{ rotate: `${[-3, 2, -1.5][i % 3]}deg` }}
                initial={{ opacity: 0, y: 50, rotate: i % 2 ? 6 : -7 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-3, 2, -1.5][i % 3] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_LUXE }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              >
                <span className="relative block">
                  <Tape className="-top-5 start-1/2 -ms-10 z-10" />
                  <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-square w-full object-cover" />
                </span>
                <figcaption className="mt-4 text-center font-mono text-xs" style={{ color: '#3a3428' }}>
                  {g.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · fanned note cards ——— */}
      <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'reviewsKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'reviews')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className="m-0 flex flex-col justify-between rounded-2xl border border-line/50 p-7"
                style={{ background: 'var(--store-surface)', rotate: `${[-1.5, 0.8, -0.5][i % 3]}deg` }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_LUXE }}
              >
                <div>
                  <Stars rating={r.rating} className="mb-4" />
                  <blockquote className="m-0 leading-relaxed text-cream">{r.text}</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center justify-between gap-3 font-mono text-xs text-cream-faint">
                  <span>{r.author}</span>
                  {r.source && <span dir="ltr">{r.source}</span>}
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
