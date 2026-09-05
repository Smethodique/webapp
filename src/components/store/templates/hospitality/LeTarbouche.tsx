import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import StoreHeader from '@/components/store/StoreHeader';
import StoreBooking from '@/components/store/StoreBooking';
import StoreFooter from '@/components/store/StoreFooter';
import { ShaderHero } from '@/components/shaders';
import { Marquee, Reveal } from '@/components/motion';
import { scrollToTarget } from '@/hooks/useLenis';
import { EASE_LUXE, EASE_SNAP, t } from '../../storeUtils';
import { DirectionsLink, HoursRows, KickerLine, OpenChip, Stars, Tape } from './atoms';

/** Zigzag strip divider. */
function Zigzag({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-3 w-full ${className ?? ''}`}
      style={{
        background: `repeating-linear-gradient(-45deg, var(--store-primary) 0 8px, transparent 8px 16px)`,
        opacity: 0.5,
      }}
    />
  );
}

/**
 * 08 · Le Tarbouche — medina street-art energy.
 * Photo-collage hero (tilted taped prints over a dune-shader band, marker-
 * highlighted title); accordion menu by course; taped scatter gallery;
 * chat-bubble reviews; zigzag dividers.
 */
export default function LeTarbouche({ store }: { store: StorePageTheme }) {
  const groups = store.menuTabs ?? [];
  const [open, setOpen] = useState<string | null>(groups[0] ?? null);

  return (
    <>
      <StoreHeader store={store} />

      {/* ——— HERO · collage over shader band ——— */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pt-40" aria-label={store.name}>
        <div className="absolute inset-x-0 top-0 h-[46%]">
          <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={1} className="absolute inset-0" />
          <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--store-bg) 55%, transparent), var(--store-bg))' }} />
        </div>

        <div className="container-atelier relative z-10 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.span
              className="mb-6 inline-block -rotate-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
              dir="ltr"
              initial={{ opacity: 0, y: 16, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_LUXE }}
            >
              {store.sectorLabel}
            </motion.span>
            <h1 className="m-0" style={{ fontFamily: 'var(--font-display)' }}>
              {store.heroTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block text-display-lg text-cream will-change-transform"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.05, delay: 0.4 + i * 0.12, ease: EASE_LUXE }}
                  >
                    {/* marker highlight on last line */}
                    {i === store.heroTitle.length - 1 ? (
                      <span className="box-decoration-clone px-2" style={{ background: 'color-mix(in srgb, var(--store-primary) 45%, transparent)' }}>
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mb-0 mt-6 max-w-[48ch] leading-relaxed text-cream-muted"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXE }}
            >
              {store.heroSub}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE_LUXE }}
            >
              <button
                onClick={() => scrollToTarget('#store-booking')}
                className="rounded-full px-8 py-4 font-semibold transition-transform duration-300 hover:scale-[1.04] hover:-rotate-1"
                style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
              >
                {t(store, 'bookNow')}
              </button>
              <OpenChip store={store} />
            </motion.div>
          </div>

          {/* tilted print collage */}
          <div className="relative h-[26rem] md:h-[30rem] lg:col-span-6">
            {[
              { src: store.heroImage, caption: store.name, cls: 'start-[4%] top-0 w-[62%] z-10', rot: -4 },
              { src: store.aboutImage, caption: store.category, cls: 'end-[2%] top-[22%] w-[52%] z-20', rot: 3.5 },
              { src: store.gallery[0]?.src, caption: store.gallery[0]?.caption, cls: 'start-[16%] bottom-0 w-[48%] z-30', rot: -2 },
            ].map((p, i) => (
              <motion.figure
                key={i}
                className={`absolute m-0 bg-cream p-2 pb-7 shadow-2xl ${p.cls}`}
                initial={{ opacity: 0, y: 50, rotate: p.rot * 2.4 }}
                animate={{ opacity: 1, y: 0, rotate: p.rot }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.16, ease: EASE_LUXE }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
              >
                <Tape className="-top-3 start-1/2 z-10 -ms-10" />
                <img src={p.src} alt={p.caption ?? store.name} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="mt-2 truncate text-center font-mono text-[10px]" style={{ color: '#3a3428' }}>
                  {p.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— energy marquee ——— */}
      <section aria-hidden className="py-0">
        <Zigzag />
        <div className="border-y border-line/50 py-4" style={{ background: 'var(--store-surface-tint)' }}>
          <Marquee duration={26} dir={store.dir}>
            {[store.tagline, ...store.services.map((s) => s.title)].map((w, i) => (
              <span key={i} className="mx-6 whitespace-nowrap text-lg font-semibold" style={{ fontFamily: 'var(--font-display)', color: i % 2 ? 'var(--store-primary)' : 'var(--cream)' }}>
                {w} <span style={{ color: 'var(--store-accent)' }}>✺</span>
              </span>
            ))}
          </Marquee>
        </div>
        <Zigzag />
      </section>

      {/* ——— STORY · tilted photo + dashed quote ——— */}
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
              <blockquote className="m-0 mt-10 rotate-[0.5deg] border-2 border-dashed p-6" style={{ borderColor: 'var(--store-primary)', background: 'var(--store-surface-tint)' }}>
                <p className="m-0 text-lg text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                  «{store.story.quote.text}»
                </p>
                <footer className="mt-3 font-mono text-xs text-cream-faint">{store.story.quote.author}</footer>
              </blockquote>
            )}
          </div>
          <motion.div
            className="lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: 40, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE_LUXE }}
          >
            <div className="relative bg-cream p-3 pb-10 shadow-2xl">
              <Tape className="-top-3 end-8" />
              <img src={store.aboutImage} alt={store.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <p className="mt-3 text-center font-mono text-xs" style={{ color: '#3a3428' }}>
                {store.address}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— MENU · accordion by course ——— */}
      <section id="store-menu" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine>{t(store, 'menuKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'menu')}
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {(groups.length ? groups : ['']).map((group) => {
              const items = group ? store.services.filter((s) => s.group === group) : store.services;
              const isOpen = open === group;
              return (
                <motion.div
                  key={group || 'all'}
                  className="border-2"
                  style={{ borderColor: isOpen ? 'var(--store-primary)' : 'var(--line)', background: 'var(--store-surface)' }}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: EASE_LUXE }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-start"
                    onClick={() => setOpen(isOpen ? null : group)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-xl font-bold text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                      {group || t(store, 'menu')}
                    </span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-lg transition-transform duration-300"
                      style={{ background: isOpen ? 'var(--store-primary)' : 'transparent', color: isOpen ? 'var(--store-on-primary)' : 'var(--store-primary)', border: '1px solid var(--store-primary)', transform: isOpen ? 'rotate(45deg)' : undefined }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_SNAP }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-5 px-6 pb-6">
                          {items.map((item) => (
                            <div key={item.title} className="flex items-start justify-between gap-6 border-t border-line/50 pt-5">
                              <div>
                                <h3 className="m-0 text-lg font-semibold text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                                  {item.title}
                                </h3>
                                <p className="mb-0 mt-1 text-sm text-cream-muted">{item.desc}</p>
                              </div>
                              {item.price && (
                                <span className="shrink-0 -rotate-2 rounded-sm px-2.5 py-1 font-mono text-sm" style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }} dir="auto">
                                  {item.price}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— GALLERY · taped scatter wall ——— */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-36">
        <div className="container-atelier">
          <KickerLine centered>{t(store, 'galleryKicker')}</KickerLine>
          <h2 className="m-0 mb-16 text-center text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'gallery')}
          </h2>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-10">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={g.src}
                className="m-0 w-72 bg-cream p-2.5 pb-8 shadow-2xl"
                initial={{ opacity: 0, y: 50, rotate: i % 2 ? 8 : -8 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-2.5, 2, -1][i % 3] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: EASE_LUXE }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              >
                <span className="relative block">
                  <Tape className="-top-5 start-6 z-10" />
                  <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </span>
                <figcaption className="mt-3 text-center font-mono text-xs" style={{ color: '#3a3428' }}>
                  {g.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— REVIEWS · chat bubbles ——— */}
      <section id="store-reviews" className="py-24 md:py-36" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <KickerLine>{t(store, 'reviewsKicker')}</KickerLine>
          <h2 className="m-0 mb-14 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {t(store, 'reviews')}
          </h2>
          <div className="mx-auto max-w-3xl space-y-8">
            {store.reviews.map((r, i) => (
              <motion.figure
                key={i}
                className={`m-0 max-w-xl ${i % 2 ? 'ms-auto' : ''}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_LUXE }}
              >
                <blockquote
                  className={`m-0 rounded-3xl p-6 leading-relaxed text-cream ${i % 2 ? 'rounded-ee-md' : 'rounded-es-md'}`}
                  style={{ background: i % 2 ? 'color-mix(in srgb, var(--store-primary) 22%, var(--store-surface))' : 'var(--store-surface)', border: '1px solid color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
                >
                  {r.text}
                </blockquote>
                <figcaption className={`mt-3 flex items-center gap-3 font-mono text-xs text-cream-faint ${i % 2 ? 'justify-end' : ''}`}>
                  <Stars rating={r.rating} />
                  <span>
                    {r.author}
                    {r.source && <span dir="ltr"> · {r.source}</span>}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <StoreBooking store={store} />

      {/* ——— LOCATION · zanqa card ——— */}
      <section id="store-location" className="py-24 md:py-36">
        <div className="container-atelier">
          <Zigzag className="mb-16" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <KickerLine>{t(store, 'locationKicker')}</KickerLine>
              <h2 className="m-0 text-h2 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                {t(store, 'location')}
              </h2>
              <p className="mt-6 max-w-[44ch] leading-relaxed text-cream-muted">{store.address}</p>
              <div className="mt-5">
                <OpenChip store={store} />
              </div>
              <DirectionsLink store={store} className="mt-8" />
            </div>
            <HoursRows store={store} className="self-center border-y border-line/60" />
          </div>
        </div>
      </section>

      <StoreFooter store={store} />
    </>
  );
}
