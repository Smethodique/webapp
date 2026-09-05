import { motion } from 'framer-motion';
import { scrollToTarget } from '@/hooks/useLenis';
import type { StorePageTheme } from '@/data/stores';
import { EASE_LUXE, t } from './storeUtils';

interface Props {
  store: StorePageTheme;
}

/** S9 — Store footer: wordmark, anchors, socials, mono meta + ATELIER credit. */
export default function StoreFooter({ store }: Props) {
  const anchors: { id: string; label: string }[] = [
    { id: '#store-story', label: t(store, 'story') },
    { id: '#store-menu', label: t(store, 'menu') },
    { id: '#store-gallery', label: t(store, 'gallery') },
    { id: '#store-booking', label: t(store, 'booking') },
  ];

  return (
    <motion.footer
      className="border-t py-16"
      style={{ borderColor: 'color-mix(in srgb, var(--store-primary) 30%, transparent)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE_LUXE }}
    >
      <div className="container-atelier grid gap-12 md:grid-cols-4">
        <div>
          <p className="m-0 text-3xl text-cream" style={{ fontFamily: 'var(--font-display)' }}>
            {store.dir === 'rtl' ? store.nameAr : store.name}
          </p>
          <p className="mt-1 font-mono text-xs text-cream-faint" dir="ltr">
            {store.dir === 'rtl' ? store.name : store.nameAr}
          </p>
          <p className="mt-4 max-w-[30ch] text-sm text-cream-muted">{store.tagline}</p>
        </div>

        <nav aria-label={t(store, 'footerNav')}>
          <p className="kicker mb-5 text-cream-faint" dir="ltr">
            {t(store, 'footerNav')}
          </p>
          <ul className="m-0 list-none space-y-3 p-0">
            {anchors.map((a) => (
              <li key={a.id}>
                <button onClick={() => scrollToTarget(a.id)} className="gold-link text-sm text-cream-muted transition-colors hover:text-cream">
                  {a.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kicker mb-5 text-cream-faint" dir="ltr">
            {t(store, 'footerContact')}
          </p>
          <ul className="m-0 list-none space-y-3 p-0">
            {store.instagram && (
              <li>
                <a href={store.instagram} target="_blank" rel="noreferrer" className="gold-link text-sm text-cream-muted transition-colors hover:text-cream" dir="ltr">
                  Instagram ↗
                </a>
              </li>
            )}
            {store.phone && (
              <li>
                <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="gold-link font-mono text-sm text-cream-muted transition-colors hover:text-cream" dir="ltr">
                  {store.phone}
                </a>
              </li>
            )}
            {(store.whatsapp ?? store.phone) && (
              <li>
                <a
                  href={`https://wa.me/${(store.whatsapp ?? store.phone ?? '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-link text-sm text-cream-muted transition-colors hover:text-cream"
                >
                  WhatsApp ↗
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="font-mono text-xs leading-relaxed text-cream-faint">
          <p className="m-0">{store.address}</p>
          <p className="mb-0 mt-4" dir="ltr">
            © 2025 {store.name} — {store.city}
          </p>
        </div>
      </div>

      <div className="container-atelier mt-14 border-t border-line/40 pt-6">
        <p className="m-0 text-center font-mono text-[0.75rem] text-cream-faint">
          {t(store, 'credit')} —{' '}
          <a href="/" className="gold-link transition-colors hover:text-cream" dir="ltr">
            by ATELIER ↗
          </a>
        </p>
      </div>
    </motion.footer>
  );
}
