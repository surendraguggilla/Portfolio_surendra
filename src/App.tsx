import { useState, useEffect, useRef } from 'react';
import './styles/globals.css';

// Layout
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Interactions
import Cursor from './components/interactions/Cursor';
import Terminal from './components/interactions/Terminal';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Learning from './components/sections/Learning';
import Contact from './components/sections/Contact';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const revealObserverRef = useRef<IntersectionObserver | null>(null);

  // ── Global keyboard shortcut: ~ opens/closes the terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (e.key === '`' && !isTyping) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── Scroll-reveal IntersectionObserver
  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-left, .reveal-right'
    );

    if (!revealElements.length) return;

    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserverRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    revealElements.forEach((el) => revealObserverRef.current?.observe(el));

    return () => {
      revealObserverRef.current?.disconnect();
    };
  }, []);

  // ── Re-run observer after any new .reveal elements are added (e.g. dynamic content)
  useEffect(() => {
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll<HTMLElement>(
        '.reveal:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible)'
      );
      revealElements.forEach((el) => revealObserverRef.current?.observe(el));
    }, 500);
    return () => clearTimeout(timer);
  }, [terminalOpen]);

  return (
    <>
      {/* Custom cursor — desktop only via CSS */}
      <Cursor />

      {/* Sticky navigation */}
      <Navigation onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main content */}
      <main id="main-content">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Learning />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Terminal drawer */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}
