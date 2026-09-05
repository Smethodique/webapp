import { Marquee } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { Ornament } from './storeUtils';

interface Props {
  store: StorePageTheme;
}

/** S2 — bilingual ticker: tagline + service keywords, sector ornament separators. */
export default function StoreMarquee({ store }: Props) {
  const words = [store.tagline, ...store.services.slice(0, 5).map((s) => s.title)];
  return (
    <section aria-hidden className="border-y border-line/60 py-5" style={{ background: 'var(--store-surface-tint)' }}>
      <Marquee duration={40} dir={store.dir}>
        {words.map((w, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap">
            <span
              className={`text-xl md:text-2xl ${i % 2 === 0 ? 'text-cream' : ''}`}
              style={{ fontFamily: 'var(--font-display)', color: i % 2 === 0 ? undefined : 'var(--store-primary)' }}
            >
              {w}
            </span>
            <Ornament className="text-sm" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
