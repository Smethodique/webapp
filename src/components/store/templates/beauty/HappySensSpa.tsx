import { useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoreHeader from '@/components/store/StoreHeader';
import StoreReviews from '@/components/store/StoreReviews';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { ShaderHero } from '@/components/shaders';
import { CurtainImage, Reveal } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, Chip, EASE_LUXE, Filigree, Kicker, serif } from './shared';

gsap.registerPlugin(ScrollTrigger);

/**
 * HAPPY SENS SPA — Hay Riad, Rabat. Oriental-garden ritual: breathing
 * fullscreen steam hero, GSAP-pinned horizontal RITUAL JOURNEY (the
 * services as numbered steps), and a filmstrip gallery with sprockets.
 */
export default function HappySensSpa({ store }: { store: StorePageTheme }) {
  const reduced = useReducedMotion();
  const ritualRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ritualRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const sign = store.dir === 'rtl' ? 1 : -1;
        const distance = () => Math.max(0, track.scrollWidth - root.clientWidth);
        gsap.to(track, {
          x: () => sign * distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [store.dir]);

  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — breathing steam: slow scale loop over imagery */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src={store.heroImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <ShaderHero variant={store.shader} colors={[store.colors.shaderA, store.colors.shaderB]} intensity={1.1} className="absolute inset-0" />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, color-mix(in srgb, var(--store-bg) 94%, transparent), color-mix(in srgb, var(--store-bg) 20%, transparent) 60%)',
          }}
        />
        <div className="container-atelier relative z-10 flex flex-col gap-7 pb-24 pt-40">
          <motion.span
            className="kicker"
            dir="ltr"
            style={{ color: 'var(--store-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {store.content?.taglineFr ?? 'Rabat'}
          </motion.span>
          <h1 className="m-0 max-w-4xl text-cream" style={{ ...serif, fontSize: 'clamp(3rem, 8vw, 6.8rem)', lineHeight: 1.15 }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, delay: 0.45 + i * 0.14, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="m-0 max-w-2xl leading-relaxed text-cream-muted"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: EASE_LUXE }}
          >
            {store.heroSub}
          </motion.p>
          <motion.div
            className="mt-2 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE_LUXE }}
          >
            <BookCta store={store} />
            <Filigree className="w-40" />
          </motion.div>
        </div>
      </section>

      {/* RITUAL JOURNEY — pinned horizontal steps */}
      <section id="store-menu" ref={ritualRef} className="relative overflow-hidden py-24 md:py-28" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-4 flex items-end justify-between gap-8">
          <div>
            <Kicker>{t(store, 'menuKicker')}</Kicker>
            <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
              {t(store, 'menu')}
            </h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint md:block" dir="ltr">
            ritual — {store.services.length} steps
          </span>
        </div>
        {/* progress line */}
        <div className="container-atelier mb-10">
          <div className="h-px w-full" style={{ background: 'color-mix(in srgb, var(--store-primary) 20%, transparent)' }}>
            <div ref={barRef} className="h-px origin-left scale-x-0 rtl:origin-right" style={{ background: 'var(--store-primary)' }} />
          </div>
        </div>
        <div ref={trackRef} className="flex w-max items-stretch gap-6 px-6 md:px-24">
          {store.services.map((s, i) => (
            <article
              key={i}
              className="flex w-[80vw] shrink-0 flex-col justify-between gap-8 border p-9 md:w-[38vw] lg:w-[30vw]"
              style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 25%, transparent)', background: 'color-mix(in srgb, var(--store-bg) 55%, transparent)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="leading-none"
                  dir="ltr"
                  style={{
                    ...serif,
                    fontSize: '4.5rem',
                    color: 'transparent',
                    WebkitTextStroke: '1px color-mix(in srgb, var(--store-primary) 60%, transparent)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.duration && <Chip>{s.duration}</Chip>}
              </div>
              <div>
                <h3 className="m-0 text-2xl text-cream md:text-3xl" style={serif}>
                  {s.title}
                </h3>
                <p className="m-0 mt-4 text-sm leading-relaxed text-cream-muted">{s.desc}</p>
              </div>
              <p className="m-0 text-2xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                {s.price}
              </p>
            </article>
          ))}
          {/* closing card */}
          <div className="flex w-[60vw] shrink-0 items-center justify-center md:w-[26vw]">
            <p className="text-center text-3xl text-cream-faint" style={serif}>
              {store.nameAr}
            </p>
          </div>
        </div>
      </section>

      {/* STORY — garden arch + quote */}
      <section id="store-story" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Kicker>{t(store, 'storyKicker')}</Kicker>
            <h2 className="m-0 mt-6 text-cream" style={{ ...serif, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.2 }}>
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
              <Reveal delay={0.15}>
                <figure className="m-0 mt-10">
                  <Filigree className="mb-6 w-56" />
                  <blockquote className="m-0 text-xl leading-relaxed text-cream md:text-2xl" style={serif}>
                    {store.story.quote.text}
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-xs text-cream-faint">{store.story.quote.author}</figcaption>
                </figure>
              </Reveal>
            )}
          </div>
          <Reveal className="relative">
            <div className="overflow-hidden rounded-t-[10rem]" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 40%, transparent)' }}>
              <CurtainImage src={store.aboutImage} alt={store.name} className="aspect-[3/4] w-full" />
            </div>
            <span
              aria-hidden
              className="absolute -bottom-4 start-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-2 font-mono text-[10px] uppercase tracking-[0.25em] rtl:translate-x-1/2"
              style={{ background: 'var(--store-accent)', color: 'var(--store-on-primary)' }}
              dir="ltr"
            >
              {store.city} — Hay Riad
            </span>
          </Reveal>
        </div>
      </section>

      {/* GALLERY — filmstrip with sprocket holes */}
      <section id="store-gallery" className="overflow-hidden py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-12">
          <Kicker>{t(store, 'galleryKicker')}</Kicker>
        </div>
        <div
          className="border-y-2 border-dashed py-6"
          style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)' }}
        >
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 md:px-24">
            {store.gallery.map((g, i) => (
              <motion.figure
                key={i}
                className="m-0 w-[74vw] shrink-0 snap-center md:w-[42vw] lg:w-[30vw]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE_LUXE }}
              >
                <div className="overflow-hidden">
                  <img src={g.src} alt={g.caption ?? store.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-sm text-cream-muted">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-faint" dir="ltr">
                    frame {String(i + 1).padStart(2, '0')}
                  </span>
                  {g.caption}
                </figcaption>
              </motion.figure>
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
