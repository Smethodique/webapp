import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShaderHero } from '@/components/shaders';
import { scrollToTarget } from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * S1 — Hero. GSAP-only component tree (load timeline + pinned scrub).
 * Pinned for an extra 20% viewport; uScroll driven externally via scrollProgress.
 */
export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progress = useRef({ current: 0 });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero-kicker], [data-hero-rise], [data-hero-meta], [data-shader-shell]', { opacity: 1 });
        gsap.set('[data-hero-line]', { y: '0%', rotate: 0 });
        return;
      }

      /* ---- load timeline ---- */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('[data-shader-shell]', { opacity: 0 }, { opacity: 1, duration: 1.2 })
        .fromTo(
          '[data-hero-kicker]',
          { opacity: 0, letterSpacing: '0.5em' },
          { opacity: 1, letterSpacing: '0.28em', duration: 1.0 },
          0.3
        )
        .fromTo(
          '[data-hero-line]',
          { y: '110%', rotate: 2 },
          { y: '0%', rotate: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12 },
          0.5
        )
        .fromTo(
          '[data-hero-rise]',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          1.3
        )
        .fromTo('[data-hero-meta]', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.8);

      /* ---- pinned scroll scene ---- */
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            progress.current.current = self.progress;
          },
        },
      }).to(contentRef.current, { y: -80, opacity: 0, ease: 'none', duration: 0.8 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[100dvh] items-center overflow-hidden" aria-label="المقدمة">
      <div data-shader-shell className="absolute inset-0">
        <ShaderHero variant="silk" colors={['#6E1423', '#D8B25C']} intensity={1} scrollProgress={progress.current} />
      </div>

      <div ref={contentRef} className="container-atelier relative z-10 grid grid-cols-12 gap-6 py-24">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <div data-hero-kicker className="mb-10 flex items-center gap-4 opacity-0">
            <span className="hairline w-6 bg-gold-500" />
            <span className="kicker text-gold-500" lang="fr" dir="ltr">STUDIO DIGITAL — CASABLANCA</span>
            <span className="hairline w-6 bg-gold-500" />
          </div>

          <h1 className="text-display-xl text-cream">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block will-change-transform">موقعك الإلكتروني</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block will-change-transform">
                <span className="text-gold-500">يستاهل</span> يكون
                <span className="block font-cormorant text-[0.35em] font-normal italic text-gold-500" lang="fr" dir="ltr">
                  une œuvre
                </span>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block will-change-transform">تحفة فنية</span>
            </span>
          </h1>

          <p data-hero-rise className="text-lead mt-10 max-w-[560px] text-cream-muted opacity-0">
            أنا مطوّر مستقل من المغرب، كنصمّم وكنبرمج مواقع فاخرة للمتاجر المحلية — من المقهى حتى دار القفطان.
            تصميم عالمي، وثمن محلي.
          </p>

          <div data-hero-rise className="mt-10 flex flex-wrap items-center gap-5 opacity-0">
            <button
              type="button"
              onClick={() => scrollToTarget('#works')}
              className="rounded-full bg-gold-500 px-8 py-4 font-plex font-semibold text-ink-950 transition-all duration-300 hover:scale-[1.03] hover:bg-gold-400"
            >
              شوف الخدمة ديالي
            </button>
            <Link
              to="/contact"
              className="rounded-full border border-line px-8 py-4 font-plex text-cream transition-colors duration-300 hover:border-gold-500/40 hover:text-gold-400"
            >
              احجز مكالمة مجانية
            </Link>
          </div>
        </div>
      </div>

      {/* bottom meta strip */}
      <div
        data-hero-meta
        className="container-atelier absolute inset-x-0 bottom-8 z-10 flex items-center justify-between font-mono text-xs text-cream-faint opacity-0"
      >
        <span dir="ltr">33.5731° N, 7.5898° W</span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-500" />
          متاح لمشاريع جديدة
        </span>
        <button
          type="button"
          onClick={() => scrollToTarget('#works')}
          className="flex flex-col items-center gap-2"
          aria-label="نزّل للأسفل"
        >
          <span className="text-[10px]">نزّل</span>
          <span className="relative block h-12 w-px overflow-hidden bg-line">
            <span className="absolute start-0 top-0 h-3 w-px animate-scroll-dot bg-gold-500" />
          </span>
        </button>
      </div>
    </section>
  );
}
