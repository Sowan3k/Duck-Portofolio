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

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

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
      <div
        className="panel__stage"
        style={{ ['--ratio' as string]: String(art.ratio), aspectRatio: String(art.ratio) }}
      >
        <picture>
          <source
            type="image/avif"
            srcSet={art.widths.map((w) => `${UI_DIR}/${art.stem}-${w}w.avif ${w}w`).join(', ')}
            sizes="(max-width: 900px) 96vw, 900px"
          />
          <source
            type="image/webp"
            srcSet={art.widths.map((w) => `${UI_DIR}/${art.stem}-${w}w.webp ${w}w`).join(', ')}
            sizes="(max-width: 900px) 96vw, 900px"
          />
          <img
            src={`${UI_DIR}/${art.stem}-${art.widths[1]}w.webp`}
            alt=""
            className="panel__art"
          />
        </picture>

        <div className={`panel__content${art.spread ? ' panel__content--spread' : ''}`} style={contentStyle}>
          <h2 ref={headingRef} tabIndex={-1} className="panel__title">
            {art.title}
          </h2>
          <PanelContent contentId={contentId} />
        </div>

        <button type="button" className="panel__close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </div>
  );
}
