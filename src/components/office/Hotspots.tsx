import type { CSSProperties } from 'react';
import type { Hotspot } from '../../lib/scene';

/**
 * Hotspots — one focusable, labelled control per interactive object (law 7),
 * absolutely positioned by scene-relative %. The résumé folder is a real
 * <a download> so it downloads the PDF with no gate (law 2). Every control is
 * ≥44px (enforced in CSS) with its label revealed on hover/focus/first-visit.
 */
interface Props {
  hotspots: Hotspot[];
  /** First-visit label flash: reveal every label regardless of hover/focus. */
  showLabels: boolean;
  onActivate: (hotspot: Hotspot) => void;
}

export default function Hotspots({ hotspots, showLabels, onActivate }: Props) {
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

        if (h.download) {
          return (
            <a
              key={h.id}
              className="hotspot hotspot--download"
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
            className="hotspot"
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
