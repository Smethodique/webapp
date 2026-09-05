import { motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMapHours from '@/components/store/StoreMapHours';
import { ShaderHero } from '@/components/shaders';
import { KineticText, Marquee, Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, t } from '../../storeUtils';
import { KickerLine, Stars } from './atoms';

const GLOW = '0 0 18px color-mix(in srgb, var(--store-accent) 65%, transparent)';

/**
 * 07 · MOFI — Asian-fusion neon deli.
 * Steam shader hero with glowing uppercase type + rating badge; chalkboard
 * (ardoise) menu panel; bento gallery; tilted sticker reviews.
 */
export default function Mofi({ store }: { store: StorePageTheme }) {
  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · neon type over steam ——— */}
      <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden" aria-label={store.name}>
        <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={1.1} className="absolute inset-0" />
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(80% 60% at 50% 45%, transparent, color-mix(in srgb, var(--store-bg) 70%, transparent))' }} />
        <div className="container-atelier relative z-10 py-32 text-center">
          <motion.span
            className="mb-8 inline-flex items-center gap-3 rounded-full border px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cream"
            style={{ borderColor: 'var(--store-accent)', boxShadow: GLOW }}
            dir="ltr"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_LUXE }}
          >
            ★ 4.9 — Google
          </motion.span>
          <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-cream will-change-transform"
                  style={{
                    fontSize: 'clamp(2.6rem, 7.5vw, 6.8rem)',
                    lineHeight: 1.05,
                    textShadow: i === 0 ? undefined : GLOW,
                  }}
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mx-auto mb-0 mt-8 max-w-[56ch] text-cream-muted"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease: EASE_LUXE }}
          >
            <button
              onClick={() => scrollToTarget('#store-booking')}
              className="rounded-full px-9 py-4 font-semibold transition-transform duration-300 hover:scale-[1.04]"
              style={{ background: 'var(--store-accent)', color: '#14201f', boxShadow: GLOW }}
            >
              {t(store, 'bookNow')}
            </button>
            <button
              onClick={() => scrollToTarget('#store-menu')}
              className="rounded-full border border-cream/25 px-9 py-4 text-cream transition-colors hover:border-[var(--store-accent)]"
            >
              {t(store, 'menu')}
            </button>
          </motion.div>
        </div>
        {/* bottom neon marquee */}
        <div className="relative z-10 border-t border-cream/10 py-4" style={{ background: 'color-mix(in srgb, var(--store-bg) 60%, transparent)' }}>
          <Marquee duration={22} dir="ltr">
            {[...Array(3)].flatMap((_, k) =>
              store.sectorLabel.split('·').map((w, i) => (
                <span
                  key={`${k}-${i}`}
                  className="mx-6 whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em]"
                  style={{ color: 'var(--store-accent)', textShadow: GLOW }}
                >
                  {w.trim()} <span className="text-cream-faint">✦</span>
                </span>
              )),
            )}
          </Marquee>
        </div>
      </section>

      {/* ——— MENU · l'ardoise (chalkboard) ——— */}
      <section id="store-menu" className="py-24 md:py-36">
        <div className="container-atelier">
          <div className="mx-auto max-w-3xl">
            <KickerLine centered>{t(store, 'menuKicker')}</KickerLine>
            <h2 className="m-0 mb-12 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {t(store, 'menu')}
            </h2>
            <motion.div
              className="relative border-8 p-8 md:p-12"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 55%, #171310)', background: '#101c1b', boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE_LUXE }}
            >
              {/* chalk dust texture lines */}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url('/texture-grain.png')", backgroundSize: '256px' }} />
              <p className="m-0 mb-8 text-center font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: 'var(--store-accent)' }} dir="ltr">
                — {store.tagline} —
              </p>
              {store.services.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="py-4"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: EASE_LUXE }}
                >
                  <div className="flex items-baseline gap-3">
                    <h3 className="m-0 text-xl text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <span aria-hidden className="flex-1 border-b border-dashed border-cream/25" />
                    {item.price && (
                      <span className="font-mono text-base" style={{ color: 'var(--store-accent)', textShadow: GLOW }}>
                        {item.price}
                      </span>
                    )}
                  </div>
                  <p className="mb-0 mt-1 max-w-[46ch] text-sm text-cream-muted">{item.desc}</p>
                  {item.note && (
                    <span
                      className="mt-2 inline-block -rotate-1 rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em]"
                      style={{ background: 'var(--store-accent)', color: '#14201f' }}
                    >
                      {item.note}
                    </span>
                  )}
                </motion.div>
              ))}
              {store.reservationNote && (
                <p className="mb-0 mt-8 text-center font-mono text-xs text-cream-faint">※ {store.reservationNote}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— GALLERY · bento grid ——— */}
      <section id="store-gallery" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine>{t(store, 'galleryKicker')}</KickerLine>
          <h2 className="m-0 mb-12 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'gallery')}
          </h2>
          <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[14rem] md:grid-cols-4">
            {[
              { ...store.gallery[0], cls: 'col-span-2 row-span-2' },
              { ...store.gallery[1], cls: '' },
              { ...store.gallery[2], cls: '' },
              { src: store.heroImage, caption: store.name, cls: 'col-span-2' },
              { src: store.aboutImage, caption: store.story.title, cls: 'col-span-2 md:col-span-2' },
            ].map((g, i) => (
              <motion.figure
                key={i}
                className={`group relative m-0 overflow-hidden ${g.cls}`}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_LUXE }}
              >
                <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption
                  className="absolute inset-x-0 bottom-0 px-4 py-2.5 font-mono text-[11px] text-cream opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to top, rgba(6,5,4,0.9), transparent)' }}
                >
                  {g.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— STORY · kinetic headline + framed photo ——— */}
      <section id="store-story" className="py-24 md:py-36">
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <KickerLine>{store.sectorLabel}</KickerLine>
            <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              <KineticText text={store.story.title} stagger={0.02} />
            </h2>
            <div className="mt-8 space-y-5 text-cream-muted">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="m-0 leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
            {store.story.quote && (
              <blockquote className="m-0 mt-10 border-s-4 ps-6" style={{ borderColor: 'var(--store-accent)' }}>
                <p className="m-0 text-xl text-cream" style={{ fontFamily: 'var(--font-display)', textShadow: GLOW }}>
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
            <div className="overflow-hidden border border-line/60" style={{ boxShadow: `0 0 40px color-mix(in srgb, var(--store-accent) 18%, transparent)` }}>
              <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
            <p className="mt-4 text-center font-mono text-xs text-cream-faint" dir="ltr">
              {store.address}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ——— REVIEWS · tilted stickers ——— */}
      <section id="store-reviews" className="overflow-hidden py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'reviewsKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'reviews')}
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className="m-0 w-full max-w-sm border-2 p-7"
                style={{
                  borderColor: 'var(--store-accent)',
                  background: 'var(--store-surface)',
                  rotate: `${[-2, 1.5, -1][i % 3]}deg`,
                  boxShadow: `0 0 24px color-mix(in srgb, var(--store-accent) 22%, transparent)`,
                }}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 5 : -6 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-2, 1.5, -1][i % 3] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_LUXE }}
                whileHover={{ rotate: 0, scale: 1.03 }}
              >
                <Stars rating={r.rating} className="mb-4" />
                <blockquote className="m-0 leading-relaxed text-cream">{r.text}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between font-mono text-xs text-cream-faint">
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
