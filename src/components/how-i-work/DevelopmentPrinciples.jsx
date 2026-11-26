import Panel from '../ui/Panel.jsx';
import ProcessIcon from './ProcessIcon.jsx';
import { developmentPrinciples } from '../../data/howIWork.js';

export default function DevelopmentPrinciples() {
  return (
    <section aria-labelledby="principles-title">
      <p className="font-mono text-[11px] tracking-widest text-accent">MY DEVELOPMENT PRINCIPLES</p>
      <h2 id="principles-title" className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">What Guides My Work</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2">
        {developmentPrinciples.map((principle) => (
          <li key={principle.id}>
            <Panel brackets={false} className="h-full rounded-sm p-5 transition-colors hover:border-accent/40">
              <ProcessIcon name={principle.icon} className="text-accent" />
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-ink">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{principle.description}</p>
            </Panel>
          </li>
        ))}
      </ul>
    </section>
  );
}
