import { motion } from 'framer-motion';
import { CurtainImage } from '@/components/motion';
import type { StorePageTheme } from '@/data/stores';
import { EASE_LUXE, t } from './storeUtils';
import StoreSectionHead from './StoreSectionHead';

interface Props {
  store: StorePageTheme;
}

function StoryText({ store }: { store: StorePageTheme }) {
  return (
    <div>
      <StoreSectionHead index={3} kicker={t(store, 'storyKicker')} title={store.story.title} centered={store.layoutVariant === 'immersive'} />
      <div className={`max-w-[720px] space-y-6 ${store.layoutVariant === 'immersive' ? 'mx-auto text-center' : ''}`}>
        {store.story.body.map((p, i) => (
          <motion.p
            key={i}
            className={i === 0 ? 'text-lead text-cream' : 'text-cream-muted'}
            initial={{ opacity: 0.15 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0, ease: EASE_LUXE }}
          >
            {p}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

function Quote({ store, band }: { store: StorePageTheme; band?: boolean }) {
  if (!store.story.quote) return null;
  const q = store.story.quote;
  return (
    <motion.blockquote
      className={
        band
          ? 'border-y border-line/60 py-14 text-center'
          : 'border-s-2 ps-6'
      }
      style={band ? undefined : { borderColor: 'var(--store-primary)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE_LUXE }}
    >
      <p
        className={`m-0 italic text-cream ${band ? 'mx-auto max-w-3xl text-2xl md:text-3xl' : 'text-xl'}`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        «{q.text}»
      </p>
      <footer className="mt-4 font-mono text-xs uppercase tracking-widest text-cream-faint" dir={store.dir === 'ltr' ? 'ltr' : undefined}>
        — {q.author}
      </footer>
    </motion.blockquote>
  );
}

/** S3 — Story section, 3 spatial variants. */
export default function StoreStory({ store }: Props) {
  const variant = store.layoutVariant;

  if (variant === 'immersive') {
    return (
      <section id="store-story" className="relative py-24 md:py-32 lg:py-40">
        {/* dimmed about.jpg band as background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <img src={store.aboutImage} alt="" className="h-full w-full object-cover opacity-[0.12]" loading="lazy" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(var(--store-bg, #0E0C0A) 0%, transparent 30%, transparent 70%, var(--store-bg, #0E0C0A) 100%)',
            }}
          />
        </div>
        <div className="container-atelier relative">
          <div className="mx-auto max-w-3xl">
            <StoryText store={store} />
          </div>
          <div className="mt-16">
            <Quote store={store} band />
          </div>
          <motion.div
            className="mx-auto mt-16 max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <CurtainImage src={store.aboutImage} alt={store.name} className="aspect-[4/5]" />
          </motion.div>
        </div>
      </section>
    );
  }

  if (variant === 'mosaic') {
    return (
      <section id="store-story" className="py-24 md:py-32 lg:py-40">
        <div className="container-atelier grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <StoryText store={store} />
            <div className="mt-10">
              <Quote store={store} />
            </div>
          </div>
          {/* mosaic tile cluster */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <CurtainImage src={store.aboutImage} alt={store.name} className="col-span-2 aspect-[4/5] max-h-[520px] w-full" />
            {store.gallery.slice(0, 2).map((g, i) => (
              <CurtainImage key={g.src} src={g.src} alt={g.caption ?? store.name} delay={0.15 * (i + 1)} className="aspect-square" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* editorial — asymmetric: text 5-col start, image 5-col end offset up */
  return (
    <section id="store-story" className="py-24 md:py-32 lg:py-40">
      <div className="container-atelier grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:col-start-1">
          <StoryText store={store} />
          <div className="mt-10">
            <Quote store={store} />
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8 lg:-mt-16">
          <div
            className="absolute -inset-3 border"
            style={{ borderColor: 'var(--store-accent)', opacity: 0.5 }}
            aria-hidden
          />
          <CurtainImage src={store.aboutImage} alt={store.name} className="relative aspect-[4/5]" />
        </div>
      </div>
    </section>
  );
}
