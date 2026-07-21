import { lazy, Suspense, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { RIVE, type DuckPose } from './engine';
import {
  sceneLayers,
  layerFile,
  layerSrcSet,
  layerSizes,
  type SceneLayer,
} from '../../lib/sceneLayers';

// The Rive runtime + rig load ONLY after the .riv is confirmed present - a
// separate chunk that today's visitors (no rig yet) never download.
const RiveDuck = lazy(() => import('./RiveDuck'));

/**
 * Duck - Swan's slot in the painted scene (Phase 6).
 *
 * Renders the approved calm static pose immediately (it is one of the nine
 * painted layers, so nothing changes for the visitor), then - after the office
 * is interactive - HEAD-checks for the exported rig at RIVE.src. If the .riv
 * exists, the Rive canvas mounts over the static pose and takes over once
 * genuinely loaded; if it doesn't (or the fetch fails, or the visitor prefers
 * reduced motion), the static pose simply remains. The office never breaks
 * for lack of a rig - law 5's spirit applied to the duck.
 *
 * While the rig is live and reading, the rotating newspaper headline renders
 * as DOM over the paper (law 3); it can only appear with the read pose, so it
 * ships dormant until the rig lands. TODO(rig): register the headline box to
 * the rigged newspaper once the .riv exists.
 */
const swanLayer = sceneLayers.find((l) => l.id === 'swan') as SceneLayer;

interface Props {
  pose: DuckPose;
  reduced: boolean;
  headline: string;
  z: number;
}

export default function Duck({ pose, reduced, headline, z }: Props) {
  const [rigExists, setRigExists] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    fetch(RIVE.src, { method: 'HEAD' })
      .then((r) => {
        if (!cancelled && r.ok) setRigExists(true);
      })
      .catch(() => {
        /* no rig - the static pose stays */
      });
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  const place = swanLayer.place;
  const style: CSSProperties =
    place.kind === 'rect'
      ? {
          position: 'absolute',
          left: `${place.leftPct}%`,
          top: `${place.topPct}%`,
          width: `${place.widthPct}%`,
          zIndex: z,
          aspectRatio: `${swanLayer.intrinsic.w} / ${swanLayer.intrinsic.h}`,
        }
      : { position: 'absolute', inset: 0, zIndex: z };

  const showRive = rigExists && !reduced;

  return (
    <div className="scene-duck" style={style} data-live={live ? 'true' : 'false'}>
      <picture>
        <source type="image/avif" srcSet={layerSrcSet(swanLayer, 'avif')} sizes={layerSizes(swanLayer)} />
        <source type="image/webp" srcSet={layerSrcSet(swanLayer, 'webp')} sizes={layerSizes(swanLayer)} />
        <img
          className="scene-layer scene-layer--swan scene-duck__static"
          src={layerFile(swanLayer, swanLayer.widths[swanLayer.widths.length - 1]!, 'webp')}
          alt=""
          width={swanLayer.intrinsic.w}
          height={swanLayer.intrinsic.h}
          decoding="async"
          draggable={false}
        />
      </picture>
      {showRive && (
        <Suspense fallback={null}>
          <RiveDuck pose={pose} onReady={() => setLive(true)} />
        </Suspense>
      )}
      {live && pose === 'read' && headline && (
        <div className="duck-headline" aria-hidden="true">
          <span className="duck-headline__text">{headline}</span>
        </div>
      )}
    </div>
  );
}
