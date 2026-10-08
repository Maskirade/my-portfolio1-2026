import { useMemo, useState } from 'react';
import Reveal from '../components/effects/Reveal.jsx';
import ProjectCard from '../components/ui/ProjectCard.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category))],
    []
  );
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-24">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            Projects
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight mt-3">
            All work
          </h1>
          <p className="mt-4 text-ink-muted leading-relaxed">
            A full list of what I've built across web, mobile, and AI integration.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-sm border font-mono text-xs uppercase tracking-widest transition-colors ${
                active === cat
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-line text-ink-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <Reveal key={project.id} delay={i * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
