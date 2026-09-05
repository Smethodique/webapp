import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const LINKS = [
  { to: '/', ar: 'الرئيسية', fr: 'ACCUEIL' },
  { to: '/works', ar: 'الأعمال', fr: 'TRAVAUX' },
  { to: '/about', ar: 'من أنا', fr: 'À PROPOS' },
  { to: '/contact', ar: 'تواصل', fr: 'CONTACT' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-[72px] w-full transition-all duration-500 ease-luxe ${
          scrolled ? 'border-b border-line bg-ink-950/70 backdrop-blur-[12px]' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-atelier flex h-full items-center justify-between">
          {/* wordmark — inline-start (right in RTL) */}
          <Link to="/" className="flex flex-col leading-none" aria-label="أتيلييه — الرئيسية">
            <span className="font-amiri text-[1.4rem] font-bold text-cream">أتيلييه</span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-cream-faint" dir="ltr">
              EST. CASABLANCA
            </span>
          </Link>

          {/* desktop links */}
          <nav className="hidden items-center gap-10 md:flex" aria-label="التنقل الرئيسي">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className="group flex flex-col items-center gap-1">
                {({ isActive }) => (
                  <>
                    <span className={`gold-link font-plex text-[0.95rem] transition-colors ${isActive ? 'text-gold-500' : 'text-cream group-hover:text-gold-400'}`} data-active={isActive}>
                      {l.ar}
                    </span>
                    <span className="font-grotesk text-[8px] tracking-[0.28em] text-cream-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100" dir="ltr">
                      {l.fr}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden rounded-full bg-gold-500 px-6 py-2.5 font-plex text-sm font-semibold text-ink-950 transition-all duration-300 hover:scale-[1.03] hover:bg-gold-400 md:inline-block"
            >
              احجز مكالمة
            </Link>
            {/* hamburger */}
            <button
              type="button"
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'أغلق القائمة' : 'افتح القائمة'}
              aria-expanded={open}
            >
              <span className={`h-px w-7 bg-cream transition-transform duration-400 ease-swift ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`h-px w-7 bg-cream transition-transform duration-400 ease-swift ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-950 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav className="container-atelier flex flex-col gap-6" aria-label="قائمة الموبايل">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={l.to} className="font-amiri text-[clamp(2.5rem,9vw,4rem)] font-bold leading-tight text-cream">
                    {l.ar}
                    <span className="ms-4 font-grotesk text-xs tracking-[0.28em] text-gold-500" dir="ltr">{l.fr}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="container-atelier mt-16 flex flex-col gap-2 font-mono text-xs text-cream-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span dir="ltr">response@atelier.ma</span>
              <span dir="ltr">33.5731° N, 7.5898° W</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
