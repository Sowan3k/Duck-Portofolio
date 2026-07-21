import { useEffect, useRef, useState } from 'react';
import { TIMING } from './engine';

/**
 * Dialogue - the duck's speech panel (approved V-020 art as skin, DOM text on
 * top - law 3). Lines advance on input only (never a timer, law 2); a Skip
 * affordance jumps straight to the content. Word-chunk reveal ~40ms/word, off
 * under reduced motion. aria-live announces each line.
 */
interface Props {
  lines: string[];
  index: number;
  reduced: boolean;
  /** The notice beat: the duck is looking up, no line yet. */
  noticing: boolean;
  /** Advance-button label on the final line (e.g. "Open", "Come in"). */
  lastLabel: string;
  onAdvance: () => void;
  onSkip: () => void;
}

const SRC = '/assets/ui/dialogue-panel-blank--v01';

function useWordReveal(line: string, reduced: boolean): string {
  const words = line.length > 0 ? line.split(' ') : [];
  const [count, setCount] = useState(words.length);

  useEffect(() => {
    const w = line.length > 0 ? line.split(' ') : [];
    if (reduced || w.length === 0) {
      setCount(w.length);
      return;
    }
    setCount(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= w.length) window.clearInterval(id);
    }, TIMING.WORD_REVEAL_MS);
    return () => window.clearInterval(id);
  }, [line, reduced]);

  return words.slice(0, count).join(' ');
}

export default function Dialogue({
  lines,
  index,
  reduced,
  noticing,
  lastLabel,
  onAdvance,
  onSkip,
}: Props) {
  const line = noticing ? '' : lines[index] ?? '';
  const shown = useWordReveal(line, reduced);
  const isLast = index >= lines.length - 1;
  const nextRef = useRef<HTMLButtonElement>(null);

  // Keep focus on the advance control so Enter/Space always advances.
  useEffect(() => {
    if (!noticing) nextRef.current?.focus();
  }, [noticing, index]);

  return (
    <div className="dialogue" data-noticing={noticing ? 'true' : 'false'}>
      <div className="dialogue__panel">
        <picture>
          <source
            type="image/avif"
            srcSet={`${SRC}-480w.avif 480w, ${SRC}-960w.avif 960w, ${SRC}-1920w.avif 1920w`}
            sizes="(max-width: 640px) 96vw, 640px"
          />
          <source
            type="image/webp"
            srcSet={`${SRC}-480w.webp 480w, ${SRC}-960w.webp 960w, ${SRC}-1920w.webp 1920w`}
            sizes="(max-width: 640px) 96vw, 640px"
          />
          <img
            src={`${SRC}-960w.webp`}
            alt=""
            width={3000}
            height={1200}
            className="dialogue__art"
          />
        </picture>

        <div className="dialogue__body">
          <p className="dialogue__speaker">Swan</p>
          <p className="dialogue__text" aria-live="polite">
            {noticing ? '…' : shown}
          </p>
          <div className="dialogue__actions">
            <button
              ref={nextRef}
              type="button"
              className="dialogue__next"
              onClick={onAdvance}
            >
              {noticing ? 'Skip' : isLast ? lastLabel : 'Next'}
            </button>
            {!isLast && (
              <button type="button" className="dialogue__skip" onClick={onSkip}>
                Skip →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
