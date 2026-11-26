import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Panel from './Panel.jsx';
import TechBadge from './TechBadge.jsx';
import StatusDot from './StatusDot.jsx';
import ProjectLinks from './ProjectLinks.jsx';

export default function ProjectCard({ project, compact = false }) {
  const statusKey = project.status?.toLowerCase().includes('progress') ? 'progress' : 'active';
  const detailUrl = `/projects/${project.slug}`;

  return (
    <Panel as="article" className="group h-full flex flex-col overflow-hidden transition-colors duration-300 hover:border-accent/40">
      <Link
        to={detailUrl}
        aria-label={`View ${project.title} project details`}
        className="aspect-video w-full bg-bg-surface2 border-b border-line flex items-center justify-center overflow-hidden focus-visible:outline-offset-[-3px]"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
            loading="lazy"
          />
        ) : (
          <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">
            Preview image placeholder
          </span>
        )}
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            {project.category}
          </span>
          <StatusDot status={statusKey} label={project.status} pulse={statusKey === 'progress'} />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink">
          <Link to={detailUrl} className="rounded-sm transition-colors hover:text-accent">{project.title}</Link>
        </h3>
        <p className={`text-sm text-ink-muted leading-relaxed flex-1 ${compact ? 'line-clamp-3' : ''}`}>{project.description}</p>
        {!compact && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-4 pt-4 mt-auto border-t border-line">
          <Link
            to={detailUrl}
            className="inline-flex w-fit items-center gap-2 rounded-sm text-sm font-medium text-accent hover:underline"
          >
            View project <span className="sr-only">{project.title}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {!compact && <ProjectLinks project={project} />}
        </div>
      </div>
    </Panel>
  );
}
