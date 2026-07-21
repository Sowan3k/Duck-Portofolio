/**
 * warm-cursor.ts - the static pages' cursor effect (owner decisions 2026-07-21).
 *
 * Faithful zero-dependency port of the requested MagneticCursor look: a solid
 * white dot in `mix-blend-mode: exclusion` (the inverting "bubble") with a
 * contrast-boosting backdrop filter, liquid velocity squash-stretch (rotates
 * into the motion direction, stretches long and thin with speed), a thin
 * vertical bar over text, and a morph that wraps links/buttons with the
 * element leaning toward the pointer and springing back elastically.
 *
 * The GSAP/vecteur dependencies of the original are replaced with one rAF
 * loop and lerp easing - same motion grammar, ~2KB instead of ~30KB.
 *
 * Static pages only: desktop (hover + fine pointer), fully disabled under
 * prefers-reduced-motion, auto-paused while the office overlay covers the
 * page - the painted office never sees it.
 */

const SIZE = 40; // dot diameter, per the requested demo
const LERP = 0.1; // positional easing, per the original
const HUG_LERP = 0.28; // morph-to-element easing (≈ power3.out 0.3s)
const HUG_PAD = 18; // hoverPadding 12 × (1 + magneticFactor 0.55)
const SPEED_MULT = 0.02; // liquid stretch per px/frame, per the original
const MAX_SX = 1; // stretch up to 2× long
const MAX_SY = 0.3; // thin down to 0.7×
const LEAN_FACTOR = 0.3;
const LEAN_MAX = 18; // px - visible magnetism without wrecking layout

const TEXT_TAGS = new Set(['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'DT', 'DD']);

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

let el: HTMLDivElement | null = null;
let raf = 0;
let hugged: HTMLElement | null = null;
let overText = false;
let inertObserver: MutationObserver | null = null;
let cleanup: (() => void) | null = null;

const pos = { x: -100, y: -100 };
const target = { x: -100, y: -100 };
const prev = { x: -100, y: -100 };
const box: Box = { x: -100, y: -100, w: SIZE, h: SIZE };
const scale = { x: 1, y: 1 };
let radius = SIZE / 2;
let radiusTarget = `${SIZE / 2}px`;
let seen = false;
let paused = false;

function dotStyle(cursor: HTMLDivElement): void {
  cursor.style.background = 'white';
  radiusTarget = '50%';
}

function hugStyle(of: HTMLElement): void {
  // The wrap keeps the inverting white fill; only the shape morphs.
  radiusTarget = window.getComputedStyle(of).borderRadius || '8px';
}

function loop(): void {
  raf = requestAnimationFrame(loop);
  if (!el || paused) return;

  if (hugged) {
    const r = hugged.getBoundingClientRect();
    const t: Box = {
      x: r.left - HUG_PAD,
      y: r.top - HUG_PAD,
      w: r.width + HUG_PAD * 2,
      h: r.height + HUG_PAD * 2,
    };
    box.x += (t.x - box.x) * HUG_LERP;
    box.y += (t.y - box.y) * HUG_LERP;
    box.w += (t.w - box.w) * HUG_LERP;
    box.h += (t.h - box.h) * HUG_LERP;
    scale.x += (1 - scale.x) * HUG_LERP;
    scale.y += (1 - scale.y) * HUG_LERP;
    el.style.borderRadius = radiusTarget;
    el.style.transform = `translate(${box.x}px, ${box.y}px)`;
    el.style.width = `${box.w}px`;
    el.style.height = `${box.h}px`;
    pos.x = box.x + box.w / 2;
    pos.y = box.y + box.h / 2;
    prev.x = pos.x;
    prev.y = pos.y;
    return;
  }

  pos.x += (target.x - pos.x) * LERP;
  pos.y += (target.y - pos.y) * LERP;
  const dx = pos.x - prev.x;
  const dy = pos.y - prev.y;
  prev.x = pos.x;
  prev.y = pos.y;
  const speed = Math.hypot(dx, dy);

  // Liquid: stretch into the motion direction; a thin bar over text.
  let sxT: number;
  let syT: number;
  let angle = 0;
  if (overText && speed < 2) {
    sxT = 0.5;
    syT = 1.5;
  } else {
    sxT = 1 + Math.min(speed * SPEED_MULT, MAX_SX);
    syT = 1 - Math.min(speed * SPEED_MULT, MAX_SY);
    angle = speed > 0.5 ? Math.atan2(dy, dx) * (180 / Math.PI) : 0;
  }
  scale.x += (sxT - scale.x) * 0.2;
  scale.y += (syT - scale.y) * 0.2;
  box.w += (SIZE - box.w) * HUG_LERP;
  box.h += (SIZE - box.h) * HUG_LERP;
  radius += (Math.min(box.w, box.h) / 2 - radius) * HUG_LERP;
  el.style.borderRadius = '50%';
  el.style.width = `${box.w}px`;
  el.style.height = `${box.h}px`;
  el.style.transform =
    `translate(${pos.x - box.w / 2}px, ${pos.y - box.h / 2}px)` +
    (angle ? ` rotate(${angle}deg)` : '') +
    ` scale(${scale.x}, ${scale.y})` +
    (angle ? ` rotate(${-angle}deg)` : '');
}

function releaseHug(): void {
  if (!hugged || !el) return;
  hugged.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
  hugged.style.transform = '';
  const releasing = hugged;
  window.setTimeout(() => {
    if (releasing !== hugged) releasing.style.transition = '';
  }, 650);
  hugged = null;
  dotStyle(el);
}

/** Static pages only: wrap any control that is NOT inside the office overlay. */
function hugTarget(from: Element | null): HTMLElement | null {
  const t = from?.closest?.('a, button, [data-magnetic]') as HTMLElement | null;
  if (!t || t.closest('.office-overlay')) return null;
  return t;
}

function onPointerMove(e: PointerEvent): void {
  if (!el) return;
  target.x = e.clientX;
  target.y = e.clientY;
  if (!seen) {
    seen = true;
    pos.x = prev.x = e.clientX;
    pos.y = prev.y = e.clientY;
    box.x = e.clientX - SIZE / 2;
    box.y = e.clientY - SIZE / 2;
  }
  el.style.opacity = paused ? '0' : '1';

  const t = e.target as HTMLElement | null;
  overText =
    !!t &&
    (TEXT_TAGS.has(t.tagName) || window.getComputedStyle(t).cursor === 'text') &&
    !hugTarget(t);

  if (hugged) {
    const r = hugged.getBoundingClientRect();
    const lx = Math.max(-LEAN_MAX, Math.min(LEAN_MAX, (e.clientX - (r.left + r.width / 2)) * LEAN_FACTOR));
    const ly = Math.max(-LEAN_MAX, Math.min(LEAN_MAX, (e.clientY - (r.top + r.height / 2)) * LEAN_FACTOR));
    hugged.style.transition = 'transform 0.15s ease-out';
    hugged.style.transform = `translate(${lx}px, ${ly}px)`;
  }
}

function onPointerOver(e: PointerEvent): void {
  if (!el || paused) return;
  const t = hugTarget(e.target as Element | null);
  if (t === hugged) return;
  releaseHug();
  if (t) {
    hugged = t;
    hugStyle(t);
  }
}

function onPointerOut(e: PointerEvent): void {
  if (!hugged) return;
  const to = e.relatedTarget as Element | null;
  if (!to || !hugged.contains(to)) {
    if (hugTarget(to) !== hugged) releaseHug();
  }
}

function onLeaveWindow(): void {
  if (el) el.style.opacity = '0';
}

/** Pause while the office overlay covers the page (#standard-view is inert). */
function watchOffice(): void {
  const std = document.getElementById('standard-view');
  if (!std) return;
  const sync = () => {
    paused = std.inert;
    if (el && paused) el.style.opacity = '0';
    if (paused) releaseHug();
  };
  sync();
  inertObserver = new MutationObserver(sync);
  inertObserver.observe(std, { attributes: true, attributeFilter: ['inert'] });
}

function start(): void {
  if (el) return;
  el = document.createElement('div');
  el.className = 'warm-cursor';
  el.setAttribute('aria-hidden', 'true');
  dotStyle(el);
  document.body.appendChild(el);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerover', onPointerOver, { passive: true });
  window.addEventListener('pointerout', onPointerOut, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeaveWindow);
  watchOffice();
  raf = requestAnimationFrame(loop);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerover', onPointerOver);
    window.removeEventListener('pointerout', onPointerOut);
    document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
    inertObserver?.disconnect();
    inertObserver = null;
    releaseHug();
    el?.remove();
    el = null;
    seen = false;
  };
}

function stop(): void {
  cleanup?.();
  cleanup = null;
}

function sync(): void {
  if (finePointer.matches && !reducedMotion.matches) start();
  else stop();
}

sync();
finePointer.addEventListener('change', sync);
reducedMotion.addEventListener('change', sync);
