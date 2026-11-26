import HomeSection from '../ui/HomeSection.jsx';
import { experience } from '../../data/experience.js';

export default function Experience() {
  // The shared timeline runs from earliest to current; preview the latest entry.
  const latest = experience.at(-1);
  return (
    <HomeSection id="experience" index="06" label="Timeline" title="Experience" to="/experience" linkLabel="Full timeline">
      {latest && (
        <article className="max-w-2xl border-l-2 border-accent pl-5">
          <p className="font-mono text-xs text-accent">{latest.date}</p>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink">{latest.role}</h3>
          <p className="mt-1 text-sm text-ink-muted">{latest.organization}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted line-clamp-3">{latest.description}</p>
        </article>
      )}
    </HomeSection>
  );
}
