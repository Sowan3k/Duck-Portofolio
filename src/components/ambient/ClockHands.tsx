import { useEffect, useState } from 'react';

/**
 * ClockHands — the wall clock shows the visitor's real local time (CLAUDE.md §1,
 * §4). Only the hands are drawn in SVG; the blank round face is painted in the
 * art. Hour/minute are set from the clock and refreshed while the office stays
 * open; the second hand sweeps via a pure-CSS animation (no per-second React
 * re-render) whose negative delay starts it at the current second.
 *
 * Reduced motion: the sweep is frozen — the hands still show the correct time,
 * they just don't move (transform-only, and no motion under the global reset).
 */
export default function ClockHands({ reduced }: { reduced: boolean }) {
  const [now, setNow] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const read = () => {
      const d = new Date();
      setNow({ h: d.getHours() % 12, m: d.getMinutes(), s: d.getSeconds() });
    };
    read();
    // Refresh the slow hands periodically so a long-open office stays accurate.
    const id = window.setInterval(read, 20000);
    return () => window.clearInterval(id);
  }, []);

  // Before hydration reads the clock, render nothing (avoids a wrong-time flash).
  if (!now) return null;

  const hourAngle = (now.h + now.m / 60) * 30;
  const minuteAngle = (now.m + now.s / 60) * 6;
  const secondAngle = now.s * 6;

  return (
    <svg
      className="ambient ambient-clock"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="50" y1="50" x2="50" y2="32"
        className="ambient-clock__hour"
        transform={`rotate(${hourAngle} 50 50)`}
      />
      <line
        x1="50" y1="50" x2="50" y2="24"
        className="ambient-clock__minute"
        transform={`rotate(${minuteAngle} 50 50)`}
      />
      {reduced ? (
        <line
          x1="50" y1="50" x2="50" y2="21"
          className="ambient-clock__second"
          transform={`rotate(${secondAngle} 50 50)`}
        />
      ) : (
        <line
          x1="50" y1="50" x2="50" y2="21"
          className="ambient-clock__second ambient-clock__second--sweep"
          style={{ animationDelay: `-${now.s}s` }}
        />
      )}
      <circle cx="50" cy="50" r="2.4" className="ambient-clock__hub" />
    </svg>
  );
}
