import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme, StoreReview } from '@/data/stores';
import { EASE_LUXE, t } from './storeUtils';
import StoreSectionHead from './StoreSectionHead';

interface Props {
  store: StorePageTheme;
}

function Stars({ rating, primary }: { rating: number; primary: string }) {
  return (
    <span className="flex gap-1" aria-label={`${rating}/5`} dir="ltr">
      {[1, 2, 3, 4, 5].map((s) => (
        <motion.span
          key={s}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: s * 0.08 }}
          style={{ color: s <= rating ? primary : 'var(--text-faint)' }}
        >
          ★
        </motion.span>
      ))}
    </span>
  );
}

function ReviewCard({ review, i, big }: { review: StoreReview; i: number; big?: boolean }) {
  return (
    <motion.figure
      className="m-0 border border-line/60 p-7"
      style={{ background: 'var(--store-surface, rgba(26,26,36,0.5))' }}
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_LUXE }}
    >
      <div className="mb-4 leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--store-primary)', opacity: 0.35 }} aria-hidden>
        ”
      </div>
      <blockquote className={`m-0 text-cream ${big ? 'text-xl md:text-2xl' : ''}`} style={{ fontFamily: big ? 'var(--font-display)' : undefined }}>
        {review.text}
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-4">
        <span>
          <span className="block text-sm font-semibold text-cream">{review.author}</span>
          {review.source && (
            <span className="mt-1 inline-block rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cream-faint" dir="ltr">
              {review.source}
            </span>
          )}
        </span>
        <Stars rating={review.rating} primary="var(--store-primary)" />
      </figcaption>
    </motion.figure>
  );
}

/** S6 — Reviews: staggered columns / auto-rotating quote / 2-col grid. */
export default function StoreReviews({ store }: Props) {
  const variant = store.layoutVariant;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (variant !== 'immersive') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % store.reviews.length), 7000);
    return () => clearInterval(id);
  }, [variant, store.reviews.length]);

  return (
    <section id="store-reviews" className="py-24 md:py-32 lg:py-40" style={{ background: 'var(--store-surface-tint)' }}>
      <div className="container-atelier">
        <StoreSectionHead index={6} kicker={t(store, 'reviewsKicker')} title={t(store, 'reviews')} centered={variant === 'immersive'} />

        {variant === 'immersive' ? (
          <div className="mx-auto max-w-3xl text-center">
            <div className="relative min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  className="m-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6, ease: EASE_LUXE }}
                >
                  <p className="m-0 text-2xl leading-relaxed text-cream md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                    «{store.reviews[active].text}»
                  </p>
                  <footer className="mt-6 font-mono text-xs uppercase tracking-widest text-cream-faint">
                    {store.reviews[active].author}
                    {store.reviews[active].source ? ` · ${store.reviews[active].source}` : ''}
                  </footer>
                  <div className="mt-4 flex justify-center">
                    <Stars rating={store.reviews[active].rating} primary="var(--store-primary)" />
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {store.reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Review ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: i === active ? 28 : 10, background: i === active ? 'var(--store-primary)' : 'var(--line)' }}
                />
              ))}
            </div>
          </div>
        ) : variant === 'editorial' ? (
          <div className="grid gap-6 md:grid-cols-3">
            {store.reviews.map((r, i) => (
              <div key={r.author + i} className={i === 1 ? 'md:mt-12' : ''}>
                <ReviewCard review={r} i={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {store.reviews.map((r, i) => (
              <ReviewCard key={r.author + i} review={r} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
