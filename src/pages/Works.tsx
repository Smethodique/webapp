import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { ArrowUpLeft } from 'lucide-react';
import { KineticText, MagneticButton, SectionHeading } from '@/components/motion';
import { STORE_WORKS } from '@/data/works';
import type { WorkEntry, WorkFilter } from '@/data/works';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_SNAP = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FILTERS: { key: WorkFilter; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'hospitality', label: 'ضيافة' },
  { key: 'beauty', label: 'أناقة وجمال' },
  { key: 'lifestyle', label: 'أسلوب حياة' },
  { key: 'identity', label: 'هوية رقمية' },
  { key: 'custom', label: 'تطوير مخصص' },
];

/* editorial broken-grid rhythm: per 5 items —
   7-col tall / 5-col short offset / 5-col / 7-col tall / 12-col panorama */
const SLOT_WRAP = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-24',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-12',
];
const SLOT_MEDIA = [
  'aspect-[4/5] sm:aspect-square lg:aspect-[4/5]',
  'aspect-[4/5] sm:aspect-square',
  'aspect-[4/5] sm:aspect-square',
  'aspect-[4/5] sm:aspect-square lg:aspect-[4/5]',
  'aspect-[4/5] sm:aspect-video lg:aspect-[21/9]',
];

/** Mono counter that counts up when it enters the viewport. */
function CountUp({ value, suffix = '', duration = 1.2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} dir="ltr" className="font-mono">
      {display}
      {suffix}
    </span>
  );
}

function workHref(w: WorkEntry): string {
  return w.storeSlug ? `/stores/${w.storeSlug}` : '/';
}

/* ------------------------------------------------------------------ */
/* B1 — page header                                                    */
/* ------------------------------------------------------------------ */

function WorksHeader() {
  const storeCount = STORE_WORKS.filter((w) => w.storeSlug).length;
  const sectorCount = new Set(STORE_WORKS.filter((w) => w.storeSlug).map((w) => w.sector)).size;
  const cityCount = new Set(STORE_WORKS.map((w) => w.city)).size;

  return (
    <header className="container-atelier pt-48 pb-16 md:pb-24">
      <motion.p
        className="kicker text-gold-500"
        dir="ltr"
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: 1, letterSpacing: '0.28em' }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_LUXE }}
      >
        PORTFOLIO — الأرشيف الكامل
      </motion.p>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading
            as="h1"
            immediate
            baseDelay={0.4}
            lines={[<span key="0" className="text-display-lg text-cream">أعمال تتكلم</span>]}
          />
          <motion.p
            className="mt-4 font-cormorant text-[clamp(1.25rem,2.5vw,2rem)] italic text-gold-500"
            lang="fr"
            dir="ltr"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE_LUXE }}
          >
            chaque projet est une pièce unique.
          </motion.p>

          {/* meta counters */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm text-cream-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE_LUXE }}
          >
            <span><CountUp value={storeCount} suffix="+" /> متجراً</span>
            <span className="h-1 w-1 rounded-full bg-gold-500/60" aria-hidden="true" />
            <span><CountUp value={sectorCount} /> قطاعات</span>
            <span className="h-1 w-1 rounded-full bg-gold-500/60" aria-hidden="true" />
            <span><CountUp value={cityCount} /> مدينة</span>
          </motion.div>
        </div>

        <motion.p
          className="max-w-sm self-end text-cream-muted lg:col-span-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE_LUXE }}
        >
          من المقاهي المتخصصة إلى دور القفطان — كل مشروع يبدأ من قصة المحل، لا من قالب جاهز.
        </motion.p>
      </div>

      <motion.div
        className="hairline mt-16 origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: EASE_LUXE }}
      />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* B2 — filter bar + grid                                              */
/* ------------------------------------------------------------------ */

/**
 * Editorial catalog card: the store's own hero photo, a persistent index
 * numeral, and — on hover — an accent-colour wash revealing the store name,
 * city, sector and a direct "visit live site" affordance.
 */
function WorkCard({ work, index }: { work: WorkEntry; index: number }) {
  const slot = index % 5;
  const accent = work.accent ?? '#C9A227';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE_LUXE }}
      className={`col-span-12 sm:col-span-6 ${SLOT_WRAP[slot]}`}
    >
      <Link to={workHref(work)} className="group block" data-cursor="media" aria-label={`${work.title} — ${work.cityAr}`}>
        <div className={`relative overflow-hidden bg-ink-800 ${SLOT_MEDIA[slot]}`}>
          <img
            src={work.thumb}
            alt={work.title}
            loading="lazy"
            className="h-full w-full object-cover brightness-[0.94] transition-all duration-700 ease-luxe group-hover:scale-[1.06] group-hover:brightness-100"
          />
          {/* accent-colour wash, per store */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `linear-gradient(to top, ${accent}59 0%, ${accent}14 45%, transparent 75%)` }}
          />
          {/* hover reveal — name + city + sector + live link */}
          <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent p-6 opacity-0 transition-all duration-500 ease-luxe group-hover:opacity-100 md:p-8">
            <p
              className="translate-y-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-transform duration-500 ease-luxe group-hover:translate-y-0"
              dir="ltr"
              style={{ color: accent }}
            >
              {work.latin ?? work.title}
            </p>
            <h3 className="m-0 translate-y-4 font-amiri text-3xl font-bold leading-tight text-cream transition-transform duration-500 ease-luxe [transition-delay:60ms] group-hover:translate-y-0 md:text-4xl">
              {work.title}
            </h3>
            <p className="m-0 translate-y-4 text-sm text-cream-muted transition-transform duration-500 ease-luxe [transition-delay:120ms] group-hover:translate-y-0">
              {work.sectorTag} · {work.cityAr} — <span dir="ltr">{work.year}</span>
            </p>
            <span
              className="mt-3 inline-flex translate-y-4 items-center gap-2 rounded-full px-5 py-2 font-plex text-sm font-semibold text-ink-950 transition-transform duration-500 ease-luxe [transition-delay:180ms] group-hover:translate-y-0"
              style={{ background: accent }}
            >
              زيارة الموقع المباشر ↗
            </span>
          </div>
          {/* index numeral — subtle, always visible */}
          <span
            className="absolute start-4 top-4 rounded-full bg-ink-950/45 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-cream/85 backdrop-blur-sm transition-colors duration-500 group-hover:text-cream"
            dir="ltr"
          >
            N°{String(index + 1).padStart(2, '0')}
          </span>
        </div>
        {/* under-caption: latin name + mono meta */}
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="font-cormorant text-lg italic text-cream transition-colors group-hover:text-gold-400" dir="ltr" lang="fr">
            {work.latin ?? work.title}
          </span>
          <span className="font-mono text-[11px] text-cream-faint">
            {work.sectorTag} · {work.cityAr}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function WorksGrid({ filter, onReset }: { filter: WorkFilter; onReset: () => void }) {
  const items = useMemo(
    () => (filter === 'all' ? STORE_WORKS : STORE_WORKS.filter((w) => w.filters.includes(filter as Exclude<WorkFilter, 'all'>))),
    [filter]
  );

  if (items.length === 0) {
    return (
      <div className="container-atelier flex flex-col items-center gap-8 py-32 text-center">
        <p className="font-amiri text-3xl font-bold text-cream">لا يوجد أي مشروع في هذا القسم بعد</p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-line px-8 py-3 font-plex text-sm text-cream transition-colors hover:border-gold-500/40 hover:text-gold-400"
        >
          عرض كل الأعمال
        </button>
      </div>
    );
  }

  return (
    <div className="container-atelier py-16 md:py-20">
      <motion.div layout className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-y-16">
        <AnimatePresence mode="popLayout">
          {items.map((w, i) => (
            <WorkCard key={w.slug} work={w} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* B3 — sector bands                                                   */
/* ------------------------------------------------------------------ */

const SECTOR_BANDS = [
  {
    key: 'hospitality' as const,
    title: 'قطاع الضيافة',
    latin: 'HOSPITALITY',
    caption: '10 متاجر — مقاهٍ، مطاعم، حلويات',
    img: '/stores/heibai-coffee/hero.jpg',
    tint: 'rgba(201,111,74,0.14)',
  },
  {
    key: 'beauty' as const,
    title: 'قطاع الأناقة والجمال',
    latin: 'BEAUTY & ÉLÉGANCE',
    caption: '10 متاجر — قفطان، سبا، حلاقة',
    img: '/stores/miya-couture/hero.jpg',
    tint: 'rgba(110,20,35,0.22)',
  },
  {
    key: 'lifestyle' as const,
    title: 'قطاع أسلوب الحياة',
    latin: 'LIFESTYLE',
    caption: '10 متاجر — رياضة، ديكور، أعراس',
    img: '/stores/kriss-boxing/hero.jpg',
    tint: 'rgba(214,255,63,0.06)',
  },
];

function SectorBands({ onPick }: { onPick: (sector: WorkFilter) => void }) {
  return (
    <section aria-label="القطاعات" className="border-t border-line">
      {SECTOR_BANDS.map((band, i) => (
        <motion.button
          key={band.key}
          type="button"
          onClick={() => onPick(band.key)}
          data-cursor="media"
          initial={{ clipPath: 'inset(12% 6%)' }}
          whileInView={{ clipPath: 'inset(0% 0%)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: EASE_LUXE }}
          className="group relative block h-[40vh] w-full overflow-hidden border-b border-line text-start last:border-b-0"
          aria-label={`${band.title} — ${band.caption}`}
        >
          {/* background wash + image */}
          <div className="absolute inset-0" style={{ background: band.tint }} />
          <img
            src={band.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20 transition-all duration-[1200ms] ease-luxe group-hover:scale-[1.08] group-hover:opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink-950/80 via-ink-950/40 to-transparent" />

          {/* ghost numeral */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 end-6 select-none font-cormorant text-[10rem] font-light italic leading-none text-cream/[0.06] transition-transform duration-700 ease-luxe group-hover:translate-y-[-40px] md:text-[14rem]"
            dir="ltr"
          >
            {String(i + 1).padStart(2, '0')}
          </span>

          <div className="container-atelier relative flex h-full flex-col justify-center">
            <p className="kicker text-gold-500" dir="ltr" lang="fr">{band.latin}</p>
            <h3 className="text-h2 mt-4 text-cream transition-transform duration-700 ease-luxe group-hover:-translate-x-6">
              {band.title}
            </h3>
            <p className="mt-3 font-mono text-xs text-cream-muted">{band.caption}</p>
          </div>

          {/* arrow pill */}
          <span className="absolute end-8 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-plex text-sm text-gold-400 opacity-0 transition-all duration-500 ease-snap group-hover:opacity-100 md:flex">
            اكتشف القطاع
            <ArrowUpLeft className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </motion.button>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B4 — CTA                                                            */
/* ------------------------------------------------------------------ */

function WorksCta() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-32 md:py-48" aria-label="ابدأ مشروعك">
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
        <p className="kicker mb-8 text-gold-500" dir="ltr" lang="fr">NEXT — À VOUS</p>
        <h2 className="text-display-lg text-cream">
          <KineticText text="مشروعك القادم يبدأ من هنا" />
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
          À vous.
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
              احجز مكالمة مجانية ↗
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

export default function Works() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('sector') as WorkFilter | null;
  const filter: WorkFilter = raw && FILTERS.some((f) => f.key === raw) ? raw : 'all';
  const gridRef = useRef<HTMLDivElement>(null);

  const setFilter = (f: WorkFilter) => {
    setSearchParams(f === 'all' ? {} : { sector: f }, { preventScrollReset: true });
  };

  const pickFromBand = (sector: WorkFilter) => {
    setFilter(sector);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const visibleCount = filter === 'all'
    ? STORE_WORKS.length
    : STORE_WORKS.filter((w) => w.filters.includes(filter as Exclude<WorkFilter, 'all'>)).length;

  useEffect(() => {
    document.title = 'الأعمال — أتيلييه';
    return () => {
      document.title = 'أتيلييه';
    };
  }, []);

  return (
    <>
      <WorksHeader />

      {/* sticky filter bar */}
      <div ref={gridRef} className="sticky top-[72px] z-40 border-b border-line bg-ink-950/80 backdrop-blur-[12px]">
        <div className="container-atelier flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="تصفية الأعمال">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.key)}
                  className={`relative rounded-full px-5 py-2 font-plex text-sm transition-colors duration-300 ${
                    active ? 'text-ink-950' : 'border border-line text-cream-muted hover:border-gold-500/40 hover:text-gold-400'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="works-filter-blob"
                      className="absolute inset-0 rounded-full bg-gold-500"
                      transition={{ duration: 0.45, ease: EASE_SNAP }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              );
            })}
          </div>
          <span className="font-mono text-xs text-cream-faint" dir="ltr">
            {String(visibleCount).padStart(2, '0')} / {String(STORE_WORKS.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <WorksGrid filter={filter} onReset={() => setFilter('all')} />
      <SectorBands onPick={pickFromBand} />
      <WorksCta />
    </>
  );
}
