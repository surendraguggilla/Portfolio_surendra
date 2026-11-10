import { useState, useEffect, useRef } from 'react';
import { Menu, X, Terminal as TerminalIcon } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Work',     href: '#work' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Learning', href: '#learning' },
  { label: 'Contact',  href: '#contact' },
];

interface NavigationProps {
  onOpenTerminal: () => void;
}

export default function Navigation({ onOpenTerminal }: NavigationProps) {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActive]    = useState('');
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll progress + scrolled state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const h = document.documentElement;
      const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(pct, 100)}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close mobile on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const { personal } = PORTFOLIO_DATA;

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Scroll progress */}
      <div
        ref={progressRef}
        className="scroll-progress"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo / wordmark */}
          <a href="#hero" className="nav-logo" aria-label="Surendra Guggilla — back to top">
            <span className="nav-logo-initials">{personal.initials}</span>
            <span className="nav-logo-full">SURENDRA GUGGILLA</span>
          </a>

          {/* Desktop links */}
          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${activeSection === link.href.slice(1) ? ' nav-link--active' : ''}`}
                data-cursor-label="GO"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="nav-actions">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-btn"
              aria-label="GitHub profile"
              data-cursor-label="GITHUB"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-btn"
              aria-label="LinkedIn profile"
              data-cursor-label="LINKEDIN"
            >
              <LinkedinIcon size={16} />
            </a>
            <button
              className="nav-terminal-btn"
              onClick={onOpenTerminal}
              aria-label="Open portfolio terminal (press ~ key)"
              title="Open terminal [~]"
              data-cursor-label="CLI"
            >
              <TerminalIcon size={13} />
              <span>CLI</span>
            </button>

            {/* Availability indicator */}
            <div className="nav-status" aria-label="Current status: open to opportunities">
              <span className="nav-status-dot" aria-hidden="true" />
              <span>Available</span>
            </div>

            {/* Mobile hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              data-cursor-label={mobileOpen ? 'CLOSE' : 'MENU'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={closeMobile}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="mobile-nav-num" aria-hidden="true">0{i + 1}</span>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu-footer">
              <button
                className="mobile-cli-btn"
                onClick={() => { closeMobile(); onOpenTerminal(); }}
                data-cursor-label="CLI"
              >
                <TerminalIcon size={14} />
                Open Terminal [~]
              </button>
              <div className="mobile-socials">
                <a href={personal.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GithubIcon size={18} />
                </a>
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 600;
          background: var(--cream);
          border-bottom: 1px solid transparent;
          transition: border-color 250ms, box-shadow 250ms, background 250ms;
        }
        .site-header--scrolled {
          border-bottom-color: var(--border-cream);
          box-shadow: 0 1px 24px rgba(0,0,0,0.06);
          backdrop-filter: blur(8px);
          background: rgba(246,240,230,0.92);
        }

        .nav-inner {
          max-width: var(--container-max);
          margin-inline: auto;
          padding-inline: var(--container-pad);
          height: 64px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nav-logo-initials {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.375rem;
          color: var(--orange);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .nav-logo-full {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* Desktop nav links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.125rem;
          margin-left: auto;
        }

        .nav-link {
          padding: 0.375rem 0.75rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          border-radius: 3px;
          transition: color 150ms, background 150ms;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0.75rem; right: 0.75rem;
          height: 1.5px;
          background: var(--orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 200ms var(--ease-out-expo);
        }
        .nav-link:hover,
        .nav-link--active {
          color: var(--text-dark);
        }
        .nav-link:hover::after,
        .nav-link--active::after {
          transform: scaleX(1);
        }

        /* Right actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .nav-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          color: var(--text-muted);
          border: 1px solid var(--border-cream);
          border-radius: 6px;
          transition: all 150ms;
        }
        .nav-icon-btn:hover {
          color: var(--orange);
          border-color: var(--orange);
          background: var(--orange-dim);
        }

        .nav-terminal-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.375rem 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--near-black);
          background: transparent;
          border: 1.5px solid var(--near-black);
          border-radius: 4px;
          transition: all 150ms;
          cursor: none;
        }
        .nav-terminal-btn:hover {
          background: var(--near-black);
          color: var(--lime);
        }

        .nav-status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.3rem 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3A9A3A;
          background: rgba(58,154,58,0.08);
          border: 1px solid rgba(58,154,58,0.2);
          border-radius: 20px;
        }

        .nav-status-dot {
          width: 6px; height: 6px;
          background: #3A9A3A;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }

        .nav-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          color: var(--text-dark);
          border: 1.5px solid var(--border-cream);
          border-radius: 6px;
          transition: all 150ms;
          cursor: none;
        }
        .nav-hamburger:hover {
          border-color: var(--orange);
          color: var(--orange);
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          background: var(--cream);
          z-index: 500;
          padding: 2rem var(--container-pad) 3rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          overflow-y: auto;
          border-top: 1px solid var(--border-cream);
          animation: mobileSlide 280ms var(--ease-out-expo) both;
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-link {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border-cream);
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 6vw, 2.5rem);
          font-weight: 900;
          color: var(--text-dark);
          letter-spacing: -0.02em;
          transition: color 150ms;
          animation: mobileLinkIn 300ms var(--ease-out-expo) both;
        }
        @keyframes mobileLinkIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mobile-nav-link:hover { color: var(--orange); }

        .mobile-nav-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--orange);
          letter-spacing: 0.1em;
        }

        .mobile-menu-footer {
          margin-top: auto;
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .mobile-cli-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--near-black);
          border: 1.5px solid var(--near-black);
          border-radius: 4px;
          cursor: none;
          transition: all 150ms;
        }
        .mobile-cli-btn:hover {
          background: var(--near-black);
          color: var(--lime);
        }

        .mobile-socials {
          display: flex;
          gap: 0.75rem;
        }
        .mobile-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          color: var(--text-muted);
          border: 1px solid var(--border-cream);
          border-radius: 8px;
          transition: all 150ms;
        }
        .mobile-socials a:hover {
          color: var(--orange);
          border-color: var(--orange);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links    { display: none; }
          .nav-status   { display: none; }
          .nav-icon-btn { display: none; }
          .nav-terminal-btn { display: none; }
          .nav-hamburger { display: flex; }
        }

        @media (min-width: 769px) {
          .nav-hamburger { display: none; }
          .mobile-menu   { display: none; }
        }
      `}</style>
    </>
  );
}
