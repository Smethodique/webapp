import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { EASE_LUXE, t } from './storeUtils';
import StoreSectionHead from './StoreSectionHead';

interface Props {
  store: StorePageTheme;
}

/** S8 — Map (dark-filtered embed) + hours table + directions. */
export default function StoreMapHours({ store }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, amount: 0.3 });
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`;

  return (
    <section id="store-location" className="py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
      <div className="container-atelier">
        <StoreSectionHead index={8} kicker={t(store, 'locationKicker')} title={t(store, 'location')} />
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            ref={mapRef}
            className="relative min-h-[360px] overflow-hidden border border-line/60"
            initial={{ clipPath: 'inset(8% 8% 8% 8%)' }}
            animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
            transition={{ duration: 1.1, ease: EASE_LUXE }}
          >
            <iframe
              title={`${store.name} — map`}
              src={`${mapsUrl}&output=embed`}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.3)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 hover:opacity-0"
              style={{ background: 'var(--store-surface-tint)' }}
              aria-hidden
            />
          </motion.div>

          <div>
            <div className="divide-y divide-line/60">
              {store.hours.map((h, i) => (
                <motion.div
                  key={h.days}
                  className="flex items-center justify-between py-4 font-mono text-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                >
                  <span className={h.closed ? 'text-cream-faint' : 'text-cream'}>{h.days}</span>
                  <span dir="ltr" style={{ color: h.closed ? 'var(--text-faint)' : 'var(--store-primary)' }}>
                    {h.closed ? t(store, 'closed') : h.time}
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="mt-8 text-cream-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {store.address}
            </motion.p>
            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full border border-line px-6 py-3 text-sm text-cream transition-colors hover:border-[var(--store-primary)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t(store, 'directions')}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
