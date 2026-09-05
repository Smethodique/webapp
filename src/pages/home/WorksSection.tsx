import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORKS } from '@/data/works';

gsap.registerPlugin(ScrollTrigger);

/**
 * S3 — Selected Works. GSAP-only tree.
 * Desktop: pinned horizontal track (RTL: track translates +x). Mobile: vertical stack.
 */
export default function WorksSection() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-work-card]');
        const distance = () => Math.max(0, track.scrollWidth - root.clientWidth + 80);

        const paint = (p: number) => {
          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
          cards.forEach((card, i) => {
            /* staggered clip reveal + inner-image parallax, all from scrub progress */
            const reveal = gsap.utils.clamp(0, 1, (p - i * 0.09) / 0.22);
            const eased = 1 - Math.pow(1 - reveal, 4);
            card.style.clipPath = `inset(0 0 0 ${(1 - eased) * 100}%)`; /* RTL: reveal grows from inline-end (left) */
            const par = gsap.utils.clamp(0, 1, (p - i * 0.08) / 0.7);
            const img = card.querySelector<HTMLElement>('[data-work-img]');
            if (img) img.style.transform = `translateX(${-8 + 16 * par}%)`;
          });
        };
        paint(0);

        gsap.to(track, {
          x: () => distance(), // RTL: positive x reveals the leftward overflow
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => paint(self.progress),
          },
        });
      });

      /* header reveal (both layouts) */
      if (!reduced) {
        gsap.fromTo(
          '[data-works-head]',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.12,
            scrollTrigger: { trigger: root, start: 'top 75%' },
          }
        );
      }

      /* mobile: simple rise per card */
      mm.add('(max-width: 767px)', () => {
        if (reduced) return;
        gsap.utils.toArray<HTMLElement>('[data-work-card]').forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power4.out',
              scrollTrigger: { trigger: card, start: 'top 85%' },
            }
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="works" className="relative overflow-hidden bg-ink-950 py-24 md:py-0 md:pt-32" aria-label="أعمال مختارة">
      <div className="container-atelier md:flex md:min-h-[100dvh] md:flex-col md:justify-center">
        {/* header row */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-works-head className="kicker mb-6 text-gold-500" dir="ltr">SELECTION — ٢٠٢٥</p>
            <h2 data-works-head className="text-h2 text-cream">أعمال مختارة</h2>
          </div>
          <Link data-works-head to="/works" className="gold-link font-plex text-sm text-cream-muted hover:text-gold-400">
            كل الأعمال ↗
          </Link>
        </div>
        <div className="mb-10 h-0.5 w-full overflow-hidden bg-line/50">
          <div ref={barRef} className="h-full w-full origin-right bg-gold-500" style={{ transform: 'scaleX(0)' }} />
        </div>

        {/* track */}
        <div
          ref={trackRef}
          className="flex flex-col gap-10 md:w-max md:flex-row md:gap-8 md:will-change-transform"
        >
          {WORKS.map((w, i) => (
            <Link
              key={w.slug}
              to={`/works/${w.slug}`}
              data-work-card
              data-cursor="media"
              className="group block md:w-[400px] md:shrink-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-800 md:h-[520px] md:w-auto">
                <img
                  data-work-img
                  src={w.thumb}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-[120%] max-w-none object-cover grayscale-[20%] transition-[filter] duration-500 group-hover:grayscale-0"
                />
                <span className="pointer-events-none absolute inset-3 border border-gold-500/0 transition-colors duration-500 group-hover:border-gold-500/50" />
                <span className="absolute start-4 top-4 font-cormorant text-2xl italic text-gold-500" dir="ltr">
                  {String(i + 1).padStart(2, '0')}.
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-h3 text-cream transition-colors group-hover:text-gold-400">{w.title}</h3>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-cream-muted">{w.sectorTag}</span>
                  <span className="font-mono text-[11px] text-cream-faint" dir="ltr">
                    {w.city.toUpperCase()} — {w.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
