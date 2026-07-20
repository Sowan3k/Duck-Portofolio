import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { hotspots, type Hotspot } from '../../lib/scene';
import {
  CRT_POWER_ON_MS,
  LABEL_FLASH_MS,
  STORAGE_KEYS,
  type OfficeView,
} from './engine';
import EntryScreen from './EntryScreen';
import Hotspots from './Hotspots';
import './office.css';

/**
 * Office — the island root. Runs the entry → CRT → gray-box office flow over
 * the standard view (mounted client-side only, so no-JS shows the standard view
 * — law 5). Manages view state, the scene scaler, sound/look-around controls,
 * and makes the standard view inert while the overlay is up (a11y).
 *
 * Content does NOT open here yet — Phase 4 adds the interaction engine, the
 * duck's dialogue, and the physical UI. In this gray-box, activating an object
 * reveals its matching standard-view section (a real, honest placeholder); the
 * résumé folder downloads the PDF directly (law 2).
 */
function GrayBoxLayers() {
  return (
    <div className="gb" aria-hidden="true">
      <div className="gb__wall" />
      <div className="gb__desk" />
      <div className="gb__duck">
        <span>🦆 Swan</span>
      </div>
    </div>
  );
}

export default function Office() {
  const [view, setView] = useState<OfficeView>('entry');
  const [soundOn, setSoundOn] = useState(true);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [flashLabels, setFlashLabels] = useState(false);
  const [lookAround, setLookAround] = useState(false);
  const enteredRef = useRef(false);
  const crtTimer = useRef<number | null>(null);
  const flashTimer = useRef<number | null>(null);

  // Mount: the gray-box is ready at once (Phase 5 waits on art). Read the sound
  // preference and reduced-motion; all browser APIs live here, never in render,
  // so server and client first-render match (no hydration mismatch).
  useEffect(() => {
    setReady(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.sound);
      if (stored !== null) setSoundOn(stored === 'on');
    } catch {
      /* storage blocked — keep the default */
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      if (crtTimer.current) window.clearTimeout(crtTimer.current);
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
  }, []);

  // The standard view underneath is inert while the overlay covers it.
  useEffect(() => {
    const std = document.getElementById('standard-view');
    if (std) std.inert = view !== 'standard';
    return () => {
      if (std) std.inert = false;
    };
  }, [view]);

  const flashOnFirstVisit = useCallback(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.visitedOffice)) {
        setFlashLabels(true);
        flashTimer.current = window.setTimeout(
          () => setFlashLabels(false),
          LABEL_FLASH_MS
        );
        localStorage.setItem(STORAGE_KEYS.visitedOffice, '1');
      }
    } catch {
      /* storage blocked — skip the one-time flash */
    }
  }, []);

  const enter = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    if (reduced) {
      setView('office');
      flashOnFirstVisit();
      return;
    }
    setView('crt');
    crtTimer.current = window.setTimeout(() => {
      setView('office');
      flashOnFirstVisit();
    }, CRT_POWER_ON_MS);
  }, [reduced, flashOnFirstVisit]);

  const openOffice = useCallback(() => {
    setLookAround(false);
    setView('office');
  }, []);

  // Reopen the office from a standard-view affordance ([data-open-office]).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-open-office]')) {
        e.preventDefault();
        openOffice();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [openOffice]);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEYS.sound, next ? 'on' : 'off');
      } catch {
        /* storage blocked — session-only */
      }
      return next;
    });
  }, []);

  const revealSection = useCallback(
    (contentId: string) => {
      setLookAround(false);
      setView('standard');
      requestAnimationFrame(() => {
        const std = document.getElementById('standard-view');
        if (std) std.inert = false;
        const target = document.getElementById(contentId);
        target?.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'start',
        });
        const heading = target?.querySelector<HTMLElement>('h1, h2');
        heading?.focus();
      });
    },
    [reduced]
  );

  const dismissToStandard = useCallback(() => revealSection('main'), [revealSection]);

  const activate = useCallback(
    (hotspot: Hotspot) => {
      if (hotspot.download) return; // the <a download> handles the PDF itself
      revealSection(hotspot.contentId);
    },
    [revealSection]
  );

  // When the office opens, move focus into it so keyboard users aren't stranded
  // on the now-unmounted entry button.
  useEffect(() => {
    if (view !== 'office') return;
    const id = requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.office-overlay .hotspot')?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [view]);

  // Esc closes the look-around list (Phase 4 extends Esc to close content).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lookAround) setLookAround(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lookAround]);

  if (view === 'standard') return null;

  const overlayStyle = { ['--crt-ms' as string]: `${CRT_POWER_ON_MS}ms` } as CSSProperties;

  return (
    <div
      className="office-overlay"
      data-view={view}
      data-reduced={reduced ? 'true' : 'false'}
      style={overlayStyle}
    >
      {view === 'entry' && (
        <EntryScreen
          ready={ready}
          soundOn={soundOn}
          onEnter={enter}
          onToggleSound={toggleSound}
          onStandardView={dismissToStandard}
        />
      )}

      {(view === 'crt' || view === 'office') && (
        <>
          <div className="scene-viewport">
            <div className="scene" role="group" aria-roledescription="office scene" aria-label="Swan's office (gray-box preview)">
              <GrayBoxLayers />
              <Hotspots hotspots={hotspots} showLabels={flashLabels} onActivate={activate} />
            </div>
          </div>

          <div className="office-controls" role="toolbar" aria-label="Office controls">
            <button type="button" className="office-link" onClick={dismissToStandard}>
              Standard view
            </button>
            <div className="office-controls__right">
              <button
                type="button"
                className="office-toggle"
                aria-pressed={lookAround}
                aria-expanded={lookAround}
                onClick={() => setLookAround((v) => !v)}
              >
                <span aria-hidden="true">👀</span> Look around
              </button>
              <button
                type="button"
                className="office-toggle"
                aria-pressed={soundOn}
                onClick={toggleSound}
              >
                <span aria-hidden="true">{soundOn ? '🔊' : '🔇'}</span> Sound {soundOn ? 'on' : 'off'}
              </button>
            </div>
          </div>

          {lookAround && (
            <nav className="look-around" aria-label="Everything in the office">
              <p className="look-around__title">Everything in the office</p>
              <ul>
                {hotspots.map((h) =>
                  h.download ? (
                    <li key={h.id}>
                      <a className="office-link" href="/resume.pdf" download>
                        {h.label}
                      </a>
                    </li>
                  ) : (
                    <li key={h.id}>
                      <button type="button" className="office-link" onClick={() => activate(h)}>
                        {h.label}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          )}

          {view === 'crt' && !reduced && (
            <div className="crt" aria-hidden="true">
              <span className="crt__beam" />
              <span className="crt__flash" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
