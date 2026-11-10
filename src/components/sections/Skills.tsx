import { PORTFOLIO_DATA } from '../../data/portfolioData';

// Skill icons removed (emoji icons not used in final layout)

const SKILL_GROUPS = [
  { key: 'programming'  as const, label: 'Programming',        icon: '</>',  accent: 'orange' },
  { key: 'dataAndML'    as const, label: 'Data & ML',          icon: '⌬',   accent: 'orange' },
  { key: 'databases'    as const, label: 'Databases',          icon: '⊞',   accent: 'orange' },
  { key: 'tools'        as const, label: 'Tools & Platforms',  icon: '⚙',   accent: 'orange' },
  { key: 'softSkills'   as const, label: 'Soft Skills',        icon: '◎',   accent: 'orange' },
];

export default function Skills() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="section skills-section zone-dark-alt" aria-labelledby="skills-heading">
      <div className="container">

        {/* Section label — now dark text for light bg */}
        <div className="section-label reveal">
          <span className="label-num">03</span>
          <span>/</span>
          <span>TOOLKIT</span>
        </div>

        <h2 className="section-heading reveal delay-100" id="skills-heading">
          TOOLS I USE<br />
          <span className="heading-accent">TO BUILD AND EXPLORE.</span>
        </h2>

        <p className="skills-note reveal delay-200">
          Proficiency is honest — these are the technologies I've used in real projects or coursework.
        </p>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, gi) => (
            <div
              key={group.key}
              className={`skill-group reveal delay-${(gi + 2) * 100}`}
            >
              <div className="skill-group-header">
                <span className="skill-group-icon" aria-hidden="true">{group.icon}</span>
                <h3 className="skill-group-label">{group.label}</h3>
              </div>
              <div className="skill-tags" role="list" aria-label={`${group.label} skills`}>
                {skills[group.key].map(skill => (
                  <span
                    key={skill}
                    className={`skill-tag skill-tag--${group.accent}`}
                    role="listitem"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

         {/* Proficiency disclaimer
        <div className="skills-disclaimer reveal delay-700">
          <span className="skills-disclaimer-icon" aria-hidden="true">ℹ</span>
          No fake skill bars or inflated percentages. Skills listed are verified through project work or coursework.
        </div>  */}

      </div>

      <style>{`
        .skills-section {
          border-top: 1px solid var(--border-cream);
        }

        .skills-note {
          max-width: 55ch;
          margin-top: 1.5rem;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
          font-size: clamp(0.9rem, 1.6vw, 1rem);
          color: var(--text-muted);
          line-height: 1.65;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px)  { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .skills-grid { grid-template-columns: repeat(3, 1fr); } }

        .skill-group {
          padding: 1.5rem;
          background: #fff;
          border: 1.5px solid var(--border-cream);
          border-radius: 8px;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .skill-group:hover {
          border-color: var(--orange);
          box-shadow: 0 4px 16px rgba(231,111,50,0.08);
        }

        .skill-group-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1.5px solid var(--border-cream);
        }

        .skill-group-icon {
          font-size: 0.875rem;
          color: var(--orange);
          font-weight: 700;
        }

        .skill-group-label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dark);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .skill-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: 4px;
          transition: all 150ms;
        }

        /* Dark variant — consistent with orange tags but neutral */
        .skill-tag--dark {
          color: var(--text-dark);
          background: rgba(26,26,26,0.05);
          border: 1px solid rgba(26,26,26,0.14);
        }
        .skill-tag--dark:hover {
          background: rgba(26,26,26,0.1);
          border-color: var(--near-black);
        }

        /* Orange variant — orange text */
        .skill-tag--orange {
          color: #b84c0a;
          background: rgba(231,111,50,0.08);
          border: 1px solid rgba(231,111,50,0.25);
        }
        .skill-tag--orange:hover {
          background: rgba(231,111,50,0.14);
          border-color: var(--orange);
        }

        .skills-disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          margin-top: 3rem;
          padding: 1rem 1.25rem;
          background: #fff;
          border: 1.5px solid var(--border-cream);
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 55ch;
        }
        .skills-disclaimer-icon {
          color: var(--orange);
          flex-shrink: 0;
          margin-top: 1px;
        }
      `}</style>
    </section>
  );
}
