/**
 * profile.ts - ALL of Sowan's facts, typed, in one file (CLAUDE.md §6, §11).
 *
 * This is the single source of truth for every factual claim on the site.
 * Dialogue references it; components render it; nothing duplicates it. LAW 4:
 * the duck never lies - no award, date, metric, employer, or capability may
 * appear anywhere unless it traces to a field here, and every field here traces
 * to the master CV (visuals/07-project-media/resume-source/Sowan_Master_CV.md).
 *
 * Truthfulness flags carried verbatim from the CV are marked "CV flag:" in
 * comments so a future editor cannot soften them by accident:
 *   - BahasaBot is a "Live demo", never "in production"; no payments/paying users.
 *   - USM Evently is open source, NOT deployed; its payments are simulated.
 *   - Virtual Zara is confidential (ECTrons) - described only, never shown.
 *     Ownership language is letter-backed; continued use is Sowan's own claim.
 *   - ECTrons' official title is firmware/embedded but the work was AI
 *     automation; the title is never changed and never left unexplained.
 *   - No ECTrons performance metrics exist - scope only, never invented numbers.
 */

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export type ContactKind = 'email' | 'github' | 'linkedin';

export interface ContactLink {
  kind: ContactKind;
  /** Human-readable display text (e.g. "github.com/Sowan3k"). */
  label: string;
  href: string;
  /** True where the value is expected to change and gets swapped in place. */
  swappable?: boolean;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  location: string;
  period: string;
  /** Completion clarity - never a bare date range that reads as unfinished. */
  status: string;
  finalYearProject?: string;
  supervisor?: string;
  examiner?: string;
}

export interface ExperienceEntry {
  /** Official title - never changed (a background check sees the letter). */
  role: string;
  organization: string;
  location: string;
  period: string;
  /** Printed directly under the title to explain the real scope of the work. */
  context?: string;
  employmentType?: 'full-time' | 'part-time';
  bullets: string[];
}

/** All project masters are 1440×720 (2:1); runtime variants share the stem. */
export interface ProjectMedia {
  /** Shared runtime filename stem, e.g. "bahasabot-overview--v01". */
  stem: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'demo' | 'repo';
}

export interface Award {
  id: string;
  title: string;
  event: string;
  year: number;
  /** One-line description safe to print anywhere. */
  detail: string;
  /** Discrete real numbers on file - never rounded, never invented. */
  facts: string[];
  /** id of the project this award belongs to, if any. */
  projectId?: string;
}

export interface Project {
  id: string;
  name: string;
  /** Short keyword line HR screens first (CV: lead with the keyword). */
  tagline: string;
  /** Truthful status shown as context: "Live demo", "Open source (not deployed)". */
  status: string;
  summary: string;
  bullets: string[];
  stack: string[];
  links: ProjectLink[];
  media: ProjectMedia[];
  awardId?: string;
  /** Confidential work: described only, no media, no repo (Virtual Zara). */
  confidential?: boolean;
  /** Extra context printed with the entry (e.g. the confidentiality note). */
  note?: string;
}

export interface SkillTier {
  label: string;
  items: string[];
}

export interface RoadmapItem {
  text: string;
  /** Living-whiteboard flag: done items render struck-through with `updated`. */
  done: boolean;
  updated?: string;
}

export interface Roadmap {
  /** The one thing currently being built (whiteboard headline). */
  building: { text: string; href?: string };
  /** Learning roadmap - skills-gap items, none on any CV until real. */
  learning: RoadmapItem[];
}

export interface LeadershipEntry {
  text: string;
  period?: string;
}

export interface Profile {
  /** Canonical full name (CV authority). */
  name: string;
  /** What he goes by. */
  knownAs: string;
  /** General-purpose title line (CV headline rule). */
  headline: string;
  /** Graduation clarity line for the hero. */
  status: string;
  /** Where he actually is - updated the day it changes (CV rule). */
  location: string;
  summary: string;
  contact: ContactLink[];
  education: EducationEntry[];
  experience: ExperienceEntry[];
  /** The four featured projects, in storybook order. */
  projects: Project[];
  /** Secondary work surfaced via the GitHub profile, not the storybook. */
  additionalProjects: { name: string; description: string; href: string }[];
  awards: Award[];
  skills: SkillTier[];
  leadership: LeadershipEntry[];
  interests: string;
  roadmap: Roadmap;
}

/**
 * Flavor text (newspaper, sticky notes) is owner-approved content, not
 * automatic. It ships populated but flagged so Phase 9 owner review is
 * unmistakable - this is the ONLY content allowed to carry a pending marker
 * past Phase 1 (phases.md Phase 1 exit criteria).
 */
export type ReviewStatus = 'pending-owner-review' | 'approved';

/* ------------------------------------------------------------------ *
 * Runtime media constants (Phase 2 copies these into publicDir)
 * ------------------------------------------------------------------ */

export const PROJECT_MEDIA = {
  widths: [360, 720, 1440] as const,
  formats: ['avif', 'webp'] as const,
  /** Public path the runtime variants are served from. */
  publicDir: '/assets/projects',
  /** Repo source the byte-identical copy comes from (Phase 2 script). */
  sourceDir: 'visuals/07-project-media/approved/runtime',
} as const;

/* ------------------------------------------------------------------ *
 * Awards
 * ------------------------------------------------------------------ */

const pixelSilver: Award = {
  id: 'pixel-silver',
  title: 'Silver Award',
  event: 'PIXEL 2026 (USM final-year project showcase)',
  year: 2026,
  detail:
    'Silver among 249 competing final-year students at PIXEL 2026, for BahasaBot.',
  facts: ['249 competing students', 'evaluated by 30 people during assessment'],
  projectId: 'bahasabot',
};

/* ------------------------------------------------------------------ *
 * The profile
 * ------------------------------------------------------------------ */

export const profile: Profile = {
  name: 'Noor Mohammad Sowan',
  knownAs: 'Sowan',
  headline: 'Software Engineer - AI & Full-Stack Systems',
  // CV: make completion status unmistakable; never a bare date range.
  status: 'Final exams completed July 2026; graduating August 2026.',
  location: 'Penang, Malaysia',
  summary:
    'Graduate software engineer specializing in AI-enabled workflow automation and full-stack applications. Independently built BahasaBot, a RAG-based language learning platform awarded Silver among 249 competing final-year students at PIXEL 2026, and Virtual Zara, an internal AI automation agent in use at ECTrons. Experienced in retrieval pipelines, async backends, vector databases, authentication, and Docker deployment.',

  // CV decision: publish email, GitHub, LinkedIn only - no phone number.
  contact: [
    {
      kind: 'email',
      label: 'nurmohammadsowan119@gmail.com',
      href: 'mailto:nurmohammadsowan119@gmail.com',
    },
    {
      kind: 'github',
      label: 'github.com/Sowan3k',
      href: 'https://github.com/Sowan3k',
    },
    {
      kind: 'linkedin',
      label: 'linkedin.com/in/noor-mohammad-sowan-b3742b37b',
      // CV follow-up: a custom LinkedIn URL replaces this in place when set.
      href: 'https://www.linkedin.com/in/noor-mohammad-sowan-b3742b37b',
      swappable: true,
    },
  ],

  education: [
    {
      institution: 'Universiti Sains Malaysia (USM)',
      degree: 'Bachelor of Software Engineering',
      location: 'Engineering Campus, Nibong Tebal, Penang',
      period: '2020 – 2026',
      status: 'Final exams completed July 2026; graduating August 2026.',
      finalYearProject: 'BahasaBot',
      supervisor: 'Assoc. Prof. Dr. Tan Tien Ping',
      examiner: 'Dr. Nur Hana Samsudin',
      // CV: do NOT repeat the PIXEL award here - it lives in the summary and
      // the BahasaBot header. Twice is the maximum.
    },
  ],

  experience: [
    {
      role: 'Firmware / Embedded Software Development Engineer (Trainee)',
      organization: 'ECTrons Sdn. Bhd.',
      location: 'Bayan Lepas, Penang',
      period: '24 March 2025 – 5 September 2025 (24 weeks)',
      // CV title-mismatch rule (MANDATORY, verbatim - the letter names ESS):
      context:
        'Assigned to internal AI automation and workflow projects, Engineering Support and Services (ESS) department.',
      bullets: [
        // Ownership language ("designed and implemented", "designed and
        // documented") is used by the letter only for Virtual Zara and the
        // AgriSmart dashboard; everything else is exposure. Lead with those.
        'Designed and implemented Virtual Zara, an internal AI automation agent on modular n8n workflows for automated document generation and resume-screening support; it remained in use at the company after the internship ended.',
        'Integrated five external systems (GitLab, Google Workspace, Microsoft Graph, Telegram Bot, OpenAI) across three business domains: HR, finance, and project management.',
        'Designed and documented the AgriSmart dashboard in Figma, covering IoT data visualization, geo-fencing, resource management, and reporting modules.',
        'Delivered presentations on LLMs, automation workflows, and dashboards at weekly bootcamps and client demos.',
      ],
    },
    {
      role: 'Administrative Assistant',
      organization: 'Museum Hotel, George Town',
      location: 'George Town, Penang',
      period: 'June 2022 – Present',
      // CV: keep the "part-time" label; removing it invites a full-time reading.
      employmentType: 'part-time',
      bullets: [
        'Managed front-desk operations, maintained guest records, and supported daily administrative processes alongside full-time study.',
      ],
    },
  ],

  projects: [
    {
      id: 'bahasabot',
      name: 'BahasaBot',
      tagline: 'RAG language-learning tutor (Final Year Project)',
      status: 'Live demo', // CV flag: "Live demo", never "in production".
      summary:
        'A full-stack AI language-learning platform: a retrieval-augmented tutor that generates courses, adapts quizzes to a learner, and tracks CEFR proficiency. Independently designed and developed.',
      bullets: [
        'Independently designed and developed a RAG chatbot tutor with LangChain over a pgvector store, streaming responses over Server-Sent Events; evaluated by 30 users during assessment.',
        'Designed a dynamic course generator that turns any topic into modules, classes, and quizzes with concurrent Google Gemini API calls under a rate limit.',
        'Built an adaptive quiz engine that personalizes questions from tracked weak points and recalculates CEFR proficiency (A1–B2) from recent attempts.',
        'Implemented authentication with bcrypt, JWT access and refresh tokens, and Google OAuth, with silent refresh before expiry.',
        'Added Redis caching, rate limiting, input sanitization, and an LLM-based prompt-injection classifier.',
        'Deployed a split architecture: Next.js frontend on Vercel, FastAPI backend on Render, serverless PostgreSQL on Neon.',
      ],
      stack: [
        'LangChain',
        'RAG',
        'pgvector',
        'FastAPI',
        'Next.js',
        'PostgreSQL',
        'Google Gemini API',
        'Redis',
        'SQLAlchemy',
        'Alembic',
        'JWT / OAuth',
        'SSE',
      ],
      links: [
        // CV flag: canonical demo is bahasa-bot.vercel.app - the old
        // bahasabot-main3 link is stale and must never be used.
        { label: 'Live demo', href: 'https://bahasa-bot.vercel.app', kind: 'demo' },
        { label: 'GitHub', href: 'https://github.com/Sowan3k/BahasaBot', kind: 'repo' },
      ],
      media: [
        {
          stem: 'bahasabot-overview--v01',
          alt: 'BahasaBot landing page, course-generator preview, and sign-in screen.',
          width: 1440,
          height: 720,
        },
        {
          stem: 'bahasabot-course-builder--v01',
          alt: 'BahasaBot course builder generating modules and quizzes from a topic.',
          width: 1440,
          height: 720,
        },
      ],
      awardId: 'pixel-silver',
    },
    {
      id: 'virtual-zara',
      name: 'Virtual Zara',
      tagline: 'Internal AI automation agent (ECTrons)',
      status: 'In use at ECTrons after the internship',
      confidential: true,
      // CV + owner decision: confidential internship work. The master CV
      // distinguishes letter-backed scope from Sowan's continued-use claim.
      // No screenshots, UI recreation, or invented interface, ever.
      note: 'Confidential internship work at ECTrons - described only, with no screenshots or interface recreation.',
      summary:
        'An internal AI automation agent built on modular n8n workflows for automated document generation and resume-screening support, with multimodal input across text, voice, and document parsing. It remained in use at the company after the internship ended.',
      bullets: [
        'Designed and implemented Virtual Zara on modular n8n workflows for automated PDF and document generation and resume-screening support.',
        'Enabled multimodal input across text, voice, and document parsing.',
        'Integrated five external systems (GitLab, Google Workspace, Microsoft Graph, Telegram Bot, OpenAI) across three business domains: HR, finance, and project management.',
      ],
      stack: [
        'n8n',
        'OpenAI API',
        'GitLab API',
        'Google Workspace',
        'Microsoft Graph',
        'Telegram Bot API',
      ],
      links: [], // Confidential - no public repo or demo.
      media: [], // Owner decision: Virtual Zara gets NO images.
    },
    {
      id: 'my-bibi',
      name: 'My Bibi',
      tagline: 'Self-hosted private chat & journal app',
      status: 'Open source (MIT)',
      summary:
        'A full-stack self-hosted chat and journal application that runs entirely on the user’s own hardware - no third-party API ever touches user content. Open source under MIT.',
      bullets: [
        'Built a self-hosted chat and journal app that runs entirely on the user’s own hardware with a single `docker compose up` - no third-party API ever touches user content.',
        'Integrated local Ollama models (Llama 3.2 3B) so no data leaves the host, degrading gracefully when the model is offline.',
        // CV flag: "encrypted at rest, key derived from password" - NOT "end-to-end".
        'Implemented per-user journal encryption at rest with a key derived from the user’s password, so the server operator cannot read another user’s entries.',
        'Built full-text search over messages and memories with SQLite FTS5 against a human-readable markdown vault.',
        'Shipped chat with presence, delivery and read receipts, reactions, and link previews, plus time capsules, scheduled letters, a shared dreams board, and a locally generated monthly PDF scrapbook.',
      ],
      stack: [
        'Next.js 14',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'FastAPI (Python 3.11)',
        'SQLite FTS5',
        'Ollama',
        'bcrypt / JWT',
        'Docker Compose',
        'PWA',
      ],
      links: [
        // CV follow-up: repo rename pending; GitHub redirects the old URL.
        { label: 'GitHub', href: 'https://github.com/Sowan3k/My-Bibi-App', kind: 'repo' },
      ],
      media: [
        {
          stem: 'my-bibi-chat--v01',
          alt: 'My Bibi desktop chat interface in dark mode.',
          width: 1440,
          height: 720,
        },
        {
          stem: 'my-bibi-mobile-flow--v01',
          alt: 'Three My Bibi mobile screens showing the app flow.',
          width: 1440,
          height: 720,
        },
      ],
    },
    {
      id: 'usm-evently',
      name: 'USM Evently',
      tagline: 'Full-stack campus events platform',
      // CV flag: open source, NOT deployed live. Never claim "live"/"deployed".
      status: 'Open source (not deployed)',
      summary:
        'A full-stack campus events platform with role-based access, an organizer moderation queue, QR check-in, and automatic tracking of MyCSD (university co-curricular development points). Payments are simulated.',
      bullets: [
        // CV: gloss MyCSD; international recruiters don’t know the acronym.
        'Built a campus events platform: public event browsing and search, RSVP with capacity limits, simulated ticketed payments, and automatic MyCSD (university co-curricular points) tracking.',
        'Implemented role-based access control across student, organizer, and admin roles, with server-side render auth guards and API guards blocking unauthorized routes.',
        'Built an organizer self-service flow where submitted events enter a moderation queue and go live only after admin approval.',
        'Designed a QR-code check-in system that marks attendance and awards MyCSD points automatically on scan.',
        'Built an admin dashboard with event CRUD, approval queues, user and email moderation, and a Recharts analytics view.',
      ],
      stack: [
        'Next.js 15',
        'TypeScript',
        'PostgreSQL',
        'Prisma',
        'NextAuth',
        'Zod',
        'Tailwind CSS',
        'shadcn/ui',
        'Framer Motion',
        'Recharts',
        'Vercel Blob',
      ],
      links: [
        { label: 'GitHub', href: 'https://github.com/Sowan3k/usm_evently', kind: 'repo' },
      ],
      media: [
        {
          stem: 'usm-evently-overview--v01',
          alt: 'USM Evently home page hero inviting students to discover campus events.',
          width: 1440,
          height: 720,
        },
        {
          stem: 'usm-evently-analytics--v01',
          alt: 'USM Evently admin analytics dashboard with registration charts.',
          width: 1440,
          height: 720,
        },
      ],
    },
  ],

  // Owner decision: Grab stays off the storybook and lives as a GitHub link.
  additionalProjects: [
    {
      name: 'Grab Real-Time Demo',
      description:
        'A real-time operations dashboard (CSE443 coursework) simulating driver-fatigue detection and dynamic surge pricing over WebSocket, with inline end-to-end latency measurement.',
      href: 'https://github.com/Sowan3k/grab-realtime-demo',
    },
  ],

  awards: [pixelSilver],

  // CV: print in two tiers. C++, CI/CD, pytest, and Jest are deliberately
  // absent - not yet true; the learning items live in the roadmap below.
  skills: [
    {
      label: 'Primary',
      items: [
        'Python',
        'FastAPI',
        'PostgreSQL',
        'pgvector',
        'LangChain',
        'RAG',
        'LLM integration (Google Gemini API, OpenAI API)',
        'SQL',
        'JWT & OAuth authentication',
        'Docker',
        'REST APIs',
        'Git',
      ],
    },
    {
      label: 'Working knowledge',
      items: [
        'TypeScript',
        'JavaScript',
        'Next.js',
        'React',
        'Tailwind CSS',
        'shadcn/ui',
        'Prisma',
        'Zod',
        'NextAuth',
        'RBAC',
        'Redis',
        'SQLite',
        'SQLAlchemy',
        'Alembic',
        'WebSocket',
        'SSE streaming',
        'embeddings',
        'local LLMs (Ollama)',
        'n8n workflow automation',
        'REST integrations (Google Workspace, Microsoft Graph, GitLab, Telegram)',
        'API testing (Postman)',
        'Linux CLI',
        'Vercel',
        'Render',
        'GitLab',
        'i18n (EN/BM)',
        'PWA',
      ],
    },
  ],

  leadership: [
    {
      text: 'Director of Content and Public Relations, USM International Club.',
      period: 'April 2024 – April 2025',
    },
    { text: 'Represented Bangladesh at iFUTURE 2024.' },
  ],

  interests:
    'Photography (131k+ views, 541 downloads on Pexels), geopolitics, psychology, technology.',

  roadmap: {
    building: {
      text: 'Building Wayfinder - an AI codebase mentor',
      href: 'https://github.com/Sowan3k/Wayfinder-',
    },
    // Skills-gap learning roadmap (CV): none is a CV skill until real, so each
    // starts done: false. Flip a flag when it becomes true; it renders
    // struck-through with an `updated` note (living whiteboard).
    learning: [
      { text: 'LangGraph', done: false },
      { text: 'CrewAI', done: false },
      { text: 'MCP', done: false },
      { text: 'AWS', done: false },
      { text: 'CI/CD', done: false },
      { text: 'pytest', done: false },
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Flavor text - owner-approved content, flagged pending review (Phase 9).
 * Drawn from real facts; the owner picks/edits final wording before ship.
 * ------------------------------------------------------------------ */

export const newspaper: {
  reviewStatus: ReviewStatus;
  masthead: string;
  subhead: string;
  headlines: string[];
} = {
  reviewStatus: 'pending-owner-review',
  masthead: 'THE DAILY QUACK',
  subhead: 'All the news that fits, from one small desk',
  headlines: [
    'BahasaBot Takes Silver Among 249 at PIXEL 2026',
    'Virtual Zara Reportedly Still On Duty at ECTrons',
    'My Bibi Runs Entirely On Your Own Hardware, Says Local Engineer',
    'USM Evently: Real Features, Simulated Payments',
    'Graduate Engineer Spotted Building "Wayfinder", an AI Codebase Mentor',
    'Thirty People, One Language Tutor: BahasaBot Under Review',
    "Photographer's Work Passes 131k Views on Pexels",
    'Final Exams: Completed. Graduation: August.',
  ],
};

export const stickyNotes: {
  reviewStatus: ReviewStatus;
  notes: string[];
} = {
  reviewStatus: 'pending-owner-review',
  notes: [
    'deploy Evently demo → Vercel',
    'rename the My Bibi repo (GitHub redirects)',
    'pin BahasaBot · Evently · My Bibi',
    'set a custom LinkedIn URL',
    'keep the whiteboard honest',
    'more coffee ☕',
  ],
};
