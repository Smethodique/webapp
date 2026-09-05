import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MessageCircle, Globe } from 'lucide-react';

const SITEMAP = [
  { to: '/', label: 'الرئيسية' },
  { to: '/works', label: 'الأعمال' },
  { to: '/about', label: 'من أنا' },
  { to: '/contact', label: 'تواصل' },
];

const SOCIALS = [
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://behance.net', label: 'Behance', Icon: Globe },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://wa.me/212600000000', label: 'WhatsApp', Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950">
      {/* giant ghost wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[4vw] start-0 select-none font-amiri text-[18vw] font-bold leading-none text-cream/[0.04]"
      >
        أتيلييه
      </div>

      <div className="container-atelier relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-amiri text-3xl font-bold leading-snug text-cream md:text-4xl">
            خلّينا نصنعوا شي حاجة زوينة
          </p>
          <p className="mt-3 font-cormorant text-xl italic text-gold-500" lang="fr" dir="ltr">
            Travaillons ensemble
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full border border-line px-8 py-3 font-plex text-sm text-cream transition-colors duration-300 hover:border-gold-500/40 hover:text-gold-400"
          >
            ابدأ مشروعك ↗
          </Link>
        </div>

        <div className="md:col-span-2">
          <h3 className="kicker mb-6 text-cream-faint" dir="ltr">SITEMAP</h3>
          <ul className="flex flex-col gap-3">
            {SITEMAP.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="gold-link font-plex text-sm text-cream-muted hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="kicker mb-6 text-cream-faint" dir="ltr">SOCIAL</h3>
          <ul className="flex flex-col gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="gold-link inline-flex items-center gap-2 font-plex text-sm text-cream-muted hover:text-cream" dir="ltr">
                  <Icon size={14} strokeWidth={1.25} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 font-mono text-xs text-cream-faint md:col-span-3 md:text-end">
          <span dir="ltr">33.5731° N, 7.5898° W — CASABLANCA</span>
          <span dir="ltr">response@atelier.ma</span>
          <span dir="ltr">© 2025 ATELIER — أتيلييه</span>
        </div>
      </div>
    </footer>
  );
}
