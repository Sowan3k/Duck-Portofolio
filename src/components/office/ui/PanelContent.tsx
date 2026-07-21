import { useState } from 'react';
import type { SceneContentId } from '../../../lib/scene';
import { profile, PROJECT_MEDIA, type Project } from '../../../content/profile';
import { downloadVCard } from '../vcard';

/**
 * PanelContent — the real portfolio content that renders onto each physical
 * prop, from profile.ts (never duplicated, law 4). Compact versions of the
 * standard-view sections, styled for the props (ink on the blank paper).
 */
interface Props {
  contentId: SceneContentId;
}

function ProjectImage({ stem, alt }: { stem: string; alt: string }) {
  const { widths, publicDir } = PROJECT_MEDIA;
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={widths.map((w) => `${publicDir}/${stem}-${w}w.avif ${w}w`).join(', ')}
        sizes="(max-width: 900px) 90vw, 380px"
      />
      <source
        type="image/webp"
        srcSet={widths.map((w) => `${publicDir}/${stem}-${w}w.webp ${w}w`).join(', ')}
        sizes="(max-width: 900px) 90vw, 380px"
      />
      <img src={`${publicDir}/${stem}-720w.webp`} alt={alt} loading="lazy" className="pc-img" />
    </picture>
  );
}

function ProjectSpread({ project }: { project: Project }) {
  return (
    <div className="pc-project">
      <div className="pc-project__head">
        <h3>{project.name}</h3>
        <span className="chip">{project.status}</span>
      </div>
      <p className="pc-tagline">{project.tagline}</p>
      {project.media.length > 0 && (
        <ProjectImage stem={project.media[0]!.stem} alt={project.media[0]!.alt} />
      )}
      {project.confidential && project.note && (
        <p className="pc-note">🔒 {project.note}</p>
      )}
      <p>{project.summary}</p>
      <ul className="pc-bullets">
        {project.bullets.slice(0, 4).map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <ul className="pc-chips">
        {project.stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
      {project.links.length > 0 && (
        <div className="pc-links">
          {project.links.map((l) => (
            <a key={l.href} className="btn btn--ghost" href={l.href} target="_blank" rel="noopener">
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Storybook() {
  const [page, setPage] = useState(0);
  const projects = profile.projects;
  const project = projects[page]!;
  return (
    <div className="pc-storybook">
      <ProjectSpread project={project} />
      <nav className="pc-pager" aria-label="Project pages">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          ← Prev
        </button>
        <span className="pc-pager__count" aria-live="polite">
          {page + 1} / {projects.length}
        </span>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setPage((p) => Math.min(projects.length - 1, p + 1))}
          disabled={page === projects.length - 1}
        >
          Next →
        </button>
      </nav>
      {profile.additionalProjects.length > 0 && (
        <p className="pc-more">
          More on GitHub:{' '}
          {profile.additionalProjects.map((p) => (
            <a key={p.href} className="prose-link" href={p.href} target="_blank" rel="noopener">
              {p.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </p>
      )}
    </div>
  );
}

function About() {
  return (
    <div className="pc-about">
      <p className="pc-lead">
        {profile.name} — {profile.headline}
      </p>
      <p>{profile.summary}</p>
      <p className="pc-muted">Outside the terminal: {profile.interests}</p>
      <ul className="pc-plain">
        {profile.leadership.map((l) => (
          <li key={l.text}>
            {l.text}
            {l.period ? ` — ${l.period}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Experience() {
  return (
    <div className="pc-exp">
      {profile.experience.map((job) => (
        <article key={job.organization} className="pc-exp__item">
          <h3>
            {job.role}
            {job.employmentType === 'part-time' && <span className="chip"> Part-time</span>}
          </h3>
          <p className="pc-muted">
            {job.organization} · {job.location} · {job.period}
          </p>
          {job.context && <p className="pc-context">{job.context}</p>}
          <ul className="pc-bullets">
            {job.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <div className="pc-skills">
      {profile.skills.map((tier) => (
        <div key={tier.label}>
          <h3>{tier.label}</h3>
          <ul className="pc-chips">
            {tier.items.map((i) => (
              <li key={i} className="chip">
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Awards() {
  return (
    <div className="pc-awards">
      {profile.awards.map((a) => (
        <div key={a.id}>
          <p className="pc-lead">
            🏅 {a.title} — {a.event}
          </p>
          <p>{a.detail}</p>
          <ul className="pc-chips">
            {a.facts.map((f) => (
              <li key={f} className="chip">
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Education() {
  return (
    <div className="pc-edu">
      {profile.education.map((e) => (
        <div key={e.institution}>
          <h3>{e.degree}</h3>
          <p className="pc-muted">
            {e.institution} · {e.location} · {e.period}
          </p>
          <p>{e.status}</p>
          {e.finalYearProject && (
            <p className="pc-muted">
              Final Year Project: {e.finalYearProject}
              {e.supervisor ? ` · ${e.supervisor}` : ''}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Roadmap() {
  const { building, learning } = profile.roadmap;
  return (
    <div className="pc-roadmap">
      <p className="pc-muted">Currently building</p>
      <p className="pc-lead">
        {building.href ? (
          <a className="prose-link" href={building.href} target="_blank" rel="noopener">
            {building.text}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          building.text
        )}
      </p>
      <p className="pc-muted">Learning roadmap</p>
      <ul className="pc-chips">
        {learning.map((item) => (
          <li key={item.text} className={`chip${item.done ? ' pc-done' : ''}`}>
            {item.text}
            {item.done && item.updated ? ` (${item.updated})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contact() {
  return (
    <div className="pc-contact">
      <ul className="pc-plain">
        {profile.contact.map((c) => (
          <li key={c.href}>
            <a className="prose-link" href={c.href} rel="me noopener">
              {c.label}
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn--primary" onClick={downloadVCard}>
        Take a card (.vcf)
      </button>
    </div>
  );
}

function Resume() {
  return (
    <div className="pc-resume">
      <p className="pc-lead">{profile.name}</p>
      <p className="pc-muted">{profile.headline}</p>
      <p>{profile.summary}</p>
      {/* The real download — never gated (law 2). */}
      <a className="btn btn--primary" href="/resume.pdf" download>
        Download résumé (PDF)
      </a>
    </div>
  );
}

export default function PanelContent({ contentId }: Props) {
  switch (contentId) {
    case 'about':
      return <About />;
    case 'projects':
      return <Storybook />;
    case 'experience':
      return <Experience />;
    case 'skills':
      return <Skills />;
    case 'awards':
      return <Awards />;
    case 'education':
      return <Education />;
    case 'roadmap':
      return <Roadmap />;
    case 'contact':
      return <Contact />;
    case 'resume':
      return <Resume />;
    default:
      return null;
  }
}
