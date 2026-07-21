import { useEffect, useRef } from 'react';
import { profile } from '../../content/profile';

/**
 * EntryScreen — the framed-portrait cover (law 3: all text is DOM). "Press
 * Enter / tap to come in" enables once the scene is ready; the speaker toggle
 * defaults ON (law 8); the standard-view link is always visible (law 5).
 */
interface Props {
  ready: boolean;
  soundOn: boolean;
  onEnter: () => void;
  onToggleSound: () => void;
  onStandardView: () => void;
}

const SRC = '/assets/entry/entry-portrait-sowan--v04';

export default function EntryScreen({
  ready,
  soundOn,
  onEnter,
  onToggleSound,
  onStandardView,
}: Props) {
  const enterRef = useRef<HTMLButtonElement>(null);

  // The whole screen is one call-to-action; focus it so Enter comes in at once.
  useEffect(() => {
    if (ready) enterRef.current?.focus();
  }, [ready]);

  return (
    <div className="entry">
      <div className="entry__card">
        <picture>
          <source
            type="image/avif"
            srcSet={`${SRC}-400w.avif 400w, ${SRC}-800w.avif 800w, ${SRC}-1600w.avif 1600w`}
            sizes="(max-width: 640px) 40vw, 200px"
          />
          <source
            type="image/webp"
            srcSet={`${SRC}-400w.webp 400w, ${SRC}-800w.webp 800w, ${SRC}-1600w.webp 1600w`}
            sizes="(max-width: 640px) 40vw, 200px"
          />
          <img
            src={`${SRC}-800w.webp`}
            alt={`Framed cartoon portrait of ${profile.name}.`}
            width={2600}
            height={3250}
            className="entry__portrait"
            fetchPriority="high"
          />
        </picture>

        <h1 className="entry__title">Welcome to Swan's Office</h1>
        <p className="entry__sub">A portfolio you don't scroll — you visit.</p>

        <button
          ref={enterRef}
          type="button"
          className="btn btn--primary entry__enter"
          onClick={onEnter}
          disabled={!ready}
          aria-describedby="entry-hint"
        >
          {ready ? 'Press Enter / tap to come in' : 'Warming up the office…'}
        </button>
        <p id="entry-hint" className="entry__hint">
          You can turn sound off before you come in, or read the plain portfolio instead.
        </p>

        <div className="entry__row">
          <button
            type="button"
            className="office-toggle"
            aria-pressed={soundOn}
            onClick={onToggleSound}
          >
            <span aria-hidden="true">{soundOn ? '🔊' : '🔇'}</span>
            Sound {soundOn ? 'on' : 'off'}
          </button>
          <button type="button" className="office-link" onClick={onStandardView}>
            Standard view
          </button>
        </div>
      </div>
    </div>
  );
}
