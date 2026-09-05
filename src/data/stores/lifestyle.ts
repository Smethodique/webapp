import type { StoreTheme } from './index';
import type { ShaderVariant } from '@/components/shaders';

/**
 * Lifestyle sector — 10 real Moroccan stores.
 *
 * `LifestyleStore` is a SUPERSET of the scaffold `StoreTheme` (index.ts is
 * owned by another agent and intentionally not modified). Extra fields:
 * nameFr, category, lang, layoutVariant, shaderVariant (mirrors `shader`),
 * shaderIntensity, texture, colors.surfaceTint/onPrimary, and full `content`
 * (hero/story/services/gallery/reviews/hours/contact) per store-template.md.
 */
export interface StoreService {
  title: string;
  desc: string;
  price?: string;
}

export interface StoreReview {
  text: string;
  author: string;
  rating: 4 | 5;
  source?: 'Google' | 'Instagram';
}

export interface StoreHours {
  days: string;
  time: string;
}

export interface GalleryItem {
  src: string;
  caption?: string;
}

export interface LifestyleStore extends Omit<StoreTheme, 'colors'> {
  nameFr: string;
  category: string;
  lang: 'ar' | 'fr';
  layoutVariant: 'editorial' | 'immersive' | 'mosaic';
  /** Mirrors `shader` — kept for template slots that read shaderVariant */
  shaderVariant: ShaderVariant;
  shaderIntensity: number;
  texture: 'grain' | 'zellige' | 'scanlines' | 'none';
  colors: StoreTheme['colors'] & {
    surfaceTint: string;
    onPrimary: string;
  };
  content: {
    heroTitle: string[];
    heroSub: string;
    story: {
      title: string;
      body: string[];
      quote?: { text: string; author: string };
    };
    services: StoreService[];
    gallery: GalleryItem[];
    reviews: StoreReview[];
    hours: StoreHours[];
    address: string;
    mapQuery: string;
    phone?: string;
    whatsapp?: string;
    instagram?: string;
  };
}

export const lifestyleGyms: LifestyleStore[] = [
  /* ─────────────────────────── GYMS ─────────────────────────── */

  // Slot 01 — Hardcore strength gym · mosaic · pulse
  {
    slug: 'kriss-boxing',
    name: 'Kriss Boxing Club',
    nameAr: 'كريس بوكسينغ كلوب',
    nameFr: 'Kriss Boxing Club',
    sector: 'lifestyle',
    category: 'نادي ملاكمة ولياقة',
    city: 'مراكش — جليز',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'mosaic',
    shader: 'pulse',
    shaderVariant: 'pulse',
    shaderIntensity: 1.0,
    texture: 'scanlines',
    colors: {
      primary: '#D6FF3F',
      accent: '#FF5C28',
      shaderA: '#101210',
      shaderB: '#D6FF3F',
      surfaceTint: 'rgba(214,255,63,0.05)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Anton', body: 'IBM Plex Sans Arabic' },
    tagline: 'نادي الملاكمة الأصيل في قلب جليز',
    phone: '+212665672662',
    content: {
      heroTitle: ['NO PAIN.', 'بلا ألم، بلا نتيجة.'],
      heroSub:
        'نادي ملاكمة حيّي أصيل في شارع موريتانيا بجليز. حلبة حقيقية، مدربون مقاتلون، وحصص كروس-ترينينغ كتخليك تخرج أقوى مما دخلت.',
      story: {
        title: 'من حلبة الحي إلى حلبة الفندق',
        body: [
          'كريس بوكسينغ كلوب ماشي غير قاعة رياضة — هو دار الملاكمة في جليز. من 17 شارع موريتانيا، كيبني المدرب كريس ڭوربي جيلاً من الملاكمين والرياضيين اللي كيتدربوا بجدية ديال المحترفين وروح ديال الحي.',
          'النادي كيستقبل الجميع: من اللي باغي يتعلم الأساسيات ديال البوكس أنڭليز، تال للي كيحضّر للنزالات. والشراكة مع فندق Radisson Blu Carré Eden خلات الحصص توصل لحلبة احترافية في قلب مراكش.',
          'هنا ما كاينش لا مكياج لا فلاتر: قفازات، أكياس ضرب، حلبة، وعرق. كل حصة كتسالي بإحساس وحدو: أنك قدرت.',
        ],
        quote: {
          text: 'الملاكمة ما هيش ضرب — هي انضباط، تنفس، واحترام. منين تدخل للحلبة، كتعرف شكون نتا.',
          author: 'كريس ڭوربي — المؤسس والمدرب',
        },
      },
      services: [
        {
          title: 'ملاكمة إنجليزية — جماعي',
          desc: 'حصص جماعية على الحلبة: تقنيات الضرب، التحرك، والاشتباك. كل المستويات مرحب بيها.',
          price: '300 درهم / الشهر',
        },
        {
          title: 'تدريب خاص مع كريس',
          desc: 'حصة فردية 60 دقيقة: برنامج على قدك، تصحيح تقني مباشر، وإيقاع ديال المحترفين.',
          price: '250 درهم / الحصة',
        },
        {
          title: 'كروس-ترينينغ',
          desc: 'لياقة وظيفية عالية الكثافة: حبال، أثقال، وتمارين قلبية كتحرق وكتبني.',
          price: '350 درهم / الشهر',
        },
        {
          title: 'حصص نسائية',
          desc: 'حصص ملاكمة ولياقة مخصصة للنساء بأجواء مريحة وتأطير كامل.',
          price: '300 درهم / الشهر',
        },
        {
          title: 'ملاكمة للصغار',
          desc: 'تأطير الناشئة (من 8 سنين): انضباط، ثقة بالنفس، وتقنيات أساسية آمنة.',
          price: '250 درهم / الشهر',
        },
        {
          title: 'حصة تجريبية',
          desc: 'جرب حصة كاملة قبل ما تسجل — القفازات علينا.',
          price: '50 درهم',
        },
      ],
      gallery: [
        { src: '/stores/kriss-boxing/gallery-1.jpg', caption: 'اشتباك تدريبي على الحلبة' },
        { src: '/stores/kriss-boxing/gallery-2.jpg', caption: 'الحلبة الاحترافية — شراكة Radisson Blu' },
        { src: '/stores/kriss-boxing/gallery-3.jpg', caption: 'روح النادي في جليز' },
      ],
      reviews: [
        {
          text: 'أحسن نادي ملاكمة في مراكش بلا منازع. كريس مدرب كيعرف كيفاش يخرج منك أقصى ما عندك بلا ما يكسرك. الحلبة نظيفة والأجواء عائلية.',
          author: 'يوسف ب.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'كنت ما عارفة حتى كيفاش نشد القفازات. دابا عام ونصف وأنا ما كنعطلش على حصة. الحصص النسائية رائعة والمدرب صبور ومحترف.',
          author: 'سلمى ر.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'تدربت هنا شهرين خلال إقامتي في مراكش. مستوى التدريب عالي والترحاب حار. نصيحة: جربوا حصة الكروس-ترينينغ ديال السبت صباحاً.',
          author: 'Thomas L.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الإثنين — الجمعة', time: '09:00 — 22:00' },
        { days: 'السبت', time: '09:00 — 20:00' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: '17 شارع موريتانيا، جليز، مراكش',
      mapQuery: 'Kriss Boxing Club, 17 Rue Mauritanie, Guéliz, Marrakech',
      phone: '+212665672662',
      whatsapp: '+212665672662',
    },
  },

  // Slot 02 — Boutique fitness studio · immersive · pulse
  {
    slug: 'la-cage-gym',
    name: 'La Cage Gym',
    nameAr: 'لا كاج جيم',
    nameFr: 'La Cage Gym',
    sector: 'lifestyle',
    category: 'نادي فنون قتالية MMA',
    city: 'أكادير — حي أمسيرنات',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'immersive',
    shader: 'pulse',
    shaderVariant: 'pulse',
    shaderIntensity: 0.7,
    texture: 'scanlines',
    colors: {
      primary: '#FF5C28',
      accent: '#D6FF3F',
      shaderA: '#2A1B2E',
      shaderB: '#FF5C28',
      surfaceTint: 'rgba(255,92,40,0.06)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Anton', body: 'IBM Plex Sans Arabic' },
    tagline: 'ادخل القفص… اخرج مقاتلاً',
    phone: '+212669588595',
    content: {
      heroTitle: ['قوتك', 'تبدأ هنا.'],
      heroSub:
        'نادي الفنون القتالية الأول في أكادير: MMA، جيو-جيتسو برازيلي، مواي تاي، ملاكمة وكيك بوكسينغ — تحت إشراف رضا نديم وفريقه.',
      story: {
        title: 'القفص اللي كيصنع المقاتلين',
        body: [
          'سميتها ماشي صدفة: "لا كاج" هو القفص اللي كيتقاس فيه الرجال بالانضباط قبل الضرب. في حي أمسيرنات بأكادير، فتح رضا نديم هاد النادي باش يعطي لشباب المدينة بلاصة كيتعلموا فيها الفنون القتالية بمنهجية حقيقية.',
          'من الجيو-جيتسو البرازيلي للمواي تاي، كل فن عندنا كيتّدرس بأصولو: أرضية، وقفة، اشتباك، واحترام. النادي معروف في أوساط الـBJJ العالمية (مدرج في BJJ Globetrotters) وكيستقبل مقاتلين زائرين من بزاف ديال البلدان.',
          'تقييم 5/5 من عشرات المراجعات ما جاش من لا شي: هنا الخدمة بالضمير، والمستوى كيبان في الحصة الأولى.',
        ],
        quote: {
          text: 'القفص ما كيخوفش — القفص كيعلمك علاش كنتي خايف، وكيفاش تفوق عليه.',
          author: 'رضا نديم — المدرب الرئيسي',
        },
      },
      services: [
        {
          title: 'MMA — فنون قتالية مختلطة',
          desc: 'برنامج متكامل: وقفة + أرضية + اشتباك. تحضير للنزالات للي بغا يتنافس.',
          price: '350 درهم / الشهر',
        },
        {
          title: 'جيو-جيتسو برازيلي (BJJ)',
          desc: 'Gi و No-Gi، من الحزام الأبيض للأسود. سبورينغ مراقب وتقنيات إخضاع.',
          price: '350 درهم / الشهر',
        },
        {
          title: 'مواي تاي / كيك بوكسينغ',
          desc: 'فن الأطراف الثمانية: ركلات، ركب، ومرافق — كارديو وتقنية في نفس الوقت.',
          price: '300 درهم / الشهر',
        },
        {
          title: 'ملاكمة إنجليزية',
          desc: 'قبضتك، حركتك، وتوقيتك — أساسيات الـBoxe Anglaise بأيدي مدربين مقاتلين.',
          price: '300 درهم / الشهر',
        },
        {
          title: 'حصة تجريبية',
          desc: 'تعرف على النادي، المدربين، والأجواء — أول حصة شبه مجانية.',
          price: '50 درهم',
        },
      ],
      gallery: [
        { src: '/stores/la-cage-gym/gallery-1.jpg', caption: 'حصة تدريب في النادي' },
        { src: '/stores/la-cage-gym/gallery-2.jpg', caption: 'فضاء التدريب — حي أمسيرنات' },
        { src: '/stores/la-cage-gym/gallery-3.jpg', caption: 'لا كاج من الداخل' },
      ],
      reviews: [
        {
          text: '5/5 مستاهلة بجدارة. تدربت الـBJJ هنا شهر كامل وأنا زائر لأكادير — الترحيب كان عالمي والمستوى التقني عالي. المدرب رضا من أحسن الناس اللي تدربت معاهم.',
          author: 'Marco D.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'النادي نظيف، الأجواء محترمة، والحصص منظمة بالمستويات. ولدي ولّا مقاتل صغير بفضل هاد الفريق.',
          author: 'حسن أ.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'أفضل صالة فنون قتالية في أكادير بلا نقاش. الأسعار معقولة والتأطير احترافي.',
          author: 'إيمان ك.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الإثنين — السبت', time: '09:00 — 22:00' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: 'رقم 17، عمارة 65، شارع القاضي عياض، حي أمسيرنات، أكادير',
      mapQuery: 'La Cage Gym, Av. Qadi Ayad, Hay Amsernat, Agadir',
      phone: '+212669588595',
      whatsapp: '+212669588595',
      instagram: 'https://www.instagram.com/lacagegym',
    },
  },

  // Slot 03 — CrossFit box, industrial · mosaic · pulse
  {
    slug: 'crossfit-sirocco',
    name: 'CrossFit Sirocco',
    nameAr: 'كروسفيت سيروكو',
    nameFr: 'CrossFit Sirocco Marrakech',
    sector: 'lifestyle',
    category: 'صالة كروسفيت',
    city: 'مراكش',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'mosaic',
    shader: 'pulse',
    shaderVariant: 'pulse',
    shaderIntensity: 1.0,
    texture: 'scanlines',
    colors: {
      primary: '#FF5C28',
      accent: '#8A8F8A',
      shaderA: '#101210',
      shaderB: '#FF5C28',
      surfaceTint: 'rgba(255,92,40,0.06)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Anton', body: 'Space Grotesk' },
    tagline: 'ريح الصحراء كتدرب معاك',
    phone: '+212665776477',
    content: {
      heroTitle: ['FORGE', 'نفسك.'],
      heroSub:
        'صالة كروسفيت في شارع الدار البيضاء بمراكش — WODs يومية، مجتمع ديال +7400 متابع، وتقييم 4.8 من 191 رياضي.',
      story: {
        title: 'سيروكو: ريح كتغيّر',
        body: [
          'سميتها جاية من ريح الصحراء اللي كتعبر مراكش — سيروكو. وهادشي بالضبط اللي كيدير بيك الكروسفيت: كيقلب حياتك في أسابيع. الصالة مبنية على مبادئ الكروسفيت الأصلية: حركات وظيفية، كثافة عالية، وتنوع دائم.',
          'كل نهار WOD جديد مكتوب على السبورة: باربيل، حبال، صناديق قفز، وسحب — ما كايناش الروتين. المدربون كيراقبو التقنية قبل الوزن، والمجتمع كيشجع آخر واحد كيسالي قبل الأول.',
          'من الرياضي المحترف للي ما دار حتى رياضة في حياتو — عندنا برنامج Scale لكل مستوى. غير جرب حصة وحدة وغادي تفهم علاش الناس كيدمنو.',
        ],
        quote: {
          text: 'الـWOD ما كيخصصش — هو هو للجميع. اللي كيتبدل هو المقياس، ماشي التحدي.',
          author: 'فريق التدريب — سيروكو',
        },
      },
      services: [
        {
          title: 'WOD يومي — كروسفيت',
          desc: 'تمرين اليوم الجماعي بقيادة مدرب: سكيل على قد مستواك، والروح الجماعية كتدفعك.',
          price: '500 درهم / الشهر',
        },
        {
          title: 'Open Gym',
          desc: 'دخول حر للصالة خارج أوقات الحصص: تدرب على مزاجك بكل التجهيزات.',
          price: '400 درهم / الشهر',
        },
        {
          title: 'كورس المبتدئين (Fundamentals)',
          desc: '4 حصص تقنية: الحركات الأساسية، السلامة، والمصطلحات قبل ما تدخل للـWODs.',
          price: '300 درهم',
        },
        {
          title: 'تدريب شخصي',
          desc: 'حصة 1×1 مع مدرب معتمد: أهدافك، برنامجك، وإيقاعك.',
          price: '250 درهم / الحصة',
        },
        {
          title: 'حصة تجريبية (Drop-in)',
          desc: 'زائر لمراكش أو باغي تجرب؟ حصة Drop-in مرحبا بيك فيها.',
          price: '100 درهم',
        },
      ],
      gallery: [
        { src: '/stores/crossfit-sirocco/gallery-1.jpg', caption: 'باربيل وطباشير — أجواء البوكس' },
        { src: '/stores/crossfit-sirocco/gallery-2.jpg', caption: 'الصالة من الداخل' },
        { src: '/stores/crossfit-sirocco/gallery-3.jpg', caption: 'الحلقات والرافعات' },
      ],
      reviews: [
        {
          text: 'أحسن بوكس كروسفيت في مراكش. التجهيزات كاملة، المدربين كيعتنو بالتقنية، والمجتمع رائع. 4.8/5 من 191 مراجعة ماشي صدفة.',
          author: 'أمين ت.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'عملت Drop-in لمدة أسبوع أثناء عطلتي. التنظيم محترف والـWODs مكتوبة بعناية. نرجع لمراكش غير باش نتدرب هنا.',
          author: 'Sarah M.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'بدايتي مع الكروسفيت كانت هنا وما ندمتش. كورس المبتدئين علمني كلشي بأمان. دابا 8 شهور ونتائج واضحة.',
          author: 'خديجة ع.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الإثنين — الجمعة', time: '07:00 — 21:00' },
        { days: 'السبت', time: '09:00 — 13:00' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: 'شارع الدار البيضاء، مراكش',
      mapQuery: 'CrossFit Sirocco, Rue Dar El Beida, Marrakech',
      phone: '+212665776477',
      whatsapp: '+212665776477',
      instagram: 'https://www.instagram.com/crossfit.sirocco.marrakech',
    },
  },

  // Slot 04 — Premium club (teal calm) · editorial · steam
  {
    slug: 'spartacus-fight',
    name: 'Spartacus Fight Fitness',
    nameAr: 'سبارتاكوس فايت فيتنيس',
    nameFr: 'Spartacus Fight Fitness',
    sector: 'lifestyle',
    category: 'نادي فنون قتالية ولياقة',
    city: 'الدار البيضاء — المعاريف',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'editorial',
    shader: 'steam',
    shaderVariant: 'steam',
    shaderIntensity: 0.6,
    texture: 'grain',
    colors: {
      primary: '#9FD8D3',
      accent: '#D8B25C',
      shaderA: '#1E3A3A',
      shaderB: '#9FD8D3',
      surfaceTint: 'rgba(159,216,211,0.05)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans Arabic' },
    tagline: 'روح المحارب، هدوء النادي الراقي',
    content: {
      heroTitle: ['نادي المحاربين', 'بمقاييس راقية.'],
      heroSub:
        'في 63 شارع المنصور العابدي بالمعاريف — كيك بوكسينغ، ملاكمة، MMA، جيو-جيتسو وكروس-ترينينغ في فضاء نظيف ومنظم، تقييم 5.0.',
      story: {
        title: 'سبارتاكوس: الانضباط كأسلوب حياة',
        body: [
          'سمّيناه سبارتاكوس على اسم المحارب اللي ما استسلمش. في قلب المعاريف، هاد النادي ديال الحي بروح احترافية: بساط قتال نظيف، أقفاص وحلبات مرتبة، ومدربون كيعاملو كل عضو كأنو مشروع بطل.',
          'هنا كتلقى الشاب اللي كيحضر لأول نزال، والموظف اللي جاي يفرغ الضغط بعد الخدمة، والطفل اللي كيتعلم أول درس في الاحترام. الفنون القتالية عندنا ماشي عنف — هي طريقة باش تبني نفسك.',
          'تقييم 5.0 من 5 في Google ما هو إلا انعكاس ديال فلسفة بسيطة: خدمة نقية، تأطير حقيقي، ونتائج كتشوفها.',
        ],
        quote: {
          text: 'المحارب الحقيقي ما هو اللي كيضرب أقوى — هو اللي كيرجع غداً يتدرب من جديد.',
          author: 'فريق سبارتاكوس',
        },
      },
      services: [
        {
          title: 'كيك بوكسينغ',
          desc: 'البرنامج الرئيسي للنادي: ضرب، ركل، وكارديو مقاتل لجميع المستويات.',
          price: '350 درهم / الشهر',
        },
        {
          title: 'جيو-جيتسو برازيلي',
          desc: 'أرضية وتقنيات إخضاع — النادي مدرج رسمياً في دليل BJJ Morocco.',
          price: '350 درهم / الشهر',
        },
        {
          title: 'MMA',
          desc: 'دمج الوقفة والأرضية للمقاتلين الطموحين، بإشراف مباشر.',
          price: '400 درهم / الشهر',
        },
        {
          title: 'ملاكمة',
          desc: 'فن القبضة النبيلة: تقنية، سرعة، ودفاع.',
          price: '300 درهم / الشهر',
        },
        {
          title: 'كروس-ترينينغ / لياقة',
          desc: 'تقوية عامة وتحضير بدني لغير المقاتلين أيضاً.',
          price: '300 درهم / الشهر',
        },
      ],
      gallery: [
        { src: '/stores/spartacus-fight/gallery-1.jpg', caption: 'حصة على بساط القتال' },
        { src: '/stores/spartacus-fight/gallery-2.jpg', caption: 'فضاء التدريب — المعاريف' },
        { src: '/stores/spartacus-fight/gallery-3.jpg', caption: 'عمل على الأكياس' },
      ],
      reviews: [
        {
          text: 'نادي نظيف ومنظم في قلب المعاريف. المدربين كيتبعوك فردياً حتى في الحصص الجماعية. 5 نجوم مستاهلين.',
          author: 'عبد الرحيم م.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'تدربت الـBJJ هنا — المستوى التقني ممتاز والأجواء محترمة بزاف. أنصح بيه أي واحد باغي يبدا الفنون القتالية في كازا.',
          author: 'Mehdi K.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'ولدي (9 سنين) كيتدرب هنا الكيك بوكسينغ. التأطير صارم بلا قسوة، والتطور ديالو واضح في السلوك قبل الرياضة.',
          author: 'سعاد ل.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الإثنين — السبت', time: '09:00 — 22:00' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: '63 شارع المنصور العابدي، المعاريف، الدار البيضاء',
      mapQuery: 'Spartacus Fight Fitness, 63 Rue Mansour El Abadi, Maârif, Casablanca',
      instagram: 'https://www.instagram.com/spartacus.fightfitness',
    },
  },
];

/* ───────────────────── FURNITURE & DÉCOR ───────────────────── */

export const lifestyleFurniture: LifestyleStore[] = [
  // Slot 05 — Moroccan furniture atelier · editorial · dune
  {
    slug: 'fadma-rugs',
    name: 'Fadma Rugs',
    nameAr: 'فادما رڭز',
    nameFr: 'Fadma Rugs Shop',
    sector: 'lifestyle',
    category: 'زرابي بربرية تقليدية',
    city: 'مراكش — المدينة القديمة',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'editorial',
    shader: 'dune',
    shaderVariant: 'dune',
    shaderIntensity: 0.8,
    texture: 'zellige',
    colors: {
      primary: '#B0703C',
      accent: '#9AA38B',
      shaderA: '#B0703C',
      shaderB: '#CBC3B4',
      surfaceTint: 'rgba(176,112,60,0.06)',
      onPrimary: '#F0EDE6',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    tagline: 'كل زربية عندها حكاية — أجي تسمعها مع كأس أتاي',
    phone: '+212655622948',
    content: {
      heroTitle: ['زرابي منسوجة', 'بأيادي أمازيغية.'],
      heroSub:
        'متجر عائلي في رحبة القديمة: زرابي بربرية أصلية بصباغة طبيعية، مصنوعة يدوياً في قرى الأطلس — شاي، حكايات، وأسعار بلا وسطاء.',
      story: {
        title: 'دار فاطمة وعبد الهادي',
        body: [
          'في درب انخال، 38 رحبة القديمة، ما كايناش الواجهات اللامعة — كاينة دار عائلية فيها الزرابي مكدسة حتى للسقف، وريحة الشاي بالنعناع كتستقبلك قبل البشر.',
          'فاطمة وابنها عبد الهادي كيشتغلو مباشرة مع تعاونيات نسائية في الأطلس الكبير. كل زربية كتجي بشهادة ديالها: شكون حاكتها، فين، وبأش صبغت — حنافية، راس الحناء، نيلة، ولا زعفران.',
          'مئات المراجعات من الزوار ديال العالم كيهضرو على نفس التجربة: ما كاينش ضغط للبيع، كاين غير كراسي، أتاي، ووقت باش تفهم الفرق بين بوشراويت، بيتران، وزربية أزيلال أصلية.',
        ],
        quote: {
          text: 'الزربية ما كتشراهاش — كتختارك نتا. حنا غير كنساعدوكم تتلاقاو.',
          author: 'عبد الهادي — فادما رڭز',
        },
      },
      services: [
        {
          title: 'زرابي بيتران (أبيض وأسود)',
          desc: 'صوف الأطلس العالي بنقوش هندسية أمازيغية — القطعة الكلاسيكية الخالدة.',
          price: 'من 1 800 درهم',
        },
        {
          title: 'زرابي بوشراويت',
          desc: 'نسيج معاد التدوير بألوان فرحة — كل قطعة فريدة حرفياً.',
          price: 'من 900 درهم',
        },
        {
          title: 'زرابي أزيلال وتازناخت',
          desc: 'قطع نادرة بصباغة طبيعية 100%، مباشرة من التعاونيات النسائية.',
          price: 'من 2 500 درهم',
        },
        {
          title: 'زربية حسب الطلب',
          desc: 'اختار النقشة، الألوان، والأبعاد — التعاونية كتحيكها ليك (4 لـ8 أسابيع).',
          price: 'حسب المقاس',
        },
        {
          title: 'شحن دولي مؤمَّن',
          desc: 'نوصلو الزربية ديالك لأي بلاد في العالم، مغلفة ومؤمنة.',
          price: 'حسب الوجهة',
        },
      ],
      gallery: [
        { src: '/stores/fadma-rugs/gallery-1.jpg', caption: 'زرابي معلقة في رحبة القديمة' },
        { src: '/stores/fadma-rugs/gallery-2.jpg', caption: 'تجربة الشاي والحكايات' },
        { src: '/stores/fadma-rugs/gallery-3.jpg', caption: 'تفاصيل النسيج الأمازيغي' },
      ],
      reviews: [
        {
          text: 'أصدق تجربة تسوق في مراكش كلها. عبد الهادي شرح لينا كل نقشة وأشناو كتعني، وشربنا أتاي بلا ما نحسو بأي ضغط. شريت زوج زرابي بثمن منصف.',
          author: 'Emma R.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'زرابي أصلية بصباغة طبيعية وشهادة التعاونية. الشحن لفرنسا دارو في أسبوع مغلف مزيان. متجر عائلي كيستاهل الدعم.',
          author: 'Karim B.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'مئات الزرابي من كل الأنواع والأسعار. خديت بوشراويت صغيرة وبيتران كبيرة — الزوج بجو هومز في الصالون ديالي.',
          author: 'مريم س.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'السبت — الخميس', time: '10:00 — 20:00' },
        { days: 'الجمعة', time: '14:00 — 20:00' },
      ],
      address: 'درب انخال، 38 رحبة القديمة، المدينة القديمة، مراكش',
      mapQuery: 'Fadma Rugs, 38 Rahba Kedima, Derb Ennkhal, Marrakech Medina',
      phone: '+212655622948',
      whatsapp: '+212655622948',
    },
  },

  // Slot 06 — Minimalist décor concept store, French-first · immersive · dune
  {
    slug: 'fenyadi',
    name: 'Fenyadi',
    nameAr: 'فنيادي',
    nameFr: 'Maison Fenyadi',
    sector: 'lifestyle',
    category: 'Maison de décoration haut de gamme',
    city: 'Marrakech — Sidi Ghanem',
    dir: 'ltr',
    lang: 'fr',
    layoutVariant: 'immersive',
    shader: 'dune',
    shaderVariant: 'dune',
    shaderIntensity: 0.8,
    texture: 'grain',
    colors: {
      primary: '#9AA38B',
      accent: '#B0703C',
      shaderA: '#9AA38B',
      shaderB: '#F0EDE6',
      surfaceTint: 'rgba(154,163,139,0.07)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans' },
    tagline: 'Moroccan Spirit for Design',
    phone: '+212524356024',
    content: {
      heroTitle: ['Des objets', 'qui racontent.'],
      heroSub:
        'Au 219 de la zone industrielle Sidi Ghanem, la Maison Fenyadi compose une décoration d\u2019exception : céramique, bougies, luminaires, bois et cuir — l\u2019artisanat marocain dans son plus bel écrin contemporain.',
      story: {
        title: 'L\u2019esprit marocain, le geste design',
        body: [
          'Fenyadi est née d\u2019une conviction simple : l\u2019artisanat marocain mérite les podiums du design international. Présente au salon Maison&Objet à Paris, la maison fait dialoguer les gestes ancestraux — poterie, dinanderie, maroquinerie — avec une direction artistique résolument contemporaine.',
          'Chaque collection est une édition limitée : céramiques aux émaux vibrants, photophores ciselés main, textiles de maison tissés dans les ateliers partenaires. La ligne de vaisselle artisanale Akkal en est devenue l\u2019emblème.',
          'De Marrakech à Casablanca, le showroom de Sidi Ghanem reste le cœur battant de la maison — un lieu où chaque objet est choisi, touché, raconté.',
        ],
        quote: {
          text: 'Un objet Fenyadi n\u2019est pas acheté. Il est adopté — avec son histoire et les mains qui l\u2019ont fait.',
          author: 'Maison Fenyadi',
        },
      },
      services: [
        {
          title: 'Céramiques & vaisselle Akkal',
          desc: 'Services de table artisanaux, émaux profonds, pièces signées — la ligne iconique de la maison.',
          price: 'à partir de 180 MAD',
        },
        {
          title: 'Luminaires & photophores',
          desc: 'Suspensions en métal ciselé et lampes d\u2019ambiance, dessinées pour la lumière marocaine.',
          price: 'à partir de 450 MAD',
        },
        {
          title: 'Bougies & parfums d\u2019intérieur',
          desc: 'Cires végétales et fragrances d\u2019Orient : fleur d\u2019oranger, ambre, bois de cèdre.',
          price: 'à partir de 220 MAD',
        },
        {
          title: 'Textile de maison',
          desc: 'Plaids, coussins et linge de table tissés dans les ateliers partenaires.',
          price: 'à partir de 350 MAD',
        },
        {
          title: 'Bois & cuir',
          desc: 'Mobilier d\u2019appoint et objets en bois de thuya et cuir tanné végétal — pièces uniques.',
          price: 'sur devis',
        },
      ],
      gallery: [
        { src: '/stores/fenyadi/gallery-1.jpg', caption: 'Suspensions — collection lumière' },
        { src: '/stores/fenyadi/gallery-2.jpg', caption: 'Vaisselle Akkal, émail artisanal' },
        { src: '/stores/fenyadi/gallery-3.jpg', caption: 'Laiton ciselé main' },
      ],
      reviews: [
        {
          text: 'La plus belle adresse déco de Sidi Ghanem. Des pièces qu\u2019on ne trouve nulle part ailleurs et un accueil aux petits soins. La vaisselle Akkal est sublime.',
          author: 'Claire V.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'Un showroom-musée. On y entre pour une bougie, on ressort avec une lampe ciselée et l\u2019envie de tout redécorer. Qualité irréprochable.',
          author: 'Yasmine E.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'Fenyadi expose à Maison&Objet et ça se sent : le niveau est international, l\u2019âme reste marrakchie. Adresse incontournable.',
          author: 'Nicolas P.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'Lundi — Samedi', time: '10:00 — 19:00' },
        { days: 'Dimanche', time: 'Fermé' },
      ],
      address: '219, Zone Industrielle Sidi Ghanem, Marrakech',
      mapQuery: 'Fenyadi, 219 Zone Industrielle Sidi Ghanem, Marrakech',
      phone: '+212524356024',
    },
  },

  // Slot 07 — Luxury interior / boho studio · editorial · silk
  {
    slug: 'casatribana',
    name: 'Casatribana',
    nameAr: 'كازاتريبانا',
    nameFr: 'Casatribana',
    sector: 'lifestyle',
    category: 'علامة ديكور بوهو-شيك',
    city: 'مراكش — سيدي غانم',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'editorial',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderIntensity: 0.7,
    texture: 'grain',
    colors: {
      primary: '#CBC3B4',
      accent: '#B0703C',
      shaderA: '#3A342C',
      shaderB: '#CBC3B4',
      surfaceTint: 'rgba(203,195,180,0.05)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    tagline: 'معبد البوهو-شيك المغربي',
    content: {
      heroTitle: ['قطع كتسول', 'على الرحلة.'],
      heroSub:
        'العلامة ديال زينب بوطالب: وسائد ومنسوجات بنقوش قبلية وألوان ترابية، حرفية مغربية بروح نومادية — من سيدي غانم لبيوت العالم.',
      story: {
        title: 'الحكاية ديال زينب بوطالب',
        body: [
          'زينب بوطالب، كازاوية استقرت في مراكش، ما بغاتش تعاود تنتج الديكور المغربي التقليدي — بغات تعاود تفسرو. من المشغل ديالها في سيدي غانم، كتخلق Casatribana قطعاً كتجمع بين الصوف المغربي، نقشات القبائل، وإلهامات من جنوب إفريقيا وإندونيسيا وتركيا.',
          'الصحافة سماتها "معبد البوهو-شيك" (Shoelifer): ألوان ترابية، خامات طبيعية، وكل قطعة محدودة الإنتاج. القطع ديالها كيتباعو أيضاً عند Clay Concept Store في الدار البيضاء وMoon Garden في مراكش.',
          'البيع والتواصل كيدار مباشرة عبر إنستغرام، والمشغل كيستقبل بالموعد — تجربة قريبة، شخصية، بحال العلامة نفسها.',
        ],
        quote: {
          text: 'كل وسادة عندي فيها حكاية سفر: نقشة من قبيلة، لون من أرض، ويد من مشغل مغربي.',
          author: 'زينب بوطالب — المؤسِّسة',
        },
      },
      services: [
        {
          title: 'وسائد بنقوش قبلية',
          desc: 'القطعة الأيقونة: صوف وقطن مغربي، نقشات هندسية، إنتاج محدود.',
          price: 'من 450 درهم',
        },
        {
          title: 'منسوجات وبليكيدات',
          desc: 'أغطية ومنسوجات حائط بألوان ترابية، منسوجة يدوياً.',
          price: 'من 800 درهم',
        },
        {
          title: 'قطع حرفية مُعاد تفسيرها',
          desc: 'سلال، ستاينات، وقطع يونيكة كتجمع الحرفة المغربية والروح النومادية.',
          price: 'من 300 درهم',
        },
        {
          title: 'تنسيق داخلي (Styling)',
          desc: 'استشارة ديكور بروح Casatribana لبيتك أو مشروعك التجاري.',
          price: 'حسب المشروع',
        },
        {
          title: 'زيارة المشغل بالموعد',
          desc: 'تعال شوف القطع، المخزون، ووراء الكواليس — في سيدي غانم، غير بالموعد.',
          price: 'مجاناً',
        },
      ],
      gallery: [
        { src: '/stores/casatribana/gallery-1.jpg', caption: 'زينب وسط المنسوجات — المشغل' },
        { src: '/stores/casatribana/gallery-2.jpg', caption: 'روح بوهو-شيك في البيت' },
        { src: '/stores/casatribana/gallery-3.jpg', caption: 'وسادة Terracotta & Diamonds' },
      ],
      reviews: [
        {
          text: 'طلبت زوج وسائد عبر إنستغرام — التواصل كان سريع والقطع وصلات أحسن من الصور. الجودة والتغليف فوق التوقع.',
          author: 'نادية ب.',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'زرت المشغل بالموعد: تجربة رائعة. زينب كتحكي على كل قطعة بشغف، وخرجت بسلة وبليكيد كيبانو رائعين في الصالون.',
          author: 'Julie M.',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'الستايل ديال Casatribana ما كاينش في حدا بلاصة: مغربي بلا كليشيهات، عالمي بلا برودة. الوسائد ديالي ولات توقيع الدار.',
          author: 'سارة و.',
          rating: 5,
          source: 'Instagram',
        },
      ],
      hours: [
        { days: 'الإثنين — الجمعة', time: 'بالموعد فقط' },
        { days: 'السبت — الأحد', time: 'مغلق' },
      ],
      address: 'سيدي غانم، مراكش (زيارات بالموعد)',
      mapQuery: 'Sidi Ghanem, Marrakech',
      instagram: 'https://www.instagram.com/casatribana',
    },
  },
];

/* ─────────────────────── WEDDING PLANNERS ─────────────────────── */

export const lifestyleWeddings: LifestyleStore[] = [
  // Slot 08 — Luxury wedding planner, royal style · immersive · petal
  {
    slug: 'she-said-yes',
    name: 'She Said Yes',
    nameAr: 'شي سيد يس',
    nameFr: 'She Said Yes — Event Planners',
    sector: 'lifestyle',
    category: 'منظمة أعراس وطلبات زواج',
    city: 'مراكش',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'immersive',
    shader: 'petal',
    shaderVariant: 'petal',
    shaderIntensity: 0.9,
    texture: 'grain',
    colors: {
      primary: '#C89B8A',
      accent: '#D8B25C',
      shaderA: '#7A5A66',
      shaderB: '#F8F1EC',
      surfaceTint: 'rgba(200,155,138,0.06)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    tagline: 'أول منظمة طلبات زواج في المغرب',
    phone: '+212664232474',
    content: {
      heroTitle: ['عرسك', 'قصة ما كتتعاودش.'],
      heroSub:
        'من قلب مراكش — منظمة الأعراس وطلبات الزواج الأشهر في المغرب (+13 ألف متابع). بتلات، شموع، فوانيس شرقية، ولحظة "نعم" ما كتتنسى.',
      story: {
        title: 'من "واش تزوجي بيا؟" تال "نعم"',
        body: [
          'She Said Yes هي أول agency في المغرب متخصصة في طلبات الزواج (demandes en mariage): سيناريو مفصل، ديكور حالم، وتوقيت مضبوط بالثانية — باش تبقى غير اللحظة والجواب.',
          'من مراكش للدار البيضاء، الرباط وطنجة، الفريق كينظم أعراساً كاملة وطلبات زواج في الصحراء، على البحر، وفي الرياضات. وبتخصص نادر في المغرب، كينظمو أيضاً الأعراس اليهودية وحفلات الـHuppah بكل تفاصيلها.',
          'أزيد من 13 ألف متابع على إنستغرام كيشوفو كل أسبوع لحظات "نعم" جديدة — قلوب من الورد، نيون "Will you marry me?"، ودموع فرح حقيقية.',
        ],
        quote: {
          text: 'حنا ما كنظموش حفلات — حنا كنكتبو أول صفحة من قصة زواجكم.',
          author: 'فريق She Said Yes',
        },
      },
      services: [
        {
          title: 'طلب زواج سينمائي',
          desc: 'سيناريو مفاجأة كامل: الموقع، الديكور، المصور، والتوقيت — من قلب الصحراء لأسطح الرياضات.',
          price: 'من 8 000 درهم',
        },
        {
          title: 'تنظيم عرس كامل — Signature',
          desc: 'من اختيار المكان تال آخر رقصة: تصميم، تنسيق الموردين، وإدارة يوم العرس.',
          price: 'من 60 000 درهم',
        },
        {
          title: 'أعراس يهودية وحفلات Huppah',
          desc: 'تخصص نادر في المغرب: تنظيم كامل بالتقاليد، مع موردين معتمدين.',
          price: 'حسب الطلب',
        },
        {
          title: 'حفلات الخطوبة والحناء',
          desc: 'أجواء مغربية فاخرة للياليكم الأولى: ديكور، تيودا، وتنسيق كامل.',
          price: 'من 15 000 درهم',
        },
        {
          title: 'تنسيق يوم العرس (Day-of)',
          desc: 'نحنا نديرو اليوم ونتوما تعيشوه — إدارة التوقيت والموردين من الفجر للسهرة.',
          price: 'من 12 000 درهم',
        },
      ],
      gallery: [
        { src: '/stores/she-said-yes/gallery-1.jpg', caption: 'كرسي العرسان — ستايل بوهو' },
        { src: '/stores/she-said-yes/gallery-2.jpg', caption: 'قلب من الورد في أڭافاي' },
        { src: '/stores/she-said-yes/gallery-3.jpg', caption: 'طاولة عشاء على الواجهة' },
      ],
      reviews: [
        {
          text: 'نظمو ليا طلب الزواج في الصحراء ديال أڭافاي — قلب من الورد الحقيقي ونيون وسط الكثبان. مرتي لحد الآن كتبكي ملي كتشوف الصور. شكراً من القلب.',
          author: 'أنس م.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'Wedding planner ديال عرسنا في مراكش. كلشي كان مضبوط: الموردين، التوقيت، الديكور. حنا غير عشنا النهار وهوما دارو الباقي.',
          author: 'Lina & Yassine',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'الاحترافية والذوق الرفيع في كل تفصيلة. الأفضل في المغرب بلا منازع — المتابعين ديالهم على إنستغرام عارفين علاش.',
          author: 'Sofia B.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الإثنين — الجمعة', time: '10:00 — 19:00' },
        { days: 'السبت', time: 'بالموعد' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: 'مراكش — تغطية: الدار البيضاء، الرباط، طنجة',
      mapQuery: 'She Said Yes Wedding Planner, Marrakech',
      phone: '+212664232474',
      whatsapp: '+212664232474',
      instagram: 'https://www.instagram.com/shesaidyes.weddings_ma',
    },
  },

  // Slot 09 — Modern minimalist weddings, French-first · editorial · petal
  {
    slug: 'your-events',
    name: 'Your Events',
    nameAr: 'يور إيفنتس',
    nameFr: 'Your Events by Fattouma & Soufiane',
    sector: 'lifestyle',
    category: 'Wedding planners',
    city: 'Rabat',
    dir: 'ltr',
    lang: 'fr',
    layoutVariant: 'editorial',
    shader: 'petal',
    shaderVariant: 'petal',
    shaderIntensity: 0.9,
    texture: 'grain',
    colors: {
      primary: '#EAD3CE',
      accent: '#7A5A66',
      shaderA: '#EAD3CE',
      shaderB: '#F8F1EC',
      surfaceTint: 'rgba(234,211,206,0.06)',
      onPrimary: '#0A0C0A',
    },
    fontPair: { display: 'Cormorant Garamond', body: 'IBM Plex Sans' },
    tagline: 'Des mariages qui ne se répètent jamais',
    phone: '+212611122058',
    content: {
      heroTitle: ['Un mariage', 'à votre image.'],
      heroSub:
        'Fattouma & Soufiane — un couple dans la vie comme dans le métier. De Rabat à Marrakech, ils signent des mariages haute couture, bohemes et profondément personnels.',
      story: {
        title: 'De couple à couple',
        body: [
          'Fattouma et Soufiane sont mariés — et c\u2019est peut-être leur plus belle compétence. Ce duo de wedding planners basé à Rabat conçoit chaque mariage comme une conversation : votre histoire devient scénographie, vos silences deviennent lumière.',
          'Repérés par Shoelifer parmi les « 4 pros à connaître » du mariage au Maroc, ils travaillent de Tanger à Fès et Marrakech : riads, villas, domaines nature — eucalyptus, champs fleuris, dunes — avec une signature bohème-romantique reconnaissable entre mille.',
          'Chez Your Events, aucun mariage ne ressemble à un autre. C\u2019est la règle, et la promesse.',
        ],
        quote: {
          text: 'Nous sommes un couple qui organise le plus beau jour d\u2019autres couples. Qui pourrait mieux comprendre ?',
          author: 'Fattouma & Soufiane',
        },
      },
      services: [
        {
          title: 'Mariage clé en main — Signature',
          desc: 'Conception complète : scénographie florale, lieu, traiteur, coordination des prestataires.',
          price: 'sur devis',
        },
        {
          title: 'Scénographie & design floral',
          desc: 'Direction artistique sur mesure : compositions florales, lumières, mobiliers chinés.',
          price: 'à partir de 25 000 MAD',
        },
        {
          title: 'Recherche de lieu',
          desc: 'Riads confidentiels, villas et domaines nature — notre carnet d\u2019adresses de Tanger à Marrakech.',
          price: 'à partir de 5 000 MAD',
        },
        {
          title: 'Coordination du jour J',
          desc: 'Vous vivez, nous orchestrons : planning, prestataires, imprévus.',
          price: 'à partir de 12 000 MAD',
        },
        {
          title: 'Mariages intimes & elopements',
          desc: 'Cérémonies à deux ou à dix — dans les dunes, un champ en fleurs ou un patio de riad.',
          price: 'sur devis',
        },
      ],
      gallery: [
        { src: '/stores/your-events/gallery-1.jpg', caption: 'Sortie de cérémonie, médina' },
        { src: '/stores/your-events/gallery-2.jpg', caption: 'Détails — caftan & zellige' },
        { src: '/stores/your-events/gallery-3.jpg', caption: 'Table du soir, lumières chaudes' },
      ],
      reviews: [
        {
          text: 'Fattouma et Soufiane ont compris notre histoire mieux que nous. Le mariage était exactement « nous » — nos invités en parlent encore.',
          author: 'Salma & Omar',
          rating: 5,
          source: 'Instagram',
        },
        {
          text: 'Un duo rare : créatifs, calmes, ultra-organisés. La scénographie florale était digne d\u2019un magazine.',
          author: 'Inès K.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'Ils ont trouvé un domaine que personne ne connaissait et tout coordonné à la perfection. Le mariage le plus personnel qu\u2019on ait vu.',
          author: 'Rim & Adil',
          rating: 5,
          source: 'Instagram',
        },
      ],
      hours: [
        { days: 'Lundi — Vendredi', time: '10:00 — 19:00' },
        { days: 'Samedi', time: 'Sur rendez-vous' },
        { days: 'Dimanche', time: 'Fermé' },
      ],
      address: 'Rabat — interventions de Tanger à Marrakech',
      mapQuery: 'Your Events by Fattouma & Soufiane, Rabat',
      phone: '+212611122058',
      whatsapp: '+212611122058',
    },
  },

  // Slot 10 — Traditional Moroccan wedding & boutique agency · immersive · silk
  {
    slug: 'up2you-event',
    name: 'Up2You Event',
    nameAr: 'أپ تو يو إيفنت',
    nameFr: 'Up2You Event Marrakech',
    sector: 'lifestyle',
    category: 'وكالة أعراس وأحداث بوتيك',
    city: 'مراكش — جليز',
    dir: 'rtl',
    lang: 'ar',
    layoutVariant: 'immersive',
    shader: 'silk',
    shaderVariant: 'silk',
    shaderIntensity: 0.9,
    texture: 'zellige',
    colors: {
      primary: '#D8B25C',
      accent: '#6E1423',
      shaderA: '#6E1423',
      shaderB: '#D8B25C',
      surfaceTint: 'rgba(216,178,92,0.05)',
      onPrimary: '#1A120C',
    },
    fontPair: { display: 'Amiri', body: 'IBM Plex Sans Arabic' },
    tagline: 'أعراس وأحداث على مقاسك في جليز',
    content: {
      heroTitle: ['من الحناء', 'حتى الدخلة.'],
      heroSub:
        'وكالة بوتيك في قلب جليز: أعراس حسب الطلب، حفلات حميمة، سهرات غالا وأحداث شركات — ديكور غير تقليدي وأناقة مغربية. تقييم 4.9/5.',
      story: {
        title: 'البوتيك اللي كيسمع قبل ما يصمم',
        body: [
          'في شارع يعقوب المريني بجليز، Up2You Event ما هيش وكالة كبيرة بفرق متعاقبة — هي بوتيك: فريق صغير كياخد عدد محدود ديال الأعراس في العام، باش كل عرس ياخد الوقت والعناية اللي كيستاهل.',
          'من ليلة الحناء للدخلة، الوكالة كتصمم أجواء "غير تقليدية" بأناقة: ديكور حسب الطلب، تنسيق كامل للموردين، وإدارة دقيقة ليوم العرس — وهادشي باين في التقييم: 4.9/5 في Google.',
          'أعراس، خطوبات، سهرات غالا، أو أحداث شركات — نفس الفلسفة: حدث واحد، حكاية واحدة، وتفاصيل ما كتتعاودش.',
        ],
        quote: {
          text: 'العرس الناجح هو اللي الضيوف كيحكيو عليه بالتفاصيل — والعرسان ما شافو فيه حتى مشكل.',
          author: 'فريق Up2You Event',
        },
      },
      services: [
        {
          title: 'عرس كامل — Royal',
          desc: 'تنظيم شامل من الحناء للدخلة: قاعة، نكافة، ديكور، فرق فنية، وتنسيق كامل.',
          price: 'من 80 000 درهم',
        },
        {
          title: 'باقة Signature',
          desc: 'التصميم والتنسيق الكامل للعرس مع إدارة الموردين — الأكثر طلباً.',
          price: 'من 45 000 درهم',
        },
        {
          title: 'باقة Essentiel',
          desc: 'الأساسيات بإتقان: تنسيق يوم العرس + ديكور القاعة والمدخل.',
          price: 'من 20 000 درهم',
        },
        {
          title: 'ليلة الحناء والخطوبة',
          desc: 'سهرات مغربية أصيلة: صواني الحناء، التقاليد، والأجواء العائلية الفاخرة.',
          price: 'من 10 000 درهم',
        },
        {
          title: 'سهرات غالا وأحداث شركات',
          desc: 'تنظيم أحداث مهنية وسهرات راقية بنفس العناية ديال الأعراس.',
          price: 'حسب الطلب',
        },
      ],
      gallery: [
        { src: '/stores/up2you-event/gallery-1.jpg', caption: 'قاعة العرس — التجهيز الكامل' },
        { src: '/stores/up2you-event/gallery-2.jpg', caption: 'طاولة العرسان' },
        { src: '/stores/up2you-event/gallery-3.jpg', caption: 'تفاصيل الديكور التقليدي' },
      ],
      reviews: [
        {
          text: 'نظمو عرسنا من الألف للياء — الديكور كان فوق ما تصورنا والتنظيم ديال النهار كان مضبوط بالدقيقة. 4.9 مستاهلين.',
          author: 'هند و.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'وكالة بوتيك بالمعنى الحقيقي: كياخدو وقت معاك، كيسمعو، وكيخرجو بأفكار ما كتلقاهمش عند الوكالات الكبيرة.',
          author: 'Mohamed A.',
          rating: 5,
          source: 'Google',
        },
        {
          text: 'ليلة الحناء ديالي كانت حلم: الصواني، الأجواء، التنظيم. عائلتي كاملة طلبات الرقم ديالهم.',
          author: 'كوثر ب.',
          rating: 5,
          source: 'Google',
        },
      ],
      hours: [
        { days: 'الإثنين — السبت', time: '10:00 — 19:00' },
        { days: 'الأحد', time: 'مغلق' },
      ],
      address: 'شارع يعقوب المريني، الطابق الأول، جليز، مراكش',
      mapQuery: 'Up2You Event, Rue Yaacoub El Merini, Guéliz, Marrakech',
    },
  },
];

/** All 10 lifestyle stores, in sector-lifestyle.md slot order. */
export const lifestyleStores: LifestyleStore[] = [
  ...lifestyleGyms,
  ...lifestyleFurniture,
  ...lifestyleWeddings,
];

export default lifestyleStores;
