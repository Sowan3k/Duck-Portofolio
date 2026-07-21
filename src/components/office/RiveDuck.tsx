import { useEffect } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { RIVE, RIVE_POSE, type DuckPose } from './engine';

/**
 * RiveDuck - the living Swan. This module statically imports the Rive runtime,
 * so it MUST only ever be reached through Duck.tsx's React.lazy import (after
 * the .riv file is confirmed to exist): the runtime and rig stay out of the
 * initial bundle (CLAUDE.md §8 - Rive lazy-loads outside the JS budget).
 *
 * One number input (`pose`, per the engine.ts contract) drives the whole
 * state machine; the rig owns its own blinking.
 */
interface Props {
  pose: DuckPose;
  /** Fires once the rig has genuinely loaded - Duck then fades the static pose. */
  onReady: () => void;
}

export default function RiveDuck({ pose, onReady }: Props) {
  const { rive, RiveComponent } = useRive({
    src: RIVE.src,
    artboard: RIVE.artboard,
    stateMachines: RIVE.stateMachine,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
    onLoad: onReady,
  });
  const poseInput = useStateMachineInput(rive, RIVE.stateMachine, RIVE.input);

  useEffect(() => {
    if (poseInput) poseInput.value = RIVE_POSE[pose];
  }, [poseInput, pose]);

  return <RiveComponent className="scene-duck__canvas" />;
}
