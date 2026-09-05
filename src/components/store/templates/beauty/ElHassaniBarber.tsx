import { motion } from 'framer-motion';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { Marquee, Reveal } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { openState, t } from '../../storeUtils';
import { BookCta, EASE_LUXE, Kicker, ShaderBackdrop, Stars, serif } from './shared';

/** Rotating starburst rating badge. */
function Starburst({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="relative flex h-32 w-32 items-center justify-center md:h-40 md:w-40" dir="ltr">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        style={{ color: 'var(--store-primary)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="2"
            x2="50"
            y2={i % 2 ? '10' : '14'}
            stroke="currentColor"
            strokeWidth="2"
            transform={`rotate(${i * 22.5} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </motion.svg>
      <div className="relative text-center">
        <p className="m-0 leading-none" style={{ ...serif, fontSize: '2rem', color: 'var(--store-primary)' }}>
          {label}
        </p>
        <p className="m-0 mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream-muted">{sub}</p>
      </div>
    </div>
  );
}

/**
 * EL-HASSANI — Kasbah, Tanger medina. Vintage barber poster: Anton
 * masthead, rotating starburst badge, ticket-stub price list with
 * perforations, review-counter band, night-owl hours.
 */
export default function ElHassaniBarber({ store }: { store: StorePageTheme }) {
  const state = openState(store.hours);

  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — medina poster */}
      <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden">
        <ShaderBackdrop store={store} intensity={1.15} />
        <div className="container-atelier relative z-10 py-32">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-3xl">
              <motion.span
                className="kicker"
                dir="ltr"
                style={{ color: 'var(--store-primary)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {store.content?.taglineFr ?? 'Tanger'}
              </motion.span>
              {/* Anton masthead — Latin line giant, Arabic line under */}
              <motion.p
                aria-hidden
                dir="ltr"
                className="m-0 mt-6 uppercase leading-[0.85] text-cream"
                style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(4.5rem, 15vw, 13rem)', letterSpacing: '0.01em' }}
                initial={{ opacity: 0, y: 60, skewY: 3 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 1.1, delay: 0.35, ease: EASE_LUXE }}
              >
                {store.heroTitle[0]}
              </motion.p>
              <h1 className="m-0 mt-4 text-cream" style={{ ...serif, fontSize: 'clamp(1.8rem, 4.5vw, 3.6rem)' }}>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1, delay: 0.75, ease: EASE_LUXE }}
                  >
                    {store.heroTitle.slice(1).join(' ')}
                  </motion.span>
                </span>
              </h1>
              <motion.p
                className="m-0 mt-8 max-w-xl leading-relaxed text-cream-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.95, ease: EASE_LUXE }}
              >
                {store.heroSub}
              </motion.p>
              <motion.div
                className="mt-9 flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: EASE_LUXE }}
              >
                <BookCta store={store} />
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 40%, transparent)', color: state.open ? 'var(--store-primary)' : 'var(--cream-faint, #5E5A6A)' }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: 'currentColor' }} />
                  {state.open ? t(store, 'openNow') : t(store, 'closedNow')} · {store.hours[0]?.time}
                </span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE_LUXE }}
            >
              <Starburst label="5.0★" sub="Google — +1300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICE TICKETS — perforated stubs */}
      <section id="store-menu" className="py-24 md:py-32 lg:py-36">
        <div className="container-atelier max-w-4xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <Kicker>{t(store, 'menuKicker')}</Kicker>
              <h2
                className="m-0 mt-6 uppercase text-cream"
                style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)', letterSpacing: '0.02em' }}
                dir="ltr"
              >
                Price Tickets
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint md:block" dir="ltr">
              admit one — kasbah
            </span>
          </div>
          <div className="space-y-5">
            {store.services.map((s, i) => (
              <motion.article
                key={i}
                className="group relative flex items-stretch overflow-hidden border"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)', background: 'var(--store-surface-tint)' }}
                initial={{ opacity: 0, x: store.dir === 'rtl' ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE_LUXE }}
              >
                {/* stub: price */}
                <div
                  className="flex w-28 shrink-0 flex-col items-center justify-center gap-1 border-e border-dashed px-3 py-6 md:w-36"
                  style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 40%, transparent)' }}
                >
                  <span className="text-xl md:text-2xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                    {s.price}
                  </span>
                  {s.duration && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream-faint" dir="ltr">
                      {s.duration}
                    </span>
                  )}
                </div>
                {/* body */}
                <div className="min-w-0 flex-1 px-6 py-6">
                  <h3 className="m-0 text-xl text-cream transition-colors group-hover:text-[var(--store-primary)] md:text-2xl" style={serif}>
                    {s.title}
                  </h3>
                  <p className="m-0 mt-2 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
                </div>
                <span className="hidden items-center pe-5 font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint md:flex" dir="ltr">
                  N°{String(i + 1).padStart(3, '0')}
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS — counter band + snippet marquee */}
      <section id="store-reviews" className="border-y py-20 md:py-28" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)', background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-12 flex flex-wrap items-center gap-10">
          <p
            dir="ltr"
            className="m-0 uppercase leading-none text-cream"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
          >
            +1300
          </p>
          <div>
            <Stars rating={5} className="mb-2 block text-xl" />
            <p className="m-0 max-w-md text-sm leading-relaxed text-cream-muted">{store.story.title}</p>
          </div>
        </div>
        <Marquee duration={55} dir={store.dir}>
          {store.reviews.map((r, i) => (
            <span key={i} className="mx-8 flex max-w-lg items-center gap-4 whitespace-normal">
              <span className="text-lg italic leading-relaxed text-cream-muted" style={serif}>
                “{r.text}”
              </span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-faint" dir="ltr">
                — {r.author}
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* STORY — poster two-col */}
      <section id="store-story" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[4/5] w-full object-cover" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }} />
              <span
                aria-hidden
                className="absolute -bottom-4 end-6 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]"
                style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
                dir="ltr"
              >
                Médina — {store.city}
              </span>
            </div>
          </Reveal>
          <div>
            <Kicker>{t(store, 'storyKicker')}</Kicker>
            <div className="mt-8 space-y-5 leading-loose text-cream-muted">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <p className="m-0">{p}</p>
                </Reveal>
              ))}
            </div>
            {store.story.quote && (
              <Reveal delay={0.15}>
                <blockquote className="m-0 mt-10 border-s-4 ps-6" style={{ borderColor: 'var(--store-primary)' }}>
                  <p className="m-0 text-2xl leading-snug text-cream md:text-3xl" style={serif}>
                    {store.story.quote.text}
                  </p>
                  <footer className="mt-4 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY — night filmstrip */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-10">
          <Kicker>{t(store, 'galleryKicker')}</Kicker>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:px-24">
          {store.gallery.map((g, i) => (
            <motion.figure
              key={i}
              className="m-0 w-[72vw] shrink-0 snap-center md:w-[36vw]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: EASE_LUXE }}
            >
              <div className="border-4 border-black/70 shadow-xl outline-1" style={{ outline: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }}>
                <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-sm text-cream-muted">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
                  № {String(i + 1).padStart(2, '0')}
                </span>
                {g.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <StoreBooking store={store} />
      <StoreMapHours store={store} />
      <StoreFooter store={store} />
    </>
  );
}
