import type { CSSProperties, ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  /** seconds for one loop */
  duration?: number;
  /** rtl = natural rightward drift (default), ltr reverses */
  dir?: 'rtl' | 'ltr';
  className?: string;
}

/** Infinite ticker; duplicate content twice for seamless loop. Pauses/slows on hover via CSS. */
export default function Marquee({ children, duration = 45, dir = 'rtl', className }: MarqueeProps) {
  const style = { '--marquee-duration': `${duration}s` } as CSSProperties;
  return (
    <div className={`marquee-root overflow-hidden ${className ?? ''}`} style={style}>
      <div className={`marquee-track ${dir === 'ltr' ? 'marquee-track--ltr' : ''}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
