import { useEffect, useRef, useState, useCallback } from 'react';

interface CursorState {
  x: number;
  y: number;
  ringX: number;
  ringY: number;
  visible: boolean;
  hovering: boolean;
  label: string;
}

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<CursorState>({
    x: -200, y: -200, ringX: -200, ringY: -200,
    visible: false, hovering: false, label: '',
  });
  const rafRef = useRef<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(() => {
    const s = stateRef.current;
    s.ringX = lerp(s.ringX, s.x, 0.12);
    s.ringY = lerp(s.ringY, s.y, 0.12);

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${s.x}px,${s.y}px,0)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${s.ringX}px,${s.ringY}px,0)`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      const s = stateRef.current;
      s.x = e.clientX;
      s.y = e.clientY;
      if (!s.visible) {
        s.visible = true;
        s.ringX = e.clientX;
        s.ringY = e.clientY;
        if (dotRef.current)  dotRef.current.style.opacity  = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [role="button"], input, textarea');
      if (interactive) {
        const label = (interactive as HTMLElement).dataset.cursorLabel || '';
        s.hovering = true;
        s.label = label;
        if (dotRef.current)  dotRef.current.classList.add('cursor-dot--hover');
        if (ringRef.current) ringRef.current.classList.add('cursor-ring--hover');
        if (labelRef.current) {
          labelRef.current.textContent = label;
          labelRef.current.style.opacity = label ? '1' : '0';
        }
      } else {
        s.hovering = false;
        s.label = '';
        if (dotRef.current)  dotRef.current.classList.remove('cursor-dot--hover');
        if (ringRef.current) ringRef.current.classList.remove('cursor-ring--hover');
        if (labelRef.current) labelRef.current.style.opacity = '0';
      }
    };

    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onEnter = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span ref={labelRef} className="cursor-label" style={{ opacity: 0 }} />
      </div>

      <style>{`
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          top: 0; left: 0;
          will-change: transform;
        }

        .cursor-dot {
          width: 6px;
          height: 6px;
          background: var(--orange);
          border-radius: 50%;
          margin-top: -3px;
          margin-left: -3px;
          transition: transform 80ms, background 150ms, opacity 200ms;
        }

        .cursor-dot--hover {
          background: var(--lime);
          transform: scale(0) !important;
        }

        .cursor-ring {
          width: 36px;
          height: 36px;
          border: 1.5px solid var(--orange);
          border-radius: 50%;
          margin-top: -18px;
          margin-left: -18px;
          transition: width 250ms var(--ease-out-expo),
                      height 250ms var(--ease-out-expo),
                      border-color 250ms,
                      border-radius 200ms,
                      opacity 200ms;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-ring--hover {
          width: 52px;
          height: 52px;
          margin-top: -26px;
          margin-left: -26px;
          border-color: var(--lime);
          border-radius: 4px;
          border-width: 2px;
        }

        .cursor-label {
          font-family: var(--font-mono);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--lime);
          text-transform: uppercase;
          transition: opacity 150ms;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}
