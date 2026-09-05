import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KineticText, MagneticButton } from '@/components/motion';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** S7 — Final contact CTA with rotating zellige ornament. */
export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-32 md:py-48" aria-label="تواصل معنا">
      {/* rotating zellige ornament, radially masked */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-spin-slow opacity-[0.03]"
        style={{
          backgroundImage: "url('/zellige-motif.svg')",
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      <div className="container-atelier relative flex flex-col items-center text-center">
        <p className="kicker mb-8 text-gold-500" dir="ltr" lang="fr">PRÊT ?</p>

        <h2 className="text-display-xl text-cream">
          <KineticText text="عندك متجر؟" />
        </h2>
        <motion.p
          className="mt-4 font-cormorant text-[clamp(1.5rem,3.5vw,3rem)] italic text-gold-500"
          lang="fr"
          dir="ltr"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE_LUXE }}
        >
          Parlons-en.
        </motion.p>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_LUXE }}
        >
          <MagneticButton radius={140} strength={10}>
            <Link
              to="/contact"
              className="block animate-[glow-pulse_2.4s_ease-in-out_infinite_alternate] rounded-full bg-gold-500 px-12 py-6 font-plex text-lg font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              احجز مكالمة مجانية ↗
            </Link>
          </MagneticButton>
        </motion.div>

        <p className="mt-10 font-mono text-xs text-cream-faint">
          <span dir="ltr">response@atelier.ma</span> — كنجاوب في أقل من 24 ساعة
        </p>
      </div>
    </section>
  );
}
