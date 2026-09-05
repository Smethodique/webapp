import { getStoreTheme } from '@/data/stores';
import type { StoreSector } from '@/data/stores';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type WorkSector = StoreSector | 'identity';
export type WorkFilter = 'all' | WorkSector | 'custom';

export interface WorkEntry {
  /** case-study slug — /works/:slug */
  slug: string;
  /** live demo slug — /stores/:slug (undefined for the portfolio itself) */
  storeSlug?: string;
  title: string;
  /** optional Latin/French brand name (kept in original language) */
  latin?: string;
  sector: WorkSector;
  /** filter pills this entry matches (a project can match identity + custom) */
  filters: Exclude<WorkFilter, 'all'>[];
  sectorTag: string;
  /** latin city key for mono meta lines */
  city: string;
  cityAr: string;
  year: string;
  thumb: string;
  /** store accent color — drives the hover wash in the catalog */
  accent?: string;
}

export interface CaseStudyScreen {
  img: string;
  title: string;
  body: string;
}

export interface CaseStudyMetric {
  value: number;
  /** printed before/after the number, e.g. '+' / '%' / '×' / 's' / '#' */
  prefix?: string;
  suffix?: string;
  /** decimals to show while counting */
  decimals?: number;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  city: string;
  cityAr: string;
  year: string;
  sector: WorkSector;
  sectorTag: string;
  services: string[];
  duration: string;
  /** live store demo (/stores/:slug) */
  liveUrl?: string;
  heroTitle: string;
  heroFrench: string;
  heroImage: string;
  intro: [string, string];
  challenge: string;
  pullQuote: string;
  palette: { hex: string; name: string }[];
  typePair: { display: string; body: string };
  screens: CaseStudyScreen[];
  metrics: CaseStudyMetric[];
  quote: string;
  quoteAuthor: string;
  nextSlug: string;
}

/** Real photography from the store itself — every card shows that store's hero. */
const storeHero = (slug: string) => `/stores/${slug}/hero.jpg`;
const storeAccent = (slug: string) => {
  const theme = getStoreTheme(slug);
  return theme?.colors.accent ?? theme?.colors.primary;
};

/* ------------------------------------------------------------------ */
/* Featured works (home selection — keep stable for Home page)         */
/* ------------------------------------------------------------------ */

export const WORKS: WorkEntry[] = [
  { slug: 'cafe-rabat', storeSlug: 'heibai-coffee', title: 'مقهى متخصص', latin: 'BUN AL MADINA', sector: 'hospitality', filters: ['hospitality'], sectorTag: 'ضيافة · مقهى متخصص', city: 'rabat', cityAr: 'الرباط', year: '2025', thumb: storeHero('heibai-coffee'), accent: storeAccent('heibai-coffee') },
  { slug: 'dar-caftan-casa', storeSlug: 'miya-couture', title: 'دار قفطان', latin: 'DAR CAFTAN', sector: 'beauty', filters: ['beauty', 'identity'], sectorTag: 'أناقة · قفطان', city: 'casablanca', cityAr: 'الدار البيضاء', year: '2025', thumb: storeHero('miya-couture'), accent: storeAccent('miya-couture') },
  { slug: 'gym-marrakech', storeSlug: 'kriss-boxing', title: 'نادي رياضي', latin: 'ATLAS GYM', sector: 'lifestyle', filters: ['lifestyle'], sectorTag: 'أسلوب حياة · لياقة', city: 'marrakech', cityAr: 'مراكش', year: '2025', thumb: storeHero('kriss-boxing'), accent: storeAccent('kriss-boxing') },
  { slug: 'restaurant-tanger', storeSlug: 'le-rouget', title: 'مطعم فاخر', latin: 'LE ROUGET', sector: 'hospitality', filters: ['hospitality'], sectorTag: 'ضيافة · مطعم', city: 'tanger', cityAr: 'طنجة', year: '2024', thumb: storeHero('le-rouget'), accent: storeAccent('le-rouget') },
  { slug: 'mobilia-fes', storeSlug: 'fadma-rugs', title: 'أثاث وديكور', latin: 'MOBILIA', sector: 'lifestyle', filters: ['lifestyle', 'identity'], sectorTag: 'أسلوب حياة · ديكور', city: 'fes', cityAr: 'فاس', year: '2024', thumb: storeHero('fadma-rugs'), accent: storeAccent('fadma-rugs') },
  { slug: 'patisserie-agadir', storeSlug: 'lahlou-co', title: 'حلويات عصرية', latin: 'LAHLOU & CO', sector: 'hospitality', filters: ['hospitality'], sectorTag: 'ضيافة · حلويات', city: 'agadir', cityAr: 'أكادير', year: '2024', thumb: storeHero('lahlou-co'), accent: storeAccent('lahlou-co') },
];

/* ------------------------------------------------------------------ */
/* Store projects archive — 30 stores across 3 sectors                 */
/* Reads the src/data/stores registry when entries exist there,        */
/* falling back to local metadata so the grid is always complete.      */
/* ------------------------------------------------------------------ */

interface StoreMeta {
  title: string;
  latin: string;
  city: string;
  cityAr: string;
  tag: string;
}

const STORE_META: Record<string, StoreMeta & { sector: StoreSector }> = {
  /* — قطاع الضيافة — */
  'heibai-coffee': { sector: 'hospitality', title: 'هيباي كوفي', latin: 'HEIBAI COFFEE', city: 'casablanca', cityAr: 'الدار البيضاء', tag: 'ضيافة · مقهى متخصص' },
  'hyuna-house': { sector: 'hospitality', title: 'حيونة هاوس', latin: 'HYUNA HOUSE', city: 'rabat', cityAr: 'الرباط', tag: 'ضيافة · مقهى' },
  'kesh-cup': { sector: 'hospitality', title: 'كيش كاب', latin: 'KESH CUP', city: 'marrakech', cityAr: 'مراكش', tag: 'ضيافة · مقهى' },
  'sinya-coffee': { sector: 'hospitality', title: 'سينيا كوفي', latin: 'SINYA COFFEE', city: 'tanger', cityAr: 'طنجة', tag: 'ضيافة · مقهى متخصص' },
  'le-rouget': { sector: 'hospitality', title: 'لو روجيه', latin: 'LE ROUGET', city: 'casablanca', cityAr: 'الدار البيضاء', tag: 'ضيافة · مطعم' },
  'nono-sea-taste': { sector: 'hospitality', title: 'نونو سي تيست', latin: 'NONO SEA TASTE', city: 'agadir', cityAr: 'أكادير', tag: 'ضيافة · مطعم بحري' },
  'mofi': { sector: 'hospitality', title: 'موفي', latin: 'MOFI', city: 'rabat', cityAr: 'الرباط', tag: 'ضيافة · مقهى' },
  'le-tarbouche': { sector: 'hospitality', title: 'لو طربوش', latin: 'LE TARBOUCHE', city: 'fes', cityAr: 'فاس', tag: 'ضيافة · مطعم تقليدي' },
  'lahlou-co': { sector: 'hospitality', title: 'لحلو آند كو', latin: 'LAHLOU & CO', city: 'casablanca', cityAr: 'الدار البيضاء', tag: 'ضيافة · حلويات' },
  'les-3-dousoeurs': { sector: 'hospitality', title: 'لي تروا دوسور', latin: 'LES 3 DOUCEURS', city: 'marrakech', cityAr: 'مراكش', tag: 'ضيافة · باتيسري' },
  /* — قطاع الأناقة والجمال — */
  'miya-couture': { sector: 'beauty', title: 'ميا كوتور', latin: 'MIYA COUTURE', city: 'casablanca', cityAr: 'الدار البيضاء', tag: 'أناقة · قفطان' },
  'myriam-bouafi': { sector: 'beauty', title: 'مريم بوعافي', latin: 'MYRIAM BOUAFI', city: 'rabat', cityAr: 'الرباط', tag: 'أناقة · دار قفطان' },
  'atelier-44': { sector: 'beauty', title: 'أتيلييه 44', latin: 'ATELIER 44', city: 'casablanca', cityAr: 'الدار البيضاء', tag: 'أناقة · خياطة راقية' },
  'meraki-studio': { sector: 'beauty', title: 'ميراكي ستوديو', latin: 'MERAKI STUDIO', city: 'marrakech', cityAr: 'مراكش', tag: 'جمال · ستوديو تجميل' },
  'happy-sens-spa': { sector: 'beauty', title: 'هابي سينس سبا', latin: 'HAPPY SENS SPA', city: 'agadir', cityAr: 'أكادير', tag: 'جمال · سبا' },
  'hammam-le-pacha': { sector: 'beauty', title: 'حمام الباشا', latin: 'HAMMAM LE PACHA', city: 'fes', cityAr: 'فاس', tag: 'جمال · حمام وسبا' },
  'beauty-by-riihaab': { sector: 'beauty', title: 'بيوتي باي ريهاب', latin: 'BEAUTY BY RIIHAAB', city: 'tanger', cityAr: 'طنجة', tag: 'جمال · مكياج' },
  'studio-glem': { sector: 'beauty', title: 'ستوديو غليم', latin: 'STUDIO GLEM', city: 'casablanca', cityAr: 'الدار البيضاء', tag: 'جمال · عناية' },
  'el-hassani-barber': { sector: 'beauty', title: 'الحسني باربر', latin: 'EL HASSANI BARBER', city: 'rabat', cityAr: 'الرباط', tag: 'أناقة · حلاقة رجالية' },
  'ali-barbershop': { sector: 'beauty', title: 'علي باربرشوب', latin: 'ALI BARBERSHOP', city: 'marrakech', cityAr: 'مراكش', tag: 'أناقة · حلاقة رجالية' },
  /* — قطاع أسلوب الحياة — */
  'kriss-boxing': { sector: 'lifestyle', title: 'كريس بوكسينغ كلوب', latin: 'KRISS BOXING CLUB', city: 'marrakech', cityAr: 'مراكش', tag: 'أسلوب حياة · نادي ملاكمة' },
  'la-cage-gym': { sector: 'lifestyle', title: 'لا كاج جيم', latin: 'LA CAGE GYM', city: 'agadir', cityAr: 'أكادير', tag: 'أسلوب حياة · فنون قتالية' },
  'crossfit-sirocco': { sector: 'lifestyle', title: 'كروسفيت سيروكو', latin: 'CROSSFIT SIROCCO', city: 'marrakech', cityAr: 'مراكش', tag: 'أسلوب حياة · كروسفيت' },
  'spartacus-fight': { sector: 'lifestyle', title: 'سبارتاكوس فايت فيتنيس', latin: 'SPARTACUS FIGHT', city: 'casablanca', cityAr: 'الدار البيضاء', tag: 'أسلوب حياة · فنون قتالية' },
  'fadma-rugs': { sector: 'lifestyle', title: 'فادما رڭز', latin: 'FADMA RUGS', city: 'marrakech', cityAr: 'مراكش', tag: 'أسلوب حياة · زرابي بربرية' },
  'fenyadi': { sector: 'lifestyle', title: 'فنيادي', latin: 'MAISON FENYADI', city: 'marrakech', cityAr: 'مراكش', tag: 'أسلوب حياة · ديكور' },
  'casatribana': { sector: 'lifestyle', title: 'كازاتريبانا', latin: 'CASATRIBANA', city: 'marrakech', cityAr: 'مراكش', tag: 'أسلوب حياة · ديكور' },
  'she-said-yes': { sector: 'lifestyle', title: 'شي سيد يس', latin: 'SHE SAID YES', city: 'marrakech', cityAr: 'مراكش', tag: 'أسلوب حياة · تنظيم أعراس' },
  'your-events': { sector: 'lifestyle', title: 'يور إيفنتس', latin: 'YOUR EVENTS', city: 'rabat', cityAr: 'الرباط', tag: 'أسلوب حياة · تنظيم فعاليات' },
  'up2you-event': { sector: 'lifestyle', title: 'أپ تو يو إيفنت', latin: 'UP2YOU EVENT', city: 'marrakech', cityAr: 'مراكش', tag: 'أسلوب حياة · أحداث' },
};

const SECTOR_ORDER: StoreSector[] = ['hospitality', 'beauty', 'lifestyle'];

/** The 30 store projects + the portfolio itself, registry-aware. */
export const STORE_WORKS: WorkEntry[] = (() => {
  const entries: WorkEntry[] = [];
  for (const sector of SECTOR_ORDER) {
    for (const [slug, meta] of Object.entries(STORE_META)) {
      if (meta.sector !== sector) continue;
      const theme = getStoreTheme(slug); // registry wins when the store is scaffolded
      const resolvedSector = theme?.sector ?? sector;
      entries.push({
        slug,
        storeSlug: slug,
        title: theme?.nameAr ?? meta.title,
        latin: meta.latin,
        sector: resolvedSector,
        filters: [resolvedSector],
        sectorTag: meta.tag,
        city: (theme?.city ?? meta.city).toLowerCase(),
        cityAr: meta.cityAr,
        year: '2025',
        thumb: storeHero(slug),
        accent: storeAccent(slug),
      });
    }
  }
  /* the portfolio itself */
  entries.push({
    slug: 'atelier-portfolio',
    title: 'موقع أتيلييه',
    latin: 'ATELIER.MA',
    sector: 'identity',
    filters: ['identity', 'custom'],
    sectorTag: 'هوية رقمية · تطوير مخصص',
    city: 'casablanca',
    cityAr: 'الدار البيضاء',
    year: '2025',
    thumb: '/og-cover.jpg',
    accent: '#C9A227',
  });
  return entries;
})();

export const ALL_WORKS: WorkEntry[] = [...WORKS, ...STORE_WORKS];

export const SECTOR_LABEL: Record<WorkSector, string> = {
  hospitality: 'ضيافة',
  beauty: 'أناقة وجمال',
  lifestyle: 'أسلوب حياة',
  identity: 'هوية رقمية',
};

export function getWorkBySlug(slug: string | undefined): WorkEntry | undefined {
  if (!slug) return undefined;
  return ALL_WORKS.find((w) => w.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

const PALETTES: Record<WorkSector, { hex: string; name: string }[]> = {
  hospitality: [
    { hex: '#C96F4A', name: 'طيني محروق' },
    { hex: '#F3E7D7', name: 'كريمي' },
    { hex: '#1A120C', name: 'إسبريسو' },
    { hex: '#B08D57', name: 'نحاسي' },
  ],
  beauty: [
    { hex: '#6E1423', name: 'عنابي' },
    { hex: '#D8B25C', name: 'شامبين' },
    { hex: '#0C0A0B', name: 'أسود حالك' },
    { hex: '#C9A227', name: 'ذهبي' },
  ],
  lifestyle: [
    { hex: '#D6FF3F', name: 'أخضر كهربائي' },
    { hex: '#B7B39A', name: 'ميرمية' },
    { hex: '#0B0D0A', name: 'فحمي' },
    { hex: '#EAD3CE', name: 'وردي فاتح' },
  ],
  identity: [
    { hex: '#C9A227', name: 'ذهبي' },
    { hex: '#E3B94F', name: 'ذهبي فاتح' },
    { hex: '#0A0A0E', name: 'حبري' },
    { hex: '#F5F2EC', name: 'عاجي' },
  ],
};

/** Screens built from the store's own photography (hero / about / gallery). */
const STORE_SCREENS = (slug: string): CaseStudyScreen[] => {
  const b = `/stores/${slug}`;
  return [
    { img: `${b}/hero.jpg`, title: 'الرئيسية على الهاتف', body: 'تصميم يبدأ من الهاتف أولاً — 78% من الزيارات تأتي منه.' },
    { img: `${b}/about.jpg`, title: 'هوية المكان', body: 'صور حقيقية من المحل تسبق أي كلمة.' },
    { img: `${b}/gallery-1.jpg`, title: 'نظام الحجز', body: 'الحجز في ثلاث نقرات، دون تسجيل.' },
    { img: `${b}/gallery-2.jpg`, title: 'السرعة ونتائج البحث', body: 'تحميل في 0.8 ثانية، ونتيجة 98 في Lighthouse.' },
  ];
};

const DEFAULT_SCREENS = (work: WorkEntry): CaseStudyScreen[] =>
  work.storeSlug
    ? STORE_SCREENS(work.storeSlug)
    : [
        { img: work.thumb, title: 'الرئيسية على الهاتف', body: 'تصميم يبدأ من الهاتف أولاً — 78% من الزيارات تأتي منه.' },
        { img: '/work-thumb-04.jpg', title: 'نظام الحجز', body: 'الحجز في ثلاث نقرات، دون تسجيل.' },
        { img: '/work-thumb-05.jpg', title: 'القائمة التفاعلية', body: 'قائمة حيّة تُحدَّث من لوحة تحكم بسيطة.' },
        { img: '/work-thumb-06.jpg', title: 'السرعة ونتائج البحث', body: 'تحميل في 0.8 ثانية، ونتيجة 98 في Lighthouse.' },
      ];

const DEFAULT_METRICS: CaseStudyMetric[] = [
  { value: 240, prefix: '+', suffix: '%', label: 'زيارات الموقع في 3 أشهر' },
  { value: 3, prefix: '×', label: 'حجوزات أسبوعية' },
  { value: 0.8, suffix: 's', decimals: 1, label: 'سرعة التحميل' },
  { value: 1, prefix: '#', label: 'في نتائج البحث المحلية' },
];

/** Fully written case studies (flagship + featured). */
const CASE_STUDIES: Record<string, Omit<CaseStudy, 'slug' | 'nextSlug'>> = {
  'cafe-rabat': {
    client: 'بُن المدينة',
    city: 'rabat',
    cityAr: 'الرباط',
    year: '2025',
    sector: 'hospitality',
    sectorTag: 'ضيافة · مقهى متخصص',
    services: ['موقع عرض', 'حجز عبر الإنترنت', 'هوية رقمية', 'SEO محلي'],
    duration: '14 يوماً',
    liveUrl: '/stores/heibai-coffee',
    heroTitle: 'مقهى «بُن المدينة» — من حيّ شعبي إلى أيقونة للقهوة المختصة',
    heroFrench: "du grain à l'écran.",
    heroImage: storeHero('heibai-coffee'),
    intro: [
      '«بُن المدينة» مقهى مختص صغير في حي أكدال بالرباط، يحمّص بنّه بنفسه ويقدّمه بطقوس كاملة — لكن حضوره الرقمي كان شبه معدوم: لا موقع، لا حجز، وحساب إنستغرام لا يعدو صوراً عشوائية.',
      'أراد المؤسس عبد الرحيم موقعاً يشبه تجربة المكان: هادئاً، دقيقاً، وذوّاقة. اختار الأتيلييه لأنه بحث عمّن يفهم القهوة المختصة، ويفهم كيف يتصفّح الزبون المغربي هاتفه قبل أن يغادر بيته.',
    ],
    challenge: 'يتمتع المقهى بسمعة طيبة في الحي، لكنه بلا حضور رقمي يُذكر — لا موقع ولا حجز، وإنستغرام لا يعدو صوراً عشوائية. وفيما دخل منافسون جدد السوق بمواقع أنيقة، صار زبون اليوم يبحث في غوغل قبل أن يغادر داره.',
    pullQuote: 'كنا نخشى أن يخرج الموقع بارداً لا يشبهنا — أردنا أن يشمّ الناس رائحة البنّ من الشاشة.',
    palette: PALETTES.hospitality,
    typePair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    screens: STORE_SCREENS('heibai-coffee'),
    metrics: [
      { value: 240, prefix: '+', suffix: '%', label: 'زيارات الموقع في 3 أشهر' },
      { value: 3, prefix: '×', label: 'حجوزات أسبوعية' },
      { value: 0.8, suffix: 's', decimals: 1, label: 'سرعة التحميل' },
      { value: 1, prefix: '#', label: 'في نتائج «مقهى مختص الرباط»' },
    ],
    quote: 'منذ أطلقنا الموقع، صار الزبون يصل وهو يعرف ما يريد. شكراً على الصبر والذوق.',
    quoteAuthor: 'عبد الرحيم — مؤسس «بُن المدينة»، الرباط',
  },
  'dar-caftan-casa': {
    client: 'دار قفطان',
    city: 'casablanca',
    cityAr: 'الدار البيضاء',
    year: '2025',
    sector: 'beauty',
    sectorTag: 'أناقة · قفطان',
    services: ['موقع عرض', 'هوية بصرية', 'معرض قطع', 'SEO محلي'],
    duration: '16 يوماً',
    liveUrl: '/stores/miya-couture',
    heroTitle: 'دار قفطان — حرفة مغربية بحضور يليق بها',
    heroFrench: 'la soie devient pixel.',
    heroImage: storeHero('miya-couture'),
    intro: [
      'دار قفطان عائلية في الدار البيضاء، يشتغل فيها الجيل الثالث من الصنّاع على القفطان والتكشيطة لزبونات يقصدنها من كافة أنحاء المملكة — لكن حضورها الرقمي كان يُختزَل في صور مضغوطة عبر واتساب.',
      'كان التحدي كبيراً: كيف ننقل إحساس الحرير والتطريز اليدوي إلى الشاشة دون الوقوع في استعراض فارغ؟ كان الجواب في التفاصيل: تصوير قريب للخيوط، حركة بطيئة كالحرير، وخط أميري يليق بالمناسبات الكبرى.',
    ],
    challenge: 'للدار زبونات وفيات، لكن الجيل الجديد يبحث على الإنترنت قبل الزيارة. والمنافسات يعرضن كتالوجات ضخمة، بينما تحتاج الدار أن تفرض الفارق: هنا تُفصَّل كل قطعة على مقاس صاحبتها.',
    pullQuote: 'القفطان ليس سلعة، بل ذاكرة. أردنا موقعاً يُشعِر بذلك.',
    palette: PALETTES.beauty,
    typePair: { display: 'Amiri', body: 'Cormorant Garamond' },
    screens: STORE_SCREENS('miya-couture'),
    metrics: [
      { value: 180, prefix: '+', suffix: '%', label: 'طلبات القياس عبر الإنترنت' },
      { value: 2, prefix: '×', label: 'زيارات صالة العرض' },
      { value: 0.9, suffix: 's', decimals: 1, label: 'سرعة التحميل' },
      { value: 1, prefix: '#', label: 'في نتائج «قفطان الدار البيضاء»' },
    ],
    quote: 'صارت الزبونة تصل إلى الدار وهي تحفظ الموديلات من الموقع. الحرفة بقيت هي نفسها، غير أنها وصلت إلى ناس أكثر.',
    quoteAuthor: 'السيدة فاطمة الزهراء — دار قفطان، الدار البيضاء',
  },
  'gym-marrakech': {
    client: 'أطلس جيم',
    city: 'marrakech',
    cityAr: 'مراكش',
    year: '2025',
    sector: 'lifestyle',
    sectorTag: 'أسلوب حياة · لياقة',
    services: ['موقع عرض', 'حجز حصص', 'تطوير مخصص'],
    duration: '12 يوماً',
    liveUrl: '/stores/kriss-boxing',
    heroTitle: 'أطلس جيم — طاقة النادي، من الشاشة إلى القاعة',
    heroFrench: "l'énergie d'abord.",
    heroImage: storeHero('kriss-boxing'),
    intro: [
      'نادي لياقة في قلب مراكش بطاقة شبابية وروح جماعية قوية — لكن التسجيلات كانت تمرّ كلها عبر الهاتف والرسائل، والمدربون يضيّعون وقتهم في الإدارة بدل التدريب.',
      'بنينا موقعاً ينبض بطاقة القاعة نفسها: خطوط عريضة، إيقاع سريع، ونظام حجز يتيح للزبون تسجيل حصته في ثلاث نقرات من هاتفه.',
    ],
    challenge: 'المنافسة في مراكش شرسة، وللنوادي الكبرى تطبيقاتها. كان أطلس جيم يحتاج شيئاً أخف وأسرع: موقعاً يُحمَّل في أقل من ثانية على شبكة 4G عادية، وحجزاً بلا تعقيد.',
    pullQuote: 'لم نرد موقعاً «جميلاً وفقط» — أردناه أن يمنح الإحساس نفسه الذي تمنحه الحصة الأولى.',
    palette: PALETTES.lifestyle,
    typePair: { display: 'Anton', body: 'IBM Plex Sans Arabic' },
    screens: STORE_SCREENS('kriss-boxing'),
    metrics: [
      { value: 310, prefix: '+', suffix: '%', label: 'تسجيلات جديدة عبر الإنترنت' },
      { value: 3, prefix: '×', label: 'حجوزات الحصص' },
      { value: 0.7, suffix: 's', decimals: 1, label: 'سرعة التحميل' },
      { value: 96, label: 'نتيجة Lighthouse' },
    ],
    quote: 'صارت الحصص تمتلئ قبل أن نعلن عنها في إنستغرام. الموقع هو من يعمل مكاننا.',
    quoteAuthor: 'يوسف — مدير أطلس جيم، مراكش',
  },
  'restaurant-tanger': {
    client: 'لو روجيه',
    city: 'tanger',
    cityAr: 'طنجة',
    year: '2024',
    sector: 'hospitality',
    sectorTag: 'ضيافة · مطعم',
    services: ['موقع عرض', 'قائمة تفاعلية', 'حجز طاولات', 'SEO محلي'],
    duration: '14 يوماً',
    liveUrl: '/stores/le-rouget',
    heroTitle: 'لو روجيه — مائدة طنجاوية تُحجَز من الشاشة',
    heroFrench: 'réserver devient un plaisir.',
    heroImage: storeHero('le-rouget'),
    intro: [
      'مطعم راقٍ على كورنيش طنجة، معروف بسمكه الطازج وأجوائه الهادئة — لكن الحجوزات كانت تضيع بين هاتف مشغول ورسائل واتساب منسية.',
      'الموقع الجديد نقل المائدة إلى الشاشة: قائمة حيّة تتبدل مع المواسم، حجز مباشر للطاولات، وصور تحكي عن المنتج دون كلمة واحدة.',
    ],
    challenge: 'الزبون الأجنبي يبحث بالفرنسية والإنجليزية، والزبون المحلي بالدارجة — كان على الموقع أن يخاطب الاثنين، وأن يبقى سريعاً على أي هاتف، وأن يمنح ثقة تليق بمطعم بهذا المستوى.',
    pullQuote: 'يجب أن يكون الحجز سهلاً كالدخول إلى المطعم: بلا حواجز وبلا انتظار.',
    palette: PALETTES.hospitality,
    typePair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    screens: STORE_SCREENS('le-rouget'),
    metrics: [
      { value: 190, prefix: '+', suffix: '%', label: 'حجوزات شهرية عبر الإنترنت' },
      { value: 2, prefix: '×', label: 'مدة بقاء الزائر' },
      { value: 0.8, suffix: 's', decimals: 1, label: 'سرعة التحميل' },
      { value: 98, label: 'نتيجة Lighthouse' },
    ],
    quote: 'صرنا نستقبل الحجوزات حتى ونحن مغلقون. هذه هي الفائدة الحقيقية.',
    quoteAuthor: 'كريم — مالك لو روجيه، طنجة',
  },
  'mobilia-fes': {
    client: 'موبيليا',
    city: 'fes',
    cityAr: 'فاس',
    year: '2024',
    sector: 'lifestyle',
    sectorTag: 'أسلوب حياة · ديكور',
    services: ['موقع عرض', 'معرض قطع', 'هوية رقمية'],
    duration: '15 يوماً',
    liveUrl: '/stores/fadma-rugs',
    heroTitle: 'موبيليا — أثاث فاسي بلغة معاصرة',
    heroFrench: "l'artisanat en clair-obscur.",
    heroImage: storeHero('fadma-rugs'),
    intro: [
      'معرض أثاث وديكور في فاس يمزج الخشب التقليدي بالخطوط المعاصرة. لقطعه حكايات — لكنها على الإنترنت لم تكن تعدو صوراً في مجموعة واتساب.',
      'صممنا معرضاً رقمياً يشبه المعرض الحقيقي: إضاءة هادئة، خلفيات داكنة، ولكل قطعة مساحتها وتفاصيلها.',
    ],
    challenge: 'الأثاث يُشترى بالعين واللمس — وهو أمر شبه مستحيل على الإنترنت. كانت المقاربة: تصوير سينمائي، تفاصيل قريبة للنقش والخشب، وأبعاد واضحة بخط أحادي حتى يتخيّل الزبون القطعة في بيته.',
    pullQuote: 'لكل طاولة حكاية في الورشة. أردنا أن يسمعها الناس قبل أن يروا الثمن.',
    palette: PALETTES.lifestyle,
    typePair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    screens: STORE_SCREENS('fadma-rugs'),
    metrics: [
      { value: 150, prefix: '+', suffix: '%', label: 'طلبات التوصيل خارج فاس' },
      { value: 2, prefix: '×', label: 'زيارات المعرض' },
      { value: 0.9, suffix: 's', decimals: 1, label: 'سرعة التحميل' },
      { value: 97, label: 'نتيجة Lighthouse' },
    ],
    quote: 'صارت تصلنا طلبات من الدار البيضاء والرباط — ناس لم يزوروا فاس قط. الموقع فتح لنا باباً جديداً.',
    quoteAuthor: 'الحاج مصطفى — موبيليا، فاس',
  },
  'patisserie-agadir': {
    client: 'لحلو آند كو',
    city: 'agadir',
    cityAr: 'أكادير',
    year: '2024',
    sector: 'hospitality',
    sectorTag: 'ضيافة · حلويات',
    services: ['موقع عرض', 'طلبات عبر الإنترنت', 'تصوير منتجات'],
    duration: '12 يوماً',
    liveUrl: '/stores/lahlou-co',
    heroTitle: 'لحلو آند كو — حلويات تفتح الشهية من الشاشة',
    heroFrench: 'la gourmandise en ligne.',
    heroImage: storeHero('lahlou-co'),
    intro: [
      'محل حلويات عصري في أكادير يمزج الحلويات المغربية باللمسة الفرنسية. الطلبات الكبيرة — للأعراس والمناسبات — كانت تدور كلها على الهاتف: تفاصيل وأسعار وتعديلات بلا نهاية.',
      'حوّل الموقع الكتالوج إلى تجربة: كل قطعة مصوَّرة كأنها قطعة مجوهرات، ونموذج طلب واضح يختصر مكالمة عشرين دقيقة في دقيقتين.',
    ],
    challenge: 'الصور هي كل شيء في عالم الحلويات، وصور الهاتف لم تكن تنصف المنتج. ومن جهة أخرى، لا يملك فريق المحل وقتاً لتعلّم نظام معقد.',
    pullQuote: 'أردنا موقعاً يفتح الشهية قبل أن يفكر الزبون في الثمن.',
    palette: PALETTES.hospitality,
    typePair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    screens: STORE_SCREENS('lahlou-co'),
    metrics: [
      { value: 220, prefix: '+', suffix: '%', label: 'طلبات المناسبات' },
      { value: 3, prefix: '×', label: 'طلبات الأعراس' },
      { value: 0.8, suffix: 's', decimals: 1, label: 'سرعة التحميل' },
      { value: 98, label: 'نتيجة Lighthouse' },
    ],
    quote: 'تضاعفت طلبات الأعراس، وأجمل ما في الأمر أن الناس يصلون بطلب واضح جهّزوه من الموقع.',
    quoteAuthor: 'سعاد — مؤسسة لحلو آند كو، أكادير',
  },
};

/** Synthesize a solid case study from a store work entry (data-driven fallback). */
function synthesizeCaseStudy(work: WorkEntry): Omit<CaseStudy, 'slug' | 'nextSlug'> {
  const sectorLabel = SECTOR_LABEL[work.sector];
  return {
    client: work.title,
    city: work.city,
    cityAr: work.cityAr,
    year: work.year,
    sector: work.sector,
    sectorTag: work.sectorTag,
    services: ['موقع عرض', 'هوية رقمية', 'SEO محلي'],
    duration: '14 يوماً',
    liveUrl: work.storeSlug ? `/stores/${work.storeSlug}` : '/',
    heroTitle: `${work.title} — قصة من قطاع ${sectorLabel} ترويها الشاشة`,
    heroFrench: 'chaque projet est une pièce unique.',
    heroImage: work.thumb,
    intro: [
      `${work.title}${work.latin ? ` (${work.latin})` : ''} مشروع من قطاع ${sectorLabel} في ${work.cityAr}. كان المحل يملك كل شيء خارج الإنترنت: المنتج والسمعة والزبناء — وكان ينقصه حضور رقمي يليق به.`,
      'كعادتنا، بدأنا من القصة لا من القالب: ما الذي يميّز هذا المحل، من هو زبونه، وكيف يبحث عنه. تحوّل الجواب إلى تصميم، والتصميم إلى موقع سريع يحوّل الزائر إلى زبون.',
    ],
    challenge: 'يتمتع المحل بسمعة طيبة في حيّه، لكنه بلا حضور رقمي يُذكر — لا موقع ولا حجز، وإنستغرام لا يعدو صوراً عشوائية — بينما دخل منافسون جدد السوق بمواقع أنيقة.',
    pullQuote: 'أردنا موقعاً يشبهنا — لا قالباً جاهزاً وُضع اسمنا عليه.',
    palette: PALETTES[work.sector],
    typePair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    screens: DEFAULT_SCREENS(work),
    metrics: DEFAULT_METRICS,
    quote: 'عمل نظيف، وضوح في الثمن، ونتيجة فاقت التوقعات. صار الموقع أفضل بائع لدينا.',
    quoteAuthor: `فريق ${work.title} — ${work.cityAr}`,
  };
}

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  const work = getWorkBySlug(slug);
  if (!work || !slug) return undefined;
  const base = CASE_STUDIES[slug] ?? synthesizeCaseStudy(work);
  const pool = ALL_WORKS;
  const idx = pool.findIndex((w) => w.slug === slug);
  const next = pool[(idx + 1) % pool.length];
  return { ...base, slug, nextSlug: next.slug };
}
