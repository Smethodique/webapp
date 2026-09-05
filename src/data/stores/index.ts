import type { ShaderVariant } from '@/components/shaders';

export type StoreSector = 'hospitality' | 'beauty' | 'lifestyle';

export interface StoreTheme {
  slug: string;
  name: string;
  /** Arabic display name */
  nameAr: string;
  sector: StoreSector;
  city: string;
  dir: 'rtl' | 'ltr';
  shader: ShaderVariant;
  colors: {
    primary: string;
    accent: string;
    /** hex pair fed to the shader */
    shaderA: string;
    shaderB: string;
  };
  fontPair: {
    display: string;
    body: string;
  };
  tagline: string;
  phone?: string;
}

/* ------------------------------------------------------------------ */
/* Rich store page content — additive extension used by StorePage.     */
/* ------------------------------------------------------------------ */

export type StoreLayoutVariant = 'editorial' | 'immersive' | 'mosaic';
export type StoreTexture = 'grain' | 'zellige' | 'scanlines' | 'none';
export type StoreJsonLdType = 'CafeOrCoffeeShop' | 'Restaurant' | 'Bakery' | 'LocalBusiness';

export interface StoreServiceItem {
  title: string;
  desc: string;
  price?: string;
  /** optional group key for tabbed menus (restaurants) */
  group?: string;
  /** expandable detail line (allergy notes, duration…) */
  note?: string;
  /** beauty sector adds a duration line */
  duration?: string;
}

export interface StoreReview {
  text: string;
  author: string;
  rating: 4 | 5;
  source?: string;
}

export interface StoreHoursRow {
  days: string;
  time: string;
  closed?: boolean;
  /** days of week this row covers (0 = Sunday) — used by the open-now chip */
  dow?: number[];
}

/**
 * Nested `content` block as authored by the beauty & lifestyle sector files.
 * The master StorePage template consumes a FLAT config (StorePageTheme); the
 * registry normalizes nested configs into that shape (see normalizeStoreConfig).
 */
export interface StoreContentBlock {
  /** French/English accent tagline (rendered as kicker/whisper) */
  taglineFr?: string;
  heroTitle: string[];
  heroSub: string;
  story: {
    title: string;
    body: string[];
    quote?: { text: string; author: string };
  };
  services: StoreServiceItem[];
  gallery: { src: string; caption?: string }[];
  reviews: StoreReview[];
  hours: StoreHoursRow[];
  address: string;
  mapQuery: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
}

/** Full parametric store config consumed by the master StorePage template. */
export interface StorePageTheme extends StoreTheme {
  lang: 'ar' | 'fr';
  layoutVariant: StoreLayoutVariant;
  texture: StoreTexture;
  jsonLdType: StoreJsonLdType;
  /** e.g. "مقهى مختص" / "Pâtisserie" */
  category: string;
  /** Latin kicker label, e.g. "CAFÉ DE SPÉCIALITÉ" */
  sectorLabel: string;
  surfaceTint: string;
  onPrimary: string;
  heroTitle: string[];
  heroSub: string;
  story: {
    title: string;
    body: string[];
    quote?: { text: string; author: string };
  };
  services: StoreServiceItem[];
  /** tab labels for grouped menus; item.group must match */
  menuTabs?: string[];
  gallery: { src: string; caption?: string }[];
  reviews: StoreReview[];
  hours: StoreHoursRow[];
  address: string;
  mapQuery: string;
  whatsapp?: string;
  instagram?: string;
  /** fine-dining reservation notice strip */
  reservationNote?: string;
  /** booking request-type select options */
  bookingTypes: string[];
  /** hero image path (shader fallback / og:image) */
  heroImage: string;
  aboutImage: string;

  /* ---- optional sector-specific extras (beauty / lifestyle supersets) ---- */
  /** French/Latin brand name (lifestyle) */
  nameFr?: string;
  /** mirrors `shader` — kept for parity with sector file naming */
  shaderVariant?: ShaderVariant;
  /** shader intensity override (lifestyle) */
  shaderIntensity?: number;
  /** explicit shader color pair (beauty) */
  shaderColors?: [string, string];
  /** nested content block as authored by beauty/lifestyle (pre-normalization) */
  content?: StoreContentBlock;
}

/**
 * The nested shape authored by beauty.ts (BeautyStoreConfig) and lifestyle.ts
 * (LifestyleStore). Structurally a StoreTheme with surface/on-primary colors and
 * a `content` block instead of the flat page fields.
 */
export interface NestedStoreConfig extends Omit<StoreTheme, 'colors'> {
  lang: 'ar' | 'fr';
  category: string;
  layoutVariant: StoreLayoutVariant;
  texture: StoreTexture;
  colors: StoreTheme['colors'] & { surfaceTint?: string; onPrimary?: string };
  content: StoreContentBlock;
  nameFr?: string;
  shaderVariant?: ShaderVariant;
  shaderIntensity?: number;
  shaderColors?: [string, string];
  whatsapp?: string;
  instagram?: string;
}

/** Any sector file's config shape (flat hospitality or nested beauty/lifestyle). */
export type AnyStoreConfig = StorePageTheme | NestedStoreConfig;

export function isStorePageTheme(t: unknown): t is StorePageTheme {
  return (
    !!t &&
    typeof t === 'object' &&
    Array.isArray((t as StorePageTheme).heroTitle) &&
    Array.isArray((t as StorePageTheme).services)
  );
}

export function isNestedStoreConfig(t: unknown): t is NestedStoreConfig {
  if (!t || typeof t !== 'object') return false;
  const c = (t as NestedStoreConfig).content;
  return !!c && Array.isArray(c.heroTitle) && Array.isArray(c.services);
}

/* ------------------------------------------------------------------ */
/* Normalization — nested (beauty/lifestyle) → flat StorePageTheme.    */
/* ------------------------------------------------------------------ */

const SECTOR_LABEL: Record<StoreSector, string> = {
  hospitality: 'HOSPITALITY',
  beauty: 'BEAUTY & ELEGANCE',
  lifestyle: 'LIFESTYLE',
};

const DEFAULT_BOOKING_TYPES: Record<'ar' | 'fr', string[]> = {
  ar: ['استفسار', 'حجز موعد', 'طلب خاص'],
  fr: ['Demande', 'Réservation', 'Demande spéciale'],
};

/**
 * Derive a Latin kicker label from the (often Arabic) `category`, so beauty &
 * lifestyle stores get the same specific kickers hospitality authors by hand.
 * First matching rule wins; falls back to a sector-level label.
 */
const CATEGORY_LABEL_RULES: [RegExp, string][] = [
  [/قفطان|كوتور|couture|caftan/i, 'HAUTE COUTURE'],
  [/concept store|boutique/i, 'CONCEPT STORE'],
  [/سبا|حمّام|حمام|spa|hammam/i, 'SPA & HAMMAM'],
  [/باربرشوب|barber|grooming/i, 'BARBERSHOP'],
  [/تجميل|beauté|beauty|maquillage|cils|ongles/i, 'BEAUTY STUDIO'],
  [/خياطة|أزياء|fashion/i, 'FASHION ATELIER'],
  [/ملاكمة|boxe|boxing/i, 'BOXING CLUB'],
  [/فنون قتالية|mma/i, 'MMA & FITNESS'],
  [/كروسفيت|crossfit/i, 'CROSSFIT'],
  [/لياقة|fitness|gym/i, 'FITNESS CLUB'],
  [/زرابي|رگز|rugs|tapis/i, 'BERBER RUGS'],
  [/ديكور|décoration|decor/i, 'DÉCOR & DESIGN'],
  [/أثاث|furniture|mobilier/i, 'FURNITURE'],
  [/أعراس|زواج|wedding/i, 'WEDDING PLANNER'],
  [/أحداث|فعاليات|event/i, 'EVENTS AGENCY'],
];

function deriveSectorLabel(raw: NestedStoreConfig): string {
  const cat = raw.category ?? '';
  for (const [re, label] of CATEGORY_LABEL_RULES) {
    if (re.test(cat)) return label;
  }
  return SECTOR_LABEL[raw.sector];
}

/**
 * Normalize any sector config into the flat StorePageTheme the master template
 * renders. Flat configs (hospitality) pass through untouched; nested configs
 * (beauty/lifestyle) have their `content` block hoisted and the few template-
 * required fields they don't author (jsonLdType, sectorLabel, bookingTypes,
 * hero/about images) derived. Content/copy is never altered — only reshaped.
 */
export function normalizeStoreConfig(raw: AnyStoreConfig): StorePageTheme {
  if (isStorePageTheme(raw)) return raw;
  const c = raw.content;
  return {
    slug: raw.slug,
    name: raw.name,
    nameAr: raw.nameAr,
    sector: raw.sector,
    city: raw.city,
    dir: raw.dir,
    shader: raw.shader,
    colors: raw.colors,
    fontPair: raw.fontPair,
    tagline: raw.tagline,
    phone: raw.phone ?? c.phone,
    lang: raw.lang,
    layoutVariant: raw.layoutVariant,
    texture: raw.texture,
    jsonLdType: 'LocalBusiness',
    category: raw.category,
    sectorLabel: deriveSectorLabel(raw),
    surfaceTint: raw.colors.surfaceTint ?? `${raw.colors.primary}0A`,
    onPrimary: raw.colors.onPrimary ?? '#1A120C',
    heroTitle: c.heroTitle,
    heroSub: c.heroSub,
    story: c.story,
    services: c.services,
    gallery: c.gallery,
    reviews: c.reviews,
    hours: c.hours,
    address: c.address,
    mapQuery: c.mapQuery,
    whatsapp: raw.whatsapp ?? c.whatsapp,
    instagram: raw.instagram ?? c.instagram,
    bookingTypes: DEFAULT_BOOKING_TYPES[raw.lang] ?? DEFAULT_BOOKING_TYPES.ar,
    heroImage: `/stores/${raw.slug}/hero.jpg`,
    aboutImage: `/stores/${raw.slug}/about.jpg`,
    ...(raw.nameFr !== undefined ? { nameFr: raw.nameFr } : {}),
    ...(raw.shaderVariant !== undefined ? { shaderVariant: raw.shaderVariant } : {}),
    ...(raw.shaderIntensity !== undefined ? { shaderIntensity: raw.shaderIntensity } : {}),
    ...(raw.shaderColors !== undefined ? { shaderColors: raw.shaderColors } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Registry — auto-wire every sector data file in this directory.      */
/* Any module here exporting a store config (or array of them) is      */
/* normalized and registered by slug. (index.ts is self-excluded.)     */
/* ------------------------------------------------------------------ */

const sectorModules = import.meta.glob<Record<string, unknown>>(['./*.ts', '!./index.ts'], { eager: true });

function buildRegistry(): Record<string, StorePageTheme> {
  const bySlug = new Map<string, StorePageTheme>();
  for (const mod of Object.values(sectorModules)) {
    for (const value of Object.values(mod)) {
      const items = Array.isArray(value) ? value : [value];
      for (const item of items) {
        if (isStorePageTheme(item) || isNestedStoreConfig(item)) {
          const normalized = normalizeStoreConfig(item);
          bySlug.set(normalized.slug, normalized);
        }
      }
    }
  }
  return Object.fromEntries(bySlug);
}

const stores: Record<string, StorePageTheme> = buildRegistry();

export function getStoreTheme(slug: string | undefined): StorePageTheme | undefined {
  if (!slug) return undefined;
  return stores[slug];
}

export function listStores(): StorePageTheme[] {
  return Object.values(stores);
}

export default stores;
