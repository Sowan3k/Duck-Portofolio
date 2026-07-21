/**
 * dialogue.ts — the duck's voice, typed as data (CLAUDE.md §5, bible §6/§10).
 *
 * Voice: confident, calm, funny, slightly sarcastic, welcoming — never arrogant,
 * never a chatbot. Every line ≤ 60 characters, ≤ 3 lines per set before content
 * opens (law 2). Facts live in profile.ts; these lines are personality only, so
 * they carry no factual claim to keep out of sync (law 4). OWNER reviews all
 * lines before Phase 9.
 */
import type { SceneContentId } from './scene';

export type TimeOfDay = 'night' | 'morning' | 'day' | 'evening';

/** Local-hour → part of day, for the time-aware duck (2026-07-20 decision). */
export function timeOfDay(hour: number): TimeOfDay {
  if (hour < 5) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'day';
  return 'evening';
}

/** A set of ≤3 lines shown before content opens. */
export type LineSet = string[];

export interface ObjectDialogue {
  /** First-visit line sets (one is chosen per interaction). */
  first: LineSet[];
  /** Repeat-visit alternates — the duck remembers you (§5 memory). */
  repeat: LineSet[];
}

/**
 * The origin story (bible §3), played once per visitor, skippable, and ending by
 * naming the key objects so the visitor knows where to click.
 */
export const originIntro: LineSet = [
  "Hi! I'm Swan.",
  '…well, actually, I’m Sowan.',
  'People kept calling me Swan. I embraced it.',
  'Welcome to my office — have a look around.',
  'The computer’s my projects. The folder’s my CV.',
  'Click anything, and I’ll explain.',
];

/** A one-time greeting flavored by the visitor's local time. */
export const greetingByTime: Record<TimeOfDay, LineSet> = {
  night: ['…mm? Oh — a visitor.', 'It’s late. Mind the yawning.'],
  morning: ['Morning. Coffee’s still hot.', 'What can I show you?'],
  day: ['Afternoon — good timing.', 'Have a look around.'],
  evening: ['Evening. Quiet hour at the office.', 'Take your time.'],
};

/** The three easter eggs — bible §16, and no more (non-goal: no new eggs). */
export const easterEggs = {
  hire: 'I’ve been waiting for that command.',
  spam: 'Easy… one question at a time.',
  coffee: 'Achievement unlocked: Caffeine Overflow ☕',
} as const;

export const objectDialogue: Record<SceneContentId, ObjectDialogue> = {
  about: {
    first: [['Oh — hello.', 'Curious who’s behind the desk?', 'Pull up a chair.']],
    repeat: [['Back to read about me?', 'I’m flattered.']],
  },
  projects: {
    first: [['Projects, huh?', 'Checking if I know what I’m doing?', 'Fair enough — let me show you.']],
    repeat: [['You’ve already seen my projects…', 'But sure, look again.']],
  },
  experience: {
    first: [['Let’s dig through the paperwork.', 'More interesting than it sounds.']],
    repeat: [['Back in the files?', 'Help yourself.']],
  },
  skills: {
    first: [['This shelf is basically my toolbox.', 'Every spine is something I use.']],
    repeat: [['The toolbox hasn’t changed.', 'Still sharp, though.']],
  },
  awards: {
    first: [['Still chasing gold.', 'But silver looks good on the shelf.']],
    repeat: [['Yes, it’s just the one.', 'For now.']],
  },
  education: {
    first: [['Where it officially started.', 'Four years and a lot of coffee.']],
    repeat: [['You already read the certificate.', 'It hasn’t expired.']],
  },
  roadmap: {
    first: [['The whiteboard never lies.', 'Here’s what I’m building next.']],
    repeat: [['Same plan, still in progress.', 'Rome wasn’t debugged in a day.']],
  },
  contact: {
    first: [['If we’d build something good together…', '…here’s how to reach me.']],
    repeat: [['Still deciding whether to call?', 'No pressure.']],
  },
  // Résumé downloads at t=0 with no dialogue gate (law 2); this is only a tiny
  // acknowledging toast, never a gate.
  resume: {
    first: [['Freshly updated.']],
    repeat: [['Freshly updated.']],
  },
};

/**
 * Pick a line set for an object. Deterministic (indexed by visit count, no RNG)
 * so server/client stay consistent and repeat visits vary.
 */
export function pickLines(
  contentId: SceneContentId,
  opts: { visited: boolean; visitCount: number }
): LineSet {
  const entry = objectDialogue[contentId];
  const pool = opts.visited && entry.repeat.length > 0 ? entry.repeat : entry.first;
  const set = pool[opts.visitCount % pool.length] ?? pool[0] ?? [];
  return set;
}
