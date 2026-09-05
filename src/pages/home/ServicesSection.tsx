import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { SectionHeading } from '@/components/motion';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SERVICES = [
  {
    name: 'مواقع عرض للمتاجر',
    latin: 'Landing Pages',
    short: 'صفحة فاخرة تعرّف بمتجرك، معرض صور، حجز مباشر، خرائط.',
    desc: 'من الفكرة للنشر في 10 أيام. صفحة هبوط سينمائية كتحكي قصة المحل ديالك وكتحوّل الزائر لزبون: صور احترافية، حجز مباشر عبر واتساب أو فورم، وربط مع الخرائط.',
    deliverables: ['تصميم مخصص 100%', 'معرض صور + لايتبوكس', 'فورم حجز مباشر', 'ربط Google Maps', 'نسخة موبايل مثالية'],
    price: 'ابتداءً من 4.900 درهم',
  },
  {
    name: 'تصميم هوية رقمية',
    latin: 'Identité Digitale',
    short: 'ألوان، خطوط، صور، لغة بصرية كاملة.',
    desc: 'كتعكس شخصية المحل ديالك: باليت ألوان، خطوط عربية ولاتينية متناسقة، دليل استعمال، وقوالب جاهزة للسوشيال ميديا باش يبقى حضورك متسق في كل بلاصة.',
    deliverables: ['باليت ألوان + خطوط', 'دليل هوية PDF', 'قوالب سوشيال ميديا', 'أيقونات مخصصة'],
    price: 'ابتداءً من 3.500 درهم',
  },
  {
    name: 'تطوير ويب مخصص',
    latin: 'Développement Sur-Mesure',
    short: 'متاجر إلكترونية، أنظمة حجز، لوحات تحكم.',
    desc: 'React / Node بسرعة وأداء عالمي. من بوتيك أونلاين كاملة بنظام دفع، حتى نظام حجز طاولات أو حصص رياضية بلوحة تحكم ساهلة.',
    deliverables: ['متجر إلكتروني / نظام حجز', 'لوحة تحكم بالعربية', 'أداء 90+ في Lighthouse', 'استضافة ونشر'],
    price: 'حسب المشروع',
  },
  {
    name: 'SEO محلي + Google Maps',
    latin: 'SEO Local',
    short: 'يجيوك الزبناء من البحث.',
    desc: '"أحسن مقهى في الرباط" يجيبك نتا اللول. تحسين Google Business Profile، كلمات مفتاحية محلية بالعربية والفرنسية، وسرعة تحميل كترفع ترتيبك.',
    deliverables: ['تهيئة Google Business', 'كلمات مفتاحية محلية', 'Schema markup', 'تقرير شهري'],
    price: 'ابتداءً من 1.200 درهم/شهر',
  },
];

export default function ServicesSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="bg-ink-950 py-24 md:py-32 lg:py-40" aria-label="الخدمات">
      <div className="container-atelier">
        <SectionHeading
          kicker="SERVICES"
          lines={[<span key="0" className="text-h2 text-cream">شنو كنقدملك</span>]}
          className="mb-16"
        />

        <div>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE_LUXE }}
                className="border-t border-line last:border-b"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-8 text-start"
                >
                  <span className="font-mono text-sm text-gold-500" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className={`block font-amiri text-2xl font-bold transition-all duration-300 ease-luxe group-hover:-translate-x-3 group-hover:text-gold-500 md:text-4xl ${isOpen ? 'text-gold-500' : 'text-cream'}`}>
                      {s.name}
                    </span>
                    <span className="mt-1 block text-sm text-cream-muted">{s.short}</span>
                  </span>
                  <Plus
                    className={`h-6 w-6 text-gold-500 transition-transform duration-500 ease-luxe ${isOpen ? 'rotate-45' : ''}`}
                    strokeWidth={1.25}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-700 ease-luxe"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-10 pb-10 md:grid-cols-2">
                      <div>
                        <p className="max-w-md leading-relaxed text-cream-muted">{s.desc}</p>
                        <p className="mt-6 font-mono text-sm text-gold-400">{s.price}</p>
                        <p className="mt-1 font-grotesk text-[10px] uppercase tracking-[0.28em] text-cream-faint" dir="ltr" lang="fr">
                          {s.latin}
                        </p>
                      </div>
                      <ul className="flex flex-col gap-3">
                        {s.deliverables.map((d, j) => (
                          <motion.li
                            key={d}
                            initial={false}
                            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.5, delay: isOpen ? 0.15 + j * 0.06 : 0 }}
                            className="flex items-center gap-3 text-sm text-cream"
                          >
                            <Check className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                            {d}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
