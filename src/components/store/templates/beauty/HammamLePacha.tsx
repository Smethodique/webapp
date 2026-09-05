import { motion } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreMarquee from '@/components/store/StoreMarquee';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { Reveal } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, Chip, EASE_LUXE, Filigree, Kicker, ShaderBackdrop, Stars, serif } from './shared';

/**
 * HAMMAM LE PACHA — Quartier Oasis, Casablanca. Palace pool-hall:
 * horseshoe-arch hero medallion, hammam price-board ledger, masonry
 * gallery alternating arch tops, arch-topped review cards.
 */
export default function HammamLePacha({ store }: { store: StorePageTheme }) {
  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — palace arch medallion */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pt-24">
        <ShaderBackdrop store={store} intensity={0.85} />
        <div className="container-atelier relative z-10 flex flex-col items-center gap-8 py-16 text-center">
          <motion.span
            className="kicker"
            dir="ltr"
            style={{ color: 'var(--store-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {store.content?.taglineFr ?? 'Casablanca'}
          </motion.span>

          {/* the arch */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: EASE_LUXE }}
          >
            <div
              className="rounded-t-full p-3"
              style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 50%, transparent)' }}
            >
              <div
                className="overflow-hidden rounded-t-full"
                style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
              >
                <motion.img
                  src={store.heroImage}
                  alt={store.name}
                  className="aspect-[3/4] w-56 object-cover md:w-72"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, delay: 0.4, ease: EASE_LUXE }}
                />
              </div>
            </div>
            <span
              aria-hidden
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ background: 'var(--store-bg)', color: 'var(--store-primary)', border: '1px solid color-mix(in srgb, var(--store-primary) 35%, transparent)' }}
              dir="ltr"
            >
              {store.city} — Oasis
            </span>
          </motion.div>

          <h1 className="m-0 text-cream" style={{ ...serif, fontSize: 'clamp(2.6rem, 7vw, 5.6rem)', lineHeight: 1.15 }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.7 + i * 0.13, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="m-0 max-w-2xl leading-relaxed text-cream-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.25, ease: EASE_LUXE }}>
            <BookCta store={store} />
          </motion.div>
        </div>
      </section>

      <StoreMarquee store={store} />

      {/* PRICE BOARD — hammam ledger under arches */}
      <section id="store-menu" className="py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier max-w-5xl">
          <div className="mb-14 text-center">
            <Kicker className="justify-center">{t(store, 'menuKicker')}</Kicker>
            <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              {t(store, 'menu')}
            </h2>
            <Filigree className="mx-auto mt-8 max-w-md" />
          </div>
          <div className="grid gap-x-12 md:grid-cols-2">
            {store.services.map((s, i) => (
              <motion.div
                key={i}
                className="flex items-baseline gap-4 border-b py-6"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 20%, transparent)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE_LUXE }}
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-xl text-cream md:text-2xl" style={serif}>
                      {s.title}
                    </span>
                    {s.duration && <Chip>{s.duration}</Chip>}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-cream-muted">{s.desc}</span>
                </span>
                <span aria-hidden className="hidden flex-1 border-b border-dotted sm:block" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }} />
                <span className="whitespace-nowrap text-xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                  {s.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY — palace columns */}
      <section id="store-story" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>{t(store, 'storyKicker')}</Kicker>
            <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.25 }}>
              {store.story.title}
            </h2>
            {store.story.quote && (
              <blockquote className="m-0 mt-10 text-xl leading-relaxed md:text-2xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                «{store.story.quote.text}»
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
          <div className="space-y-5 leading-loose text-cream-muted lg:col-span-5">
            {store.story.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="m-0">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="overflow-hidden rounded-t-full" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 35%, transparent)' }}>
              <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[3/4.2] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY — masonry alternating arch tops */}
      <section id="store-gallery" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <Kicker className="mb-12">{t(store, 'galleryKicker')}</Kicker>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={i}
                className={`m-0 ${i === 1 ? 'lg:mt-14' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: i * 0.1, ease: EASE_LUXE }}
              >
                <div
                  className={`overflow-hidden ${i % 2 === 0 ? 'rounded-t-[9rem]' : ''}`}
                  style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                >
                  <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                {g.caption && <figcaption className="mt-3 text-center text-sm italic text-cream-muted" style={serif}>{g.caption}</figcaption>}
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS — arch-topped cards */}
      <section id="store-reviews" className="py-24 md:py-32">
        <div className="container-atelier">
          <div className="mb-14 flex items-center gap-6">
            <Kicker line={false}>{t(store, 'reviewsKicker')}</Kicker>
            <Filigree className="flex-1" />
            <Stars rating={5} />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className="m-0 rounded-t-[7rem] border p-8 pt-14 text-center"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)', background: 'var(--store-surface-tint)' }}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.95, delay: i * 0.1, ease: EASE_LUXE }}
              >
                <Stars rating={r.rating} className="mb-5 block text-sm" />
                <blockquote className="m-0 leading-relaxed text-cream" style={serif}>
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 font-mono text-xs text-cream-faint">
                  {r.author}
                  {r.source ? <span dir="ltr"> · {r.source}</span> : null}
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
