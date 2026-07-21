/**
 * warm-cursor.ts — the standard view's in-house cursor effect (owner decision
 * 2026-07-21, superseding the Phase-8 wait; the 2026-07-20 rejection of
 * GSAP MagneticCursor stands on its merits — no deps, no blend-mode inversion,
 * native cursor always visible).
 *
 * A warm amber glow trails the pointer with a little velocity squash; over a
 * standard-view link/button it softens into a rounded "hug" around the control
 * (the same warm-outline language as the office hotspots) and the control leans
 * a few px toward the pointer, springing back on leave.
 *
 * Desktop only (hover + fine pointer), fully disabled under
 * prefers-reduced-motion, paused while the office overlay covers the page.
 * Pure rAF + transforms on one fixed element — no dependencies.
 */

const AMBER = '217, 164, 65';
const SIZE = 30; // free-glow diameter (px)
const LERP = 0.18;
const HUG_LERP = 0.3;
const HUG_PAD = 7; // px around the hugged control
const LEAN_FACTOR = 0.12;
const LEAN_MAX = 4; // px

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
let inertObserver: MutationObserver | null = null;
let cleanup: (() => void) | null = null;

const pos = { x: -100, y: -100 };
const target = { x: -100, y: -100 };
const prev = { x: -100, y: -100 };
const box: Box = { x: -100, y: -100, w: SIZE, h: SIZE };
let seen = false;
let paused = false;

function freeStyle(cursor: HTMLDivElement): void {
  cursor.style.background = `radial-gradient(circle, rgba(${AMBER}, 0.5), rgba(${AMBER}, 0) 70%)`;
  cursor.style.boxShadow = 'none';
  cursor.style.borderRadius = '50%';
}

function hugStyle(cursor: HTMLDivElement, of: HTMLElement): void {
  cursor.style.background = `rgba(${AMBER}, 0.16)`;
  cursor.style.boxShadow = `0 0 0 1px rgba(${AMBER}, 0.4), 0 3px 14px rgba(${AMBER}, 0.3)`;
  cursor.style.borderRadius = window.getComputedStyle(of).borderRadius;
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
  const stretch = Math.min(speed * 0.012, 0.3);
  const angle = speed > 0.5 ? Math.atan2(dy, dx) * (180 / Math.PI) : 0;
  box.x += (pos.x - SIZE / 2 - box.x) * 1;
  box.y += (pos.y - SIZE / 2 - box.y) * 1;
  box.w += (SIZE - box.w) * HUG_LERP;
  box.h += (SIZE - box.h) * HUG_LERP;
  el.style.width = `${box.w}px`;
  el.style.height = `${box.h}px`;
  el.style.transform =
    `translate(${pos.x - box.w / 2}px, ${pos.y - box.h / 2}px)` +
    (speed > 0.5 ? ` rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.6})` : '');
}

function releaseHug(): void {
  if (!hugged || !el) return;
  // Spring the control home with a slightly overshooting ease.
  hugged.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
  hugged.style.transform = '';
  const releasing = hugged;
  window.setTimeout(() => {
    if (releasing !== hugged) releasing.style.transition = '';
  }, 500);
  hugged = null;
  freeStyle(el);
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
  if (hugged) {
    // Magnetic lean: the control tips a few px toward the pointer.
    const r = hugged.getBoundingClientRect();
    const lx = Math.max(-LEAN_MAX, Math.min(LEAN_MAX, (e.clientX - (r.left + r.width / 2)) * LEAN_FACTOR));
    const ly = Math.max(-LEAN_MAX, Math.min(LEAN_MAX, (e.clientY - (r.top + r.height / 2)) * LEAN_FACTOR));
    hugged.style.transition = 'transform 0.15s ease-out';
    hugged.style.transform = `translate(${lx}px, ${ly}px)`;
  }
}

/** Static pages only: hug any control that is NOT inside the office overlay. */
function hugTarget(from: Element | null): HTMLElement | null {
  const t = from?.closest?.('a, button, [data-magnetic]') as HTMLElement | null;
  if (!t || t.closest('.office-overlay')) return null;
  return t;
}

function onPointerOver(e: PointerEvent): void {
  if (!el || paused) return;
  const t = hugTarget(e.target as Element | null);
  if (t === hugged) return;
  releaseHug();
  if (t) {
    hugged = t;
    hugStyle(el, t);
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
    if (el) el.style.opacity = paused ? '0' : el.style.opacity;
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
  freeStyle(el);
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
