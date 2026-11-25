import { ArrowLeft, ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects.js';
import ProjectLinks from '../components/ui/ProjectLinks.jsx';
import StatusDot from '../components/ui/StatusDot.jsx';
import TechBadge from '../components/ui/TechBadge.jsx';

const featureStates = {
  implemented: { label: 'Implemented', icon: CheckCircle2, color: 'text-accent' },
  'in-development': { label: 'In development', icon: Clock3, color: 'text-signal-amber' },
  planned: { label: 'Planned', icon: Clock3, color: 'text-ink-muted' },
};

const pageSections = [
  ['overview', 'Overview'],
  ['problem', 'The problem'],
  ['contribution', 'My contribution'],
  ['features', 'Key features'],
  ['solution', 'The solution'],
  ['technology', 'Technology choices'],
  ['challenges', 'Challenges and lessons'],
  ['status', 'Current status'],
];

function StorySection({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className="font-display text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-4 text-base leading-8 text-ink-muted">{children}</div>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <h1 className="font-display text-3xl font-semibold text-ink">Project not found</h1>
        <p className="mt-4 text-ink-muted">Explore the project list to find another piece of work.</p>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 rounded-sm text-accent hover:underline">
          <ArrowLeft size={16} aria-hidden="true" /> Back to projects
        </Link>
      </section>
    );
  }

  const { details } = project;
  const inProgress = project.status === 'In Progress';
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  const detailUrl = `/projects/${project.slug}`;

  return (
    <article className="px-6 sm:px-10 lg:px-16 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Link to="/projects" className="inline-flex items-center gap-2 rounded-sm text-sm text-ink-muted transition-colors hover:text-accent">
          <ArrowLeft size={16} aria-hidden="true" /> Back to projects
        </Link>

        <header className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span>{project.category}</span>
            <StatusDot status={inProgress ? 'progress' : 'active'} label={project.status} pulse={false} />
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-ink [overflow-wrap:anywhere]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">{project.description}</p>
          <dl className="mt-8 border-l-2 border-accent pl-4">
            <dt className="text-xs text-ink-muted">My role</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{project.role}</dd>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.technologies.map((technology) => <TechBadge key={technology}>{technology}</TechBadge>)}
          </div>
          <ProjectLinks project={project} className="mt-6" />
        </header>

        {project.image && (
          <figure className="mt-10 sm:mt-12">
            <div className="overflow-hidden rounded-sm border border-line bg-bg-surface2 p-2 sm:p-4">
              <img
                src={project.image}
                alt={`${project.title} application interface`}
                className="mx-auto block max-h-[560px] w-full object-contain"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 text-xs text-ink-muted">{project.title} interface preview</figcaption>
          </figure>
        )}

        <div className="mt-12 grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-16">
          <nav aria-label="On this project" className="xl:order-2 xl:sticky xl:top-8">
            <p className="text-sm font-semibold text-ink">On this project</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 xl:flex-col xl:gap-3">
              {pageSections.map(([id, label]) => (
                <li key={id}>
                  <Link to={`${detailUrl}#${id}`} className="rounded-sm text-sm text-ink-muted transition-colors hover:text-accent">
                    {id === 'challenges' ? details.challengeHeading || label : label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 max-w-3xl space-y-12 xl:order-1">
            <StorySection id="overview" title="Overview"><p>{details.overview}</p></StorySection>
            <StorySection id="problem" title="The problem"><p>{details.problem}</p></StorySection>
            <StorySection id="contribution" title="My contribution"><p>{details.contribution}</p></StorySection>

            <StorySection id="features" title="Key features">
              {inProgress && <p className="mb-5 text-sm">Feature labels show what is implemented, in development, or planned.</p>}
              <ul className="divide-y divide-line border-y border-line">
                {details.features.map((feature) => {
                  const { label, icon: Icon, color } = featureStates[feature.state] || featureStates.planned;
                  return (
                    <li key={feature.title} className="flex items-start gap-4 py-5">
                      <Icon size={19} aria-hidden="true" className={`mt-1.5 shrink-0 ${color}`} />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-display text-base font-semibold text-ink">{feature.title}</h3>
                          <span className={`text-xs ${color}`}>{label}</span>
                        </div>
                        <p className="mt-1 text-sm leading-7">{feature.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </StorySection>

            <StorySection id="solution" title="The solution"><p>{details.solution}</p></StorySection>

            <StorySection id="technology" title="Technology choices">
              <dl className="divide-y divide-line">
                {details.technologyNotes.map((technology) => (
                  <div key={technology.name} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5">
                    <dt className="font-display text-base font-semibold text-ink">{technology.name}</dt>
                    <dd className="text-sm leading-7">{technology.description}</dd>
                  </div>
                ))}
              </dl>
            </StorySection>

            <StorySection id="challenges" title={details.challengeHeading || 'Challenges and lessons'}>
              <div className="space-y-6">
                {details.challenges.map((challenge) => (
                  <div key={challenge.title}>
                    <h3 className="font-display text-base font-semibold text-ink">{challenge.title}</h3>
                    <p className="mt-2 text-sm leading-7">{challenge.description}</p>
                  </div>
                ))}
              </div>
            </StorySection>

            <StorySection id="status" title="Current status">
              <div className="border-l-2 border-accent pl-5">
                <p>{details.currentStatus}</p>
              </div>
            </StorySection>
          </div>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-7">
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-sm text-sm text-ink-muted transition-colors hover:text-accent">
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
          {nextProject !== project && (
            <Link to={`/projects/${nextProject.slug}`} className="inline-flex max-w-full items-center gap-2 rounded-sm text-sm text-accent hover:underline">
              <span className="min-w-0">Next: {nextProject.title}</span>
              <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
            </Link>
          )}
        </footer>
      </div>
    </article>
  );
}
