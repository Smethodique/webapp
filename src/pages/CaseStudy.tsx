import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Check, Copy, X } from 'lucide-react';
import { CurtainImage, Reveal, SectionHeading } from '@/components/motion';
import { getCaseStudy, getWorkBySlug } from '@/data/works';
import type { CaseStudy } from '@/data/works';

gsap.registerPlugin(ScrollTrigger);

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/* B1 — case hero (90vh, parallax)                                     */
/* ------------------------------------------------------------------ */

function CaseHero({ data }: { data: CaseStudy }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const headY = useTransform(scrollYProgress, [0, 0.7], [0, -40]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <header ref={ref} className="relative flex h-[90svh] min-h-[560px] items-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.img
          src={data.heroImage}
          alt={data.client}
          className="h-full w-full object-cover"
          initial={{ scale: 1.15, filter: 'brightness(0.6)' }}
          animate={{ scale: 1, filter: 'brightness(1)' }}
          transition={{ duration: 1.6, ease: EASE_LUXE }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.div className="container-atelier relative z-10 pb-24" style={{ y: headY, opacity: headOpacity }}>
        <motion.p
          className="kicker mb-6 text-gold-500"
          dir="ltr"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_LUXE }}
        >
          {data.client} — {data.city.toUpperCase()} · {data.year} · {data.sectorTag}
        </motion.p>
        <h1 className="text-display-lg max-w-4xl text-cream">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block will-change-transform"
              initial={{ y: '110%', rotate: 2 }}
              animate={{ y: '0%', rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE_LUXE }}
            >
              {data.heroTitle}
            </motion.span>
          </span>
        </h1>
        <motion.p
          className="mt-4 font-cormorant text-[clamp(1.25rem,2.5vw,2rem)] italic text-gold-500"
          lang="fr"
          dir="ltr"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE_LUXE }}
        >
          {data.heroFrench}
        </motion.p>
      </motion.div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <div className="h-14 w-px overflow-hidden bg-line">
          <div className="h-4 w-px animate-scroll-dot bg-gold-500" />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* B2 — overview strip                                                 */
/* ------------------------------------------------------------------ */

function Overview({ data }: { data: CaseStudy }) {
  const first = data.intro[0];
  const dropChar = first.charAt(0);
  const rest = first.slice(1);

  return (
    <section className="container-atelier grid gap-16 py-24 md:py-32 lg:grid-cols-12" aria-label="نظرة عامة">
      {/* sticky meta */}
      <Reveal className="lg:col-span-3">
        <dl className="flex flex-col gap-7 lg:sticky lg:top-[120px]">
          {[
            ['العميل', data.client],
            ['القطاع', data.sectorTag],
            ['المدة', data.duration],
            ['السنة', data.year],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-faint">{label}</dt>
              <dd className="mt-1 font-plex font-medium text-cream">{value}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-faint">الخدمات</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {data.services.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-cream-muted">{s}</span>
              ))}
            </dd>
          </div>
          {data.liveUrl && (
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-faint">الرابط</dt>
              <dd className="mt-1">
                <Link to={data.liveUrl} className="gold-link font-mono text-sm text-gold-400" dir="ltr">
                  visit live ↗
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </Reveal>

      {/* intro paragraphs */}
      <div className="lg:col-span-7 lg:col-start-5">
        <Reveal>
          <p className="text-lead text-cream">
            <span className="float-start me-4 mt-2 font-amiri text-[4rem] font-bold leading-[0.8] text-gold-700">
              {dropChar}
            </span>
            {rest}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-lead mt-8 text-cream-muted">{data.intro[1]}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B3 — challenge                                                      */
/* ------------------------------------------------------------------ */

function Challenge({ data }: { data: CaseStudy }) {
  return (
    <section className="border-t border-line bg-ink-950 py-24 md:py-32" aria-label="التحدي">
      <div className="container-atelier">
        <div className="mx-auto max-w-[720px]">
          <SectionHeading
            kicker="LE DÉFI"
            lines={[<span key="0" className="text-h2 text-cream">التحدي</span>]}
            className="mb-10"
          />
          <Reveal>
            <p className="leading-[1.9] text-cream-muted">{data.challenge}</p>
          </Reveal>

          {/* pull quote */}
          <motion.blockquote
            className="relative mt-14 border-s-2 border-gold-500 ps-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="mb-4 h-10 w-10 text-gold-500/40"
              fill="currentColor"
              aria-hidden="true"
              initial={{ rotate: -8, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            >
              <path d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1a4 4 0 0 1-4 4v2a6 6 0 0 0 6-6V9a2 2 0 0 0-2-2zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1a4 4 0 0 1-4 4v2a6 6 0 0 0 6-6V9a2 2 0 0 0-2-2z" />
            </motion.svg>
            <motion.p
              className="font-amiri text-[1.75rem] leading-relaxed text-cream"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_LUXE }}
            >
              {data.pullQuote}
            </motion.p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B4 — approach: pinned identity reveal (GSAP-only, 220vh)            */
/* ------------------------------------------------------------------ */

function ApproachPin({ data }: { data: CaseStudy }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-frame]', { position: 'relative', opacity: 1, inset: 'auto' });
        gsap.set('[data-color-col]', { y: 0 });
        gsap.set('[data-board-item]', { opacity: 1, y: 0, rotate: 0 });
        gsap.set('[data-glyphs]', { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top top', end: '+=220%', pin: true, scrub: 1 },
      });

      /* frame 1 — color columns rise sequentially (0 → 1) */
      tl.fromTo('[data-color-col]', { y: '100%' }, { y: '0%', stagger: 0.2, duration: 0.8, ease: 'none' }, 0);

      /* frame 2 — glyphs crossfade over the columns (1 → 2) */
      tl.to('[data-colors]', { opacity: 0.25, duration: 0.4 }, 1)
        .fromTo('[data-glyphs]', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'none' }, 1.1)
        .to('[data-glyphs]', { opacity: 0, duration: 0.3 }, 1.8);

      /* frame 3 — system board assembles (2 → 3) */
      tl.to('[data-colors]', { opacity: 0, duration: 0.3 }, 1.9)
        .fromTo(
          '[data-board-item]',
          { opacity: 0, y: 40, rotate: (i) => (i % 2 === 0 ? -4 : 4) },
          { opacity: 1, y: 0, rotate: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
          2.1
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink-900" aria-label="المقاربة">
      <div className="flex min-h-[100dvh] flex-col justify-center py-16">
        <div className="container-atelier mb-10">
          <p className="kicker text-gold-500" dir="ltr" lang="fr">L'APPROCHE</p>
          <h2 className="text-h2 mt-4 text-cream">المقاربة — من الهوية للنظام</h2>
        </div>

        <div className="relative mx-auto h-[52vh] w-full max-w-container px-5 md:h-[56vh]">
          {/* frame 1 — color columns */}
          <div data-frame data-colors className="absolute inset-0 flex overflow-hidden">
            {data.palette.map((c) => (
              <div
                key={c.hex}
                data-color-col
                className="relative flex w-1/4 flex-col justify-end p-4"
                style={{ background: c.hex }}
              >
                <span className="font-mono text-xs text-ink-950/80" dir="ltr">{c.hex}</span>
                <span className="font-plex text-sm font-medium text-ink-950">{c.name}</span>
              </div>
            ))}
          </div>

          {/* frame 2 — type glyphs */}
          <div data-frame data-glyphs className="absolute inset-0 flex items-center justify-center gap-16 opacity-0">
            <div className="text-center">
              <span className="block font-amiri text-[40vh] leading-none text-cream" aria-hidden="true">آ</span>
              <span className="font-mono text-xs text-cream-muted" dir="ltr">العناوين — {data.typePair.display}</span>
            </div>
            <div className="text-center">
              <span className="block font-cormorant text-[40vh] italic leading-none text-gold-500" dir="ltr" aria-hidden="true">Aa</span>
              <span className="font-mono text-xs text-cream-muted" dir="ltr">التفاصيل — {data.typePair.body}</span>
            </div>
          </div>

          {/* frame 3 — design-system board */}
          <div data-frame className="absolute inset-0 flex items-center">
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
              <div data-board-item className="border border-line bg-ink-800 p-6 opacity-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-faint" dir="ltr">BUTTON</p>
                <span className="mt-4 inline-block rounded-full bg-gold-500 px-6 py-2.5 font-plex text-sm font-semibold text-ink-950">احجز الآن</span>
              </div>
              <div data-board-item className="border border-line bg-ink-800 p-6 opacity-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-faint" dir="ltr">CHIP</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.services.slice(0, 2).map((s) => (
                    <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-cream-muted">{s}</span>
                  ))}
                </div>
              </div>
              <div data-board-item className="border border-line bg-ink-800 p-6 opacity-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-faint" dir="ltr">CARD</p>
                <div className="mt-4 border border-line bg-ink-900 p-4">
                  <p className="font-plex text-sm font-semibold text-cream">{data.client}</p>
                  <p className="mt-1 font-mono text-[10px] text-cream-faint">{data.sectorTag}</p>
                </div>
              </div>
              <div data-board-item className="border border-line bg-ink-800 p-6 opacity-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-faint" dir="ltr">LINK</p>
                <span className="gold-link mt-4 inline-block font-plex text-sm text-gold-400">شاهد المزيد ↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B5 — screen showcase + lightbox                                     */
/* ------------------------------------------------------------------ */

function Screens({ data }: { data: CaseStudy }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft') setOpen((v) => (v === null ? v : (v + 1) % data.screens.length));
      if (e.key === 'ArrowRight') setOpen((v) => (v === null ? v : (v - 1 + data.screens.length) % data.screens.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, data.screens.length]);

  return (
    <section className="container-atelier py-24 md:py-32" aria-label="الشاشات">
      <SectionHeading
        kicker="SCREENS"
        lines={[<span key="0" className="text-h2 text-cream">التجربة على الشاشة</span>]}
        className="mb-20"
      />

      <div className="flex flex-col gap-24">
        {data.screens.map((screen, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={screen.title} className="grid items-center gap-10 md:grid-cols-12">
              <button
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="media"
                aria-label={`كبّر: ${screen.title}`}
                className={`text-start md:col-span-8 ${flip ? 'md:order-2' : ''}`}
              >
                <CurtainImage
                  src={screen.img}
                  alt={screen.title}
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-700 ease-luxe hover:scale-[1.04]"
                  delay={0.05}
                />
              </button>
              <Reveal className={`md:col-span-4 ${flip ? 'md:order-1' : ''}`} y={40}>
                <span className="font-cormorant text-3xl italic text-gold-500" dir="ltr">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <h3 className="text-h3 mt-3 text-cream">{screen.title}</h3>
                <p className="mt-3 text-cream-muted">{screen.body}</p>
              </Reveal>
            </div>
          );
        })}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink-950/95 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={data.screens[open].title}
          >
            <motion.figure
              className="max-w-5xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.5, ease: EASE_LUXE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={data.screens[open].img} alt={data.screens[open].title} className="max-h-[75dvh] w-full object-contain" />
              <figcaption className="mt-4 flex items-center justify-between font-mono text-xs text-cream-muted">
                <span>{data.screens[open].title}</span>
                <span dir="ltr">{open + 1} / {data.screens.length}</span>
              </figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="أغلق"
              className="absolute end-6 top-6 rounded-full border border-line p-3 text-cream transition-colors hover:border-gold-500/40 hover:text-gold-400"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B6 — results                                                        */
/* ------------------------------------------------------------------ */

function Metric({ value, prefix, suffix, decimals = 0, label, delay }: CaseStudy['metrics'][number] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, delay]);

  return (
    <div ref={ref} className="border-s border-line ps-8 first:border-s-0 first:ps-0">
      <p className="font-cormorant text-[clamp(3rem,6vw,6rem)] font-light italic leading-none text-gold-500" dir="ltr">
        {prefix}{display}{suffix}
      </p>
      <p className="mt-3 text-sm text-cream-muted">{label}</p>
    </div>
  );
}

function Results({ data }: { data: CaseStudy }) {
  return (
    <section className="bg-ink-800 py-24 md:py-40" aria-label="النتائج">
      <div className="container-atelier">
        <SectionHeading
          kicker="RÉSULTATS"
          lines={[<span key="0" className="text-h2 text-cream">النتائج بالأرقام</span>]}
          className="mb-6"
        />
        <motion.div
          className="hairline mb-16 origin-right"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: EASE_LUXE }}
        />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.metrics.map((m, i) => (
            <Metric key={m.label} {...m} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B7 — client quote + share                                           */
/* ------------------------------------------------------------------ */

function ClientQuote({ data }: { data: CaseStudy }) {
  const words = data.quote.split(' ');
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="py-24 md:py-40" aria-label="كلمة العميل">
      <div className="container-atelier">
        <div className="mx-auto max-w-[900px] text-center">
          <motion.p
            className="font-amiri text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-relaxed text-cream"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.05 }}
          >
            «{words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{ hidden: { opacity: 0.1 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
              >
                {w}{'\u00A0'}
              </motion.span>
            ))}»
          </motion.p>
          <motion.p
            className="mt-8 font-mono text-sm text-cream-muted"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_LUXE }}
          >
            {data.quoteAuthor}
          </motion.p>
          <p className="mt-6 font-cormorant text-2xl italic text-cream/30" dir="ltr">{data.client}</p>

          {/* share row */}
          <div className="mt-14 flex items-center justify-center gap-6 font-mono text-xs text-cream-faint">
            <span>شارك:</span>
            <a
              className="gold-link hover:text-gold-400"
              dir="ltr"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.heroTitle)}`}
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>
            <a
              className="gold-link hover:text-gold-400"
              dir="ltr"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://atelier.ma/works/${data.slug}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <button type="button" onClick={copyLink} className="gold-link inline-flex items-center gap-2 hover:text-gold-400">
              {copied ? <Check className="h-3.5 w-3.5 text-success" strokeWidth={1.5} /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />}
              {copied ? 'تم النسخ ✓' : 'نسخ الرابط'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B8 — next project                                                   */
/* ------------------------------------------------------------------ */

function NextProject({ slug }: { slug: string }) {
  const nextWork = getWorkBySlug(slug);
  if (!nextWork) return null;

  return (
    <Link
      to={`/works/${nextWork.slug}`}
      data-cursor="media"
      className="group relative block h-[70vh] min-h-[420px] overflow-hidden border-t border-line"
      aria-label={`المشروع الموالي: ${nextWork.title}`}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(12% 6%)' }}
        whileInView={{ clipPath: 'inset(0% 0%)' }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: EASE_LUXE }}
      >
        <img
          src={nextWork.thumb}
          alt={nextWork.title}
          loading="lazy"
          className="h-full w-full object-cover brightness-[0.4] transition-all duration-700 ease-luxe group-hover:scale-[1.06] group-hover:brightness-[0.7]"
        />
      </motion.div>
      <div className="container-atelier relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="kicker text-gold-500">المشروع الموالي</p>
        <h2 className="text-display-lg mt-6 text-cream transition-transform duration-700 ease-luxe group-hover:-translate-x-4">
          {nextWork.title}
        </h2>
        <span className="mt-8 flex items-center gap-3 font-plex text-sm text-gold-400">
          شاهد القصة
          <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-2" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const data = getCaseStudy(slug);

  useEffect(() => {
    document.title = data ? `${data.client} — أتيلييه` : 'المشروع غير موجود — أتيلييه';
    return () => {
      document.title = 'أتيلييه';
    };
  }, [data]);

  if (!data) {
    return (
      <section className="container-atelier flex min-h-[70dvh] flex-col items-center justify-center gap-6 text-center">
        <p className="kicker text-gold-500" dir="ltr">CASE — 404</p>
        <h1 className="text-display-lg text-cream">المشروع غير موجود</h1>
        <Link to="/works" className="gold-link inline-flex items-center gap-2 text-gold-400">
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          كل الأعمال
        </Link>
      </section>
    );
  }

  return (
    <article>
      <CaseHero data={data} />
      <Overview data={data} />
      <Challenge data={data} />
      <ApproachPin data={data} />
      <Screens data={data} />
      <Results data={data} />
      <ClientQuote data={data} />
      <NextProject slug={data.nextSlug} />
    </article>
  );
}
