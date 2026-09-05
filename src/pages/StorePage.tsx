import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getStoreTheme, isStorePageTheme } from '@/data/stores';
import type { StorePageTheme } from '@/data/stores';
import { displayFont, bodyFont, storeBackground, storeSurface } from '@/components/store/storeUtils';
import { useLenis } from '@/hooks/useLenis';
import StoreHeader from '@/components/store/StoreHeader';
import StoreHero from '@/components/store/StoreHero';
import StoreMarquee from '@/components/store/StoreMarquee';
import StoreStory from '@/components/store/StoreStory';
import StoreMenu from '@/components/store/StoreMenu';
import StoreGallery from '@/components/store/StoreGallery';
import StoreReviews from '@/components/store/StoreReviews';
import StoreBooking from '@/components/store/StoreBooking';
import StoreMapHours from '@/components/store/StoreMapHours';
import StoreFooter from '@/components/store/StoreFooter';
import { hospitalityTemplates } from '@/components/store/templates/hospitality';
import { beautyTemplates } from '@/components/store/templates/beauty';
import { lifestyleTemplates } from '@/components/store/templates/lifestyle';

/* 30 unique per-store templates — each store gets its own bespoke design */
const STORE_TEMPLATES: Record<string, React.ComponentType<{ store: StorePageTheme }>> = {
  ...hospitalityTemplates,
  ...beautyTemplates,
  ...lifestyleTemplates,
};

const DOW_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function buildJsonLd(store: StorePageTheme) {
  const openingHours = store.hours
    .filter((h) => !h.closed && h.dow?.length)
    .map((h) => {
      const m = h.time.match(/(\d{1,2})[:h](\d{2})\s*[–-]\s*(\d{1,2})[:h](\d{2})/);
      if (!m) return null;
      const days = [...(h.dow ?? [])].sort((a, b) => a - b).map((d) => DOW_SHORT[d]).join(',');
      return `${days} ${m[1].padStart(2, '0')}:${m[2]}-${m[3].padStart(2, '0')}:${m[4]}`;
    })
    .filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': store.jsonLdType,
    name: store.name,
    alternateName: store.nameAr,
    description: store.heroSub,
    image: store.heroImage,
    address: { '@type': 'PostalAddress', streetAddress: store.address, addressLocality: store.city, addressCountry: 'MA' },
    ...(store.phone ? { telephone: store.phone } : {}),
    ...(openingHours.length ? { openingHours } : {}),
    ...(store.instagram ? { sameAs: [store.instagram] } : {}),
    priceRange: store.jsonLdType === 'CafeOrCoffeeShop' ? '$$' : store.jsonLdType === 'Bakery' ? '$$' : '$$$',
    servesCuisine:
      store.jsonLdType === 'CafeOrCoffeeShop' ? 'Specialty Coffee' : store.jsonLdType === 'Bakery' ? 'Pâtisserie' : undefined,
  };
}

export default function StorePage() {
  const { slug } = useParams<{ slug: string }>();
  // Registry (src/data/stores/index.ts) normalizes all sector configs — flat
  // hospitality plus nested beauty/lifestyle — into renderable StorePageThemes.
  const store = useMemo(() => {
    const theme = getStoreTheme(slug);
    return isStorePageTheme(theme) ? theme : undefined;
  }, [slug]);

  /* standalone page: own smooth-scroll + scroll reset on store switch */
  useLenis();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* document language / direction / SEO */
  useEffect(() => {
    if (!store) return;
    const html = document.documentElement;
    const prevDir = html.dir;
    const prevLang = html.lang;
    const prevTitle = document.title;
    html.dir = store.dir;
    html.lang = store.lang;
    document.title = `${store.name} — ${store.tagline} | ${store.city}`;

    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = store.heroSub;
    document.head.appendChild(meta);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify(buildJsonLd(store));
    document.head.appendChild(ld);

    return () => {
      html.dir = prevDir || 'rtl';
      html.lang = prevLang || 'ar';
      document.title = prevTitle;
      meta.remove();
      ld.remove();
    };
  }, [store]);

  if (!store) {
    return (
      <section className="container-atelier flex min-h-[70dvh] flex-col items-center justify-center gap-6 text-center">
        <p className="kicker text-gold-500" dir="ltr">
          STORE — 404
        </p>
        <h1 className="text-display-lg text-cream">المتجر غير موجود</h1>
        <p className="max-w-md text-cream-muted">
          لم نعثر على المتجر «<span dir="ltr">{slug}</span>». جرّب لاحقاً أو عد للرئيسية.
        </p>
      </section>
    );
  }

  const storeBg = storeBackground(store.colors.primary);
  const storeSurf = storeSurface(store.colors.primary);
  const Template = slug ? STORE_TEMPLATES[slug] : undefined;

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
        } as React.CSSProperties
      }
    >
      {/* per-store branded chrome (bespoke templates render their own header) */}
      {!Template && <StoreHeader store={store} />}
      {/* sector texture overlay */}
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

      {Template ? (
        /* bespoke per-store template — full unique design */
        <Template store={store} />
      ) : (
        <>
          {/* S1 — Hero */}
          <StoreHero store={store} />
          {/* S2 — Intro marquee */}
          <StoreMarquee store={store} />
          {/* S3 — Story */}
          <StoreStory store={store} />
          {/* S4 — Services / Menu */}
          <StoreMenu store={store} />
          {/* S5 — Gallery */}
          <StoreGallery store={store} />
          {/* S6 — Reviews */}
          <StoreReviews store={store} />
          {/* S7 — Booking */}
          <StoreBooking store={store} />
          {/* S8 — Map & Hours */}
          <StoreMapHours store={store} />
          {/* S9 — Footer */}
          <StoreFooter store={store} />
        </>
      )}
    </div>
  );
}
