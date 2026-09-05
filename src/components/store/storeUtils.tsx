import type { StorePageTheme, StoreHoursRow } from '@/data/stores';

export const EASE_LUXE = [0.22, 1, 0.36, 1] as [number, number, number, number];
export const EASE_SNAP = [0.16, 1, 0.3, 1] as [number, number, number, number];

const DISPLAY_FONTS: Record<string, string> = {
  Amiri: "'Amiri', serif",
  'Cormorant Garamond': "'Cormorant Garamond', serif",
  Anton: "'Anton', sans-serif",
  'Aref Ruqaa': "'Aref Ruqaa', serif",
};
const BODY_FONTS: Record<string, string> = {
  'IBM Plex Sans Arabic': "'IBM Plex Sans Arabic', sans-serif",
  'IBM Plex Sans': "'IBM Plex Sans', 'IBM Plex Sans Arabic', sans-serif",
  'Space Grotesk': "'Space Grotesk', monospace",
};

export function displayFont(store: StorePageTheme) {
  return DISPLAY_FONTS[store.fontPair.display] ?? "'Amiri', serif";
}
export function bodyFont(store: StorePageTheme) {
  return BODY_FONTS[store.fontPair.body] ?? "'IBM Plex Sans Arabic', sans-serif";
}

/* ------------------------------------------------------------------ */
/* Per-store page surfaces — derive a dark, hue-tinted background and   */
/* elevated surface from the store's primary color so each store reads  */
/* as its own site (espresso brown, bordeaux, volt-black, …).           */
/* ------------------------------------------------------------------ */

function hexToHsl(hex: string): [number, number, number] | null {
  const h = hex.trim().replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const v = parseInt(full, 16);
  const r = ((v >> 16) & 255) / 255;
  const g = ((v >> 8) & 255) / 255;
  const b = (v & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue = 0;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) hue = ((b - r) / d + 2) * 60;
  else hue = ((r - g) / d + 4) * 60;
  return [hue, s * 100, l * 100];
}

/** Very dark background carrying the hue of the store primary color. */
export function storeBackground(primary: string): string {
  const hsl = hexToHsl(primary);
  if (!hsl) return '#0E0C0A';
  const [h, s] = hsl;
  // keep a whisper of the hue: enough to read as "this brand", never loud
  const sat = Math.min(Math.max(s * 0.38, 10), 42);
  return `hsl(${Math.round(h)} ${Math.round(sat)}% 5.5%)`;
}

/** Slightly elevated surface for cards/chips on the tinted background. */
export function storeSurface(primary: string): string {
  const hsl = hexToHsl(primary);
  if (!hsl) return '#171310';
  const [h, s] = hsl;
  const sat = Math.min(Math.max(s * 0.34, 9), 36);
  return `hsl(${Math.round(h)} ${Math.round(sat)}% 9.5%)`;
}

/** Readable foreground (cream or near-black) for an arbitrary hex fill. */
export function readableOn(hex: string): string {
  const h = hex.trim().replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return '#F5F2EC';
  const v = parseInt(full, 16);
  const r = (v >> 16) & 255;
  const g = (v >> 8) & 255;
  const b = v & 255;
  // WCAG relative luminance approximation
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.45 ? '#17130E' : '#F7F3EC';
}

/** Bilingual microcopy for the store template chrome. */
const T = {
  bookNow: { ar: 'احجز الآن', fr: 'Réserver' },
  discover: { ar: 'اكتشف المزيد', fr: 'Découvrir' },
  story: { ar: 'القصة', fr: 'Notre histoire' },
  storyKicker: { ar: 'NOTRE HISTOIRE', fr: 'NOTRE HISTOIRE' },
  menu: { ar: 'القائمة', fr: 'La carte' },
  menuKicker: { ar: 'LA CARTE', fr: 'LA CARTE' },
  gallery: { ar: 'المعرض', fr: 'Galerie' },
  galleryKicker: { ar: 'GALERIE', fr: 'GALERIE' },
  reviews: { ar: 'آراء الزبناء', fr: 'Avis' },
  reviewsKicker: { ar: 'AVIS', fr: 'AVIS' },
  reviewsNote: { ar: 'من زوّار حقيقيين', fr: 'de visiteurs vérifiés' },
  booking: { ar: 'احجز طاولتك', fr: 'Réservez votre table' },
  bookingKicker: { ar: 'RÉSERVATION', fr: 'RÉSERVATION' },
  location: { ar: 'الموقع والأوقات', fr: 'Adresse & horaires' },
  locationKicker: { ar: 'INFOS PRATIQUES', fr: 'INFOS PRATIQUES' },
  directions: { ar: 'الاتجاهات ↗', fr: 'Itinéraire ↗' },
  closed: { ar: 'مغلق', fr: 'Fermé' },
  openNow: { ar: 'مفتوح الآن', fr: 'Ouvert' },
  closedNow: { ar: 'مغلق حالياً', fr: 'Fermé actuellement' },
  opensAt: { ar: 'يُفتح على', fr: 'Ouvre à' },
  confirmPromise: {
    ar: 'كنأكدو الحجز في أقل من ساعة خلال أوقات العمل.',
    fr: 'Nous confirmons votre réservation en moins d\u2019une heure pendant les horaires d\u2019ouverture.',
  },
  fName: { ar: 'الاسم', fr: 'Nom' },
  fPhone: { ar: 'الهاتف / واتساب', fr: 'Téléphone / WhatsApp' },
  fType: { ar: 'نوع الطلب', fr: 'Type de demande' },
  fDate: { ar: 'التاريخ', fr: 'Date' },
  fGuests: { ar: 'عدد الأشخاص', fr: 'Personnes' },
  fNotes: { ar: 'ملاحظات (اختياري)', fr: 'Notes (optionnel)' },
  fSubmit: { ar: 'أكّد الطلب ↗', fr: 'Confirmer ↗' },
  fSending: { ar: 'جارٍ الإرسال…', fr: 'Envoi…' },
  fSuccessTitle: { ar: 'توصلنا بطلبك ✓', fr: 'Demande reçue ✓' },
  fSuccessBody: {
    ar: 'غادي نأكدو معاك بالهاتف/واتساب قريباً.',
    fr: 'Nous vous confirmons par téléphone ou WhatsApp très vite.',
  },
  fError: { ar: 'وقع خطأ ما — عاود المحاولة أو اتصل بينا.', fr: 'Une erreur est survenue — réessayez ou appelez-nous.' },
  fRequired: { ar: 'هذا الحقل ضروري', fr: 'Champ requis' },
  whatsappCta: { ar: 'تواصل عبر واتساب', fr: 'Écrire sur WhatsApp' },
  callCta: { ar: 'اتصل بينا', fr: 'Appeler' },
  footerNav: { ar: 'أقسام الصفحة', fr: 'Sur cette page' },
  footerContact: { ar: 'تواصل', fr: 'Contact' },
  credit: { ar: 'صُنع بـ ♥ في المغرب', fr: 'Fait avec ♥ au Maroc' },
} as const;

export type CopyKey = keyof typeof T;
export function t(store: StorePageTheme, key: CopyKey): string {
  return T[key][store.lang];
}

/** Is the store open right now (Africa/Casablanca)? */
export function openState(hours: StoreHoursRow[]): { open: boolean; nextOpen?: string } {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Casablanca',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find((p) => p.type === 'weekday')?.value ?? 'Sun');
    const hh = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
    const mm = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);
    const mins = hh * 60 + mm;
    const today = hours.filter((h) => h.dow?.includes(wd));
    for (const row of today) {
      if (row.closed) return { open: false };
      const m = row.time.match(/(\d{1,2})[:h](\d{2})\s*[–-]\s*(\d{1,2})[:h](\d{2})/);
      if (!m) continue;
      const start = parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
      const end = parseInt(m[3], 10) * 60 + parseInt(m[4], 10);
      if (mins >= start && mins <= end) return { open: true };
      if (mins < start) return { open: false, nextOpen: `${m[1].padStart(2, '0')}:${m[2]}` };
    }
    // find next opening time from any future day
    for (const row of hours) {
      if (row.closed) continue;
      const m = row.time.match(/(\d{1,2})[:h](\d{2})/);
      if (m) return { open: false, nextOpen: `${m[1].padStart(2, '0')}:${m[2]}` };
    }
    return { open: false };
  } catch {
    return { open: false };
  }
}

/** Sector ornament used as marquee/menu separator. */
export function Ornament({ className }: { className?: string }) {
  return (
    <span className={className} style={{ color: 'var(--store-primary)' }} aria-hidden="true">
      ✦
    </span>
  );
}
