import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/motion';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TESTIMONIALS = [
  {
    quote: 'الموقع اللي صاوب ليا بدّل البيزنس ديالي. الزبناء كيحجزو أونلاين وولّات عندي لائحة انتظار.',
    name: 'ياسمين ب.',
    role: 'صاحبة سبا، الدار البيضاء',
    ltr: false,
  },
  {
    quote: "Service impeccable. Design digne d'une agence parisienne, à un prix marocain.",
    name: 'Karim E.',
    role: 'Restaurant, Tanger',
    ltr: true,
  },
  {
    quote: 'فهم بالضبط شنو بغيت: شي حاجة فاخرة بلا ما تكون معقّدة. النتيجة فاقت التوقعات.',
    name: 'سلمى ر.',
    role: 'دار قفطان، فاس',
    ltr: false,
  },
  {
    quote: 'من أول مكالمة حتى الإطلاق، كلشي كان واضح ومنظّم. أنصح بيه أي صاحب متجر.',
    name: 'مهدي ت.',
    role: 'نادي رياضي، مراكش',
    ltr: false,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = trackWrapRef.current;
      if (el) setDragLimit(Math.max(0, el.scrollWidth - el.clientWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  /* RTL: track slides toward +x */
  const cardW = 640 + 32;
  const x = active * cardW;

  return (
    <section id="testimonials" className="overflow-hidden bg-ink-950 py-24 md:py-32 lg:py-40" aria-label="آراء الزبناء">
      <div className="container-atelier">
        <SectionHeading
          kicker="TÉMOIGNAGES"
          lines={[<span key="0" className="text-h2 text-cream">شنو قالوا عليا</span>]}
          className="mb-16"
        />
      </div>

      <div
        ref={trackWrapRef}
        className="overflow-hidden"
        data-cursor="drag"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex cursor-grab gap-8 pe-[10vw] ps-[max(20px,5vw)] active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: dragLimit }}
          dragElastic={0.06}
          animate={{ x }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
          onDragStart={() => setPaused(true)}
          onDragEnd={() => setPaused(false)}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 60, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE_LUXE }}
              whileHover={{ y: -8 }}
              className="relative w-[85vw] max-w-[640px] shrink-0 border border-line bg-ink-800 p-10 transition-colors duration-300 hover:border-gold-500/40"
            >
              <span aria-hidden="true" className="absolute -top-6 start-8 font-amiri text-[6rem] leading-none text-gold-500/20">
                ”
              </span>
              <div className="mb-6 flex gap-1" aria-label="5 نجوم">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 + s * 0.08 }}
                  >
                    <Star className="h-4 w-4 fill-gold-500 text-gold-500" strokeWidth={1.25} />
                  </motion.span>
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-cream" dir={t.ltr ? 'ltr' : 'rtl'} lang={t.ltr ? 'fr' : 'ar'}>
                {t.quote}
              </blockquote>
              <figcaption className="mt-8">
                <span className="block font-plex font-semibold text-cream">{t.name}</span>
                <span className="mt-1 block font-mono text-xs text-cream-faint">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      {/* dash indicators */}
      <div className="container-atelier mt-10 flex gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`شهادة ${i + 1}`}
            className={`h-0.5 transition-all duration-500 ease-luxe ${active === i ? 'w-6 bg-gold-500' : 'w-2 bg-cream-faint/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
