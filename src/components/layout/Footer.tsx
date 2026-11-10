import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;
  const year = new Date().getFullYear();

  const sections = [
    { label: 'About',    href: '#about' },
    { label: 'Work',     href: '#work' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Learning', href: '#learning' },
    { label: 'Contact',  href: '#contact' },
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Top accent line */}
      <div className="footer-accent-bar" aria-hidden="true" />

      <div className="footer-inner container">

        {/* Left: brand + meta */}
        <div className="footer-left">
          <a href="#hero" className="footer-brand" aria-label="Back to top">SG.</a>
          <span className="footer-sep" aria-hidden="true">|</span>
          <span className="footer-copy">© {year} Surendra Guggilla</span>
        </div>

        {/* Center: nav links */}
        <nav className="footer-nav" aria-label="Footer navigation">
          {sections.map((s) => (
            <a key={s.href} href={s.href} className="footer-nav-link">
              {s.label}
            </a>
          ))}
        </nav>

        {/* Right: social icons */}
        <div className="footer-right">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="GitHub profile"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>

      </div>

      {/* Bottom strip */}
      <div className="footer-strip container">
        <span className="footer-tagline">
          <span className="footer-mono">~/surendra-portfolio</span>
          &nbsp;—&nbsp;learning by building.
        </span>
        <span className="footer-terminal-hint">
          press <kbd className="footer-kbd">~</kbd> to open terminal
        </span>
      </div>

      <style>{`
        .site-footer {
          background: var(--near-black);
          padding: 0;
          position: relative;
        }

        /* Bright accent bar on top — clearly separates footer from contact */
        .footer-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--orange) 0%, #f0a060 50%, var(--orange) 100%);
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding-top: 1.75rem;
          padding-bottom: 1.5rem;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(246,240,230,0.07);
        }

        /* Brand */
        .footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .footer-brand {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.25rem;
          color: var(--orange);
          letter-spacing: -0.03em;
          transition: opacity 150ms;
        }
        .footer-brand:hover { opacity: 0.8; }
        .footer-sep {
          color: rgba(246,240,230,0.15);
          font-size: 0.875rem;
        }
        .footer-copy {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: rgba(246,240,230,0.35);
          letter-spacing: 0.06em;
        }

        /* Nav */
        .footer-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-nav-link {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(246,240,230,0.4);
          transition: color 150ms;
        }
        .footer-nav-link:hover { color: var(--orange); }

        /* Social icons */
        .footer-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .footer-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          color: rgba(246,240,230,0.7);
          border: 1px solid rgba(246,240,230,0.25);
          border-radius: 6px;
          transition: all 200ms;
        }
        .footer-icon-link:hover {
          color: var(--orange);
          border-color: rgba(231,111,50,0.4);
          background: rgba(231,111,50,0.06);
          transform: translateY(-2px);
        }

        /* Bottom strip */
        .footer-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.875rem;
          padding-bottom: 0.875rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .footer-tagline {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: rgba(246,240,230,0.2);
          letter-spacing: 0.05em;
        }
        .footer-mono {
          color: rgba(231,111,50,0.5);
        }
        .footer-terminal-hint {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: rgba(246,240,230,0.15);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .footer-kbd {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.1em 0.4em;
          background: rgba(246,240,230,0.06);
          border: 1px solid rgba(246,240,230,0.14);
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 0.65em;
          color: rgba(231,111,50,0.6);
        }

        @media (max-width: 700px) {
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .footer-nav { gap: 1rem; justify-content: flex-start; }
          .footer-right { margin-top: 0.25rem; }
          .footer-strip { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
