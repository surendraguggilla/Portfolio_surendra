import { Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function Contact() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="section contact-section zone-light" aria-labelledby="contact-heading">
      <div className="container">

        <div className="section-label reveal">
          <span className="label-num">05</span>
          <span>/</span>
          <span>GET IN TOUCH</span>
        </div>

        <div className="contact-inner">

          {/* Left: heading + blurb */}
          <div className="contact-left">
            <h2 className="section-heading reveal delay-100" id="contact-heading">
              LET'S<br />
              <span className="heading-accent">CONNECT.</span>
            </h2>
            <p className="contact-blurb reveal delay-200">
              I'm open to internship opportunities, collaborative projects, and conversations
              about computer science and software development.
            </p>
            <p className="contact-blurb reveal delay-300">
              Whether you're a recruiter, a developer, or just curious — feel free to reach out.
            </p>

            {/* Primary CTA */}
            <a
              href={`mailto:${personal.social.email}`}
              className="contact-cta reveal delay-400"
              data-cursor-label="EMAIL"
            >
              <Mail size={18} />
              <span>Send me an email</span>
              <ExternalLink size={14} className="contact-cta-arrow" aria-hidden="true" />
            </a>

            <p className="contact-email-hint reveal delay-500">
              {personal.social.email === 'your-email@example.com'
                ? '↑ Update your email in portfolioData.ts'
                : personal.social.email}
            </p>
          </div>

          {/* Right: contact options */}
          <div className="contact-right reveal-right delay-300">
            <div className="contact-options">

              <a
                href={`mailto:${personal.social.email}`}
                className="contact-option"
                data-cursor-label="EMAIL"
              >
                <div className="contact-option-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-option-body">
                  <div className="contact-option-label">Email</div>
                  <div className="contact-option-val">{personal.social.email}</div>
                </div>
                <ExternalLink size={14} className="contact-option-arrow" aria-hidden="true" />
              </a>

              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-option"
                data-cursor-label="GITHUB"
              >
                <div className="contact-option-icon">
                  <GithubIcon size={20} />
                </div>
                <div className="contact-option-body">
                  <div className="contact-option-label">GitHub</div>
                  <div className="contact-option-val">surendraguggilla</div>
                </div>
                <ExternalLink size={14} className="contact-option-arrow" aria-hidden="true" />
              </a>

              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-option"
                data-cursor-label="LINKEDIN"
              >
                <div className="contact-option-icon">
                  <LinkedinIcon size={20} />
                </div>
                <div className="contact-option-body">
                  <div className="contact-option-label">LinkedIn</div>
                  <div className="contact-option-val">surendraguggilla</div>
                </div>
                <ExternalLink size={14} className="contact-option-arrow" aria-hidden="true" />
              </a>
            </div>

            {/* Status card */}
            <div className="contact-status-card">
              <div className="contact-status-dot" aria-hidden="true" />
              <div className="contact-status-body">
                <div className="contact-status-title">CURRENT STATUS</div>
                <div className="contact-status-val">{personal.metadata.availability}</div>
                <div className="contact-status-sub">B.Tech CSE · LPU · Class of 2028</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .contact-section { border-top: 1px solid var(--border-cream); }

        .contact-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          margin-top: clamp(2rem, 4vw, 3.5rem);
        }
        @media (min-width: 900px) {
          .contact-inner { grid-template-columns: 1fr 1fr; align-items: start; }
        }

        .contact-left { display: flex; flex-direction: column; gap: 1.25rem; }

        .contact-blurb {
          font-size: clamp(0.9375rem, 1.7vw, 1.0625rem);
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 50ch;
        }

        /* Primary CTA */
        .contact-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          margin-top: 0.5rem;
          padding: 1rem 1.75rem;
          background: var(--orange);
          color: #fff;
          font-family: var(--font-sans);
          font-size: clamp(0.9rem, 1.8vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          border-radius: 6px;
          transition: all 200ms var(--ease-out-expo);
          align-self: flex-start;
        }
        .contact-cta:hover {
          background: #c45c20;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(231,111,50,0.25);
        }
        .contact-cta-arrow {
          opacity: 0.6;
          transition: transform 200ms, opacity 200ms;
        }
        .contact-cta:hover .contact-cta-arrow {
          transform: translate(2px,-2px);
          opacity: 1;
        }

        .contact-email-hint {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: rgba(26,26,26,0.3);
          letter-spacing: 0.06em;
        }

        /* Right column */
        .contact-right { display: flex; flex-direction: column; gap: 1rem; }

        .contact-options { display: flex; flex-direction: column; gap: 0; }

        .contact-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: 1.5px solid var(--border-cream);
          border-bottom: none;
          transition: all 200ms;
        }
        .contact-option:first-child { border-radius: 6px 6px 0 0; }
        .contact-option:last-child  { border-bottom: 1.5px solid var(--border-cream); border-radius: 0 0 6px 6px; }
        .contact-option:hover {
          background: rgba(231,111,50,0.03);
          border-color: var(--orange);
          z-index: 1;
        }
        .contact-option:only-child { border-radius: 6px; border-bottom: 1.5px solid var(--border-cream); }

        .contact-option-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          background: rgba(26,26,26,0.06);
          border: 1.5px solid rgba(26,26,26,0.14);
          border-radius: 8px;
          color: var(--near-black);
          flex-shrink: 0;
          transition: all 200ms;
        }
        .contact-option:hover .contact-option-icon {
          background: rgba(231,111,50,0.12);
          border-color: var(--orange);
          color: var(--orange);
          transform: scale(1.05);
        }

        .contact-option-body { flex: 1; }
        .contact-option-label {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }
        .contact-option-val {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-dark);
        }

        .contact-option-arrow {
          color: var(--text-muted);
          flex-shrink: 0;
          transition: transform 200ms, color 200ms;
        }
        .contact-option:hover .contact-option-arrow {
          transform: translate(2px,-2px);
          color: var(--orange);
        }

        /* Status card */
        .contact-status-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: rgba(231,111,50,0.04);
          border: 1.5px solid rgba(231,111,50,0.2);
          border-radius: 6px;
          margin-top: 0.5rem;
        }
        .contact-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--orange);
          flex-shrink: 0;
          margin-top: 4px;
          animation: pulse 2s ease-in-out infinite;
        }
        .contact-status-body { display: flex; flex-direction: column; gap: 0.25rem; }
        .contact-status-title {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(231,111,50,0.6);
        }
        .contact-status-val {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--orange);
          letter-spacing: 0.06em;
        }
        .contact-status-sub {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(26,26,26,0.3);
          letter-spacing: 0.1em;
        }
      `}</style>
    </section>
  );
}
