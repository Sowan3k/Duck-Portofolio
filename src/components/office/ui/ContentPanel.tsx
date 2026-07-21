import { useEffect, useRef } from 'react';
import type { SceneContentId } from '../../../lib/scene';
import { PANEL_ART, UI_DIR } from './panels';
import PanelContent from './PanelContent';

/**
 * ContentPanel - the physical UI shell. The object's approved blank art is the
 * skin; DOM content renders over its writable region (law 3). It behaves as an
 * accessible dialog: focus moves in on open, Esc closes and focus returns to the
 * object (handled by Office), and the rest of the scene is inert while it's open
 * - so nothing is trapped in JS, yet Tab stays where it belongs (law 7).
 */
interface Props {
  contentId: SceneContentId;
  onClose: () => void;
  reduced: boolean;
}

export default function ContentPanel({ contentId, onClose, reduced }: Props) {
  const art = PANEL_ART[contentId];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Fade the body edges only when it actually scrolls (so short panels keep
  // their first/last lines crisp). Re-checked on resize.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const sync = () =>
      body.setAttribute('data-scrollable', String(body.scrollHeight > body.clientHeight + 2));
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(body);
    return () => ro.disconnect();
  }, [contentId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // The prop art is the stage's background (not a sibling <img>) so the DOM text
  // writes directly onto the painted paper - no card (owner review 2026-07-22).
  // Largest tier for crispness; loads on demand when the panel opens. AVIF with
  // a WebP fallback via image-set (older engines take the plain WebP url).
  const wLarge = art.widths[art.widths.length - 1];
  const stageStyle = {
    ['--ratio' as string]: String(art.ratio),
    ['--art-avif' as string]: `url("${UI_DIR}/${art.stem}-${wLarge}w.avif")`,
    ['--art-webp' as string]: `url("${UI_DIR}/${art.stem}-${wLarge}w.webp")`,
    aspectRatio: String(art.ratio),
  };

  const contentStyle = {
    top: `${art.inset[0]}%`,
    right: `${art.inset[1]}%`,
    bottom: `${art.inset[2]}%`,
    left: `${art.inset[3]}%`,
  };

  return (
    <div
      className="panel"
      data-content={contentId}
      data-reduced={reduced ? 'true' : 'false'}
      role="dialog"
      aria-modal="true"
      aria-label={art.title}
    >
      <div className="panel__stage" style={stageStyle}>
        <div className={`panel__content${art.spread ? ' panel__content--spread' : ''}`} style={contentStyle}>
          <h2 ref={headingRef} tabIndex={-1} className="panel__title">
            {art.title}
          </h2>
          {/* Title stays put; only the body scrolls, and its edges fade into the
              page so long content never looks hard-cut (owner review). */}
          <div className="panel__body" ref={bodyRef}>
            <PanelContent contentId={contentId} />
          </div>
        </div>

        <button type="button" className="panel__close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </div>
  );
}
