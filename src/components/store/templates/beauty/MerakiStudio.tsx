import { motion } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { ShaderHero } from '@/components/shaders';
import { scrollToTarget } from '@/hooks/useLenis';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, Chip, EASE_LUXE, Kicker, ReviewCard, serif } from './shared';

/**
 * MERAKI STUDIO — Maârif, Casablanca. Minimal clinical-chic: hairline
 * grid, services-first order with duration chips, petal shader side
 * panel, masonry gallery, hairline-separated reviews.
 */
export default function MerakiStudio({ store }: { store: StorePageTheme }) {
  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — split: clinical text panel / petal shader panel */}
      <section className="relative grid min-h-[100dvh] lg:grid-cols-2">
        <div
          className="relative flex flex-col justify-center gap-7 border-b px-6 py-32 md:px-14 lg:border-b-0 lg:border-e"
          style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 22%, transparent)' }}
        >
          <Kicker>{store.content?.taglineFr ?? 'Casablanca'}</Kicker>
          <h1 className="m-0 text-cream" style={{ ...serif, fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', lineHeight: 1.2 }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="m-0 max-w-lg leading-relaxed text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE_LUXE }}
          >
            <BookCta store={store} />
            <Chip>{store.category}</Chip>
          </motion.div>
        </div>
        <div className="relative min-h-[50dvh] overflow-hidden">
          <ShaderHero
            variant={store.shader}
            colors={[store.colors.shaderA, store.colors.shaderB]}
            intensity={1.1}
            className="absolute inset-0"
          />
          <motion.img
            src={store.aboutImage}
            alt={store.name}
            className="absolute inset-x-8 bottom-0 top-16 m-auto max-h-[70%] w-auto max-w-[70%] rounded-t-full object-cover opacity-90"
            style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 35%, transparent)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: EASE_LUXE }}
          />
        </div>
      </section>

      {/* SERVICES FIRST — appointment cards on a hairline grid */}
      <section id="store-menu" className="py-24 md:py-32 lg:py-36">
        <div className="container-atelier">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>{t(store, 'menuKicker')}</Kicker>
              <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                {t(store, 'menu')}
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint" dir="ltr">
              Maârif — by appointment
            </span>
          </div>
          <div
            className="grid border-t border-s md:grid-cols-2 lg:grid-cols-3"
            style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 20%, transparent)' }}
          >
            {store.services.map((s, i) => (
              <motion.article
                key={i}
                className="group flex flex-col gap-4 border-b border-e p-8 transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--store-primary)_6%,transparent)]"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 20%, transparent)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.07 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.duration && <Chip>{s.duration}</Chip>}
                </div>
                <h3 className="m-0 text-2xl text-cream" style={serif}>
                  {s.title}
                </h3>
                <p className="m-0 flex-1 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                <p className="m-0 text-xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                  {s.price}
                </p>
              </motion.article>
            ))}
            {/* booking cell */}
            <motion.button
              type="button"
              onClick={() => scrollToTarget('#store-booking')}
              className="flex min-h-48 flex-col items-start justify-between gap-4 border-b border-e p-8 text-start transition-colors duration-500"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 20%, transparent)', background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70" dir="ltr">
                {t(store, 'bookingKicker')}
              </span>
              <span className="text-2xl" style={serif}>
                {t(store, 'bookNow')} ↗
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* STORY — minimal 2-col */}
      <section id="store-story" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>{t(store, 'storyKicker')}</Kicker>
            <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)', lineHeight: 1.25 }}>
              {store.story.title}
            </h2>
            {store.story.quote && (
              <blockquote className="m-0 mt-10 border-s ps-5 text-lg leading-relaxed text-cream" style={{ ...serif, borderColor: 'var(--store-primary)' }}>
                {store.story.quote.text}
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
          <div className="space-y-5 leading-loose text-cream-muted lg:col-span-6 lg:col-start-7">
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

      {/* GALLERY — masonry columns with hover captions */}
      <section id="store-gallery" className="py-24 md:py-32">
        <div className="container-atelier">
          <Kicker className="mb-12">{t(store, 'galleryKicker')}</Kicker>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {[store.heroImage, ...store.gallery.map((g) => g.src), store.aboutImage].map((src, i) => (
              <motion.figure
                key={i}
                className="group relative m-0 mb-5 break-inside-avoid overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE_LUXE }}
              >
                <img
                  src={src}
                  alt={store.gallery[i - 1]?.caption ?? store.name}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 2 ? 'aspect-square' : 'aspect-[3/4]'}`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-4 py-3 text-sm text-cream backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
                  {store.gallery[i - 1]?.caption ?? store.nameAr}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS — hairline-separated minimal rows */}
      <section id="store-reviews" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier max-w-4xl">
          <Kicker className="mb-12">{t(store, 'reviewsKicker')}</Kicker>
          {store.reviews.map((r, i) => (
            <ReviewCard
              key={i}
              review={r}
              className="border-t py-10 last:border-b"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 20%, transparent)' }}
            />
          ))}
        </div>
      </section>

      <StoreBooking store={store} />
      <StoreMapHours store={store} />
      <StoreFooter store={store} />
    </>
  );
}
