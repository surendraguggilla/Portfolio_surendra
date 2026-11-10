import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Terminal as TerminalIcon } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import heroPhoto from '../../assets/hero.png';

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const { personal } = PORTFOLIO_DATA;
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [visible, setVisible]       = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const rafRef    = useRef<number | null>(null);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Rotating tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx(i => (i + 1) % personal.taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [personal.taglines.length]);

  // Animated dot-grid canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();

    const dots: { x: number; y: number; baseR: number }[] = [];
    const SPACING = 34;
    const rebuild = () => {
      dots.length = 0;
      for (let x = SPACING; x < W; x += SPACING) {
        for (let y = SPACING; y < H; y += SPACING) {
          dots.push({ x, y, baseR: 1.2 });
        }
      }
    };
    rebuild();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let t = 0;
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      dots.forEach(d => {
        const dist = Math.hypot(d.x - mx, d.y - my);
        const proximity = Math.max(0, 1 - dist / 160);
        const wave = prefersReduced ? 0 : Math.sin(t * 0.6 + d.x * 0.025 + d.y * 0.025) * 0.4;
        const alpha = 0.12 + wave * 0.04 + proximity * 0.5;
        const r = d.baseR + proximity * 2.5 + wave * 0.3;

        // Base dot: warm dark
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 26, 26, ${alpha})`;
        ctx.fill();

        // Orange highlight on proximity
        if (proximity > 0.2) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, r * proximity, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(231, 111, 50, ${proximity * 0.7})`;
          ctx.fill();
        }
      });

      if (!prefersReduced) t += 0.018;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => { resize(); rebuild(); });
    ro.observe(canvas);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const v = visible;

  return (
    <section id="hero" className="hero zone-light" aria-label="Introduction">
      {/* Animated dot-grid canvas */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Decorative background headline */}
      <div className="hero-bg-headline" aria-hidden="true">
        <span>BUILDING</span>
        <span className="hero-bg-headline-outline">IDEAS</span>
      </div>

      <div className="hero-inner">
        {/* Top metadata strip */}
        <div className={`hero-meta-strip${v ? ' hero-visible' : ''}`}
             style={{ transitionDelay: '0ms' }}>
          <span className="hero-meta-item">
            <span className="hero-meta-dot" aria-hidden="true" />
            <span>{personal.metadata.status}</span>
          </span>
          <span className="hero-meta-sep" aria-hidden="true">—</span>
          <span className="hero-meta-item">LPU · {personal.education.period}</span>
          <span className="hero-meta-sep hero-meta-sep--desktop" aria-hidden="true">—</span>
          <span className="hero-meta-item hero-meta-coords" aria-hidden="true">
            31.2536° N, 75.7037° E
          </span>
        </div>

        {/* Main hero content */}
        <div className="hero-content">
          {/* Left: identity */}
          <div className="hero-identity">
            {/* Greeting */}
            <p className={`hero-greeting${v ? ' hero-visible' : ''}`}
               style={{ transitionDelay: '80ms' }}>
              Hey, I'm
            </p>

            {/* Big name */}
            <div className="hero-name-block">
              <h1 className="hero-name">
                <span className={`hero-name-line${v ? ' hero-visible' : ''}`}
                      style={{ transitionDelay: '160ms' }}>
                  Surendra
                </span>
                <span className={`hero-name-line hero-name-line--accent${v ? ' hero-visible' : ''}`}
                      style={{ transitionDelay: '280ms' }}>
                  Guggilla.
                </span>
              </h1>
              <div className={`hero-orange-rule${v ? ' hero-visible' : ''}`} aria-hidden="true" />
            </div>

            {/* Rotating tagline */}
            <div className={`hero-tagline-wrap${v ? ' hero-visible' : ''}`}
                 style={{ transitionDelay: '400ms' }}>
              <span className="hero-tagline-label" aria-hidden="true">Currently</span>
              <div className="hero-tagline" aria-live="polite" aria-atomic="true">
                {personal.taglines[taglineIdx]}
              </div>
            </div>

            {/* Bio */}
            <p className={`hero-bio${v ? ' hero-visible' : ''}`}
               style={{ transitionDelay: '480ms' }}>
              {personal.bio}
            </p>

            {/* CTAs */}
            <div className={`hero-ctas${v ? ' hero-visible' : ''}`}
                 style={{ transitionDelay: '560ms' }}>
              <a href="#work" className="btn btn-primary" data-cursor-label="EXPLORE">
                Explore Projects
                <ArrowDownRight size={16} />
              </a>
              {personal.social.resumeUrl ? (
                <a
                  href={personal.social.resumeUrl}
                  download="Surendra_Guggilla_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  data-cursor-label="DOWNLOAD"
                >
                  Resume ↓
                </a>
              ) : (
                <span className="btn btn-outline btn--disabled" aria-label="Resume not yet available">
                  Resume — Coming Soon
                </span>
              )}
            </div>

            {/* Social links */}
            <div className={`hero-socials${v ? ' hero-visible' : ''}`}
                 style={{ transitionDelay: '640ms' }}>
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                data-cursor-label="GITHUB"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
              <span className="hero-social-sep" aria-hidden="true">·</span>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                data-cursor-label="LINKEDIN"
              >
                <LinkedinIcon size={15} />
                LinkedIn
              </a>
              <span className="hero-social-sep" aria-hidden="true">·</span>
              <button
                className="hero-social-link"
                onClick={onOpenTerminal}
                aria-label="Open portfolio terminal"
                data-cursor-label="CLI"
              >
                <TerminalIcon size={15} />
                Terminal [~]
              </button>
            </div>
          </div>

                    {/* Right: bigger photo + mini CLI */}
          <div className={`hero-sidebar${v ? ' hero-visible' : ''}`}
               style={{ transitionDelay: '320ms' }}>

            {/* Large photo frame */}
            <div className="hero-profile-frame">
              <div className="hero-profile-placeholder" aria-label="Replace hero.png in src/assets with your photo">
                <img
                  src={heroPhoto}
                  alt="Surendra Guggilla"
                  className="hero-profile-img"
                  onError={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.display="none"; const fb = el.parentElement?.querySelector(".hero-profile-fallback") as HTMLElement|null; if(fb) fb.style.display="flex"; }}
                />
                <div className="hero-profile-fallback" aria-hidden="true">
                  {/* <span className="hero-profile-initials">{personal.initials}</span> */}
                  {/* <span className="hero-profile-hint">Add photo → src/assets/hero.png</span> */}
                </div>
              </div>
              <div className="hero-profile-label">
                <span>B.Tech CSE · LPU</span>
                <span className="hero-profile-label-accent">2024–2028</span>
              </div>
            </div>

            {/* Mini inline CLI — click to open full terminal */}
            <div
              className="hero-mini-cli"
              onClick={onOpenTerminal}
              role="button"
              tabIndex={0}
              aria-label="Open portfolio terminal"
              data-cursor-label="OPEN"
              onKeyDown={(e) => e.key === 'Enter' && onOpenTerminal()}
            >
              <div className="hero-mini-cli-bar">
                <span className="hero-mini-cli-dots" aria-hidden="true">
                  <span /><span /><span />
                </span>
                <span className="hero-mini-cli-title">surendra@portfolio ~</span>
                <span className="hero-mini-cli-shortcut">[ ~ ]</span>
              </div>
              <div className="hero-mini-cli-body">
                <div className="hero-mini-cli-line">
                  <span className="hero-mini-cli-prompt">$</span>
                  <span className="hero-mini-cli-cmd"> whoami</span>
                </div>
                <div className="hero-mini-cli-out">Surendra Guggilla — CS student, builder, explorer</div>
                <div className="hero-mini-cli-line">
                  <span className="hero-mini-cli-prompt">$</span>
                  <span className="hero-mini-cli-cmd"> skills --top</span>
                </div>
                <div className="hero-mini-cli-out">Python · Java · ML · SQL · Docker</div>
                <div className="hero-mini-cli-line">
                  <span className="hero-mini-cli-prompt">$</span>
                  <span className="hero-mini-cli-cmd"> _<span className="hero-mini-cli-blink">█</span></span>
                </div>
                <div className="hero-mini-cli-hint">↑ click to open full terminal or press [ ~ ]</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className={`hero-scroll-indicator${v ? ' hero-visible' : ''}`}
             style={{ transitionDelay: '800ms' }}
             aria-hidden="true">
          <span className="hero-scroll-line" />
          <span className="hero-scroll-label">SCROLL TO EXPLORE</span>
          <span className="hero-scroll-count">01 / 05</span>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* Background headline */
        .hero-bg-headline {
          position: absolute;
          right: -2%;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }
        .hero-bg-headline span {
          font-family: var(--font-display);
          font-size: clamp(5rem, 14vw, 16rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: rgba(26,26,26,0.04);
        }
        .hero-bg-headline-outline {
          -webkit-text-stroke: 1px rgba(231,111,50,0.08) !important;
          color: transparent !important;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          flex: 1;
          max-width: var(--container-max);
          margin-inline: auto;
          padding-inline: var(--container-pad);
          padding-block: clamp(1rem, 2vw, 2rem);
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Entrance animation base */
        .hero-meta-strip,
        .hero-greeting,
        .hero-name-line,
        .hero-orange-rule,
        .hero-tagline-wrap,
        .hero-bio,
        .hero-ctas,
        .hero-socials,
        .hero-sidebar,
        .hero-scroll-indicator {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 700ms var(--ease-out-expo),
                      transform 700ms var(--ease-out-expo);
        }
        .hero-visible {
          opacity: 1 !important;
          transform: none !important;
        }

        /* ── Metadata strip ── */
        .hero-meta-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-cream);
        }
        .hero-meta-item { display: flex; align-items: center; gap: 0.35rem; }
        .hero-meta-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--orange);
          animation: pulse 2.2s ease-in-out infinite;
        }
        .hero-meta-sep { color: var(--border-cream); }
        .hero-meta-coords { color: rgba(107,100,96,0.6); }
        @media (max-width: 640px) { .hero-meta-sep--desktop { display: none; } .hero-meta-coords { display: none; } }

        /* ── Main content grid ── */
        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr 320px;
            gap: clamp(1.5rem, 3vw, 3.5rem);
            align-items: start;
          }
        }

        /* ── Identity left ── */
        .hero-identity {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-greeting {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0.01em;
        }

        .hero-name-block { position: relative; }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7.5vw, 5.5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.035em;
          display: flex;
          flex-direction: column;
          gap: 0.04em;
        }

        .hero-name-line {
          display: block;
          color: var(--text-dark);
          transition: opacity 800ms var(--ease-out-expo),
                      transform 800ms var(--ease-out-expo);
        }
        .hero-name-line--accent {
          color: var(--orange);
          transition-delay: 120ms !important;
        }

        .hero-orange-rule {
          width: 0;
          height: 4px;
          background: var(--orange);
          margin-top: 1rem;
          border-radius: 2px;
          transition: width 700ms var(--ease-out-expo) 450ms,
                      opacity 0ms;
        }
        .hero-orange-rule.hero-visible { width: clamp(60px, 10vw, 100px); }

        /* Tagline */
        .hero-tagline-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .hero-tagline-label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .hero-tagline {
          font-family: var(--font-mono);
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--near-black);
          border-bottom: 2px solid var(--orange);
          padding-bottom: 2px;
          transition: opacity 300ms;
          min-width: 10ch;
        }

        /* Bio */
        .hero-bio {
          max-width: 56ch;
          font-size: clamp(0.875rem, 1.6vw, 1rem);
          color: var(--text-muted);
          line-height: 1.65;
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .btn--disabled {
          opacity: 0.4;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Social links */
        .hero-socials {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .hero-social-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          transition: color 150ms;
          background: none;
          border: none;
          padding: 0;
          cursor: none;
        }
        .hero-social-link:hover { color: var(--orange); }
        .hero-social-sep { color: var(--border-cream); font-size: 1rem; }

        /* ── Right sidebar ── */
        .hero-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* Profile frame */
        .hero-profile-frame {
          position: relative;
        }
        .hero-profile-placeholder {
          width: 100%;
          aspect-ratio: 4/5;
          background: linear-gradient(145deg, #EDE4D6, #DFD5C4);
          border: 2px solid var(--border-cream);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          overflow: hidden;
          position: relative;
        }
        .hero-profile-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          border-radius: 9px;
          display: block;
        }
        .hero-profile-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          z-index: 1;
        }
        .hero-profile-initials {
          font-family: var(--font-display);
          font-size: clamp(4rem, 10vw, 7rem);
          font-weight: 900;
          color: var(--orange);
          opacity: 0.25;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .hero-profile-hint {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          opacity: 0.5;
          text-align: center;
          padding: 0 1rem;
        }
        .hero-profile-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(26,26,26,0.75), transparent);
          padding: 2rem 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(246,240,230,0.85);
          border-radius: 0 0 9px 9px;
        }
        .hero-profile-label-accent { color: var(--orange); }

        /* Mini CLI */
        .hero-mini-cli {
          background: var(--near-black);
          border-radius: 8px;
          overflow: hidden;
          cursor: none;
          border: 1px solid #252525;
          transition: border-color 200ms, transform 200ms;
        }
        .hero-mini-cli:hover {
          border-color: rgba(198,255,0,0.3);
          transform: translateY(-2px);
        }
        .hero-mini-cli-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: #1A1A1A;
          border-bottom: 1px solid #252525;
        }
        .hero-mini-cli-dots {
          display: flex;
          gap: 4px;
        }
        .hero-mini-cli-dots span {
          display: block;
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .hero-mini-cli-dots span:nth-child(1) { background: #FF5F57; }
        .hero-mini-cli-dots span:nth-child(2) { background: #FFBD2E; }
        .hero-mini-cli-dots span:nth-child(3) { background: #28C840; }
        .hero-mini-cli-title {
          flex: 1;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(246,240,230,0.3);
          letter-spacing: 0.06em;
          text-align: center;
        }
        .hero-mini-cli-shortcut {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: rgba(198,255,0,0.4);
          letter-spacing: 0.08em;
          font-weight: 700;
        }
        .hero-mini-cli-body {
          padding: 0.875rem 0.875rem 0.625rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .hero-mini-cli-line {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.25rem;
        }
        .hero-mini-cli-prompt {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--lime);
        }
        .hero-mini-cli-cmd {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: rgba(246,240,230,0.85);
        }
        .hero-mini-cli-out {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(246,240,230,0.4);
          letter-spacing: 0.04em;
          padding-left: 0.875rem;
          margin-bottom: 0.125rem;
        }
        .hero-mini-cli-blink {
          animation: blink 1.1s step-end infinite;
          color: var(--lime);
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .hero-mini-cli-hint {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: rgba(198,255,0,0.3);
          letter-spacing: 0.06em;
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid #252525;
        }

        .hero-cli-hint-enter {
          color: var(--orange);
          font-weight: 700;
        }

        /* Scroll indicator */
        .hero-scroll-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-cream);
        }
        .hero-scroll-line {
          display: block;
          width: 32px;
          height: 1px;
          background: var(--orange);
        }
        .hero-scroll-count {
          margin-left: auto;
          color: var(--orange);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-meta-strip,
          .hero-greeting,
          .hero-name-line,
          .hero-orange-rule,
          .hero-tagline-wrap,
          .hero-bio,
          .hero-ctas,
          .hero-socials,
          .hero-sidebar,
          .hero-scroll-indicator {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .hero-orange-rule { width: 80px; }
        }
      `}</style>
    </section>
  );
}
