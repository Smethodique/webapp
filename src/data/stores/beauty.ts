import type { StoreTheme } from './index';
import type { ShaderVariant } from '@/components/shaders';

/**
 * Beauty & Elegance sector — 10 real Moroccan stores.
 *
 * NOTE (superset typing): the scaffold's `StoreTheme` in `./index.ts` only
 * defines the hero-level fields. The master template (design/store-template.md)
 * needs a richer config (layoutVariant, shaderColors pair, surfaceTint /
 * onPrimary, texture, and a full `content` block). We therefore extend the
 * scaffold type here instead of editing index.ts. Every `BeautyStoreConfig`
 * IS a valid `StoreTheme`.
 */

export type LayoutVariant = 'editorial' | 'immersive' | 'mosaic';
export type StoreTexture = 'grain' | 'zellige' | 'scanlines' | 'none';

export interface StoreService {
  title: string;
  desc: string;
  price?: string;
  duration?: string;
}

export interface StoreReview {
  text: string;
  author: string;
  rating: 4 | 5;
  source?: 'Google' | 'Instagram' | 'Welia' | 'TripAdvisor';
}

export interface StoreHours {
  days: string;
  time: string;
}

export interface StoreContent {
  /** French/English accent tagline (rendered as kicker/whisper) */
  taglineFr?: string;
  /** 1–3 hero headline lines */
  heroTitle: string[];
  heroSub: string;
  story: {
    title: string;
    body: string[];
    quote?: { text: string; author: string };
  };
  services: StoreService[];
  gallery: { src: string; caption?: string }[];
  reviews: StoreReview[];
  hours: StoreHours[];
  address: string;
  mapQuery: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
}

export interface BeautyStoreConfig extends Omit<StoreTheme, 'colors'> {
  lang: 'ar' | 'fr';
  category: string;
  layoutVariant: LayoutVariant;
  /** mirrors `shader` — kept for parity with design docs naming */
  shaderVariant: ShaderVariant;
  shaderColors: [string, string];
  colors: StoreTheme['colors'] & {
    surfaceTint: string;
    onPrimary: string;
  };
  texture: StoreTexture;
  content: StoreContent;
}

const img = (slug: string, name: string) => `/stores/${slug}/${name}`;

export const beautyStores: BeautyStoreConfig[] = [
  /* ── 01 · Miya Couture — Fès · haute caftan, royal heritage ─────────── */
  {
    slug: 'miya-couture',
    name: 'Miya Couture',
    nameAr: 'ميا كوتور',
    sector: 'beauty',
    city: 'Fès',
    dir: 'rtl',
    lang: 'ar',
    category: 'دار قفطان وهوت كوتور',
    layoutVariant: 'immersive',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderColors: ['#6E1423', '#D8B25C'],
    colors: {
      primary: '#D8B25C',
      accent: '#8E2434',
      shaderA: '#6E1423',
      shaderB: '#D8B25C',
      surfaceTint: 'rgba(216,178,92,0.05)',
      onPrimary: '#1A120C',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    texture: 'zellige',
    tagline: 'القفطان المغربي، حرفة الملكات.',
    phone: undefined,
    content: {
      taglineFr: "l'héritage cousu main — depuis 1996",
      heroTitle: ['القفطان المغربي،', 'حرفة الملكات.'],
      heroSub:
        'دار هوت كوتور فاسية منذ 1996. تطريز يدوي دقيق، لآلئ مزروعة حبة حبة، وأقمشة نبيلة تحكي تراث فاس بروح عصرية — من عرض القفطان بالدوحة إلى منصّات العالم.',
      story: {
        title: 'دار وُلدت في فاس، وتلبسها العواصم',
        body: [
          'تأسست دار ميا كوتور على يد المصممة أمينة بنموسى، ابنة فاس، سنة 1996 — في مدينة يُنسج فيها الحرير منذ قرون. من قلب العاصمة الروحية، حملت الدار إرث الصنعة الفاسية: رشمة بالحرير، سفساري، وعقّاد يُدار باليد، ولآلئ تُزرع واحدة واحدة على بروكار يُنسج خصيصاً.',
          'في دجنبر 2024، اختيرت ميا كوتور ضمن الدور المغربية التي مثّلت القفطان في العرض الكبير بالدوحة، أمام متحف الفن الإسلامي وبحضور أميري — تتويج لمسارٍ من التطريز الدقيق الذي يمزج الذاكرة الفاسية بخطوط معاصرة.',
          'كل قطعة تخرج من الأتيلييه تحمل توقيع معلّمات خبّطن على الصدر والأكمام ساعات طوال، لتلبسها العروس والسيدة اللاتي يعرفن أن الفخامة تُقاس بالتفاصيل.',
        ],
        quote: {
          text: 'القفطان ماشي لباس… القفطان ذاكرة مدينة كاملة مخيطة في قطعة قماش.',
          author: 'أمينة بنموسى، المؤسِّسة',
        },
      },
      services: [
        {
          title: 'قفطان هوت كوتور بالطلب',
          desc: 'قطعة فريدة تُصمَّم وتُخاط على قياسك — اختيار البروكار، الرشمة، واللآلئ في جلسة خاصة.',
          price: 'من 8.000 DH',
        },
        {
          title: 'تكشيطة العروس',
          desc: 'طقم عرس كامل بطبقات تقليدية، حزام مضمّة، وتطريز سفساري — مع بروفات في الدار.',
          price: 'من 15.000 DH',
        },
        {
          title: 'قفطان سواريه',
          desc: 'قفاطين السهرة والمناسبات الكبرى بأقمشة نبيلة وتشطيبات يدوية كاملة.',
          price: 'من 6.500 DH',
        },
        {
          title: 'جلابة راقية',
          desc: 'جلاليب موسمية بخياطة الدار وتطريز خفيف، للإطلالة اليومية الفاخرة.',
          price: 'من 2.800 DH',
        },
        {
          title: 'تعديل وتفصيل القطع العائلية',
          desc: 'إحياء قفطان العائلة القديم: ترميم التطريز، تحديث القصّة، والحفاظ على روح القطعة.',
          price: 'حسب القطعة',
        },
      ],
      gallery: [
        { src: img('miya-couture', 'gallery-1.jpg'), caption: 'من عرض القفطان — الدوحة 2024' },
        { src: img('miya-couture', 'gallery-2.jpg'), caption: 'قفاطين الدار على المنصة' },
        { src: img('miya-couture', 'gallery-3.jpg'), caption: 'تشكيلة بألوان الموسم' },
      ],
      reviews: [
        {
          text: 'قفطان العرس ديالي من عندهم كان تحفة. التطريز واللآلئ خدّامين باليد، والقياس مضبوط من أول بروفة.',
          author: 'سلمى ب.',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'دار عريقة بمعنى الكلمة. حسّيت بالفرق في نوعية القماش والتشطيب مقارنة مع كل ما جربت قبل.',
          author: 'خديجة م.',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'خدمة راقية ومواعيد محترمة. الاستقبال في الدار تجربة بحد ذاتها.',
          author: 'ياسمين التازي',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الاثنين — الجمعة', time: '10:00 — 19:00' },
        { days: 'السبت', time: '10:00 — 17:00' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: 'فاس، المغرب — الأتيلييه يستقبل بموعد مسبق',
      mapQuery: 'Miya Couture Fès',
      instagram: 'https://www.instagram.com/miya.couture/',
    },
  },

  /* ── 02 · Myriam Bouafi — Casablanca · modern couture ───────────────── */
  {
    slug: 'myriam-bouafi',
    name: 'Myriam Bouafi Couture',
    nameAr: 'مريم بوعافي كوتور',
    sector: 'beauty',
    city: 'Casablanca',
    dir: 'rtl',
    lang: 'ar',
    category: 'قفطان وأزياء راقية',
    layoutVariant: 'editorial',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderColors: ['#3A1520', '#C9A8B0'],
    colors: {
      primary: '#C9A8B0',
      accent: '#D8B25C',
      shaderA: '#3A1520',
      shaderB: '#C9A8B0',
      surfaceTint: 'rgba(201,168,176,0.05)',
      onPrimary: '#0C0A0B',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans Arabic' },
    texture: 'grain',
    tagline: 'قفطان 2025: التراث في قصّة عصرية.',
    phone: '+212 667 672 768',
    content: {
      taglineFr: 'Maison MB — Casablanca',
      heroTitle: ['قفطان 2025:', 'التراث في قصّة عصرية.'],
      heroSub:
        '«كاهنة القفطان» كما سمّتها الصحافة. مريم بوعافي تعيد ابتكار القفطان المخزني بروح فينتاج: تطريز نتاعة وزواك يدوي، بروكار يُنسج خصيصاً، وأكعاد XXL كبصمة لا تُخطئها العين.',
      story: {
        title: 'بين الفنتاج والمخزني: قاموس مريم بوعافي',
        body: [
          'في أتيلييه حي بوركون بالدار البيضاء، تشتغل مريم بوعافي على القفطان كما يشتغل النحّات على الحجر: تجمع القطع الأثرية، تفككها، وتعيد تركيبها بجرأة الألوان المتعارضة التي تتصالح تحت يديها.',
          'بصمتها معروفة: أكعاد XXL، تطريز نتاعة وزواك ينفذ يدوياً بالكامل، وبروكار تنسجه خصيصاً لكل مجموعة. من «فام دي ماروك» إلى Shoelifer وLe360، الصحافة تلقبها بكاهنة القفطان — وهي تفضل أن تقول: أنا فقط ناسخة ذاكرة المدن.',
          'وبخطّها الجديد Maison MB، تخرج الدار من قاعات الأعراس إلى اليومي الراقي: قطع prêt-à-porter تحمل نفس اليد ونفس الجنون.',
        ],
        quote: {
          text: 'الألوان المتعارضة ملي تلتقي بالصح، كتولي تنشد.',
          author: 'مريم بوعافي',
        },
      },
      services: [
        {
          title: 'قفطان مخزني بالطلب',
          desc: 'إعادة قراءة معاصرة للقفطان المخزني — أكعاد XXL، تطريز نتاعة وزواك، بروكار منسوج خصيصاً.',
          price: 'من 9.000 DH',
        },
        {
          title: 'تكشيطة وقفطان العروس',
          desc: 'إطلالة عرس كاملة بروح الدار: قطع فينتاج مُعاد ابتكارها وتطريز يدوي كامل.',
          price: 'من 14.000 DH',
        },
        {
          title: 'Maison MB — prêt-à-porter',
          desc: 'خط الدار الجاهز: قطع يومية فاخرة بروح الأرشيف، بما فيها مجموعة الجلد.',
          price: 'من 1.500 DH',
        },
        {
          title: 'قفطان سواريه ومناسبات',
          desc: 'قصّات جريئة بألوان متعارضة متناغمة للسهرات والمنصات.',
          price: 'من 6.000 DH',
        },
        {
          title: 'استشارة ستايل خاصة',
          desc: 'جلسة في الأتيلييه لبناء إطلالة كاملة: قماش، لون، قصّة، وإكسسوار.',
          price: 'بموعد مسبق',
        },
      ],
      gallery: [
        { src: img('myriam-bouafi', 'gallery-1.jpg'), caption: 'قفطان مخزني — روح فينتاج' },
        { src: img('myriam-bouafi', 'gallery-2.jpg'), caption: 'بروكار ذهبي — جلسة تصوير الدار' },
        { src: img('myriam-bouafi', 'gallery-3.jpg'), caption: 'من مجموعة الدار' },
      ],
      reviews: [
        {
          text: 'مريم بوعافي ما كتخيطش قفطان، كتكتب ليك حكاية. القطعة ديالي ولات حديث كل عرس نحضرو.',
          author: 'نسرين ل.',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'أتيلييه راقٍ في بوركون، استقبال شخصي وذوق استثنائي. الأكعاد XXL ديالها علامة مميزة بجد.',
          author: 'مريم ع.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'طلبت قفطان للخطوبة وكان فوق التوقع — الجرأة في الألوان والدقة في التطريز.',
          author: 'إيمان ب.',
          rating: 5,
          source: 'Instagram',
        },
      ],
      hours: [
        { days: 'الاثنين — الجمعة', time: '10:00 — 19:00' },
        { days: 'السبت', time: '11:00 — 18:00' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: 'Rue Tan Tan, Quartier Bourgogne, Casablanca',
      mapQuery: 'Myriam Bouafi Couture Casablanca',
      phone: '+212 667 672 768',
      whatsapp: '+212 667 672 768',
      instagram: 'https://www.instagram.com/myriambouaficouture/',
    },
  },

  /* ── 03 · Atelier 44 — Marrakech · French-first boutique ────────────── */
  {
    slug: 'atelier-44',
    name: 'Atelier 44',
    nameAr: 'أتيلييه 44',
    sector: 'beauty',
    city: 'Marrakech',
    dir: 'ltr',
    lang: 'fr',
    category: 'Boutique & concept store',
    layoutVariant: 'immersive',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderColors: ['#6E1423', '#F1E9DC'],
    colors: {
      primary: '#8E2434',
      accent: '#D8B25C',
      shaderA: '#6E1423',
      shaderB: '#F1E9DC',
      surfaceTint: 'rgba(142,36,52,0.07)',
      onPrimary: '#F1E9DC',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans' },
    texture: 'grain',
    tagline: 'La boutique où la beauté rencontre la mode.',
    content: {
      taglineFr: 'Guéliz — Marrakech',
      heroTitle: ['La boutique de mère', "et fille, à Guéliz."],
      heroSub:
        "Wafaa et Meriem El Bardi, mère et fille, ont ouvert à Guéliz une boutique-concept hors des catalogues uniformes : caftans, pièces de créateurs marocains et objets d'artisans choisis un à un — « quand la beauté rencontre la mode ».",
      story: {
        title: 'Une affaire de famille et de goût',
        body: [
          "Atelier 44 est né d'une évidence : le goût se transmet. Wafaa et sa fille Meriem parcourent les ateliers du Maroc — maâlems, tisseuses, créateurs émergents — et n'accrochent dans leur boutique de Guéliz que les pièces qu'elles porteraient elles-mêmes.",
          "Ici, pas de collections dupliquées : chaque caftan, chaque accessoire est une pièce choisie, parfois unique. Le lieu lui-même — façade profonde rue de la Liberté, cimaises lumineuses — a été pensé comme un cabinet de curiosités contemporain.",
          "Repéré par les guides shopping de la ville ocre, Atelier 44 est devenu l'adresse que l'on se passe entre amies : « regardez leur Insta, puis poussez la porte ».",
        ],
        quote: {
          text: "On ne vend pas des vêtements. On partage des coups de cœur.",
          author: 'Wafaa & Meriem El Bardi',
        },
      },
      services: [
        {
          title: 'Caftans & tenues de cérémonie',
          desc: 'Sélection de caftans et takchitas de créateurs marocains, pièces uniques ou petites séries.',
          price: 'à partir de 1.800 DH',
        },
        {
          title: 'Créateurs marocains émergents',
          desc: 'Prêt-à-porter pointu choisi auprès de jeunes maisons du pays.',
          price: 'à partir de 650 DH',
        },
        {
          title: 'Accessoires & bijoux artisanaux',
          desc: "Sacs, ceintures et bijoux façonnés par des maâlems partenaires.",
          price: 'à partir de 250 DH',
        },
        {
          title: 'Conseil en style',
          desc: "Un œil de mère et de fille pour composer votre silhouette de A à Z, en boutique.",
          price: 'sur rendez-vous',
        },
        {
          title: 'Commande spéciale',
          desc: "Une pièce vue sur notre Instagram n'est plus en boutique ? On la retrouve ou on la refait.",
          price: 'selon pièce',
        },
      ],
      gallery: [
        { src: img('atelier-44', 'gallery-1.jpg'), caption: 'Esprit bohème-chic — sélection maison' },
        { src: img('atelier-44', 'gallery-2.jpg'), caption: 'Boutique de créateurs, Guéliz' },
        { src: img('atelier-44', 'gallery-3.jpg'), caption: "L'intérieur de la boutique" },
      ],
      reviews: [
        {
          text: "La plus belle boutique de Guéliz. Chaque pièce semble avoir une histoire, et l'accueil mère-fille est adorable.",
          author: 'Claire D.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'Pièces uniques, loin des catalogues. J’ai trouvé mon caftan de fiançailles ici.',
          author: 'Salma R.',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'Une adresse confidentielle que les Marrakchies se transmettent. Goût impeccable.',
          author: 'Lina M.',
          rating: 4,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'Lundi — Samedi', time: '10:00 — 13:00 / 15:00 — 19:30' },
        { days: 'Dimanche', time: 'Fermé' },
      ],
      address: 'Guéliz, Marrakech — voir Instagram pour la vitrine du jour',
      mapQuery: 'Atelier 44 Guéliz Marrakech',
      instagram: 'https://www.instagram.com/atelier44.marrakech/',
    },
  },

  /* ── 04 · Meraki Studio — Casablanca · beauty studio (women only) ───── */
  {
    slug: 'meraki-studio',
    name: 'Meraki Studio',
    nameAr: 'ميراكي ستوديو',
    sector: 'beauty',
    city: 'Casablanca',
    dir: 'rtl',
    lang: 'ar',
    category: 'ستوديو تجميل وعناية — نسائي',
    layoutVariant: 'editorial',
    shader: 'petal',
    shaderVariant: 'petal',
    shaderColors: ['#8E2434', '#EAD3CE'],
    colors: {
      primary: '#8E2434',
      accent: '#D8B25C',
      shaderA: '#8E2434',
      shaderB: '#EAD3CE',
      surfaceTint: 'rgba(142,36,52,0.06)',
      onPrimary: '#F1E9DC',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    texture: 'zellige',
    tagline: 'فخامة، أناقة، وراحة بال — للنساء فقط.',
    content: {
      taglineFr: 'Luxe, élégance et bien-être — Maârif',
      heroTitle: ['مساحتك النسائية', 'للجمال والهدوء.'],
      heroSub:
        'ستوديو نسائي بالكامل في قلب المعاريف: شعر، أظافر، مساج، وHydrafacial في ديكور راقٍ — مع قهوة، واي فاي، وخدمة Voisiturier. تقييم 4.9 من +269 زبونة على منصات الحجز.',
      story: {
        title: '«Meraki» — أن تضعي روحك في ما تفعلين',
        body: [
          'الاسم يوناني المعنى: أن تنجزي شيئاً بحب، وتتركي فيه جزءاً من روحك. هكذا وُلد ميراكي ستوديو في المعاريف — ستوديو نسائي صِرف، مصمم ليكون «المكان السعيد» الذي تدخله الزبونة لتخرج أخفّ وأجمل.',
          'من الاستقبال المكتوب عليه Welcome to your happy place إلى كراسي الحلاقة الجلدية وغرف العناية الخاصة، كل تفصيلة مدروسة: إضاءة ناعمة، منتجات مختارة، وقهوة تُقدَّم وأنتِ تنتظرين لونك.',
          'النتيجة؟ تقييم 4.9 من أكثر من 269 تقييماً موثّقاً، وصديقات يحجزن معاً ليحوّلن حصة التجميل إلى نزهة.',
        ],
        quote: {
          text: 'دخلي مريحة، خرجي متوهجة — هادشي علاش كاين ميراكي.',
          author: 'فريق ميراكي',
        },
      },
      services: [
        {
          title: 'Hydrafacial',
          desc: 'تنظيف عميق وترطيب مكثف للوجه بتقنية Hydrafacial — نتيجة مشرقة من أول حصة.',
          price: '650 DH',
          duration: '60 min',
        },
        {
          title: 'قصّة وصبغة شعر',
          desc: 'قصّ، صبغة، بالاياج وتسريحات على يد كوافيرات خبيرات، بمنتجات احترافية.',
          price: 'من 300 DH',
          duration: '90 min',
        },
        {
          title: 'مانيكير وباديكير',
          desc: 'عناية كاملة بالأظافر: جل، ورنيش شبه دائم، وتشطيب دقيق في ركن الأظافر.',
          price: 'من 180 DH',
          duration: '60 min',
        },
        {
          title: 'مساج استرخائي',
          desc: 'حصة مساج في غرفة خاصة هادئة لإذابة توتر الأسبوع.',
          price: '400 DH',
          duration: '60 min',
        },
        {
          title: 'تشقير وحواجب',
          desc: 'رسم الحواجب، تشقير الوجه، وتفاصيل اللمسة الأخيرة قبل مناسباتك.',
          price: 'من 100 DH',
          duration: '30 min',
        },
      ],
      gallery: [
        { src: img('meraki-studio', 'gallery-1.jpg'), caption: 'ركن غسل الشعر — تصميم هادئ' },
        { src: img('meraki-studio', 'gallery-2.jpg'), caption: 'محطات التصفيف' },
        { src: img('meraki-studio', 'gallery-3.jpg'), caption: 'غرفة العناية الخاصة' },
      ],
      reviews: [
        {
          text: 'أحسن ستوديو نسائي جربتو في كازا. النظافة، الاحترافية، والاستقبال — كلشي 10/10. صديق للمحجبات.',
          author: 'أمينة ك.',
          rating: 5,
          source: 'Welia',
        },
        {
          text: 'الهيدرافاشيال عندهم غيّر بشرتي. المكان هادئ والديكور يفتح النفس، والقهوة زوينة.',
          author: 'سارة م.',
          rating: 5,
          source: 'Welia',
        },
        {
          text: 'كنحجز أنا وصاحبتي كل شهر. المواعيد محترمة والبنات لطاف بزاف.',
          author: 'فدوى ب.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الاثنين — السبت', time: '10:00 — 20:00' },
        { days: 'الأحد', time: '11:00 — 18:00' },
      ],
      address: 'حي المعاريف، الدار البيضاء',
      mapQuery: 'Meraki Studio Maârif Casablanca',
      instagram: 'https://www.instagram.com/meraki.studio.casablanca/',
    },
  },

  /* ── 05 · Happy Sens Spa — Rabat · traditional hammam & spa ─────────── */
  {
    slug: 'happy-sens-spa',
    name: 'Happy Sens Spa',
    nameAr: 'هابي سينس سبا',
    sector: 'beauty',
    city: 'Rabat',
    dir: 'rtl',
    lang: 'ar',
    category: 'سبا وحمّام مغربي',
    layoutVariant: 'immersive',
    shader: 'steam',
    shaderVariant: 'steam',
    shaderColors: ['#7A5A3A', '#D8B25C'],
    colors: {
      primary: '#B08D57',
      accent: '#7A5A3A',
      shaderA: '#7A5A3A',
      shaderB: '#D8B25C',
      surfaceTint: 'rgba(176,141,87,0.06)',
      onPrimary: '#1A120C',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    texture: 'zellige',
    tagline: 'حمّام تقليدي، طقوس النقاء.',
    content: {
      taglineFr: 'Le réveil des sens — Hay Riad',
      heroTitle: ['حمّام تقليدي،', 'طقوس النقاء.'],
      heroSub:
        'في قلب حي الرياض بالرباط، سبا يجمع الحمّام المغربي الأصيل بالمساجات العالمية — سويدي، تايلندي، وطقوس شرقية — في أجواء هادئة بإضاءة طبيعية وغرفة VIP. مذكور في الدليل الرسمي لسياحة الرباط.',
      story: {
        title: '«إيقاظ الحواس» — فلسفة المكان',
        body: [
          'تحت اسم «هابي سينس» — إيقاظ الحواس — فتح هذا السبا أبوابه في المركب التجاري رياض نخيل، ليقدّم تجربة استجمام كاملة بأسعار في المتناول، بعيداً عن أسعار الفنادق الكبرى.',
          'الطقوس تبدأ من الحمّام المغربي التقليدي: بخار، صابون بلدي، وكيس كيسة على يد كيّاسات خبيرات، ثم تكمل نحو مساج سويدي أو تايلندي أو طقس شرقي بالزيوت العطرية، وتنتهي بكأس أتاي في ركن الراحة.',
          'بـ674 تقييماً على منصات السفر وذكره في الموقع الرسمي Visit Rabat، أصبح هابي سينس عنوان العافية في العاصمة — سواء جئتِ وحدك أو مع صديقاتك في الغرفة الVIP.',
        ],
        quote: {
          text: 'الحمّام عندنا ماشي غسيل… هو طقس كنكملوه بابتسامة وأتاي.',
          author: 'فريق هابي سينس',
        },
      },
      services: [
        {
          title: 'حمّام مغربي تقليدي',
          desc: 'بخار، صابون بلدي، تقشير بالكيسة، ولفّ بالغسول — الطقس الكامل.',
          price: '200 DH',
          duration: '60 min',
        },
        {
          title: 'طقس «الشرقي الملكي»',
          desc: 'حمّام + تقشير + مساج بالزيوت العطرية — التجربة الكاملة للدار.',
          price: '550 DH',
          duration: '120 min',
        },
        {
          title: 'مساج سويدي',
          desc: 'مساج استرخائي عميق بحركات طويلة لإرخاء العضلات.',
          price: '350 DH',
          duration: '60 min',
        },
        {
          title: 'مساج تايلندي',
          desc: 'تمدد وضغط على خطوط الطاقة، على يد مختصين.',
          price: '400 DH',
          duration: '60 min',
        },
        {
          title: 'غرفة VIP للثنائيات',
          desc: 'جناح خاص لشخصين: حمّام + مساج + أتاي وحلويات في أجواء حميمة.',
          price: '900 DH',
          duration: '120 min',
        },
      ],
      gallery: [
        { src: img('happy-sens-spa', 'gallery-1.jpg'), caption: 'أجواء السبا — شموع ومناشف دافئة' },
        { src: img('happy-sens-spa', 'gallery-2.jpg'), caption: 'طقوس الحمّام والعناية' },
        { src: img('happy-sens-spa', 'gallery-3.jpg'), caption: 'مدخل السبا — رياض نخيل' },
      ],
      reviews: [
        {
          text: 'أحسن سبا في الرباط بهاد الثمن. الحمّام نظيف، الكيّاسة محترفة، والمساج السويدي كان رائع.',
          author: 'كوثر ر.',
          rating: 5,
          source: 'TripAdvisor',
        },
        {
          text: 'حجزت غرفة VIP أنا وصاحبتي — طقس كامل من الحمّام للمساج مع أتاي. نهار ما كيتنساش.',
          author: 'هبة ا.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'مكان هادئ وإضاءة طبيعية زوينة. المساج التايلندي كان دقيق ومحترف.',
          author: 'Mehdi A.',
          rating: 4,
          source: 'TripAdvisor',
        },
      ],
      hours: [
        { days: 'الاثنين — السبت', time: '10:00 — 20:00' },
        { days: 'الأحد', time: '10:00 — 19:00' },
      ],
      address: '313 Rue Arroz, Magasin N°4, Centre Commercial Riad Nakhil, Hay Riad, Rabat',
      mapQuery: 'Happy Sens Spa Rabat',
      phone: '+212 616 792 043',
      whatsapp: '+212 616 792 043',
      instagram: 'https://www.instagram.com/happysenssarl/',
    },
  },

  /* ── 06 · Hammam Le Pacha — Casablanca · urban hammam & spa ─────────── */
  {
    slug: 'hammam-le-pacha',
    name: 'Hammam & Spa Le Pacha',
    nameAr: 'حمّام وسبا الباشا',
    sector: 'beauty',
    city: 'Casablanca',
    dir: 'rtl',
    lang: 'ar',
    category: 'حمّام وسبا متعدد الخدمات',
    layoutVariant: 'editorial',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderColors: ['#4A3F3A', '#D8B25C'],
    colors: {
      primary: '#D8B25C',
      accent: '#B98A8A',
      shaderA: '#4A3F3A',
      shaderB: '#D8B25C',
      surfaceTint: 'rgba(216,178,92,0.05)',
      onPrimary: '#1A120C',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans Arabic' },
    texture: 'grain',
    tagline: 'حمّام الحيّ الذي يدلّلك كالباشا.',
    content: {
      taglineFr: 'Rue Gandhi — Quartier Oasis',
      heroTitle: ['حمّام الحيّ،', 'بدلالة الباشا.'],
      heroSub:
        'منذ سنوات في شارع غاندي بحي الواحة: حمّام، ساونا، جاكوزي، مساج، عناية بالوجه وحتى تصفيف — كل طقوس الجمال المغربي تحت سقف واحد، وبأسعار الحي.',
      story: {
        title: 'مؤسسة الحيّ التي تعرف أسماء زبنائها',
        body: [
          'قبل أن تصبح السباهات موضة، كان حمّام الباشا يفتح أبوابه كل صباح لجيران حي الواحة: بخار صاعد، رخام دافئ، وريحة الصابون البلدي. مؤسسة محلية بمعنى الكلمة — يعرف فيها الطاقم الزبناء بأسمائهم وعاداتهم.',
          'ما يميّز الباشا أنه بيت جمال كامل: حمّام تقليدي وساونا وجاكوزي، مساج وعناية بالوجه، وحتى حلاقة وتصفيف — تدخل لساعة حمّام وتخرج متجدداً من الرأس إلى القدمين.',
          'قاعاته الواسعة بأقواسها ورخامها تحافظ على روح الحمّام المغربي الأصيل، مع لمسة سبا عصرية في التعقيم والخدمة.',
        ],
        quote: {
          text: 'الزبون ديالنا جارنا — والجار مالو إلا الكرامة.',
          author: 'إدارة حمّام الباشا',
        },
      },
      services: [
        {
          title: 'حمّام تقليدي',
          desc: 'بخار، صابون بلدي، وتقشير بالكيسة على يد كيّاس(ة) خبير(ة).',
          price: '80 DH',
          duration: '60 min',
        },
        {
          title: 'حمّام + مساج',
          desc: 'الطقس الكامل: حمّام ثم مساج استرخائي بالزيوت.',
          price: '300 DH',
          duration: '90 min',
        },
        {
          title: 'ساونا وجاكوزي',
          desc: 'حصة ساونا وجاكوزي لتصفية الجسم وإرخاء العضلات.',
          price: '150 DH',
          duration: '45 min',
        },
        {
          title: 'عناية بالوجه',
          desc: 'تنظيف وترطيب الوجه بمنتجات طبيعية بعد الحمّام.',
          price: '200 DH',
          duration: '45 min',
        },
        {
          title: 'حلاقة وتصفيف',
          desc: 'ركن الحلاقة والتصفيف داخل المؤسسة — للرجال والنساء.',
          price: 'من 50 DH',
          duration: '30 min',
        },
      ],
      gallery: [
        { src: img('hammam-le-pacha', 'gallery-1.jpg'), caption: 'الكيسة والصابون البلدي — عدة الطقس' },
        { src: img('hammam-le-pacha', 'gallery-2.jpg'), caption: 'قاعة الاستقبال' },
        { src: img('hammam-le-pacha', 'gallery-3.jpg'), caption: 'فضاء الاسترخاء' },
      ],
      reviews: [
        {
          text: 'حمّام الحي اللي كبرت فيه. نظيف، ثمن مناسب، والكيّاسة خدّامة مزيان. كنرجع ليه كل أسبوع.',
          author: 'حسن و.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'جاكوزي + مساج بعد نهار طويل — ولا أروع. الطاقم محترم والمكان معقّم.',
          author: 'نعيمة ف.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'خدمة كاملة في بلاصة وحدة: حمّام، مساج، وعناية بالوجه. مضطررتيش تدور على شي حاجة أخرى.',
          author: 'Khadija S.',
          rating: 4,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الاثنين — السبت', time: '09:00 — 21:00' },
        { days: 'الأحد', time: '10:00 — 20:00' },
      ],
      address: 'Rue Gandhi, Quartier Oasis, Casablanca',
      mapQuery: 'Hammam SPA Le Pacha Casablanca',
      phone: '+212 522 77 42 41',
    },
  },

  /* ── 07 · Beauty by Riihaab — Agadir · French-first beauty studio ───── */
  {
    slug: 'beauty-by-riihaab',
    name: 'Beauty By Riihaab',
    nameAr: 'بيوتي باي ريهاب',
    sector: 'beauty',
    city: 'Agadir',
    dir: 'ltr',
    lang: 'fr',
    category: 'Studio de beauté — cils, ongles, maquillage',
    layoutVariant: 'immersive',
    shader: 'petal',
    shaderVariant: 'petal',
    shaderColors: ['#B98A8A', '#F1E9DC'],
    colors: {
      primary: '#B98A8A',
      accent: '#D8B25C',
      shaderA: '#B98A8A',
      shaderB: '#F1E9DC',
      surfaceTint: 'rgba(185,138,138,0.06)',
      onPrimary: '#0C0A0B',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans' },
    texture: 'grain',
    tagline: 'Un instant hors du temps.',
    content: {
      taglineFr: 'Quartier Taddart — Agadir',
      heroTitle: ['Un instant', 'hors du temps.'],
      heroSub:
        "Le studio le mieux noté d'Agadir (5,0 sur Welia) : extensions de cils, sourcils, ongles et maquillage semi-permanent — plus de 40 prestations dans un cocon féminin et contemporain, avenue des FAR.",
      story: {
        title: "L'obsession du détail, signature Riihaab",
        body: [
          "À Taddart, Beauty By Riihaab s'est imposé comme la référence beauté d'Agadir : note parfaite de 5,0 sur la plateforme de réservation Welia, avec des clientes qui reviennent pour la précision autant que pour l'ambiance.",
          "Le studio est le royaume du regard : extensions de cils volume russe, restructuration des sourcils, rehaussement — chaque geste est millimétré. S'y ajoutent un bar à ongles complet et le maquillage semi-permanent, pour un total de plus de 40 prestations.",
          "Ici, on ne court pas après la tendance : on l'ajuste à votre visage. Le résultat doit tenir au réveil comme en photo — c'est la promesse du studio.",
        ],
        quote: {
          text: 'La beauté, c’est 90 % de précision et 10 % de paillettes.',
          author: 'Riihaab, fondatrice',
        },
      },
      services: [
        {
          title: 'Extensions de cils',
          desc: 'Pose cil à cil ou volume russe, courbure et densité adaptées à votre œil.',
          price: 'à partir de 350 DH',
          duration: '90 min',
        },
        {
          title: 'Brow lift & sourcils',
          desc: 'Restructuration, teinture et brow lift pour un regard ouvert durablement.',
          price: '250 DH',
          duration: '45 min',
        },
        {
          title: 'Ongles — gel & semi-permanent',
          desc: 'Manucure complète, gel, nail art minimaliste ou affirmé.',
          price: 'à partir de 180 DH',
          duration: '60 min',
        },
        {
          title: 'Maquillage semi-permanent',
          desc: 'Lèvres et sourcils en maquillage longue durée, tracé sur mesure.',
          price: 'sur devis',
          duration: '120 min',
        },
        {
          title: 'Maquillage événementiel',
          desc: 'Mise en beauté complète pour fiançailles, soirées et shootings.',
          price: 'à partir de 400 DH',
          duration: '60 min',
        },
      ],
      gallery: [
        { src: img('beauty-by-riihaab', 'gallery-1.jpg'), caption: 'Extensions de cils — volume russe' },
        { src: img('beauty-by-riihaab', 'gallery-2.jpg'), caption: 'Maquillage des lèvres, avant / après' },
        { src: img('beauty-by-riihaab', 'gallery-3.jpg'), caption: 'L’univers du studio' },
      ],
      reviews: [
        {
          text: 'Note parfaite méritée. Mes cils tiennent des semaines et le résultat est naturel. Le studio est adorable.',
          author: 'Imane T.',
          rating: 5,
          source: 'Welia',
        },
        {
          text: 'Précision incroyable sur les sourcils. On sent le travail de passionnée.',
          author: 'Sofia B.',
          rating: 5,
          source: 'Welia',
        },
        {
          text: 'Studio propre, ponctuel, et un accueil qui met à l’aise. Ma référence à Agadir.',
          author: 'Ghita E.',
          rating: 5,
          source: 'Welia',
        },
      ],
      hours: [
        { days: 'Lundi — Samedi', time: '10:00 — 19:30' },
        { days: 'Dimanche', time: 'Fermé' },
      ],
      address: 'Avenue des Forces Armées Royales, Quartier Taddart, Agadir',
      mapQuery: 'Beauty By Riihaab Agadir',
      instagram: 'https://www.instagram.com/beauty.by.riihaab/',
    },
  },

  /* ── 08 · Studio GleM — Marrakech · concept barber, one chair ───────── */
  {
    slug: 'studio-glem',
    name: 'Studio GleM',
    nameAr: 'ستوديو غليم',
    sector: 'beauty',
    city: 'Marrakech',
    dir: 'rtl',
    lang: 'ar',
    category: 'باربرشوب كونسيبت',
    layoutVariant: 'mosaic',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderColors: ['#7A2E2E', '#B08D57'],
    colors: {
      primary: '#B08D57',
      accent: '#7A2E2E',
      shaderA: '#7A2E2E',
      shaderB: '#B08D57',
      surfaceTint: 'rgba(176,141,87,0.06)',
      onPrimary: '#1A120C',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    texture: 'grain',
    tagline: 'كرسي واحد. حرفي واحد. طقس كامل.',
    content: {
      taglineFr: '172 Av. Mohammed V — Guéliz',
      heroTitle: ['كرسي واحد،', 'حرفي واحد،', 'طقس كامل.'],
      heroSub:
        'في 172 شارع محمد الخامس بجليز، الأستاذ رشيد يستقبل زبوناً واحداً في كل مرة: قصّة، لحية بالموس، منشفة ساخنة، ومساج رأس — مع أتاي وحديث هادئ. الاختيار رقم 1 في دليل أفضل حلاقي مراكش.',
      story: {
        title: 'غرفة معيشة، لا صالون',
        body: [
          'أكثر من عشر سنوات والأستاذ رشيد يمارس الحلاقة كحرفة فردية. في ستوديو غليم لا طابور ولا ضجيج: كرسي واحد، مرآة كبيرة، وزبون واحد يحظى بكل الانتباه — كأنك في غرفة معيشة صديق يتقن الموس.',
          'الطقس ثابت ولا يُختصر: تشاور حول القصّة، قصّ بالمقص والموس، نحت اللحية بشفرة جراحية الدقة، منشفة ساخنة تفتح المسام، ثم مساج رأس يمحو تعب النهار — وكأس أتاي بين كل ذلك.',
          'دليل Marrakech Private اختاره أولاً بين حلاقي المدينة، وزبنائه يحجزون عبر واتساب قبل أيام — لأن الكرسي واحد، والوقت هنا لا يُستعجل.',
        ],
        quote: {
          text: 'الحلاقة ماشي خدمة… هي نصف ساعة كترد فيها الراس للراس.',
          author: 'الأستاذ رشيد',
        },
      },
      services: [
        {
          title: 'الطقس الكامل (Signature)',
          desc: 'قصّة + لحية بالموس + منشفة ساخنة + مساج رأس + أتاي. التجربة كاملة، بلا اختصار.',
          price: '250 DH',
          duration: '60 min',
        },
        {
          title: 'قصّة شعر',
          desc: 'قصّ بالمقص والموس حسب شكل الوجه، مع تشطيب دقيق.',
          price: '150 DH',
          duration: '40 min',
        },
        {
          title: 'نحت اللحية بالموس',
          desc: 'تحديد وحلاقة تقليدية بالشفرة، مع زيوت اللحية.',
          price: '100 DH',
          duration: '30 min',
        },
        {
          title: 'منشفة ساخنة وعناية',
          desc: 'منشفة ساخنة، تنظيف الوجه، وترطيب — إعادة ضبط كاملة.',
          price: '120 DH',
          duration: '30 min',
        },
      ],
      gallery: [
        { src: img('studio-glem', 'gallery-1.jpg'), caption: 'النتيجة — بعد الطقس الكامل' },
        { src: img('studio-glem', 'gallery-2.jpg'), caption: 'الصالون — جليز، مراكش' },
        { src: img('studio-glem', 'gallery-3.jpg'), caption: 'حلاقة الموس والمنشفة الساخنة' },
      ],
      reviews: [
        {
          text: 'أفضل تجربة حلاقة في مراكش بلا منازع. كرسي واحد يعني ما كاين لا استعجال لا والو — رشيد خدام على القطعة.',
          author: 'يوسف ك.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'المنشفة الساخنة ومساج الرأس مع أتاي… خرجت من عندو راجل جديد. كنحجز قبل بأيام.',
          author: 'Adam B.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'Définitivement le meilleur barbier de Guéliz. Précision chirurgicale et accueil salon-de-thé.',
          author: 'Karim T.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الاثنين — السبت', time: '10:00 — 21:00' },
        { days: 'الأحد', time: 'بموعد فقط' },
      ],
      address: '172 Avenue Mohammed V, Guéliz, Marrakech',
      mapQuery: 'Studio GleM Marrakech',
      phone: '+212 679 466 326',
      whatsapp: '+212 679 466 326',
    },
  },

  /* ── 09 · El-Hassani — Tanger · old-medina barber legend ────────────── */
  {
    slug: 'el-hassani-barber',
    name: 'El-Hassani Barbershop',
    nameAr: 'الحلاق الحسني',
    sector: 'beauty',
    city: 'Tanger',
    dir: 'rtl',
    lang: 'ar',
    category: 'باربرشوب — المدينة القديمة',
    layoutVariant: 'mosaic',
    shader: 'pulse',
    shaderVariant: 'pulse',
    shaderColors: ['#1B1B1F', '#D8B25C'],
    colors: {
      primary: '#D8B25C',
      accent: '#7A2E2E',
      shaderA: '#1B1B1F',
      shaderB: '#D8B25C',
      surfaceTint: 'rgba(216,178,92,0.05)',
      onPrimary: '#1A120C',
    },
    fontPair: { display: 'Anton', body: 'IBM Plex Sans Arabic' },
    texture: 'scanlines',
    tagline: 'أسطورة القصبة — +1300 تقييم 5 نجوم.',
    content: {
      taglineFr: 'Rue de la Kasbah — Médina',
      heroTitle: ['STYLE', 'ماشي غير قصّة شعر.'],
      heroSub:
        'في زنقة القصبة بالمدينة القديمة في طنجة، باربرشوب يعمل حتى منتصف الليل ويحمل تقييماً مثالياً 5.0 من أكثر من 1300 تقييم على جوجل — والحلاق حمزة مشهور بإتقان المقص والموس.',
      story: {
        title: '1300 تقييم، ولا واحد نقص النجمة الخامسة',
        body: [
          'في المدينة القديمة في طنجة، حيث تتشابك الزنقات والحكايات، يقف محل الحسني شاهداً على الحلاقة الأصيلة: محل حيّ مزدحم، كراسي لا تهدأ، وصوت المقص لا يتوقف حتى منتصف الليل.',
          'الحلاق حمزة وصل لمستوى الأسطورة المحلية: أكثر من 1300 زبون كتبوا تقييماً على جوجل، وكلهم تقريباً أعطوا الخمس نجوم كاملة — رقم نادر في أي حرفة. سرّه؟ يتعامل مع المقص والموس كما يتعامل الخطاط مع القلم.',
          'من شباب المدينة القديمة إلى زوار طنجة، من يجرّب الحسني مرة يعود كل مرة تلمّح فيها مرآة.',
        ],
        quote: {
          text: 'هنا ماكاينش "عجلة". اللي جلس على الكرسي، كياخد وقتو كامل.',
          author: 'حمزة، الحلاق الرئيسي',
        },
      },
      services: [
        {
          title: 'قصّة رجالية (Fade / Classique)',
          desc: 'تدرجات دقيقة بالماكينة والمقص، على طريقة الحلاقين الكبار.',
          price: '80 DH',
          duration: '40 min',
        },
        {
          title: 'نحت اللحية بالموس',
          desc: 'تحديد هندسي للحية بالشفرة، مع منشفة ساخنة.',
          price: '50 DH',
          duration: '25 min',
        },
        {
          title: 'حلاقة تقليدية كاملة',
          desc: 'حلاقة الموس القديمة برغوة، منشفة ساخنة، ولوشن بعد الحلاقة.',
          price: '70 DH',
          duration: '30 min',
        },
        {
          title: 'قصّة أطفال',
          desc: 'قصّات صبيانية بصبر واحتراف — الجيل الجديد من زبناء القصبة.',
          price: '50 DH',
          duration: '30 min',
        },
        {
          title: 'قصّة + لحية + غسيل',
          desc: 'الفورمولا الكاملة لمناسباتك: قصّة، لحية، وغسيل منشط.',
          price: '120 DH',
          duration: '60 min',
        },
      ],
      gallery: [
        { src: img('el-hassani-barber', 'gallery-1.jpg'), caption: 'روح المحل — كراسي الجلد والمرايا' },
        { src: img('el-hassani-barber', 'gallery-2.jpg'), caption: 'باب القصبة — على بعد خطوات من المحل' },
        { src: img('el-hassani-barber', 'gallery-3.jpg'), caption: 'زنقة المدينة القديمة ليلاً — نخدم حتى منتصف الليل' },
      ],
      reviews: [
        {
          text: '1300 تقييم بخمس نجوم ماشي صدفة. حمزة فنان بالمقص والموس — أحسن fade درتو في حياتي.',
          author: 'أيوب م.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'كنستنى فطابور وما كنتندمش. المحل ديال حي، الخدمة ديال فنادق. تحية للحسني.',
          author: 'Simo R.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'Best barber in Tangier medina, open till midnight. Hamza is a master of the razor.',
          author: 'Yassine D.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'كل أيام الأسبوع', time: '10:00 — 00:00' },
        { days: 'الجمعة', time: '14:00 — 00:00' },
      ],
      address: 'Rue de la Kasbah, Médina, Tanger',
      mapQuery: 'El-Hassani Barbershop Tanger',
      phone: '+212 639 723 008',
      whatsapp: '+212 639 723 008',
    },
  },

  /* ── 10 · Ali Barbershop — Casablanca · modern barber + home service ── */
  {
    slug: 'ali-barbershop',
    name: 'Ali Barbershop',
    nameAr: 'علي باربرشوب',
    sector: 'beauty',
    city: 'Casablanca',
    dir: 'ltr',
    lang: 'fr',
    category: 'Barbershop & grooming à domicile',
    layoutVariant: 'editorial',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderColors: ['#1B1B1F', '#7A2E2E'],
    colors: {
      primary: '#7A2E2E',
      accent: '#D8B25C',
      shaderA: '#1B1B1F',
      shaderB: '#7A2E2E',
      surfaceTint: 'rgba(122,46,46,0.08)',
      onPrimary: '#F1E9DC',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans' },
    texture: 'grain',
    tagline: "L'art du grooming, au salon ou chez vous.",
    content: {
      taglineFr: 'Sidi El Khadir — Casablanca',
      heroTitle: ["L'art du grooming,", 'au salon ou chez vous.'],
      heroSub:
        "Le barbier le mieux noté de Casablanca sur Welia — 5,0 avec 395 avis. Coupes précises, barbe sculptée, soin protéiné et rituel visage VIP, au salon de Sidi El Khadir ou directement à domicile.",
      story: {
        title: 'La précision, livrée à domicile',
        body: [
          "À Sidi El Khadir, Ali s'est bâti une réputation que peu de barbiers peuvent revendiquer : une note parfaite de 5,0 sur 395 avis vérifiés. Sa marque de fabrique ? Une précision d'horloger — dégradés nets, contours chirurgicaux — et une ponctualité qui surprend.",
          "Son service à domicile a changé la donne : matériel professionnel complet, cape, tabouret, désinfection — le salon vient à vous, que ce soit pour une coupe d'appoint ou le rituel complet avant un mariage.",
          "Du soin protéiné capillaire au soin visage VIP, chaque prestation suit un protocole strict. Ici, pas d'approximation : on mesure, on taille, on vérifie au miroir à deux faces.",
        ],
        quote: {
          text: 'Un bon barbier, ça ne rate jamais deux fois le même dégradé.',
          author: 'Ali',
        },
      },
      services: [
        {
          title: 'Coupe signature',
          desc: 'Dégradé ou coupe classique, finitions au rasoir et coiffage produit.',
          price: '100 DH',
          duration: '40 min',
        },
        {
          title: 'Barbe sculptée',
          desc: 'Taille, contours à la lame, serviette chaude et huile de finition.',
          price: '70 DH',
          duration: '30 min',
        },
        {
          title: 'Soin protéiné cheveux',
          desc: 'Traitement protéiné restructurant pour cheveux fatigués.',
          price: '200 DH',
          duration: '45 min',
        },
        {
          title: 'Soin visage VIP',
          desc: 'Nettoyage, masque blackhead, massage facial — le protocole complet.',
          price: '150 DH',
          duration: '40 min',
        },
        {
          title: 'Service à domicile',
          desc: 'Le salon chez vous : matériel professionnel, coupe et barbe complètes.',
          price: 'à partir de 200 DH',
          duration: '60 min',
        },
      ],
      gallery: [
        { src: img('ali-barbershop', 'gallery-1.jpg'), caption: 'Dégradé en cours — précision au peigne' },
        { src: img('ali-barbershop', 'gallery-2.jpg'), caption: 'Contours nets, barbe structurée' },
        { src: img('ali-barbershop', 'gallery-3.jpg'), caption: 'Le fade, signature maison' },
      ],
      reviews: [
        {
          text: '5,0 sur 395 avis, et c’est mérité. Ali est précis, ponctuel, et le résultat tient des semaines.',
          author: 'Omar E.',
          rating: 5,
          source: 'Welia',
        },
        {
          text: 'Le service à domicile est impeccable — tout le matériel, tout le soin du salon, sans bouger.',
          author: 'Anas K.',
          rating: 5,
          source: 'Welia',
        },
        {
          text: 'Meilleur fade de Casablanca. Réservation facile, aucune attente.',
          author: 'Reda M.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'Lundi — Samedi', time: '10:00 — 21:00' },
        { days: 'Dimanche', time: '12:00 — 20:00' },
      ],
      address: 'Sidi El Khadir, Casablanca — service à domicile disponible',
      mapQuery: 'Ali Barbershop Casablanca',
      instagram: 'https://www.instagram.com/ali.barbershop.casa/',
    },
  },
];

export default beautyStores;
