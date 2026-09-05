import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { scrollToTarget } from '@/hooks/useLenis';
import type { StorePageTheme } from '@/data/stores';
import { EASE_SNAP, readableOn, t } from './storeUtils';

interface Props {
  store: StorePageTheme;
}

/**
 * Per-store branded chrome: store wordmark (its own font pair), anchor links
 * to the page sections, and a booking CTA in the store accent color.
 * Fixed + glassy; slides away on scroll-down, returns on scroll-up.
 */
export default function StoreHeader({ store }: Props) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // hide only after leaving the hero top, and only when going down
        setHidden(y > 140 && y > lastY + 4);
        if (y < lastY - 4 || y <= 140) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const anchors: { id: string; label: string }[] = [
    { id: '#store-story', label: t(store, 'story') },
    { id: '#store-menu', label: t(store, 'menu') },
    { id: '#store-gallery', label: t(store, 'gallery') },
    { id: '#store-reviews', label: t(store, 'reviews') },
    { id: '#store-location', label: t(store, 'location') },
  ];

  const brand = store.dir === 'rtl' ? store.nameAr : store.name;
  const brandAlt = store.dir === 'rtl' ? store.name : store.nameAr;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: '-110%' }}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: EASE_SNAP }}
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--store-bg, #0E0C0A) 78%, transparent)'
          : 'linear-gradient(to bottom, rgba(6,5,4,0.62), rgba(6,5,4,0.25) 65%, transparent)',
        backdropFilter: scrolled ? 'blur(14px)' : undefined,
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : undefined,
        borderBottom: scrolled
          ? '1px solid color-mix(in srgb, var(--store-primary) 22%, transparent)'
          : '1px solid transparent',
      }}
    >
      <div className="container-atelier flex h-16 items-center justify-between gap-6 md:h-[72px]">
        {/* wordmark */}
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="group flex min-w-0 items-baseline gap-3 text-start"
          aria-label={brand}
        >
          <span
            className="truncate text-xl leading-none text-cream transition-colors md:text-2xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream, #F5F2EC)' }}
          >
            {brand}
          </span>
          <span
            className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 transition-opacity group-hover:opacity-100 sm:inline"
            dir="ltr"
            style={{ color: 'var(--store-accent)' }}
          >
            {brandAlt}
          </span>
        </button>

        {/* section anchors */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label={t(store, 'footerNav')}>
          {anchors.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => scrollToTarget(a.id)}
              className="store-header-link text-sm text-cream-muted transition-colors hover:text-cream"
            >
              {a.label}
            </button>
          ))}
        </nav>

        {/* booking CTA in the store accent */}
        <button
          type="button"
          onClick={() => scrollToTarget('#store-booking')}
          className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.04] md:px-7 md:py-3"
          style={{
            background: 'var(--store-accent)',
            color: readableOn(store.colors.accent),
            fontFamily: 'var(--font-body)',
            boxShadow: '0 0 0 1px color-mix(in srgb, var(--store-accent) 40%, transparent)',
          }}
        >
          {t(store, 'bookNow')}
        </button>
      </div>
    </motion.header>
  );
}
