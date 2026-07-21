import type { CSSProperties } from 'react';
import {
  sceneLayers,
  layerFile,
  layerSrcSet,
  layerSizes,
  type SceneLayer,
} from '../../lib/sceneLayers';
import Duck from './Duck';
import type { DuckPose } from './engine';

/**
 * SceneLayers - the painted office (Phase 5), replacing the Phase-3 gray-box.
 * Nine approved cutouts stacked back-to-front by array order (index = z), each a
 * responsive <picture> (AVIF primary, WebP fallback). The whole stack is
 * decorative: it's `aria-hidden`, and the focusable Hotspots layer (with the
 * accessible names) sits above it.
 *
 * Swan (index 3) renders through Duck (Phase 6): the calm static pose paints
 * immediately and the Rive rig mounts over it in the same slot once the .riv
 * exists; reduced motion keeps the static pose permanently.
 */
function layerStyle(layer: SceneLayer, z: number): CSSProperties {
  if (layer.place.kind === 'full') {
    return { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: z };
  }
  const { leftPct, topPct, widthPct } = layer.place;
  return {
    position: 'absolute',
    left: `${leftPct}%`,
    top: `${topPct}%`,
    width: `${widthPct}%`,
    height: 'auto',
    zIndex: z,
  };
}

function LayerImg({ layer, z }: { layer: SceneLayer; z: number }) {
  const largestWebp = layerFile(layer, layer.widths[layer.widths.length - 1]!, 'webp');
  return (
    <picture>
      <source type="image/avif" srcSet={layerSrcSet(layer, 'avif')} sizes={layerSizes(layer)} />
      <source type="image/webp" srcSet={layerSrcSet(layer, 'webp')} sizes={layerSizes(layer)} />
      <img
        className={`scene-layer scene-layer--${layer.id}`}
        style={layerStyle(layer, z)}
        src={largestWebp}
        alt=""
        width={layer.intrinsic.w}
        height={layer.intrinsic.h}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

interface Props {
  duckPose: DuckPose;
  reduced: boolean;
  headline: string;
}

export default function SceneLayers({ duckPose, reduced, headline }: Props) {
  return (
    <div className="scene-art" aria-hidden="true">
      {sceneLayers.map((layer, i) =>
        layer.id === 'swan' ? (
          <Duck key={layer.id} pose={duckPose} reduced={reduced} headline={headline} z={i} />
        ) : (
          <LayerImg key={layer.id} layer={layer} z={i} />
        )
      )}
    </div>
  );
}
