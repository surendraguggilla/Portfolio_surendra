import { useState } from 'react';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { PORTFOLIO_DATA, type Project } from '../../data/portfolioData';

export default function Projects() {
  const { projects } = PORTFOLIO_DATA;
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProject = (p: Project) => setActiveProject(p);
  const closeProject = () => setActiveProject(null);

  return (
    <section id="work" className="section projects-section zone-light" aria-labelledby="work-heading">
      <div className="container">

        <div className="section-label reveal">
          <span className="label-num label-num--lime">02</span>
          <span>/</span>
          <span>SELECTED WORK</span>
        </div>

        <h2 className="section-heading reveal delay-100" id="work-heading">
          PROJECTS &amp;
          <br />
          <span className="heading-accent">EXPLORATIONS.</span>
        </h2>

        {/* Philosophy / interest statement */}
        <div className="projects-philosophy reveal delay-200">
          <p className="projects-intro">
            I build projects because that's how I learn best — by actually making things work.
            Whether it's structuring a data system cleanly or running a machine learning pipeline
            on a real-world dataset, every project is a chance to explore something I didn't fully understand before.
          </p>
          <div className="projects-interest-tags">
            <span className="projects-tag">Computer Fundamentals</span>
            <span className="projects-tag">Data Science</span>
            <span className="projects-tag">AI &amp; ML</span>
            <span className="projects-tag">System Design</span>
            <span className="projects-tag">Containerisation</span>
            <span className="projects-tag">Open Source</span>
          </div>
        </div>

        {/* Project list */}
        <div className="projects-list">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`project-entry reveal delay-${(i + 2) * 100}`}
              aria-labelledby={`proj-${project.id}-title`}
            >
              {/* Number */}
              <div className="project-num" aria-hidden="true">{project.num}</div>

              <div className="project-body">
                {/* Category */}
                <div className="project-category">{project.category}</div>

                {/* Title + description */}
                <div className="project-main">
                  <h3 className="project-title" id={`proj-${project.id}-title`}>
                    {project.title}
                  </h3>
                  <p className="project-short-desc">{project.shortDesc}</p>
                </div>

                {/* Tech stack */}
                <div className="project-stack" role="list" aria-label="Technologies used">
                  {project.techStack.map(tech => (
                    <span key={tech} className="project-tech" data-key={tech} role="listitem">{tech}</span>
                  ))}
                </div>

                {/* Status */}
                <div className="project-status">
                  <span className="project-status-dot" aria-hidden="true" />
                  {project.status}
                </div>
              </div>

              {/* Actions */}
              <div className="project-actions">
                <button
                  className="project-detail-btn"
                  onClick={() => openProject(project)}
                  aria-label={`View details for ${project.title}`}
                  data-cursor-label="VIEW"
                >
                  View Case Study
                  <ChevronRight size={14} />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-github-btn"
                  aria-label={`View ${project.title} on GitHub`}
                  data-cursor-label="GITHUB"
                >
                  <GithubIcon size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* More projects hint */}
        <div className="projects-more reveal delay-500">
          <span>More projects on</span>
          <a
            href={PORTFOLIO_DATA.personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="projects-github-link"
            data-cursor-label="GITHUB"
          >
            <GithubIcon size={14} />
            GitHub →
          </a>
        </div>
      </div>

      {/* Project Modal */}
      {activeProject && (
        <div
          className="project-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={e => { if (e.target === e.currentTarget) closeProject(); }}
        >
          <div className="project-modal">
            {/* Modal header */}
            <div className="modal-header">
              <div>
                <div className="modal-category">{activeProject.category}</div>
                <h2 className="modal-title" id="modal-title">{activeProject.title}</h2>
              </div>
              <button
                className="modal-close"
                onClick={closeProject}
                aria-label="Close project details"
                data-cursor-label="CLOSE"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="modal-body">
              {/* Problem */}
              <div className="modal-section">
                <h3 className="modal-section-label">THE PROBLEM</h3>
                <p className="modal-text">{activeProject.problem}</p>
              </div>

              {/* Contribution */}
              <div className="modal-section">
                <h3 className="modal-section-label">MY CONTRIBUTION</h3>
                <p className="modal-text">{activeProject.contribution}</p>
              </div>

              {/* Architecture */}
              <div className="modal-section">
                <h3 className="modal-section-label">ARCHITECTURE</h3>
                <p className="modal-text modal-text--mono">{activeProject.architecture}</p>
              </div>

              {/* Highlights */}
              <div className="modal-section">
                <h3 className="modal-section-label">KEY DETAILS</h3>
                <ul className="modal-highlights" role="list">
                  {activeProject.highlights.map((h, i) => (
                    <li key={i} className="modal-highlight-item">
                      <span className="modal-highlight-num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="modal-section">
                <h3 className="modal-section-label">STACK</h3>
                <div className="modal-stack" role="list">
                  {activeProject.techStack.map(t => (
                    <span key={t} className="modal-tech" role="listitem">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <div className="modal-status">
                <span className="modal-status-dot" aria-hidden="true" />
                {activeProject.status}
              </div>
              <div className="modal-actions">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn--primary"
                  data-cursor-label="GITHUB"
                >
                  <GithubIcon size={15} />
                  View on GitHub
                </a>
                {activeProject.hasLiveDemo && (
                  <a
                    href="#"
                    className="modal-btn modal-btn--outline"
                    data-cursor-label="DEMO"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .projects-section { border-top: none; }

        .projects-philosophy {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 0.75rem;
          margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
        }
        .projects-intro {
          max-width: 65ch;
          font-size: clamp(0.9375rem, 1.8vw, 1.075rem);
          color: var(--text-light-muted);
          line-height: 1.75;
        }
        .projects-interest-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .projects-tag {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border: 1px solid rgba(231,111,50,0.3);
          border-radius: 100px;
          color: rgba(231,111,50,0.7);
          background: rgba(231,111,50,0.04);
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .project-entry {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          padding: 1.75rem 0;
          border-bottom: 1px solid var(--border-cream);
        }
        @media (min-width: 768px) {
          .project-entry {
            grid-template-columns: 64px 1fr auto;
            gap: 2rem;
            align-items: start;
          }
        }

        .project-num {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          color: rgba(26,26,26,0.18);
          line-height: 1;
          letter-spacing: -0.04em;
          align-self: center;
        }

        .project-body {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .project-category {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--orange);
        }

        .project-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          font-weight: 900;
          color: var(--text-dark);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .project-short-desc {
          font-size: clamp(0.875rem, 1.6vw, 1rem);
          color: var(--text-muted);
          line-height: 1.65;
          max-width: 60ch;
        }

        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .project-tech {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.25rem 0.6rem;
          border: 1px solid var(--border-cream);
          border-radius: 3px;
          color: var(--text-muted);
        }

        .project-status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .project-status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--orange);
        }

        .project-actions {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          align-items: flex-start;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .project-actions { flex-direction: column; }
        }

        .project-detail-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.625rem 1rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--orange);
          background: rgba(231,111,50,0.06);
          border: 1.5px solid var(--orange);
          border-radius: 4px;
          cursor: none;
          transition: all 150ms;
          white-space: nowrap;
        }
        .project-detail-btn:hover {
          background: var(--orange);
          color: #fff;
        }

        .project-github-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          color: var(--text-muted);
          border: 1.5px solid var(--border-cream);
          border-radius: 4px;
          transition: all 150ms;
          flex-shrink: 0;
        }
        .project-github-btn:hover {
          color: var(--near-black);
          border-color: var(--near-black);
        }

        .projects-more {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.9375rem;
          color: var(--text-muted);
        }
        .projects-github-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--orange);
          font-weight: 700;
          transition: opacity 150ms;
        }
        .projects-github-link:hover { opacity: 0.7; }

        /* ── Modal ── */
        .project-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 700;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 200ms ease both;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .project-modal {
          width: 100%;
          max-width: 680px;
          max-height: 88vh;
          background: #141414;
          border: 1px solid var(--border-dark);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7);
          animation: modalSlide 280ms var(--ease-out-expo) both;
        }
        @keyframes modalSlide {
          from { transform: translateY(20px) scale(0.97); opacity: 0; }
          to   { transform: translateY(0)    scale(1);    opacity: 1; }
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid var(--border-cream);
          flex-shrink: 0;
        }
        .modal-category {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--lime);
          margin-bottom: 0.4rem;
        }
        .modal-title {
          font-family: var(--font-display);
          font-size: clamp(1.375rem, 3vw, 2rem);
          font-weight: 900;
          color: var(--text-dark);
          letter-spacing: -0.025em;
          line-height: 1.1;
        }
        .modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          color: #666;
          border: 1px solid var(--border-dark);
          border-radius: 4px;
          cursor: none;
          transition: all 150ms;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .modal-close:hover { background: #FF5F56; color: #fff; border-color: #FF5F56; }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          scrollbar-width: thin;
          scrollbar-color: #2A2A2A transparent;
        }

        .modal-section {}
        .modal-section-label {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 0.625rem;
        }
        .modal-text {
          font-size: 0.9375rem;
          color: rgba(246,240,230,0.75);
          line-height: 1.7;
        }
        .modal-text--mono {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          background: #0E0E0E;
          padding: 0.75rem 1rem;
          border-radius: 4px;
          border: 1px solid var(--border-dark);
          color: rgba(246,240,230,0.65);
        }

        .modal-highlights { display: flex; flex-direction: column; gap: 0.625rem; }
        .modal-highlight-item {
          display: flex;
          align-items: baseline;
          gap: 0.875rem;
          font-size: 0.9375rem;
          color: rgba(246,240,230,0.75);
          line-height: 1.55;
        }
        .modal-highlight-num {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 700;
          color: var(--lime);
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }

        .modal-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .modal-tech {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.25rem 0.625rem;
          background: rgba(198,255,0,0.08);
          border: 1px solid rgba(198,255,0,0.25);
          border-radius: 3px;
          color: var(--lime);
        }

        .modal-footer {
          padding: 1rem 1.75rem;
          border-top: 1px solid var(--border-dark);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          flex-shrink: 0;
          background: #0E0E0E;
        }
        .modal-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #555;
        }
        .modal-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--lime);
        }
        .modal-actions { display: flex; gap: 0.5rem; }
        .modal-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.875rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: none;
          transition: all 150ms;
        }
        .modal-btn--primary {
          background: var(--orange);
          color: #fff;
          border: 1.5px solid var(--lime);
        }
        .modal-btn--primary:hover { background: #e08f38; }
        .modal-btn--outline {
          color: rgba(194, 143, 80, 0.6);
          border: 1.5px solid var(--border-dark);
        }
        .modal-btn--outline:hover {
          color: var(--text-dark);
          border-color: rgba(227, 166, 79, 0.3);
        }
      `}</style>
    </section>
  );
}
