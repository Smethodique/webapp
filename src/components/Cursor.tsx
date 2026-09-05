import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover-link' | 'hover-media' | 'drag';

/** Gold dot + trailing ring custom cursor. Fine pointers only. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor], a, button, [role="button"]');
      if (target) {
        const attr = (target as HTMLElement).closest('[data-cursor]')?.getAttribute('data-cursor');
        setState(attr === 'media' ? 'hover-media' : attr === 'drag' ? 'drag' : 'hover-link');
      } else {
        setState('default');
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      if (dotRef.current) dotRef.current.style.transform = `translate(${tx - 4}px, ${ty - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  const ringSize = state === 'hover-media' || state === 'drag' ? 80 : state === 'hover-link' ? 58 : 36;

  return (
    <div className="cursor-layer pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <div ref={dotRef} className="absolute h-2 w-2 rounded-full bg-gold-500" style={{ willChange: 'transform' }} />
      <div
        ref={ringRef}
        className="absolute flex items-center justify-center rounded-full border border-gold-500/40 transition-[width,height,background-color] duration-300 ease-snap"
        style={{
          width: ringSize,
          height: ringSize,
          willChange: 'transform',
          marginInlineStart: (ringSize - 36) / -2,
          marginTop: (ringSize - 36) / -2,
          backgroundColor: state === 'hover-media' || state === 'drag' ? 'rgba(10,10,14,0.55)' : 'transparent',
          backdropFilter: state === 'hover-media' || state === 'drag' ? 'blur(2px)' : undefined,
        }}
      >
        {(state === 'hover-media' || state === 'drag') && (
          <span className="font-plex text-[11px] font-medium text-gold-400">
            {state === 'hover-media' ? 'شاهد' : 'اسحب'}
          </span>
        )}
      </div>
    </div>
  );
}
