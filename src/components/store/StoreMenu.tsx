import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme, StoreServiceItem } from '@/data/stores';
import { EASE_LUXE, EASE_SNAP, t } from './storeUtils';
import StoreSectionHead from './StoreSectionHead';

interface Props {
  store: StorePageTheme;
}

function Price({ children, chip }: { children: string; chip?: boolean }) {
  return chip ? (
    <span
      className="shrink-0 rounded-full px-3 py-1 font-mono text-sm"
      style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)' }}
      dir="ltr"
    >
      {children}
    </span>
  ) : (
    <span className="shrink-0 font-mono text-base transition-colors duration-300 group-hover:text-[var(--store-accent)]" style={{ color: 'var(--store-primary)' }} dir="auto">
      {children}
    </span>
  );
}

function Row({ item, i, compact }: { item: StoreServiceItem; i: number; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="group border-b border-line/60 transition-colors duration-300 hover:bg-[var(--store-surface-tint)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_LUXE }}
    >
      <button
        type="button"
        className={`flex w-full items-baseline justify-between gap-6 text-start ${compact ? 'py-3.5' : 'py-6'}`}
        onClick={() => item.note && setOpen((o) => !o)}
        aria-expanded={item.note ? open : undefined}
      >
        <span className="flex min-w-0 items-baseline gap-4">
          <span
            className={`${compact ? 'text-lg' : 'text-h3'} text-cream transition-transform duration-300 group-hover:-translate-x-0 group-hover:translate-x-0 rtl:group-hover:-translate-x-3 ltr:group-hover:translate-x-3`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {item.title}
          </span>
          {!compact && <span className="hidden text-sm text-cream-muted sm:inline">{item.desc}</span>}
        </span>
        {item.price && <Price chip={compact}>{item.price}</Price>}
      </button>
      {compact && <p className="m-0 -mt-2 pb-3 text-sm text-cream-muted">{item.desc}</p>}
      <AnimatePresence initial={false}>
        {item.note && open && (
          <motion.p
            className="m-0 overflow-hidden pb-4 font-mono text-xs text-cream-faint"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_SNAP }}
          >
            {item.note}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Card({ item, i }: { item: StoreServiceItem; i: number }) {
  return (
    <motion.div
      className="border-t-2 p-6 transition-transform duration-300 hover:-translate-y-1.5"
      style={{ borderColor: 'var(--store-primary)', background: 'var(--store-surface, rgba(26,26,36,0.6))' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_LUXE }}
    >
      <h3 className="m-0 text-h3 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
        {item.title}
      </h3>
      <p className="mb-4 mt-2 text-sm text-cream-muted">{item.desc}</p>
      {item.note && <p className="mb-3 font-mono text-xs text-cream-faint">{item.note}</p>}
      {item.price && (
        <span className="font-mono text-base" style={{ color: 'var(--store-primary)' }} dir="auto">
          {item.price}
        </span>
      )}
    </motion.div>
  );
}

/** S4 — Services / Menu with optional course tabs. */
export default function StoreMenu({ store }: Props) {
  const variant = store.layoutVariant;
  const tabs = store.menuTabs;
  const [tab, setTab] = useState<string | null>(tabs?.[0] ?? null);
  const items = tabs && tab ? store.services.filter((s) => s.group === tab) : store.services;

  return (
    <section id="store-menu" className="py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
      <div className="container-atelier">
        <StoreSectionHead index={4} kicker={t(store, 'menuKicker')} title={t(store, 'menu')} centered={variant === 'immersive'} />

        {tabs && (
          <div className={`mb-10 flex flex-wrap gap-2 ${variant === 'immersive' ? 'justify-center' : ''}`} role="tablist">
            {tabs.map((label) => (
              <button
                key={label}
                role="tab"
                aria-selected={tab === label}
                onClick={() => setTab(label)}
                className="relative rounded-full px-5 py-2 text-sm transition-colors duration-300"
                style={{ fontFamily: 'var(--font-body)', color: tab === label ? 'var(--store-on-primary)' : 'var(--text-muted)' }}
              >
                {tab === label && (
                  <motion.span
                    layoutId={`menu-tab-${store.slug}`}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--store-primary)' }}
                    transition={{ duration: 0.4, ease: EASE_SNAP }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab ?? 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {variant === 'immersive' ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <Card key={item.title} item={item} i={i} />
                ))}
              </div>
            ) : (
              <div className={variant === 'mosaic' ? 'grid gap-x-10 md:grid-cols-2' : ''}>
                {items.map((item, i) => (
                  <Row key={item.title} item={item} i={i} compact={variant === 'mosaic'} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
