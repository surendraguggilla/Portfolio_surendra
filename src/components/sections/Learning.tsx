import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function Learning() {
  const { learning, personal } = PORTFOLIO_DATA;

  return (
    <section id="learning" className="section learning-section zone-light" aria-labelledby="learning-heading">
      <div className="container">

        <div className="section-label reveal">
          <span className="label-num">04</span>
          <span>/</span>
          <span>LEARNING JOURNEY</span>
        </div>

        <h2 className="section-heading reveal delay-100" id="learning-heading">
          ALWAYS IN<br />
          <span className="heading-accent">MOTION.</span>
        </h2>

        <div className="learning-grid">

          {/* ── LEFT COLUMN: Education + Certifications ── */}
          <div className="learning-left reveal-left delay-200">

            <h3 className="learning-col-title">Education</h3>

            {/* Education card */}
            <div className="learning-edu-card">
              <div className="learning-edu-card-header">
                <div className="learning-edu-degree">{personal.education.degree}</div>
                <div className="learning-edu-period">{personal.education.period}</div>
              </div>
              <div className="learning-edu-inst">{personal.education.institution}</div>
              <div className="learning-edu-location">{personal.education.location}</div>

              <div className="learning-edu-attrs">
                <div className="learning-edu-attr">
                  <span className="learning-edu-attr-key">CGPA</span>
                  <span className="learning-edu-attr-val">
                    {personal.education.cgpa !== '8.45'//'[X.XX]'
                      ? `${8.45/*personal.education.cgpa*/} / 10.0`
                      : 'Update in portfolioData.ts'}
                  </span>
                </div>
                <div className="learning-edu-attr">
                  <span className="learning-edu-attr-key">DOMAIN</span>
                  <span className="learning-edu-attr-val">Computer Science &amp; Engineering</span>
                </div>
                <div className="learning-edu-attr">
                  <span className="learning-edu-attr-key">STATUS</span>
                  <span className="learning-edu-attr-val learning-edu-attr-val--active">ONGOING</span>
                </div>
              </div>
            </div>

            {/* Certifications — below education card */}
            <h3 className="learning-col-title" style={{ marginTop: '1.75rem' }}>Certifications</h3>
            <div className="learning-certs-list">
              {PORTFOLIO_DATA.certifications.map((cert, i) => (
                <a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learning-cert-item"
                  data-cursor-label="VIEW"
                >
                  <div className="learning-cert-icon" aria-hidden="true">→</div>
                  <div className="learning-cert-body">
                    <div className="learning-cert-name">{cert.title}</div>
                    <div className="learning-cert-issuer">{cert.issuer}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Currently Learning ── */}
          <div className="learning-right reveal-right delay-300">

            <h3 className="learning-col-title">Currently Learning</h3>

            <div className="learning-items">
              {learning.map((item, i) => (
                <div key={i} className="learning-item">
                  <div className="learning-item-header">
                    <span
                      className="learning-item-status"
                      data-status={item.status}
                    >
                      {item.status}
                    </span>
                    <span className="learning-item-area">{item.area}</span>
                  </div>
                  <p className="learning-item-focus">{item.focus}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .learning-section { border-top: 1px solid var(--border-cream); }

        .learning-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2.5rem, 5vw, 4rem);
          margin-top: clamp(2rem, 4vw, 3.5rem);
        }
        @media (min-width: 900px) {
          .learning-grid { grid-template-columns: 1fr 1fr; align-items: start; }
        }

        /* ── Shared column title ── */
        .learning-col-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--orange);
          border-left: 3px solid var(--orange);
          padding-left: 0.6rem;
          margin-bottom: 1rem;
        }

        /* ── Left column ── */
        .learning-left { display: flex; flex-direction: column; }

        .learning-edu-card {
          padding: 1.75rem;
          background: var(--near-black);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .learning-edu-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .learning-edu-degree {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 2.2vw, 1.35rem);
          font-weight: 900;
          color: var(--text-light);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .learning-edu-period {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--lime);
          white-space: nowrap;
          padding: 0.2rem 0.5rem;
          border: 1px solid rgba(198,255,0,0.3);
          border-radius: 3px;
          flex-shrink: 0;
        }

        .learning-edu-inst {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 600;
          color: rgba(246,240,230,0.85);
        }
        .learning-edu-location {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: rgba(246,240,230,0.35);
          letter-spacing: 0.06em;
        }

        .learning-edu-attrs {
          margin-top: 0.5rem;
          border-top: 1px solid var(--border-dark);
        }
        .learning-edu-attr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.55rem 0;
          border-bottom: 1px solid var(--border-dark);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
        }
        .learning-edu-attr-key { color: #555; letter-spacing: 0.1em; }
        .learning-edu-attr-val { color: var(--text-light); font-weight: 700; }
        .learning-edu-attr-val--active { color: var(--lime); }

        /* Certifications */
        .learning-certs-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .learning-cert-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1rem;
          background: #fff;
          border: 1.5px solid var(--border-cream);
          border-radius: 6px;
          transition: all 200ms;
        }
        .learning-cert-item:hover {
          border-color: var(--orange);
          transform: translateX(4px);
          box-shadow: 0 2px 10px rgba(231,111,50,0.08);
        }
        .learning-cert-icon {
          font-size: 1rem;
          color: var(--orange);
          font-weight: 700;
          flex-shrink: 0;
        }
        .learning-cert-body { display: flex; flex-direction: column; gap: 0.15rem; }
        .learning-cert-name {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--near-black);
        }
        .learning-cert-issuer {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── Right column ── */
        .learning-right { display: flex; flex-direction: column; }

        .learning-items {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .learning-item {
          padding: 1.25rem 1.375rem;
          background: #fff;
          border: 1.5px solid var(--border-cream);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .learning-item:hover {
          border-color: var(--orange);
          box-shadow: 0 4px 16px rgba(231,111,50,0.08);
        }

        .learning-item-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Status pill — clearly visible */
        .learning-item-status {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.2rem 0.65rem;
          border-radius: 100px;
          line-height: 1.6;
          flex-shrink: 0;
        }
        .learning-item-status[data-status="ACTIVE"] {
          background: rgba(198,255,0,0.15);
          color: #3a6500;
          border: 1px solid rgba(100,180,0,0.3);
        }
        .learning-item-status[data-status="ONGOING"] {
          background: rgba(198,255,0,0.12);
          color: #3a6500;
          border: 1px solid rgba(100,180,0,0.25);
        }
        .learning-item-status[data-status="EXPLORING"] {
          background: rgba(231,111,50,0.12);
          color: #b84c0a;
          border: 1px solid rgba(231,111,50,0.3);
        }

        /* Area heading — big, bold, black */
        .learning-item-area {
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--near-black);
        }

        /* Focus text */
        .learning-item-focus {
          font-size: 0.9375rem;
          color: var(--text-muted);
          line-height: 1.65;
        }
      `}</style>
    </section>
  );
}
