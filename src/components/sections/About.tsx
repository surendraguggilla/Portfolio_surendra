import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function About() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="section about-section zone-light" aria-labelledby="about-heading">
      <div className="container">

        <div className="section-label reveal">
          <span className="label-num">01</span>
          <span>/</span>
          <span>ABOUT</span>
        </div>

        <h2 className="section-heading reveal delay-100" id="about-heading">
          CURIOUS BY NATURE.<br />
          <span className="heading-accent">BUILDER BY PRACTICE.</span>
        </h2>

        <div className="about-grid">

          {/* Bio paragraphs */}
          <div className="about-bio reveal-left delay-200">
            {personal.aboutBio.map((para, i) => (
              <p key={i} className="about-para">{para}</p>
            ))}

            {/* Education card */}
            <div className="about-edu-card reveal delay-300">
              <div className="about-edu-label">EDUCATION</div>
              <div className="about-edu-degree">{personal.education.degree}</div>
              <div className="about-edu-meta">
                <span className="about-edu-inst">{personal.education.institution}</span>
                <span className="about-edu-sep" aria-hidden="true">·</span>
                <span>{personal.education.period}</span>
                <span className="about-edu-sep" aria-hidden="true">·</span>
                <span>{personal.education.location}</span>
              </div>
              {personal.education.cgpa !== '[X.XX]' && (
                <div className="about-edu-cgpa">
                  CGPA: <strong>{personal.education.cgpa}</strong> / 10.0
                </div>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="about-interests reveal-right delay-300">
            <h3 className="about-interests-heading">AREAS OF INTEREST</h3>
            <ol className="about-interests-list" role="list">
              {personal.interests.map((interest, i) => (
                <li key={i} className="about-interest-item">
                  <span className="about-interest-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>{interest}</span>
                </li>
              ))}
            </ol>

            {/* Quick stats */}
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-val">9+</span>
                <span className="about-stat-label">Projects</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-val">'28</span>
                <span className="about-stat-label">Expected Graduation</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-val">∞</span>
                <span className="about-stat-label">Curiosity</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section {
          border-top: 1px solid var(--border-cream);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2.5rem, 6vw, 5rem);
          margin-top: clamp(2rem, 5vw, 4rem);
        }
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 1fr 1fr; }
        }

        .about-bio {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-para {
          font-size: clamp(0.9375rem, 1.7vw, 1.0625rem);
          color: var(--text-muted);
          line-height: 1.75;
        }

        /* Education card */
        .about-edu-card {
          margin-top: 0.5rem;
          padding: 1.25rem 1.5rem;
          background: var(--cream-dark);
          border: 1px solid var(--border-cream);
          border-left: 3px solid var(--orange);
          border-radius: 4px;
        }
        .about-edu-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 0.5rem;
        }
        .about-edu-degree {
          font-family: var(--font-display);
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }
        .about-edu-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .about-edu-inst { font-weight: 700; color: var(--text-dark); }
        .about-edu-sep  { color: var(--border-cream); }
        .about-edu-cgpa {
          margin-top: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .about-edu-cgpa strong { color: var(--text-dark); }

        /* Interests */
        .about-interests { display: flex; flex-direction: column; gap: 1.5rem; }

        .about-interests-heading {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .about-interests-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .about-interest-item {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 0.875rem 0;
          border-bottom: 1px solid var(--border-cream);
          font-size: clamp(0.9rem, 1.8vw, 1.0625rem);
          color: var(--text-dark);
          transition: color 150ms;
        }
        .about-interest-item:hover { color: var(--orange); }

        .about-interest-num {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--orange);
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }

        /* Stats */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding-top: 0.5rem;
        }
        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1rem;
          background: var(--cream-dark);
          border: 1px solid var(--border-cream);
          border-radius: 4px;
        }
        .about-stat-val {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 900;
          color: var(--orange);
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .about-stat-label {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
