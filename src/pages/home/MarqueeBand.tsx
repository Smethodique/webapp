import { Marquee } from '@/components/motion';

const ITEMS: { text: string; latin: boolean }[] = [
  { text: 'تصميم فاخر', latin: false },
  { text: 'برمجة نظيفة', latin: false },
  { text: 'SEO محلي', latin: false },
  { text: 'SAVOIR-FAIRE', latin: true },
  { text: 'حجز أونلاين', latin: false },
  { text: 'CRAFT', latin: true },
  { text: 'دعم مستمر', latin: false },
];

function Star() {
  return (
    <svg viewBox="0 0 120 120" className="mx-8 h-3 w-3 shrink-0 text-gold-500" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true">
      <path d="M60 8 L72 48 L112 60 L72 72 L60 112 L48 72 L8 60 L48 48 Z" />
    </svg>
  );
}

/** S2 — Bilingual marquee ticker band. */
export default function MarqueeBand() {
  return (
    <div className="relative z-10 border-y border-line bg-ink-950 shadow-[0_-40px_80px_rgba(0,0,0,0.6)]">
      <Marquee duration={45} dir="rtl" className="flex h-[72px] items-center">
        {ITEMS.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span
              className={
                item.latin
                  ? 'font-cormorant text-xl italic text-cream-muted'
                  : 'font-amiri text-2xl text-cream'
              }
              dir={item.latin ? 'ltr' : 'rtl'}
              lang={item.latin ? 'fr' : 'ar'}
            >
              {item.text}
            </span>
            <Star />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
