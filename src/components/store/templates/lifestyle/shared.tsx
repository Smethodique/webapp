import type { CSSProperties, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { StorePageTheme } from '@/data/stores';
import {
  bodyFont,
  displayFont,
  storeBackground,
  storeSurface,
  EASE_LUXE,
  EASE_SNAP,
  t,
} from '../../storeUtils';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, EASE_LUXE, EASE_SNAP, t };

export const LUXE = EASE_LUXE;

/* ------------------------------------------------------------------ */
/* StoreShell — self-contained page wrapper: per-store CSS vars, brand */
/* background, sector texture overlay. Mirrors StorePage chrome so a   */
/* template renders a complete standalone page on its own.             */
/* ------------------------------------------------------------------ */
export function StoreShell({ store, children }: { store: StorePageTheme; children: ReactNode }) {
  const storeBg = storeBackground(store.colors.primary);
  const storeSurf = storeSurface(store.colors.primary);
  return (
    <div
      dir={store.dir}
      lang={store.lang}
      className="store-page"
      style={
        {
          '--store-primary': store.colors.primary,
          '--store-accent': store.colors.accent,
          '--store-surface-tint': store.surfaceTint,
          '--store-on-primary': store.onPrimary,
          '--store-bg': storeBg,
          '--store-surface': storeSurf,
          '--font-display': displayFont(store),
          '--font-body': bodyFont(store),
          background: `radial-gradient(130% 70% at 50% 0%, color-mix(in srgb, ${store.colors.primary} 10%, ${storeBg}) 0%, ${storeBg} 62%)`,
          backgroundColor: storeBg,
          fontFamily: 'var(--font-body)',
        } as CSSProperties
      }
    >
      {store.texture !== 'none' && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[5]"
          style={
            store.texture === 'zellige'
              ? {
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cpath d='M48 12 L54 42 L84 48 L54 54 L48 84 L42 54 L12 48 L42 42 Z' fill='none' stroke='${encodeURIComponent(
                    store.colors.primary,
                  )}' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
                  backgroundSize: '96px 96px',
                }
              : store.texture === 'scanlines'
                ? {
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 5px)',
                    opacity: 0.6,
                  }
                : {
                    backgroundImage: "url('/texture-grain.png')",
                    backgroundSize: '512px 512px',
                    opacity: 0.03,
                    mixBlendMode: 'overlay',
                  }
          }
        />
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Atoms                                                               */
/* ------------------------------------------------------------------ */

/** Section kicker row: hairline + Latin kicker + optional index. */
export function KickerRow({
  text,
  index,
  centered,
  className,
}: {
  text: string;
  index?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-6 flex items-center gap-4 ${centered ? 'justify-center' : ''} ${className ?? ''}`}>
      <span className="hairline w-10" style={{ background: 'var(--store-primary)' }} aria-hidden />
      <span className="kicker" style={{ color: 'var(--store-primary)' }} dir="ltr">
        {text}
      </span>
      {index && (
        <span className="font-mono text-xs text-cream-faint" dir="ltr">
          {index}
        </span>
      )}
    </div>
  );
}

/** 5-star rating row in the store primary color. */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex gap-1 ${className ?? ''}`} aria-label={`${rating}/5`} dir="ltr">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? 'var(--store-primary)' : 'var(--text-faint)' }}>
          ★
        </span>
      ))}
    </span>
  );
}

/** Roman numerals for gladiator-style numbered lists. */
export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/** WhatsApp / phone / instagram contact links column. */
export function ContactLinks({ store, className }: { store: StorePageTheme; className?: string }) {
  const wa = store.whatsapp ?? store.phone;
  return (
    <div className={`space-y-3 ${className ?? ''}`}>
      {store.phone && (
        <a
          href={`tel:${store.phone.replace(/\s/g, '')}`}
          className="block font-mono text-sm text-cream transition-colors hover:text-[var(--store-primary)]"
          dir="ltr"
        >
          {store.phone}
        </a>
      )}
      {wa && (
        <a
          href={`https://wa.me/${wa.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="block font-mono text-sm text-cream transition-colors hover:text-[var(--store-primary)]"
        >
          WhatsApp ↗
        </a>
      )}
      {store.instagram && (
        <a
          href={store.instagram}
          target="_blank"
          rel="noreferrer"
          className="block font-mono text-sm text-cream transition-colors hover:text-[var(--store-primary)]"
          dir="ltr"
        >
          Instagram ↗
        </a>
      )}
    </div>
  );
}

/** Dark-filtered Google Maps embed used by several templates. */
export function MapEmbed({ store, className }: { store: StorePageTheme; className?: string }) {
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`;
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <iframe
        title={`${store.name} — map`}
        src={`${mapsUrl}&output=embed`}
        className="absolute inset-0 h-full w-full"
        style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.3)' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

/** Hours table rows (hairline divided, store-primary times). */
export function HoursRows({ store }: { store: StorePageTheme }) {
  return (
    <div className="divide-y divide-line/60">
      {store.hours.map((h) => (
        <div key={h.days} className="flex items-center justify-between gap-4 py-4 font-mono text-sm">
          <span className="text-cream">{h.days}</span>
          <span dir="ltr" style={{ color: /مغلق|Fermé/i.test(h.time) ? 'var(--text-faint)' : 'var(--store-primary)' }}>
            {h.time}
          </span>
        </div>
      ))}
    </div>
  );
}
