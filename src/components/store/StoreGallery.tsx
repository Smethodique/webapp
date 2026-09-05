import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CurtainImage } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { EASE_LUXE, t } from './storeUtils';
import StoreSectionHead from './StoreSectionHead';

interface GalleryItem {
  src: string;
  caption?: string;
}

function Lightbox({
  items,
  index,
  onClose,
  onNav,
  counterDir,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
  counterDir: 'ltr' | 'rtl';
}) {
  const cur = items[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onNav((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, items.length, onClose, onNav]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.img
        key={cur.src}
        src={cur.src}
        alt={cur.caption ?? ''}
        className="max-h-[82dvh] max-w-[92vw] object-contain"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_LUXE }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-cream-muted" dir="ltr">
        {index + 1} / {items.length}
      </div>
      {cur.caption && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs text-cream-faint" dir={counterDir}>
          {cur.caption}
        </div>
      )}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-gold-500"
      >
        ✕
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav((index - 1 + items.length) % items.length); }}
        aria-label="Previous"
        className="absolute start-4 top-1/2 -translate-y-1/2 font-mono text-2xl text-cream-muted transition-colors hover:text-cream rtl:scale-x-[-1]"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav((index + 1) % items.length); }}
        aria-label="Next"
        className="absolute end-4 top-1/2 -translate-y-1/2 font-mono text-2xl text-cream-muted transition-colors hover:text-cream rtl:scale-x-[-1]"
      >
        →
      </button>
    </motion.div>
  );
}

/** S5 — Gallery: broken grid (editorial) / drag strip (immersive) / masonry (mosaic). */
export default function StoreGallery({ store }: { store: StorePageTheme }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);
  const variant = store.layoutVariant;

  const items: GalleryItem[] =
    variant === 'immersive'
      ? [{ src: store.heroImage, caption: store.name }, { src: store.aboutImage, caption: t(store, 'story') }, ...store.gallery]
      : store.gallery;

  const measure = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setDragLimit(Math.max(0, el.scrollWidth - el.clientWidth));
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const open = (i: number) => setLightbox(i);

  return (
    <section id="store-gallery" className="overflow-hidden py-24 md:py-32 lg:py-40">
      <div className={variant === 'immersive' ? '' : 'container-atelier'}>
        <div className={variant === 'immersive' ? 'container-atelier' : ''}>
          <StoreSectionHead index={5} kicker={t(store, 'galleryKicker')} title={t(store, 'gallery')} centered={variant === 'immersive'} />
        </div>

        {variant === 'editorial' && (
          /* broken grid: 7-col 4:5 · 5-col square offset · 12-col pano */
          <div className="grid gap-6 lg:grid-cols-12">
            {items[0] && (
              <button className="group relative text-start lg:col-span-7" onClick={() => open(0)}>
                <CurtainImage src={items[0].src} alt={items[0].caption ?? ''} className="aspect-[4/5] max-h-[640px] w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                <Caption text={items[0].caption} />
              </button>
            )}
            {items[1] && (
              <button className="group relative text-start lg:col-span-5 lg:mt-24" onClick={() => open(1)}>
                <CurtainImage src={items[1].src} alt={items[1].caption ?? ''} delay={0.15} className="aspect-square w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                <Caption text={items[1].caption} />
              </button>
            )}
            {items[2] && (
              <button className="group relative text-start lg:col-span-12" onClick={() => open(2)}>
                <CurtainImage src={items[2].src} alt={items[2].caption ?? ''} delay={0.2} className="aspect-[21/9] w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                <Caption text={items[2].caption} />
              </button>
            )}
          </div>
        )}

        {variant === 'immersive' && (
          <div ref={stripRef} className="w-full overflow-hidden">
            <motion.div
              className="flex w-max cursor-grab gap-6 px-[clamp(20px,5vw,80px)] active:cursor-grabbing"
              drag="x"
              dragConstraints={store.dir === 'rtl' ? { left: 0, right: dragLimit } : { left: -dragLimit, right: 0 }}
              dragElastic={0.06}
            >
              {items.map((g, i) => (
                <motion.figure
                  key={g.src + i}
                  className="m-0 w-[78vw] shrink-0 sm:w-[52vw] lg:w-[38vw]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_LUXE }}
                >
                  <button className="block w-full" onClick={() => open(i)} aria-label={g.caption}>
                    <img src={g.src} alt={g.caption ?? ''} loading="lazy" draggable={false} className="h-[52vh] w-full object-cover lg:h-[62vh]" />
                  </button>
                  {g.caption && <figcaption className="mt-3 font-mono text-xs text-cream-faint">{g.caption}</figcaption>}
                </motion.figure>
              ))}
            </motion.div>
          </div>
        )}

        {variant === 'mosaic' && (
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {items.map((g, i) => (
              <motion.button
                key={g.src + i}
                className="group block w-full text-start"
                onClick={() => open(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_LUXE }}
              >
                <div className="overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.caption ?? ''}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      i % 3 === 0 ? 'aspect-[4/5]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[3/4]'
                    }`}
                  />
                </div>
                {g.caption && <span className="mt-2 block font-mono text-xs text-cream-faint">{g.caption}</span>}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onNav={setLightbox} counterDir={store.dir} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="mt-3 block font-mono text-xs text-cream-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {text}
    </span>
  );
}
