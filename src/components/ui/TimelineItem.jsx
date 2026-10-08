import TechBadge from './TechBadge.jsx';

export default function TimelineItem({ item, isLast }) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-bg border-2 border-accent" aria-hidden="true" />
      {!isLast && (
        <span className="absolute left-[4.5px] top-4 bottom-0 w-px bg-line" aria-hidden="true" />
      )}
      <div className="pb-10">
        <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
          {item.date}
        </span>
        <h3 className="font-display text-lg font-semibold text-ink mt-1">{item.role}</h3>
        <p className="text-sm text-ink-muted">{item.organization}</p>
        <p className="mt-3 text-sm text-ink-muted leading-relaxed">{item.description}</p>
        {item.achievements?.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        )}
        {item.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.technologies.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
