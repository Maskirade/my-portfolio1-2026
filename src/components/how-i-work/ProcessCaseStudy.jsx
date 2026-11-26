import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Panel from '../ui/Panel.jsx';
import TechBadge from '../ui/TechBadge.jsx';
import { processCaseStudy } from '../../data/howIWork.js';
import { projects } from '../../data/projects.js';

export default function ProcessCaseStudy() {
  const project = projects.find((item) => item.slug === processCaseStudy.projectSlug);
  if (!project) return null;

  return (
    <section aria-labelledby="case-study-title">
      <p className="font-mono text-[11px] tracking-widest text-accent">PROCESS IN ACTION</p>
      <h2 id="case-study-title" className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">A Real Example</h2>
      <Panel className="mt-6 overflow-hidden rounded-sm">
        <div className="grid md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] 2xl:grid-cols-1">
          {project.image && (
            <figure className="flex min-w-0 flex-col justify-center border-b border-line bg-bg-surface2 p-5 md:border-b-0 md:border-r 2xl:border-b 2xl:border-r-0">
              <img src={project.image} alt={`${project.title} application interface`} width={1254} height={1254} loading="lazy" decoding="async" className="h-56 w-full object-contain sm:h-64" />
              <figcaption className="mt-3 text-center text-xs text-ink-muted">{project.title} interface preview</figcaption>
            </figure>
          )}
          <div className="min-w-0 p-5 sm:p-6">
            <p className="font-mono text-xs text-accent">{project.category}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-muted">{processCaseStudy.description}</p>
            <ul aria-label="Project technologies" className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => <li key={technology}><TechBadge>{technology}</TechBadge></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-line px-5 pb-5 sm:px-6 sm:pb-6">
          <details className="workflow-details group/story">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 text-sm text-ink-muted hover:text-accent">
              Read how I approached this
              <ChevronDown size={15} aria-hidden="true" className="shrink-0 transition-transform group-open/story:rotate-180 motion-reduce:transition-none" />
            </summary>
            <dl className="space-y-4 border-t border-line py-5">
              {processCaseStudy.narrative.map((part) => (
                <div key={part.title}>
                  <dt className="font-display text-sm font-semibold text-ink">{part.title}</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink-muted">{part.description}</dd>
                </div>
              ))}
            </dl>
          </details>
          <Link to={`/projects/${project.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-accent hover:underline">
            View Case Study <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Panel>
    </section>
  );
}
