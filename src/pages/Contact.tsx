import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Globe, Instagram, Linkedin, MapPin, Plus } from 'lucide-react';
import { SectionHeading } from '@/components/motion';

const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_SNAP = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Status = 'idle' | 'loading' | 'success' | 'error' | 'demo';

const SECTORS = ['ضيافة', 'أناقة وجمال', 'لايف ستايل', 'أخرى'];
const CITIES = ['الدار البيضاء', 'الرباط', 'مراكش', 'فاس', 'طنجة', 'أكادير', 'مدينة أخرى'];
const PROJECT_TYPES = ['موقع عرض', 'متجر إلكتروني', 'حجز أونلاين', 'هوية بصرية', 'SEO', 'مازال ما عارفش'];
const BUDGETS = ['أقل من 5.000', '5.000 – 10.000', '10.000 – 25.000', '+25.000 درهم'];

const FAQ = [
  { q: 'شحال كياخد الوقت؟', a: 'موقع عرض: 10–14 يوم. متجر إلكتروني: 3–5 أسابيع حسب الحجم.' },
  { q: 'شحال الثمن؟', a: 'مواقع العرض كتبدا من 4.900 درهم. العرض النهائي مكتوب ومفصّل قبل ما نبدا.' },
  { q: 'واش نقدر نبدّل المحتوى بوحدي؟', a: 'نعم، كل موقع كيجي بلوحة تحكم بسيطة + فيديو شرح بالدارجة.' },
  { q: 'شنو خاصني نوفر؟', a: 'غير الصور ديال المحل والمعلومات الأساسية. الباقي عليا.' },
  { q: 'واش كتخدم مع زبناء خارج المغرب؟', a: 'نعم، عن بعد بنفس الجودة (FR/EN متوفرة).' },
];

const SOCIALS = [
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://behance.net', label: 'Behance', Icon: Globe },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

function Field({ label, hint, error, children, htmlFor }: FieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE_LUXE }}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="font-plex text-sm font-medium text-cream">
          {label}
        </label>
        {hint && (
          <span className="font-mono text-[10px] text-cream-faint" dir="ltr" lang="fr">
            {hint}
          </span>
        )}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 font-mono text-xs text-error"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: [0, -4, 4, -4, 4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('hello@atelier.ma');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button type="button" onClick={copy} className="gold-link inline-flex items-center gap-2 font-mono text-sm text-cream hover:text-gold-400" dir="ltr">
      {copied ? <Check className="h-3.5 w-3.5 text-success" strokeWidth={1.5} /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />}
      {copied ? 'تم النسخ ✓' : 'hello@atelier.ma'}
    </button>
  );
}

function MapTeaser() {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href="https://maps.google.com/?q=Casablanca,Morocco"
      target="_blank"
      rel="noreferrer"
      className="group relative mt-6 block overflow-hidden border border-line"
      aria-label="افتح الموقع في خرائط جوجل"
      data-cursor="media"
    >
      {failed ? (
        <div className="flex aspect-[4/3] items-center justify-center bg-ink-900">
          <span className="font-mono text-xs text-cream-faint" dir="ltr">CASABLANCA — 33.5731° N, 7.5898° W</span>
        </div>
      ) : (
        <img
          src="/contact-map.jpg"
          alt="خريطة الدار البيضاء"
          loading="lazy"
          onError={() => setFailed(true)}
          className="aspect-[4/3] w-full object-cover brightness-75 transition-all duration-500 group-hover:brightness-100"
        />
      )}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-500 transition-transform duration-300 ease-snap group-hover:-translate-y-[calc(50%+6px)]">
        <MapPin className="h-8 w-8 drop-shadow-[0_0_12px_rgba(201,162,39,0.6)]" strokeWidth={1.25} />
      </span>
      <span className="absolute inset-0 bg-ink-950/30 transition-opacity duration-500 group-hover:opacity-0" aria-hidden="true" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* B2 — info panel (sticky)                                            */
/* ------------------------------------------------------------------ */

function InfoPanel() {
  return (
    <motion.aside
      className="lg:col-span-4 lg:col-start-9"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.3, ease: EASE_LUXE }}
    >
      <div className="lg:sticky lg:top-[120px]">
        <div className="border border-line bg-ink-800 p-10">
          <h2 className="kicker text-cream-faint" dir="ltr">DIRECT</h2>
          <div className="mt-6 flex flex-col gap-4">
            <CopyEmail />
            <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer" className="gold-link w-fit font-mono text-sm text-cream hover:text-gold-400" dir="ltr">
              +212 6 XX XX XX XX
            </a>
          </div>

          <div className="hairline my-8" />

          <h2 className="kicker text-cream-faint">التوفر</h2>
          <p className="mt-4 inline-flex items-center gap-2 font-plex text-sm text-gold-400">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-500" aria-hidden="true" />
            متاح من يناير ٢٠٢٥
          </p>
          <p className="mt-2 text-sm text-cream-muted">كنقبل جوج مشاريع في الشهر غير باش نضمن الجودة.</p>

          <div className="hairline my-8" />

          <h2 className="kicker text-cream-faint" dir="ltr">HOURS</h2>
          <table className="mt-4 w-full font-mono text-xs text-cream-muted">
            <tbody>
              <tr>
                <td className="py-1" dir="ltr">LUN–VEN</td>
                <td className="py-1 text-end" dir="ltr">09:00–18:00</td>
              </tr>
              <tr>
                <td className="py-1" dir="ltr">SAM</td>
                <td className="py-1 text-end" dir="ltr">10:00–14:00</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-1 font-mono text-[10px] text-cream-faint" dir="ltr">Africa/Casablanca</p>

          <div className="hairline my-8" />

          <div className="flex items-center gap-5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-cream-muted transition-colors hover:text-gold-400">
                <Icon className="h-5 w-5" strokeWidth={1.25} />
              </a>
            ))}
          </div>
        </div>

        <MapTeaser />
      </div>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/* B3 — FAQ                                                            */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-line py-24 md:py-32" aria-label="أسئلة كتعاود">
      <div className="container-atelier">
        <div className="mx-auto max-w-[800px]">
          <SectionHeading
            kicker="FAQ"
            lines={[<span key="0" className="text-h2 text-cream">قبل ما تسول…</span>]}
            className="mb-12"
          />
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                className="border-t border-line last:border-b"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_LUXE }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-start"
                >
                  <span className={`font-plex text-lg font-semibold transition-colors ${isOpen ? 'text-gold-500' : 'text-cream group-hover:text-gold-400'}`}>
                    {item.q}
                  </span>
                  <Plus className={`h-5 w-5 shrink-0 text-gold-500 transition-transform duration-500 ease-luxe ${isOpen ? 'rotate-45' : ''}`} strokeWidth={1.25} />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-luxe"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-cream-muted">{item.a}</p>
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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sector, setSector] = useState<string>(SECTORS[0]);
  const [types, setTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState(1);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    document.title = 'تواصل معايا — أتيلييه';
    return () => {
      document.title = 'أتيلييه';
    };
  }, []);

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    /* honeypot: silently accept bots without posting */
    if (typeof data.website === 'string' && data.website.length > 0) {
      setStatus('success');
      return;
    }

    /* validation */
    const next: Record<string, string> = {};
    if (!String(data.name ?? '').trim()) next.name = 'عافاك عمر هاد الخانة';
    if (!String(data.business ?? '').trim()) next.business = 'عافاك عمر هاد الخانة';
    const phone = String(data.phone ?? '').replace(/[\s-]/g, '');
    if (!phone) next.phone = 'عافاك عمر هاد الخانة';
    else if (!/^(06|07)\d{8}$/.test(phone)) next.phone = 'الرقم خاصو يبدا بـ 06 أو 07';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          business: data.business,
          sector,
          city: data.city,
          phone: `+212${phone.slice(1)}`,
          projectTypes: types,
          budget: BUDGETS[budget],
          message: data.message,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('demo');
    }
  };

  return (
    <>
      {/* B1 — header */}
      <header className="container-atelier pt-48 pb-16">
        <motion.p
          className="kicker text-gold-500"
          dir="ltr"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_LUXE }}
        >
          CONTACT — خلّينا نهضرو
        </motion.p>
        <h1 className="text-display-lg mt-8 text-cream">
          {['مكالمة 30 دقيقة،', null].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block will-change-transform"
                initial={{ y: '110%', rotate: 2 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: EASE_LUXE }}
              >
                {line ?? <>بلا التزام، <span className="text-gold-500">بلا ثمن.</span></>}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="text-lead mt-6 max-w-xl text-cream-muted"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_LUXE }}
        >
          حكي ليا على المتجر ديالك والهدف ديالك — وكنجاوبك في أقل من 24 ساعة بخطة وثمن واضحين.
        </motion.p>
        <motion.div
          className="hairline mt-14 origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE_LUXE }}
        />
      </header>

      {/* B2 — form + info panel */}
      <section className="container-atelier grid gap-16 py-16 md:py-24 lg:grid-cols-12" aria-label="نموذج التواصل">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className="flex flex-col items-center gap-6 border border-line bg-ink-800 px-8 py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.svg viewBox="0 0 120 120" className="h-16 w-16 text-gold-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <motion.path
                    d="M60 8 L72 48 L112 60 L72 72 L60 112 L48 72 L8 60 L48 48 Z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: EASE_LUXE }}
                  />
                </motion.svg>
                <h2 className="text-h2 text-cream">توصلت بطلبك ✓</h2>
                <p className="max-w-sm text-cream-muted">غادي نعاود نتاصل بيك في أقرب وقت. تحقق من الواتساب ديالك.</p>
                <Link
                  to="/"
                  className="mt-4 rounded-full border border-line px-8 py-3 font-plex text-sm text-cream transition-colors hover:border-gold-500/40 hover:text-gold-400"
                >
                  رجوع للرئيسية
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-10"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute h-0 w-0 opacity-0" />

                <Field label="الاسم الكامل" hint="Votre nom" error={errors.name} htmlFor="name">
                  <div className="field-line-wrap">
                    <input id="name" name="name" type="text" autoComplete="name" className="field-line" aria-invalid={!!errors.name} />
                  </div>
                </Field>

                <Field label="اسم المتجر / النشاط" hint="Nom du business" error={errors.business} htmlFor="business">
                  <div className="field-line-wrap">
                    <input id="business" name="business" type="text" autoComplete="organization" className="field-line" aria-invalid={!!errors.business} />
                  </div>
                </Field>

                {/* sector segmented pills */}
                <Field label="القطاع">
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="القطاع">
                    {SECTORS.map((s) => {
                      const active = sector === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setSector(s)}
                          className={`relative rounded-full px-5 py-2 font-plex text-sm transition-colors duration-300 ${
                            active ? 'text-ink-950' : 'border border-line text-cream-muted hover:border-gold-500/40 hover:text-gold-400'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="contact-sector-blob"
                              className="absolute inset-0 rounded-full bg-gold-500"
                              transition={{ duration: 0.45, ease: EASE_SNAP }}
                            />
                          )}
                          <span className="relative z-10">{s}</span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* city select */}
                <Field label="المدينة" htmlFor="city">
                  <div className="field-line-wrap">
                    <select id="city" name="city" className="field-line appearance-none bg-ink-950" defaultValue={CITIES[0]}>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </Field>

                {/* phone with +212 chip */}
                <Field label="رقم الهاتف / واتساب" hint="06 XX XX XX XX" error={errors.phone} htmlFor="phone">
                  <div className="field-line-wrap flex items-center gap-3">
                    <span className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-cream-muted" dir="ltr">+212</span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      autoComplete="tel"
                      placeholder="06 XX XX XX XX"
                      className="field-line text-start"
                      aria-invalid={!!errors.phone}
                    />
                  </div>
                </Field>

                {/* project types pill toggles */}
                <Field label="نوع المشروع">
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => {
                      const active = types.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleType(t)}
                          className={`rounded-full px-5 py-2 font-plex text-sm transition-all duration-300 ${
                            active
                              ? 'border border-gold-500 bg-gold-500/10 text-gold-400'
                              : 'border border-line text-cream-muted hover:border-gold-500/40 hover:text-gold-400'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* budget slider */}
                <Field label="الميزانية التقريبية">
                  <div className="pt-2">
                    <p className="mb-4 text-center font-mono text-sm text-gold-400">{BUDGETS[budget]}</p>
                    <input
                      type="range"
                      min={0}
                      max={3}
                      step={1}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-gold-500"
                      aria-label="الميزانية التقريبية"
                      aria-valuetext={BUDGETS[budget]}
                    />
                    <div className="mt-2 flex justify-between font-mono text-[10px] text-cream-faint">
                      <span dir="ltr">5K-</span>
                      <span dir="ltr">10K</span>
                      <span dir="ltr">25K</span>
                      <span dir="ltr">25K+</span>
                    </div>
                  </div>
                </Field>

                <Field label="حكي ليا على المشروع" htmlFor="message">
                  <div className="field-line-wrap">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="شنو كتبيع؟ شكون الزبناء ديالك؟ علاش دابا؟"
                      className="field-line resize-none"
                    />
                  </div>
                </Field>

                {/* error summary */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      className="border border-error/40 bg-error/10 px-5 py-3 font-mono text-sm text-error"
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: [0, -4, 4, -4, 4, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      role="alert"
                    >
                      {Object.keys(errors).length > 0
                        ? 'عافاك راجع الخانات المعلّمين بالحمر.'
                        : 'وقع خطأ فالإرسال — عاود المحاولة أو راسلني مباشرة على واتساب.'}
                    </motion.p>
                  )}
                  {status === 'demo' && (
                    <motion.p
                      className="border border-line bg-ink-800 px-5 py-3 font-mono text-sm text-cream-muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      وضع العرض: الخادم غير متاح حالياً — تواصل مباشرة عبر واتساب أو hello@atelier.ma.
                    </motion.p>
                  )}
                </AnimatePresence>

                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="relative w-full overflow-hidden rounded-full bg-gold-500 px-10 py-4 font-plex font-semibold text-ink-950 transition-all hover:bg-gold-400 disabled:opacity-70 md:w-auto"
                  >
                    {status === 'loading' ? 'كيتم الإرسال…' : 'أرسل الطلب ↗'}
                    {status === 'loading' && (
                      <motion.span
                        className="absolute bottom-0 start-0 h-px bg-ink-950"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </button>
                  <p className="mt-4 font-mono text-[11px] text-cream-faint">
                    ما كنتشارك حتى معلومة. كنجاوب في أقل من 24 ساعة.
                  </p>
                  <a
                    href="https://wa.me/212600000000"
                    target="_blank"
                    rel="noreferrer"
                    className="gold-link mt-4 inline-block font-plex text-sm text-gold-400 md:hidden"
                  >
                    ولا صيفط مباشرة فالواتساب ↗
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <InfoPanel />
      </section>

      <Faq />
    </>
  );
}
