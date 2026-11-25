import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons.jsx';

function getProjectLinks(project) {
  return [
    { label: 'Code', url: project.githubUrl, icon: GithubIcon },
    { label: 'Live demo', url: project.liveUrl, icon: ExternalLink },
  ].filter(({ url }) => {
    try {
      return ['https:', 'http:'].includes(new URL(url).protocol);
    } catch {
      return false;
    }
  });
}

export default function ProjectLinks({ project, className = '' }) {
  const links = getProjectLinks(project);
  if (!links.length) return null;

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {links.map(({ label, url, icon: Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <Icon size={15} aria-hidden="true" /> {label}
          <span className="sr-only"> for {project.title} (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
