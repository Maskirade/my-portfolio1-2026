import { Download, ExternalLink } from 'lucide-react';
import Reveal from '../components/effects/Reveal.jsx';
import Panel from '../components/ui/Panel.jsx';
import TechBadge from '../components/ui/TechBadge.jsx';
import { profile } from '../data/profile.js';
import { experience } from '../data/experience.js';
import { techStack } from '../data/techStack.js';

export default function Resume() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-24">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            Resume
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight mt-3">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-ink-muted uppercase tracking-widest">
            {profile.role}
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">{profile.bio}</p>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-accent text-bg font-display text-sm font-semibold uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity"
          >
            <Download size={16} /> Download resume
          </a>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-6">
        <Reveal>
          <Panel className="p-6 rounded-sm h-full">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Experience summary
            </span>
            <ul className="mt-4 space-y-5">
              {experience.map((item) => (
                <li key={item.id}>
                  <p className="font-display text-sm font-semibold text-ink">{item.role}</p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {item.organization} · {item.date}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal delay={80}>
          <Panel className="p-6 rounded-sm h-full">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Core skills
            </span>
            <div className="mt-4 space-y-4">
              {techStack.map((group) => (
                <div key={group.category}>
                  <p className="font-mono text-[11px] text-ink-faint uppercase tracking-widest mb-2">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <TechBadge key={item}>{item}</TechBadge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="mt-8">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
          >
            View full profile on LinkedIn <ExternalLink size={14} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
