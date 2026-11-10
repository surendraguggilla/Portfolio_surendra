import { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface TerminalLine {
  type: 'system' | 'user' | 'output' | 'error' | 'link';
  text: string;
  url?: string;
}

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_HISTORY: TerminalLine[] = [
  { type: 'system', text: 'sg-shell v1.0.0 — Surendra Guggilla\'s Portfolio Terminal' },
  { type: 'system', text: 'Type \'help\' to see available commands. Press Escape or ~ to close.' },
  { type: 'system', text: '─'.repeat(54) },
];

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_HISTORY);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { personal, projects, skills, learning } = PORTFOLIO_DATA;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const addLines = (newLines: TerminalLine[]) => {
    setHistory(prev => [...prev, ...newLines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const userLine: TerminalLine = { type: 'user', text: `$ ${input.trim()}` };
    setCmdHistory(prev => [input.trim(), ...prev]);
    setCmdHistoryIdx(-1);

    const outputLines: TerminalLine[] = [userLine];

    switch (cmd) {
      case 'help':
        outputLines.push({ type: 'output', text:
`┌─ AVAILABLE COMMANDS ─────────────────────────────┐
│  help        List all commands                   │
│  whoami      About me                            │
│  about       Extended bio                        │
│  projects    List my projects                    │
│  open <n>    Open project by name or number      │
│  skills      Show my tech skills                 │
│  education   Show education details              │
│  learning    Show what I'm currently learning    │
│  contact     Show contact information            │
│  github      Open GitHub profile                 │
│  linkedin    Open LinkedIn profile               │
│  resume      Resume status                       │
│  clear       Clear terminal                      │
│  exit        Close terminal                      │
└──────────────────────────────────────────────────┘` });
        break;

      case 'whoami':
        outputLines.push({ type: 'output', text:
`visitor@sg-portfolio ~ privilege: GUEST
Viewing portfolio of: ${personal.name}
Status: ${personal.metadata.status}
Availability: ${personal.metadata.availability}` });
        break;

      case 'about':
        outputLines.push({ type: 'output', text:
`${personal.name}
${personal.title}
${personal.education.institution} (${personal.education.period})

${personal.aboutBio.join('\n\n')}` });
        break;

      case 'projects':
      case 'ls':
        outputLines.push({ type: 'output', text:
          projects.map(p =>
            `[${p.num}] ${p.title}\n    Category: ${p.category}\n    Stack: ${p.techStack.join(', ')}\n    Status: ${p.status}\n    Repo: ${p.githubUrl}`
          ).join('\n\n') });
        break;

      case 'skills':
        outputLines.push({ type: 'output', text:
`PROGRAMMING:   ${skills.programming.join(' / ')}
DATA & ML:     ${skills.dataAndML.join(' / ')}
DATABASES:     ${skills.databases.join(' / ')}
TOOLS:         ${skills.tools.join(' / ')}` });
        break;

      case 'education':
        outputLines.push({ type: 'output', text:
`${personal.education.degree}
Institution:  ${personal.education.institution}
Location:     ${personal.education.location}
Period:       ${personal.education.period}
CGPA:         ${personal.education.cgpa} / 10.0` });
        break;

      case 'learning':
        outputLines.push({ type: 'output', text:
          learning.map(l =>
            `[${l.status}] ${l.area}\n  ${l.focus}`
          ).join('\n\n') });
        break;

      case 'contact':
        outputLines.push({ type: 'output', text:
`EMAIL:    ${personal.social.email}
GITHUB:   ${personal.social.github}
LINKEDIN: ${personal.social.linkedin}` });
        break;

      case 'github':
        outputLines.push({ type: 'output', text: `Opening GitHub: ${personal.social.github}` });
        outputLines.push({ type: 'link', text: 'Click to open →', url: personal.social.github });
        setTimeout(() => window.open(personal.social.github, '_blank', 'noopener,noreferrer'), 300);
        break;

      case 'linkedin':
        outputLines.push({ type: 'output', text: `Opening LinkedIn: ${personal.social.linkedin}` });
        outputLines.push({ type: 'link', text: 'Click to open →', url: personal.social.linkedin });
        setTimeout(() => window.open(personal.social.linkedin, '_blank', 'noopener,noreferrer'), 300);
        break;

      case 'resume':
        if (personal.social.resumeUrl) {
          outputLines.push({ type: 'output', text: 'Downloading resume (Surendra_Guggilla_Resume.pdf)...' });
          outputLines.push({ type: 'link', text: 'Click here if download does not start →', url: personal.social.resumeUrl });
          const a = document.createElement('a');
          a.href = personal.social.resumeUrl;
          a.download = 'Surendra_Guggilla_Resume.pdf';
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          outputLines.push({ type: 'output', text: 'Resume not yet available. Check back soon!\nIn the meantime, reach out via email or LinkedIn.' });
        }
        break;

      case 'clear':
        setHistory(INITIAL_HISTORY);
        setInput('');
        return;

      case 'exit':
        outputLines.push({ type: 'system', text: 'Closing terminal...' });
        addLines(outputLines);
        setInput('');
        setTimeout(onClose, 400);
        return;

      default: {
        // Try to match "open <project>"
        const openMatch = cmd.match(/^open\s+(.+)$/);
        if (openMatch) {
          const query = openMatch[1].trim();
          const match = projects.find(p =>
            p.title.toLowerCase().includes(query) ||
            p.num === query ||
            p.id.includes(query)
          );
          if (match) {
            outputLines.push({ type: 'output', text: `Opening: ${match.title}\nGitHub: ${match.githubUrl}` });
            outputLines.push({ type: 'link', text: 'Open on GitHub →', url: match.githubUrl });
          } else {
            outputLines.push({ type: 'error', text: `No project found matching "${query}". Try 'projects' to list all.` });
          }
        } else {
          outputLines.push({ type: 'error', text: `Command not found: '${cmd}'. Type 'help' for available commands.` });
        }
      }
    }

    addLines(outputLines);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1);
      setCmdHistoryIdx(newIdx);
      if (cmdHistory[newIdx]) setInput(cmdHistory[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(cmdHistoryIdx - 1, -1);
      setCmdHistoryIdx(newIdx);
      setInput(newIdx >= 0 ? cmdHistory[newIdx] : '');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="terminal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio terminal"
    >
      <div className="terminal-window">
        {/* Header */}
        <div className="terminal-header">
          <div className="terminal-header-left">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot--red" />
              <span className="terminal-dot terminal-dot--yellow" />
              <span className="terminal-dot terminal-dot--green" />
            </div>
            <TerminalIcon size={13} style={{ color: 'var(--lime)', flexShrink: 0 }} />
            <span>sg-shell — portfolio terminal</span>
            <span className="terminal-hint">~ to toggle</span>
          </div>
          <button
            className="terminal-close"
            onClick={onClose}
            aria-label="Close terminal"
            data-cursor-label="CLOSE"
          >
            <X size={14} />
          </button>
        </div>

        {/* Output */}
        <div className="terminal-output" role="log" aria-live="polite" aria-label="Terminal output">
          {history.map((line, i) => (
            <div key={i} className={`terminal-line terminal-line--${line.type}`}>
              {line.type === 'link' ? (
                <a
                  href={line.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                  data-cursor-label="OPEN"
                >
                  {line.text}
                </a>
              ) : (
                <span style={{ whiteSpace: 'pre-wrap' }}>{line.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form className="terminal-input-row" onSubmit={handleSubmit}>
          <span className="terminal-prompt">sg@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            placeholder="type a command…"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command input"
          />
          <button type="submit" className="terminal-exec">EXEC ↵</button>
        </form>
      </div>

      <style>{`
        .terminal-overlay {
          position: fixed;
          inset: 0;
          z-index: 800;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1rem;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          animation: termFadeIn 200ms var(--ease-out-expo) both;
        }

        @keyframes termFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .terminal-window {
          width: 100%;
          max-width: 720px;
          max-height: 55vh;
          background: #080808;
          border: 2px solid var(--lime);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(198,255,0,0.15), 0 32px 64px rgba(0,0,0,0.6);
          animation: termSlideUp 300ms var(--ease-out-expo) both;
        }

        @keyframes termSlideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.625rem 0.875rem;
          background: #0E0E0E;
          border-bottom: 1px solid #1F1F1F;
          flex-shrink: 0;
        }

        .terminal-header-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: #777;
          letter-spacing: 0.05em;
        }

        .terminal-dots {
          display: flex;
          gap: 5px;
          margin-right: 4px;
        }

        .terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .terminal-dot--red    { background: #FF5F56; }
        .terminal-dot--yellow { background: #FFBD2E; }
        .terminal-dot--green  { background: var(--lime); }

        .terminal-hint {
          margin-left: 8px;
          padding: 1px 6px;
          background: #1A1A1A;
          border: 1px solid #2A2A2A;
          border-radius: 3px;
          font-size: 0.625rem;
          color: #555;
        }

        .terminal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          color: #666;
          border: 1px solid #2A2A2A;
          border-radius: 3px;
          transition: all 150ms;
          cursor: none;
        }
        .terminal-close:hover {
          background: var(--lime);
          color: #000;
          border-color: var(--lime);
        }

        .terminal-output {
          flex: 1;
          overflow-y: auto;
          padding: 0.875rem 1rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          line-height: 1.7;
          scrollbar-width: thin;
          scrollbar-color: #2A2A2A transparent;
        }

        .terminal-line { margin-bottom: 2px; }

        .terminal-line--system { color: #555; }
        .terminal-line--user   { color: var(--lime); font-weight: 700; }
        .terminal-line--output { color: #C8C8C8; padding-left: 0.75rem; border-left: 2px solid #252525; margin: 4px 0 8px; }
        .terminal-line--error  { color: #FF6B6B; font-weight: 700; }
        .terminal-line--link   { padding-left: 0.75rem; }

        .terminal-link {
          color: var(--lime);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: none;
        }
        .terminal-link:hover { color: #fff; }

        .terminal-input-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #0A0A0A;
          border-top: 1px solid #1E1E1E;
          flex-shrink: 0;
        }

        .terminal-prompt {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--lime);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #F6F0E6;
          caret-color: var(--lime);
        }
        .terminal-input::placeholder { color: #444; }

        .terminal-exec {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.25rem 0.625rem;
          background: #1A1A1A;
          color: var(--lime);
          border: 1px solid #2A2A2A;
          border-radius: 3px;
          cursor: none;
          transition: all 150ms;
          white-space: nowrap;
        }
        .terminal-exec:hover {
          background: var(--lime);
          color: #000;
          border-color: var(--lime);
        }

        @media (max-width: 600px) {
          .terminal-window { max-height: 70vh; }
          .terminal-hint   { display: none; }
        }
      `}</style>
    </div>
  );
}
