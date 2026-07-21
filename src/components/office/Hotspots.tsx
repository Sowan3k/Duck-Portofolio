import type { CSSProperties } from 'react';
import type { Hotspot } from '../../lib/scene';

/**
 * Hotspots — one focusable, labelled control per interactive object (law 7),
 * absolutely positioned by scene-relative %, z-ordered by depth band. The
 * résumé folder is a real <a download> (law 2). Every control is ≥44px with its
 * label revealed on hover/focus, during the first-visit/look-around flash, or —
 * on touch — when it is the first-tapped (selected) object (CLAUDE.md §4).
 */
interface Props {
  hotspots: Hotspot[];
  /** Reveal every label (first-visit flash or Look Around). */
  showLabels: boolean;
  /** The touch-selected object, whose label shows even without a flash. */
  selectedId?: string | null;
  onActivate: (hotspot: Hotspot) => void;
}

export default function Hotspots({ hotspots, showLabels, selectedId, onActivate }: Props) {
  return (
    <div className={`hotspots${showLabels ? ' hotspots--show-labels' : ''}`}>
      {hotspots.map((h) => {
        const style: CSSProperties = {
          left: `${h.rect.xPct}%`,
          top: `${h.rect.yPct}%`,
          width: `${h.rect.wPct}%`,
          height: `${h.rect.hPct}%`,
          zIndex: h.z,
        };
        const selected = selectedId === h.id;
        const className = `hotspot hotspot--${h.band}${selected ? ' hotspot--selected' : ''}`;

        if (h.download) {
          return (
            <a
              key={h.id}
              className={`${className} hotspot--download`}
              style={style}
              href="/resume.pdf"
              download
              data-object={h.id}
              aria-label={h.ariaLabel}
            >
              <span className="hotspot__label">{h.label}</span>
            </a>
          );
        }

        return (
          <button
            key={h.id}
            type="button"
            className={className}
            style={style}
            data-object={h.id}
            aria-label={h.ariaLabel}
            onClick={() => onActivate(h)}
          >
            <span className="hotspot__label">{h.label}</span>
          </button>
        );
      })}
    </div>
  );
}
