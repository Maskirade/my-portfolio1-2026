import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons.jsx';
import Panel from './Panel.jsx';
import TechBadge from './TechBadge.jsx';
import StatusDot from './StatusDot.jsx';

export default function ProjectCard({ project }) {
  const statusKey = project.status?.toLowerCase().includes('progress') ? 'progress' : 'active';

  return (
    <Panel className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="aspect-video w-full bg-bg-surface2 border-b border-line flex items-center justify-center overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">
            Preview image placeholder
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            {project.category}
          </span>
          <StatusDot status={statusKey} label={project.status} pulse={statusKey === 'progress'} />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
        <p className="text-sm text-ink-muted leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2 mt-auto border-t border-line">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
          >
            <GithubIcon size={15} /> Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
          >
            <ExternalLink size={15} aria-hidden="true" /> Live demo
          </a>
        </div>
      </div>
    </Panel>
  );
}
