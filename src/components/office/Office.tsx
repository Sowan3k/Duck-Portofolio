import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { hotspots, SCENE_ASPECT, type Hotspot } from '../../lib/scene';
import {
  CRT_POWER_ON_MS,
  LABEL_FLASH_MS,
  STORAGE_KEYS,
  type OfficeView,
} from './engine';
import {
  originIntro,
  easterEggs,
  timeOfDay,
  pickLines,
  type LineSet,
} from '../../lib/dialogue';
import { newspaper } from '../../content/profile';
import { useInteraction } from './useInteraction';
import EntryScreen from './EntryScreen';
import Hotspots from './Hotspots';
import Dialogue from './Dialogue';
import './office.css';

// The physical-UI panels (and all the profile content rendering) are only
// needed once an object opens — code-split so the initial island stays small
// and hydrates fast (keeps LCP down).
const ContentPanel = lazy(() => import('./ui/ContentPanel'));

/**
 * Office — the island root. Runs the entry → CRT → office flow over the standard
 * view (client-only so no-JS shows the standard view, law 5), then hosts the
 * full interaction pattern (CLAUDE.md §5): click an object → the duck notices →
 * dialogue → content opens as a physical panel → close → the duck returns. The
 * résumé folder downloads the PDF directly (law 2). Plus the v1 flourishes:
 * origin-story intro, repeat-visit memory, time-aware idle, rotating newspaper
 * headline, and the three easter eggs (bible §16).
 */
const DUCK_IDLE_LABEL: Record<string, string> = {
  night: '😴 Swan',
  morning: '☕ Swan',
  day: '🦆 Swan',
  evening: '🦆 Swan',
};

function GrayBoxLayers({
  headline,
  duckLabel,
  onCoffee,
}: {
  headline: string;
  duckLabel: string;
  onCoffee: () => void;
}) {
  return (
    <div className="gb">
      <div className="gb__wall" aria-hidden="true" />
      <div className="gb__desk" aria-hidden="true" />
      <div className="gb__news" aria-hidden="true">
        <span className="gb__masthead">{newspaper.masthead}</span>
        <span className="gb__headline">{headline}</span>
      </div>
      <div className="gb__duck" aria-hidden="true">
        <span>{duckLabel}</span>
      </div>
      <button
        type="button"
        className="gb__coffee"
        onClick={onCoffee}
        aria-label="Swan's coffee mug"
      >
        <span aria-hidden="true">☕</span>
      </button>
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
  const [coarse, setCoarse] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Interaction machine (§5). Intro + toast are lightweight side flows.
  const { state: interaction, dispatch } = useInteraction(reduced);
  const [introIndex, setIntroIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [tod] = useState(() => timeOfDay(new Date().getHours()));
  const [headline] = useState(
    () => newspaper.headlines[Math.floor(Math.random() * newspaper.headlines.length)] ?? ''
  );

  const visitedRef = useRef<Set<string>>(new Set());
  const visitCountRef = useRef(0);
  const returnFocusRef = useRef<string | null>(null);
  const enteredRef = useRef(false);
  const introStartedRef = useRef(false);
  const crtTimer = useRef<number | null>(null);
  const flashTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);
  const coffeeCount = useRef(0);
  const spamCount = useRef(0);
  const hireBuffer = useRef('');

  const introActive = introIndex !== null;
  const dialogueActive =
    introActive || interaction.phase === 'noticing' || interaction.phase === 'talking';
  const panelOpen = interaction.phase === 'open';
  const busy = introActive || interaction.phase !== 'idle';

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  // Mount: only NOW is the office real. Adding `office-ready` reveals the
  // overlay (CSS), so if this island never hydrates the standard view stays the
  // whole experience — a JS failure can't trap the visitor.
  useEffect(() => {
    document.documentElement.classList.add('office-ready');
    setReady(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.sound);
      if (stored !== null) setSoundOn(stored === 'on');
      const visited = localStorage.getItem(STORAGE_KEYS.visitedObjects);
      if (visited) visitedRef.current = new Set(JSON.parse(visited) as string[]);
    } catch {
      /* storage blocked — defaults */
    }
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(rm.matches);
    const onRm = () => setReduced(rm.matches);
    rm.addEventListener('change', onRm);
    const touch = window.matchMedia('(hover: none), (pointer: coarse)');
    setCoarse(touch.matches);
    const onTouch = () => setCoarse(touch.matches);
    touch.addEventListener('change', onTouch);
    return () => {
      rm.removeEventListener('change', onRm);
      touch.removeEventListener('change', onTouch);
      for (const t of [crtTimer, flashTimer, toastTimer]) {
        if (t.current) window.clearTimeout(t.current);
      }
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
        flashTimer.current = window.setTimeout(() => setFlashLabels(false), LABEL_FLASH_MS);
        localStorage.setItem(STORAGE_KEYS.visitedOffice, '1');
      }
    } catch {
      /* storage blocked */
    }
  }, []);

  // Origin story once per visitor, when the office first opens.
  const maybeStartIntro = useCallback(() => {
    if (introStartedRef.current) return;
    introStartedRef.current = true;
    try {
      if (!localStorage.getItem(STORAGE_KEYS.introSeen)) setIntroIndex(0);
    } catch {
      setIntroIndex(0);
    }
  }, []);

  const enter = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    const arrive = () => {
      setView('office');
      flashOnFirstVisit();
      maybeStartIntro();
    };
    if (reduced) {
      arrive();
      return;
    }
    setView('crt');
    crtTimer.current = window.setTimeout(arrive, CRT_POWER_ON_MS);
  }, [reduced, flashOnFirstVisit, maybeStartIntro]);

  const cancelCrt = useCallback(() => {
    if (crtTimer.current) {
      window.clearTimeout(crtTimer.current);
      crtTimer.current = null;
    }
  }, []);

  const openOffice = useCallback(() => {
    cancelCrt();
    setLookAround(false);
    setSelectedId(null);
    setView('office');
    // First-visit discovery fires however the visitor reaches the office.
    flashOnFirstVisit();
    maybeStartIntro();
  }, [cancelCrt, flashOnFirstVisit, maybeStartIntro]);

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
        /* session-only */
      }
      return next;
    });
  }, []);

  const dismissToStandard = useCallback(() => {
    cancelCrt();
    setLookAround(false);
    setSelectedId(null);
    setView('standard');
    requestAnimationFrame(() => {
      const std = document.getElementById('standard-view');
      if (std) std.inert = false;
      // Return to the top of the page and its heading (a real focusable target).
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      document.getElementById('page-top')?.focus();
    });
  }, [cancelCrt, reduced]);

  const markVisited = useCallback((id: string) => {
    visitedRef.current.add(id);
    try {
      localStorage.setItem(
        STORAGE_KEYS.visitedObjects,
        JSON.stringify([...visitedRef.current])
      );
    } catch {
      /* session-only */
    }
  }, []);

  const activate = useCallback(
    (hotspot: Hotspot) => {
      if (hotspot.download) return; // the <a download> handles the PDF (law 2)
      // Spam-clicking objects while the duck is mid-sentence: easter egg.
      if (busy) {
        spamCount.current += 1;
        if (spamCount.current === 3) showToast(easterEggs.spam);
        return;
      }
      spamCount.current = 0;
      // On touch, the first tap reveals the object's label; the second opens it
      // (the hover affordance has no equivalent on touch — CLAUDE.md §4).
      if (coarse && selectedId !== hotspot.id) {
        setSelectedId(hotspot.id);
        return;
      }
      setSelectedId(null);
      const visited = visitedRef.current.has(hotspot.id);
      const lines: LineSet = pickLines(hotspot.contentId, {
        visited,
        visitCount: visitCountRef.current,
      });
      visitCountRef.current += 1;
      returnFocusRef.current = hotspot.id;
      dispatch({
        type: 'ACTIVATE',
        objectId: hotspot.id,
        contentId: hotspot.contentId,
        lines,
        glance: visited,
      });
      markVisited(hotspot.id);
    },
    [busy, coarse, selectedId, dispatch, markVisited, showToast]
  );

  // When the office opens, move focus in so keyboard users aren't stranded.
  useEffect(() => {
    if (view !== 'office' || busy) return;
    const id = requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.office-overlay .hotspot')?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [view, busy]);

  // After an interaction returns to rest, focus goes back to the object (law 7).
  useEffect(() => {
    if (interaction.phase !== 'idle' || !returnFocusRef.current) return;
    const id = returnFocusRef.current;
    returnFocusRef.current = null;
    const raf = requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`.office-overlay [data-object="${id}"]`)?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [interaction.phase]);

  // Intro advance/skip.
  const finishIntro = useCallback(() => {
    setIntroIndex(null);
    try {
      localStorage.setItem(STORAGE_KEYS.introSeen, '1');
    } catch {
      /* session-only */
    }
  }, []);
  const advanceIntro = useCallback(() => {
    setIntroIndex((i) => {
      if (i === null) return null;
      if (i < originIntro.length - 1) return i + 1;
      finishIntro();
      return null;
    });
  }, [finishIntro]);

  // Keyboard: Esc closes (panel → look-around → nothing); "hire" easter egg.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (panelOpen) {
          dispatch({ type: 'CLOSE' });
          return;
        }
        if (lookAround) setLookAround(false);
        return;
      }
      if (view === 'office' && /^[a-z]$/i.test(e.key)) {
        hireBuffer.current = (hireBuffer.current + e.key.toLowerCase()).slice(-4);
        if (hireBuffer.current === 'hire') {
          hireBuffer.current = '';
          showToast(easterEggs.hire);
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [panelOpen, lookAround, view, dispatch, showToast]);

  const onCoffee = useCallback(() => {
    coffeeCount.current += 1;
    if (coffeeCount.current === 5) {
      coffeeCount.current = 0;
      showToast(easterEggs.coffee);
    }
  }, [showToast]);

  const closePanel = useCallback(() => dispatch({ type: 'CLOSE' }), [dispatch]);

  if (view === 'standard') return null;

  // The scene is locked (inert + no pointer) while the CRT plays or the duck is
  // mid-interaction, so nothing behind can be tabbed or clicked (§5, fix).
  const sceneLocked = busy || view === 'crt';

  const overlayStyle = {
    ['--crt-ms' as string]: `${CRT_POWER_ON_MS}ms`,
    ['--scene-aspect' as string]: String(SCENE_ASPECT),
  } as CSSProperties;

  // Dialogue source: the intro takes precedence over object talk.
  const dialogueLines = introActive ? originIntro : interaction.lines;
  const dialogueIndex = introActive ? (introIndex ?? 0) : interaction.lineIndex;
  const dialogueNoticing = !introActive && interaction.phase === 'noticing';
  const onDialogueAdvance = introActive
    ? advanceIntro
    : () => dispatch({ type: 'ADVANCE' });
  const onDialogueSkip = introActive ? finishIntro : () => dispatch({ type: 'SKIP' });

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
          <div className="scene-viewport" inert={sceneLocked}>
            <div
              className="scene"
              role="group"
              aria-roledescription="office scene"
              aria-label="Swan's office (gray-box preview)"
              data-duck={interaction.duck}
            >
              <GrayBoxLayers
                headline={headline}
                duckLabel={DUCK_IDLE_LABEL[tod] ?? '🦆 Swan'}
                onCoffee={onCoffee}
              />
              <Hotspots
                hotspots={hotspots}
                showLabels={flashLabels || lookAround}
                selectedId={selectedId}
                onActivate={activate}
              />
            </div>
          </div>

          <div className="office-controls" role="toolbar" aria-label="Office controls" inert={sceneLocked}>
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

          {dialogueActive && (
            <Dialogue
              lines={dialogueLines}
              index={dialogueIndex}
              reduced={reduced}
              noticing={dialogueNoticing}
              lastLabel={introActive ? 'Look around' : 'Open'}
              onAdvance={onDialogueAdvance}
              onSkip={onDialogueSkip}
            />
          )}

          {panelOpen && interaction.contentId && (
            <Suspense fallback={null}>
              <ContentPanel contentId={interaction.contentId} onClose={closePanel} reduced={reduced} />
            </Suspense>
          )}

          {toast && (
            <div className="office-toast" role="status" aria-live="polite">
              {toast}
            </div>
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
