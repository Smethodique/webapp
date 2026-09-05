import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    day: 'JOUR 01',
    title: 'الاكتشاف',
    desc: 'مكالمة مجانية 30 دقيقة: كنفهم المحل، الزبناء، والطموح.',
    icon: 'M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4',
  },
  {
    num: '02',
    day: 'JOUR 03–07',
    title: 'التصميم',
    desc: 'نموذج تفاعلي خلال 5 أيام. كتشوف وكتعلّق قبل ما نكتب حتى سطر كود.',
    icon: 'M4 20l5-1L21 7a2.1 2.1 0 0 0-3-3L6 16l-2 5zM14 6l4 4',
  },
  {
    num: '03',
    day: 'JOUR 08–12',
    title: 'التطوير',
    desc: 'برمجة نظيفة، سرعة تحميل أقل من ثانية، وتجربة موبايل مثالية.',
    icon: 'M8 6l-6 6 6 6M16 6l6 6-6 6M13 4l-2 16',
  },
  {
    num: '04',
    day: 'JOUR 14',
    title: 'الإطلاق والنمو',
    desc: 'نشر، ربط بالدومين والسوشيال ميديا، ومتابعة شهرية مجانية لمدة 3 أشهر.',
    icon: 'M5 13l4 4L19 7M12 2v4M2 12h4M18 12h4',
  },
];

/**
 * S5 — Process. GSAP-only pinned narrative (250% scroll): gold line draws,
 * step nodes activate, content swaps with y + blur.
 */
export default function ProcessSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-step]', { opacity: 1, position: 'relative' });
        gsap.set('[data-process-line]', { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo('[data-process-line]', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 4 }, 0);

      STEPS.forEach((_, i) => {
        const at = i; // each step occupies 1 unit of the 4-unit timeline
        const step = `[data-step="${i}"]`;
        const ghost = `[data-ghost="${i}"]`;
        const node = `[data-node="${i}"]`;
        const icon = `[data-step-icon="${i}"]`;

        gsap.set(icon, { opacity: i === 0 ? 0.85 : 0 });

        if (i === 0) {
          /* first step starts visible; node fills immediately */
          gsap.set(step, { opacity: 1, y: 0, filter: 'blur(0px)' });
        } else {
          const prev = `[data-step="${i - 1}"]`;
          const prevGhost = `[data-ghost="${i - 1}"]`;
          const prevIcon = `[data-step-icon="${i - 1}"]`;
          tl.to(prev, { opacity: 0, y: -60, filter: 'blur(4px)', duration: 0.5 }, at - 0.5)
            .to(prevGhost, { opacity: 0, duration: 0.3 }, at - 0.3)
            .to(prevIcon, { opacity: 0, duration: 0.2 }, at - 0.35)
            .to(icon, { opacity: 0.85, duration: 0.2 }, at - 0.15)
            .fromTo(step, { opacity: 0, y: 60, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }, at - 0.3)
            .fromTo(ghost, { opacity: 0 }, { opacity: 0.06, duration: 0.3 }, at - 0.15);
        }
        /* node fills exactly when its segment starts */
        if (i === 0) gsap.set(node, { backgroundColor: '#C9A227', boxShadow: '0 0 24px rgba(227,185,79,0.5)' });
        else tl.to(node, { backgroundColor: '#C9A227', boxShadow: '0 0 24px rgba(227,185,79,0.5)', duration: 0.05 }, at);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink-900 py-24 md:py-0" aria-label="منهجية العمل">
      <div className="container-atelier relative md:flex md:min-h-[100dvh] md:flex-col md:justify-center">
        <p className="kicker mb-6 text-gold-500" dir="ltr">PROCESS</p>
        <h2 className="text-h2 mb-16 text-cream">من الفكرة للإطلاق</h2>

        <div className="relative grid gap-10 md:grid-cols-12">
          {/* gold progress line — inline-start */}
          <div className="absolute inset-y-0 start-0 hidden w-px md:block">
            <div className="absolute inset-0 bg-line" />
            <div data-process-line className="absolute inset-0 origin-top bg-gold-500" style={{ transform: 'scaleY(0)' }} />
            {STEPS.map((_, i) => (
              <span
                key={i}
                data-node={i}
                className="absolute -start-[5.5px] h-3 w-3 rounded-full border border-gold-500 bg-ink-900 transition-none"
                style={{ top: `${(i / (STEPS.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          {/* steps stack */}
          <div className="relative md:col-span-7 md:col-start-2 md:min-h-[46vh]">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                data-step={i}
                className={`${i === 0 ? 'md:absolute' : 'md:absolute'} relative inset-0 mb-16 flex flex-col justify-center md:mb-0 ${i > 0 ? 'md:opacity-0' : ''}`}
              >
                <span className="font-mono text-xs tracking-[0.2em] text-gold-500" dir="ltr">{s.day}</span>
                <h3 className="text-h2 mt-3 text-cream">{s.title}</h3>
                <p className="text-lead mt-4 max-w-lg text-cream-muted">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* ghost numeral + visual card */}
          <div className="relative hidden md:col-span-4 md:col-start-9 md:block">
            {STEPS.map((s, i) => (
              <span
                key={s.num}
                data-ghost={i}
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 end-0 select-none font-cormorant text-[12rem] font-light italic leading-none text-cream"
                style={{ opacity: i === 0 ? 0.06 : 0 }}
                dir="ltr"
              >
                {s.num}
              </span>
            ))}
            <div className="relative mt-40 flex aspect-square items-center justify-center border border-line bg-ink-800">
              {STEPS.map((s, i) => (
                <svg
                  key={s.num}
                  data-step-icon={i}
                  viewBox="0 0 24 24"
                  className="absolute h-20 w-20 text-gold-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: i === 0 ? 0.85 : 0 }}
                >
                  <path d={s.icon} />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
