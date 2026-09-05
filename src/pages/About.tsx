import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { CurtainImage, KineticText, MagneticButton, Marquee, SectionHeading } from '@/components/motion';

gsap.registerPlugin(ScrollTrigger);

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** img that falls back to an existing asset if the designed asset is not generated yet. */
function SmartImg({ src, fallback, ...rest }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; fallback: string }) {
  return (
    <img
      src={src}
      loading="lazy"
      onError={(e) => {
        const el = e.currentTarget;
        if (el.src.endsWith(fallback)) return;
        el.src = fallback;
      }}
      {...rest}
    />
  );
}

/* ------------------------------------------------------------------ */
/* B1 — page hero (85vh)                                               */
/* ------------------------------------------------------------------ */

function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  return (
    <header ref={ref} className="container-atelier grid min-h-[85svh] items-center gap-16 pt-40 pb-20 lg:grid-cols-12">
      {/* portrait with gold offset frame */}
      <motion.div className="relative lg:col-span-5" style={{ y: imgY }}>
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] text-gold-500/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.rect
            x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
            fill="none" stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE_LUXE }}
          />
        </motion.svg>
        <CurtainImage
          src="/about-portrait.jpg"
          alt="بورتريه المطور في الأتيلييه ليلاً"
          className="aspect-[4/5]"
          imgClassName="transition-transform duration-[1400ms]"
        />
      </motion.div>

      {/* statement */}
      <motion.div className="lg:col-span-6 lg:col-start-7" style={{ y: textY }}>
        <motion.p
          className="kicker text-gold-500"
          dir="ltr"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_LUXE }}
        >
          À PROPOS — القصة
        </motion.p>
        <h1 className="text-display-lg mt-8 text-cream">
          {['سميتي يوسف،', 'وكنصنع مواقع', null].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block will-change-transform"
                initial={{ y: '110%', rotate: 2 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: EASE_LUXE }}
              >
                {line ?? <>كتحكي <span className="text-gold-500">قصص.</span></>}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="text-lead mt-8 max-w-lg text-cream-muted"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE_LUXE }}
        >
          مطوّر ومصمّم مستقل من الدار البيضاء. من 2019 وانا كنخدم مع متاجر مغربية — من أول مقهى وثّق فيا، حتى ولات عندي عائلة ديال 30+ مشروع.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-cream-faint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span dir="ltr">CASABLANCA, MA</span>
          <span className="h-1 w-1 rounded-full bg-gold-500/60" aria-hidden="true" />
          <span dir="ltr">FR / AR / EN</span>
          <span className="h-1 w-1 rounded-full bg-gold-500/60" aria-hidden="true" />
          <span className="inline-flex items-center gap-2 text-gold-400">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-500" aria-hidden="true" />
            متاح للمشاريع
          </span>
        </motion.div>
      </motion.div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* B2 — the story (pinned split narrative, GSAP-only, 240vh)           */
/* ------------------------------------------------------------------ */

const CHAPTERS = [
  {
    year: '2019',
    title: 'البداية',
    body: 'تعلمت البرمجة بوحدي، وأول موقع صاوبتو كان لمقهى صديقي بلاش. الناس بان ليهم الفرق.',
  },
  {
    year: '2021–2023',
    title: 'الحرفة',
    body: 'تخصصت في التجربة الكاملة: تصميم، برمجة، تصوير المنتج، وSEO. ما كنبيعش "موقع" — كنبيع نتيجة.',
  },
  {
    year: "AUJOURD'HUI",
    title: 'اليوم',
    body: 'أتيلييه مستقل كيخدم 3 قطاعات: الضيافة، الأناقة، ولايف ستايل. كل مشروع كياخد وقته، وما كنقبلش كثر من جوج مشاريع في الشهر.',
  },
];

const STORY_IMAGES = [
  { src: '/about-studio-1.jpg', fallback: '/work-thumb-05.jpg', alt: 'يد ترسم وايرفريم بجانب كأس أتاي' },
  { src: '/about-studio-2.jpg', fallback: '/og-cover.jpg', alt: 'حاسوب يعرض موقعاً فاخراً داكناً' },
];

function StoryPin() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-chapter]', { position: 'relative', opacity: 1, y: 0, filter: 'blur(0px)' });
        gsap.set('[data-story-ghost]', { opacity: 0.08 });
        gsap.set('[data-story-img="0"]', { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top top', end: '+=240%', pin: true, scrub: 1 },
      });

      CHAPTERS.forEach((_, i) => {
        if (i === 0) return;
        const at = i; /* 1 unit per chapter */
        tl.to(`[data-chapter="${i - 1}"]`, { opacity: 0, y: -50, filter: 'blur(4px)', duration: 0.4 }, at - 0.4)
          .fromTo(
            `[data-chapter="${i}"]`,
            { opacity: 0, y: 50, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4 },
            at - 0.25
          )
          .to(`[data-story-ghost="${i - 1}"]`, { opacity: 0, duration: 0.2 }, at - 0.3)
          .to(`[data-story-ghost="${i}"]`, { opacity: 0.08, duration: 0.2 }, at - 0.15)
          .to(`[data-story-img="${(i - 1) % STORY_IMAGES.length}"]`, { opacity: 0, scale: 1.06, duration: 0.5 }, at - 0.45)
          .fromTo(
            `[data-story-img="${i % STORY_IMAGES.length}"]`,
            { opacity: 0, scale: 1.06 },
            { opacity: 1, scale: 1, duration: 0.5 },
            at - 0.35
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden border-t border-line bg-ink-900" aria-label="القصة">
      <div className="container-atelier flex min-h-[100dvh] items-center py-24">
        <div className="grid w-full gap-12 md:grid-cols-12">
          {/* images column — inline-start */}
          <div className="relative hidden md:col-span-5 md:block">
            <div className="relative aspect-[16/10] overflow-hidden">
              {STORY_IMAGES.map((img, i) => (
                <SmartImg
                  key={img.src}
                  data-story-img={i}
                  src={img.src}
                  fallback={img.fallback}
                  alt={img.alt}
                  className={`absolute inset-0 h-full w-full object-cover ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                  style={i === 1 ? { transform: 'translateY(16px)' } : undefined}
                />
              ))}
            </div>
            {CHAPTERS.map((c, i) => (
              <span
                key={c.year}
                data-story-ghost={i}
                aria-hidden="true"
                dir="ltr"
                className="pointer-events-none absolute -bottom-16 end-0 select-none font-cormorant text-[8rem] font-light italic leading-none text-cream"
                style={{ opacity: i === 0 ? 0.08 : 0 }}
              >
                {c.year}
              </span>
            ))}
          </div>

          {/* chapters column */}
          <div className="relative flex min-h-[40vh] flex-col justify-center md:col-span-6 md:col-start-7">
            {CHAPTERS.map((c, i) => (
              <div
                key={c.title}
                data-chapter={i}
                className={`${i === 0 ? 'relative' : 'absolute inset-0 flex flex-col justify-center'} ${i > 0 ? 'opacity-0' : ''}`}
              >
                <span className="font-mono text-xs tracking-[0.2em] text-gold-500" dir="ltr">{c.year}</span>
                <h3 className="text-h2 mt-4 text-cream">{c.title}</h3>
                <p className="text-lead mt-6 max-w-lg text-cream-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B3 — philosophy                                                     */
/* ------------------------------------------------------------------ */

const VALUES = [
  { num: '٠١', title: 'القصة قبل القالب', body: 'كل متجر عندو حكاية؛ التصميم كيبدا منها، ماشي من Pinterest.' },
  { num: '٠٢', title: 'السرعة احترام', body: 'زبون كيسنّى كثر من ثانية هو زبون ضاع. كل موقع كنسلمو تحت 1s.' },
  { num: '٠٣', title: 'الوضوح فالثمن', body: 'عرض مكتوب، بلا مفاجآت، بلا "نجي نشوفو".' },
  { num: '٠٤', title: 'شراكة ماشي خدمة', body: '3 أشهر متابعة مجانية بعد الإطلاق. نجاحك هو السيرة الذاتية ديالي.' },
];

function Philosophy() {
  return (
    <section className="container-atelier py-24 md:py-32" aria-label="كيفاش كنخدم">
      <SectionHeading
        kicker="VALEURS"
        lines={[<span key="0" className="text-h2 text-cream">مبادئ ما كنتنازل عليهم</span>]}
        className="mb-16"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {VALUES.map((v, i) => (
          <motion.article
            key={v.num}
            className="group border border-line bg-ink-800 p-10 transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-gold-500/40 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE_LUXE }}
          >
            <span className="font-mono text-sm text-gold-500 transition-colors duration-300 group-hover:text-gold-400">{v.num}</span>
            <h3 className="text-h3 mt-5 text-cream">{v.title}</h3>
            <p className="mt-3 text-cream-muted">{v.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B4 — toolbox                                                        */
/* ------------------------------------------------------------------ */

const TECH_ROW = ['React', 'TypeScript', 'Node.js', 'Three.js', 'GSAP', 'Tailwind', 'PostgreSQL', 'Vite'];
const CRAFT_ROW = ['تصميم UI', 'موشن', 'SEO محلي', 'تصوير منتج', 'كتابة محتوى', 'هوية بصرية'];

const TOOL_CATEGORIES: { name: string; tools: { name: string; level: number }[] }[] = [
  {
    name: 'Frontend',
    tools: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'GSAP / Motion', level: 80 },
      { name: 'Three.js / GLSL', level: 70 },
      { name: 'Tailwind', level: 95 },
    ],
  },
  {
    name: 'Backend',
    tools: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    name: 'Design',
    tools: [
      { name: 'Figma', level: 90 },
      { name: 'تصوير منتج', level: 70 },
      { name: 'هوية بصرية', level: 85 },
    ],
  },
  {
    name: 'Ops',
    tools: [
      { name: 'SEO محلي', level: 85 },
      { name: 'أداء / Lighthouse', level: 95 },
      { name: 'نشر واستضافة', level: 80 },
    ],
  },
];

function Toolbox() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-line bg-ink-900 py-24 md:py-32" aria-label="الأدوات">
      {/* stack marquees */}
      <div className="border-b border-line">
        <Marquee duration={55} dir="ltr" className="flex h-[64px] items-center">
          {TECH_ROW.map((t) => (
            <span key={t} className="mx-8 shrink-0 font-grotesk text-lg tracking-[0.1em] text-cream-muted" dir="ltr">
              {t} <span className="text-gold-500/50">·</span>
            </span>
          ))}
        </Marquee>
        <Marquee duration={70} dir="rtl" className="flex h-[64px] items-center border-t border-line">
          {CRAFT_ROW.map((t) => (
            <span key={t} className="mx-8 shrink-0 font-amiri text-2xl text-cream/60">
              {t} <span className="text-gold-500/50">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* tool accordion */}
      <div className="container-atelier mt-20">
        <SectionHeading
          kicker="TOOLBOX"
          lines={[<span key="0" className="text-h2 text-cream">الأدوات اللي كنخدم بيهم</span>]}
          className="mb-12"
        />
        <div className="mx-auto max-w-3xl">
          {TOOL_CATEGORIES.map((cat, i) => {
            const isOpen = open === i;
            return (
              <div key={cat.name} className="border-t border-line last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-start"
                >
                  <span className={`font-plex text-xl font-semibold transition-colors ${isOpen ? 'text-gold-500' : 'text-cream group-hover:text-gold-400'}`}>
                    <span dir="ltr" lang="en">{cat.name}</span>
                  </span>
                  <Plus className={`h-5 w-5 text-gold-500 transition-transform duration-500 ease-luxe ${isOpen ? 'rotate-45' : ''}`} strokeWidth={1.25} />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-700 ease-luxe"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-col gap-4 pb-8">
                      {cat.tools.map((tool, j) => (
                        <li key={tool.name}>
                          <div className="flex items-baseline justify-between font-mono text-xs text-cream-muted">
                            <span dir="ltr">{tool.name}</span>
                            <span dir="ltr">{tool.level}%</span>
                          </div>
                          <div className="mt-2 h-px w-full bg-line">
                            <motion.div
                              className="h-full origin-right bg-gold-500"
                              initial={false}
                              animate={isOpen ? { scaleX: tool.level / 100 } : { scaleX: 0 }}
                              transition={{ duration: 1, delay: isOpen ? 0.15 + j * 0.07 : 0, ease: EASE_LUXE }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B5 — facts + cities                                                 */
/* ------------------------------------------------------------------ */

function Fact({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-3xl text-gold-500 md:text-4xl" dir="ltr">
        {display}{suffix}
      </p>
      <p className="mt-2 text-sm text-cream-muted">{label}</p>
    </div>
  );
}

const FACTS = [
  { value: 6, suffix: '+', label: 'سنين خبرة' },
  { value: 30, suffix: '+', label: 'مشروع مسلّم' },
  { value: 98, suffix: '', label: 'متوسط Lighthouse' },
  { value: 24, suffix: 'h', label: 'أقصى وقت رد' },
];

const CITIES = [
  'CASABLANCA 33.57°N',
  'RABAT 34.02°N',
  'MARRAKECH 31.63°N',
  'FÈS 34.03°N',
  'TANGER 35.77°N',
  'AGADIR 30.42°N',
];

function FactsStrip() {
  return (
    <section className="container-atelier py-24 md:py-32" aria-label="أرقام ومدن">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {FACTS.map((f, i) => (
          <Fact key={f.label} {...f} delay={i * 0.1} />
        ))}
      </div>

      <motion.div
        className="hairline my-16 origin-right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: EASE_LUXE }}
      />

      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        {CITIES.map((city, i) => (
          <motion.li
            key={city}
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_LUXE }}
          >
            {i > 0 && (
              <svg viewBox="0 0 120 120" className="h-2.5 w-2.5 text-gold-500/50" fill="none" stroke="currentColor" strokeWidth="6" aria-hidden="true">
                <path d="M60 8 L72 48 L112 60 L72 72 L60 112 L48 72 L8 60 L48 48 Z" />
              </svg>
            )}
            <span className="cursor-default font-mono text-xs tracking-[0.15em] text-cream-faint transition-colors duration-300 hover:text-gold-400" dir="ltr">
              {city}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B6 — CTA                                                            */
/* ------------------------------------------------------------------ */

function AboutCta() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-900 py-32 md:py-48" aria-label="تواصل">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-spin-slow opacity-[0.03]"
        style={{
          backgroundImage: "url('/zellige-motif.svg')",
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
        }}
      />
      <div className="container-atelier relative flex flex-col items-center text-center">
        <p className="kicker mb-8 text-gold-500" dir="ltr" lang="fr">ET MAINTENANT ?</p>
        <h2 className="text-display-lg text-cream">
          <KineticText text="بغيتي نخدمو مع بعضياتنا؟" />
        </h2>
        <motion.p
          className="mt-4 font-cormorant text-[clamp(1.5rem,3vw,2.5rem)] italic text-gold-500"
          lang="fr"
          dir="ltr"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE_LUXE }}
        >
          Écrivons la suite.
        </motion.p>
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_LUXE }}
        >
          <MagneticButton radius={140} strength={10}>
            <Link
              to="/contact"
              className="block rounded-full bg-gold-500 px-12 py-6 font-plex text-lg font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              تواصل معايا ↗
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function About() {
  useEffect(() => {
    document.title = 'من أنا — أتيلييه';
    return () => {
      document.title = 'أتيلييه';
    };
  }, []);

  return (
    <>
      <AboutHero />
      <StoryPin />
      <Philosophy />
      <Toolbox />
      <FactsStrip />
      <AboutCta />
    </>
  );
}
