import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { StorePageTheme } from '@/data/stores';
import { EASE_LUXE, openState, t } from './storeUtils';
import StoreSectionHead from './StoreSectionHead';

interface Props {
  store: StorePageTheme;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <motion.label
      className="block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE_LUXE }}
    >
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-cream-faint">{label}</span>
      <span className="field-line-wrap block">{children}</span>
      {error && (
        <motion.span
          className="mt-1 block font-mono text-xs text-error"
          initial={{ x: 0 }}
          animate={{ x: [0, -4, 4, -4, 0] }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.span>
      )}
    </motion.label>
  );
}

const inputCls =
  'field-line text-base placeholder:text-cream-faint focus:outline-none [color-scheme:dark]';

/** S7 — Booking / contact form → POST /api/booking. */
export default function StoreBooking({ store }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [guests, setGuests] = useState(2);
  const [typeIdx, setTypeIdx] = useState(0);
  const state = openState(store.hours);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const phone = String(fd.get('phone') ?? '').trim();
    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = t(store, 'fRequired');
    if (phone.length < 6) errs.phone = t(store, 'fRequired');
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeSlug: store.slug,
          sector: store.sector,
          name,
          phone,
          type: store.bookingTypes[typeIdx],
          date: String(fd.get('date') ?? ''),
          guests,
          notes: String(fd.get('notes') ?? ''),
          message: `[${store.name}] ${store.bookingTypes[typeIdx]} — ${String(fd.get('date') ?? '')} — ${guests} — ${String(fd.get('notes') ?? '')}`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const wa = store.whatsapp ?? store.phone;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="store-booking" className="py-24 md:py-32 lg:py-40">
      <div className="container-atelier">
        <StoreSectionHead index={7} kicker={t(store, 'bookingKicker')} title={t(store, 'booking')} />

        {store.reservationNote && (
          <motion.p
            className="mb-10 border border-line/60 px-5 py-3 font-mono text-xs text-cream-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {store.reservationNote}
          </motion.p>
        )}

        <div className="grid gap-14 lg:grid-cols-12">
          {/* form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  className="border border-line/60 p-10 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_LUXE }}
                >
                  <svg viewBox="0 0 120 120" className="mx-auto mb-6 h-20 w-20" fill="none" aria-hidden>
                    <motion.path
                      d="M60 8 L74 46 L112 46 L81 69 L92 108 L60 85 L28 108 L39 69 L8 46 L46 46 Z"
                      stroke="var(--store-primary)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                    />
                  </svg>
                  <h3 className="m-0 text-h3 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
                    {t(store, 'fSuccessTitle')}
                  </h3>
                  <p className="mt-3 text-cream-muted">{t(store, 'fSuccessBody')}</p>
                  {wa && (
                    <a
                      href={`https://wa.me/${wa.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-block rounded-full border border-line px-6 py-3 text-sm text-cream transition-colors hover:border-[var(--store-primary)]"
                    >
                      {t(store, 'whatsappCta')} ↗
                    </a>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <Field label={t(store, 'fName')} error={errors.name}>
                    <input name="name" type="text" required className={inputCls} autoComplete="name" />
                  </Field>
                  <Field label={t(store, 'fPhone')} error={errors.phone}>
                    <span className="flex items-center gap-3" dir="ltr">
                      <span className="font-mono text-sm text-cream-faint">+212</span>
                      <input name="phone" type="tel" required dir="ltr" className={inputCls} placeholder="6 00 00 00 00" autoComplete="tel" />
                    </span>
                  </Field>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field label={t(store, 'fType')}>
                      <select
                        className={`${inputCls} cursor-pointer appearance-none`}
                        value={typeIdx}
                        onChange={(e) => setTypeIdx(Number(e.target.value))}
                      >
                        {store.bookingTypes.map((b, i) => (
                          <option key={b} value={i} className="bg-ink-900">
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t(store, 'fDate')}>
                      <input name="date" type="date" min={today} className={`${inputCls} cursor-pointer`} />
                    </Field>
                  </div>
                  <Field label={t(store, 'fGuests')}>
                    <span className="flex items-center gap-5">
                      <button
                        type="button"
                        aria-label="-"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-[var(--store-primary)]"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-mono text-xl text-cream" dir="ltr">
                        {guests}
                      </span>
                      <button
                        type="button"
                        aria-label="+"
                        onClick={() => setGuests((g) => Math.min(20, g + 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-[var(--store-primary)]"
                      >
                        +
                      </button>
                    </span>
                  </Field>
                  <Field label={t(store, 'fNotes')}>
                    <textarea name="notes" rows={3} className={`${inputCls} resize-none`} />
                  </Field>

                  {status === 'error' && (
                    <motion.p className="font-mono text-sm text-error" initial={{ x: 0 }} animate={{ x: [0, -4, 4, -4, 0] }} transition={{ duration: 0.3 }}>
                      {t(store, 'fError')}
                    </motion.p>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="relative overflow-hidden rounded-full px-10 py-4 font-semibold disabled:opacity-70"
                      style={{ background: 'var(--store-primary)', color: 'var(--store-on-primary)', fontFamily: 'var(--font-body)' }}
                    >
                      {status === 'sending' ? t(store, 'fSending') : t(store, 'fSubmit')}
                      {status === 'sending' && (
                        <motion.span
                          className="absolute bottom-0 start-0 h-px w-full"
                          style={{ background: 'var(--store-on-primary)' }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: [0, 0.7, 0.3, 0.9] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* info card */}
          <motion.aside
            className="h-fit border border-line/60 p-8 lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9"
            style={{ background: 'var(--store-surface-tint)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE_LUXE }}
          >
            <h3 className="m-0 text-h3 text-cream" style={{ fontFamily: 'var(--font-display)' }}>
              {store.name}
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-cream-muted">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${state.open ? 'animate-pulse-dot' : ''}`}
                style={{ background: state.open ? 'var(--store-primary)' : 'var(--text-faint)' }}
              />
              {state.open ? t(store, 'openNow') : state.nextOpen ? `${t(store, 'opensAt')} ${state.nextOpen}` : t(store, 'closedNow')}
            </p>
            <div className="hairline my-6" />
            <p className="m-0 text-sm text-cream-muted">{t(store, 'confirmPromise')}</p>
            <div className="hairline my-6" />
            <div className="space-y-3">
              {store.phone && (
                <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="block font-mono text-sm text-cream transition-colors hover:text-[var(--store-primary)]" dir="ltr">
                  {store.phone}
                </a>
              )}
              {wa && (
                <a href={`https://wa.me/${wa.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="block font-mono text-sm text-cream transition-colors hover:text-[var(--store-primary)]">
                  WhatsApp ↗
                </a>
              )}
              {store.instagram && (
                <a href={store.instagram} target="_blank" rel="noreferrer" className="block font-mono text-sm text-cream transition-colors hover:text-[var(--store-primary)]" dir="ltr">
                  Instagram ↗
                </a>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
