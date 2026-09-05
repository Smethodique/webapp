import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoreHeader from '@/components/store/StoreHeader';
import StoreMarquee from '@/components/store/StoreMarquee';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { CurtainImage, Reveal } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { t } from '../../storeUtils';
import { BookCta, EASE_LUXE, Filigree, Head, ReviewCard, ShaderBackdrop, Stars, serif } from './shared';

gsap.registerPlugin(ScrollTrigger);

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/**
 * MIYA COUTURE — Fès, since 1996. Royal-heritage couture editorial:
 * silk-shader throne-room hero, gold filigree, a GSAP-pinned vertical
 * sidescroll LOOKBOOK (runway plates with roman numerals), and a
 * maison price list with dotted leaders.
 */
export default function MiyaCouture({ store }: { store: StorePageTheme }) {
  const lookRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = lookRef.current;
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
            end: '+=180%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [store.dir]);

  return (
    <>
      <StoreHeader store={store} />

      {/* HERO — throne room: silk shader, giant Amiri, filigree, 1996 spine */}
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
        <ShaderBackdrop store={store} />
        {/* vertical heritage spine */}
        <span
          aria-hidden
          className="absolute top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-cream-faint lg:block ltr:left-8 ltr:-rotate-90 rtl:right-8 rtl:rotate-90"
          dir="ltr"
        >
          Fès — 1996
        </span>
        <div className="container-atelier relative z-10 flex flex-col items-center gap-7 py-32 text-center">
          <motion.p
            className="kicker"
            dir="ltr"
            style={{ color: 'var(--store-primary)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_LUXE }}
          >
            {store.content?.taglineFr ?? store.sectorLabel}
          </motion.p>
          <h1 className="m-0 text-cream" style={{ ...serif, fontSize: 'clamp(3rem, 9vw, 7.5rem)', lineHeight: 1.15 }}>
            {store.heroTitle.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.15, delay: 0.35 + i * 0.14, ease: EASE_LUXE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex w-full max-w-xl flex-col items-center gap-7"
          >
            <Filigree className="w-full" />
            <p className="m-0 max-w-2xl leading-relaxed text-cream-muted">{store.heroSub}</p>
            <BookCta store={store} />
          </motion.div>
        </div>
      </section>

      <StoreMarquee store={store} />

      {/* STORY — double gold frame + quote cartouche */}
      <section id="store-story" className="relative py-24 md:py-32 lg:py-40">
        <div className="container-atelier grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative p-3" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 45%, transparent)' }}>
              <div className="relative p-2" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 25%, transparent)' }}>
                <CurtainImage src={store.aboutImage} alt={store.name} className="aspect-[4/5] w-full" />
              </div>
              <span
                aria-hidden
                className="absolute -top-5 start-8 px-4 font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ background: 'var(--store-bg)', color: 'var(--store-primary)' }}
                dir="ltr"
              >
                {store.city} — 1996
              </span>
            </div>
          </Reveal>
          <div>
            <Head kicker={t(store, 'storyKicker')} lines={[store.story.title]} />
            <div className="mt-8 space-y-5 leading-loose text-cream-muted">
              {store.story.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="m-0">{p}</p>
                </Reveal>
              ))}
            </div>
            {store.story.quote && (
              <Reveal delay={0.15}>
                <figure
                  className="relative m-0 mt-10 p-8"
                  style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 40%, transparent)', background: 'var(--store-surface-tint)' }}
                >
                  <span aria-hidden className="absolute -top-7 start-6 text-6xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                    ”
                  </span>
                  <blockquote className="m-0 text-xl leading-relaxed text-cream md:text-2xl" style={serif}>
                    {store.story.quote.text}
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-xs text-cream-faint">{store.story.quote.author}</figcaption>
                </figure>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* LOOKBOOK — pinned horizontal runway plates */}
      <section id="store-gallery" ref={lookRef} className="relative overflow-hidden py-24 md:py-28" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier mb-12 flex items-end justify-between gap-8">
          <Head kicker="LOOKBOOK" lines={[t(store, 'gallery')]} />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-cream-faint md:block" dir="ltr">
            scroll ↓
          </span>
        </div>
        <div ref={trackRef} className="flex w-max items-stretch gap-8 px-6 md:px-24">
          {store.gallery.map((g, i) => (
            <figure key={i} className="group relative m-0 w-[78vw] shrink-0 md:w-[46vw] lg:w-[34vw]">
              <div className="overflow-hidden" style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 35%, transparent)' }}>
                <img
                  src={g.src}
                  alt={g.caption ?? store.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-3xl text-cream-faint" style={serif} dir="ltr">
                  {ROMAN[i] ?? String(i + 1)}
                </span>
                {g.caption && <span className="text-sm text-cream-muted">{g.caption}</span>}
              </figcaption>
            </figure>
          ))}
          {/* end plate */}
          <div className="flex w-[40vw] shrink-0 items-center justify-center md:w-[24vw]">
            <p className="text-center text-2xl text-cream-faint" style={serif}>
              {store.nameAr}
            </p>
          </div>
        </div>
      </section>

      {/* MENU DE LA MAISON — numbered ledger with dotted leaders */}
      <section id="store-menu" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier">
          <Head kicker="LA MAISON" lines={[t(store, 'menu')]} className="mb-16 text-center mx-auto max-w-3xl [&_.kicker]:mx-0 flex flex-col items-center" />
          <ol className="m-0 list-none p-0">
            {store.services.map((s, i) => (
              <motion.li
                key={i}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b py-8 transition-colors md:grid-cols-[5rem_1fr_auto]"
                style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 18%, transparent)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE_LUXE }}
              >
                <span className="text-2xl text-cream-faint transition-colors group-hover:text-cream" style={serif} dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-2xl text-cream md:text-3xl" style={serif}>
                    {s.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-cream-muted">{s.desc}</span>
                </span>
                <span className="col-span-2 mt-3 flex items-baseline gap-4 md:col-span-1 md:mt-0">
                  <span aria-hidden className="hidden flex-1 border-b border-dotted md:block md:w-16" style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 35%, transparent)' }} />
                  <span className="whitespace-nowrap text-xl" style={{ ...serif, color: 'var(--store-primary)' }}>
                    {s.price}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* REVIEWS — royal cartouches */}
      <section id="store-reviews" className="py-24 md:py-32" style={{ background: 'var(--store-surface-tint)' }}>
        <div className="container-atelier">
          <div className="mb-14 flex items-center gap-6">
            <Stars rating={5} className="text-lg" />
            <Filigree className="flex-1" />
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <ReviewCard
                key={i}
                review={r}
                className="p-8"
                style={{ border: '1px solid color-mix(in srgb, var(--store-primary) 28%, transparent)' }}
              />
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
