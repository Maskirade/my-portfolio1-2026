import { ChevronDown } from 'lucide-react';
import Panel from '../ui/Panel.jsx';
import ProcessIcon from './ProcessIcon.jsx';
import { workflowStages } from '../../data/howIWork.js';

function WorkflowStage({ stage, index }) {
  return (
    <li className="group relative min-w-0 pl-7 sm:pl-9">
      <span className="absolute left-0 top-7 h-3 w-3 rounded-[2px] border border-accent/60 bg-bg transition-colors group-hover:bg-accent group-focus-within:bg-accent" aria-hidden="true" />
      <Panel as="article" brackets={false} aria-labelledby={`${stage.id}-title`} className="rounded-sm p-4 transition-colors hover:border-accent/50 focus-within:border-accent/50 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-6">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-line bg-accent-soft text-accent">
              <ProcessIcon name={stage.icon} />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[11px] tracking-widest text-accent">STEP {String(index + 1).padStart(2, '0')}</p>
              <h3 id={`${stage.id}-title`} className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{stage.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">{stage.description}</p>
            </div>
          </div>
          <div className="border-l-2 border-accent/40 pl-4 md:self-start">
            <p className="font-mono text-[10px] tracking-widest text-ink-muted">OUTPUT</p>
            <p className="mt-2 text-sm font-medium leading-6 text-ink">{stage.output}</p>
          </div>
        </div>
        <details className="workflow-details group/activities mt-3">
          <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 rounded-sm text-xs text-ink-muted transition-colors hover:text-accent">
            Key activities <span className="sr-only">for {stage.title}</span>
            <ChevronDown size={14} aria-hidden="true" className="shrink-0 transition-transform group-open/activities:rotate-180 motion-reduce:transition-none" />
          </summary>
          <ul className="grid gap-2 border-t border-line py-4 text-sm leading-6 text-ink-muted sm:grid-cols-2">
            {stage.activities.map((activity) => (
              <li key={activity} className="flex items-start gap-2">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                {activity}
              </li>
            ))}
          </ul>
        </details>
      </Panel>
    </li>
  );
}

export default function DevelopmentWorkflow() {
  return (
    <section aria-labelledby="workflow-title">
      <div className="mb-6 max-w-2xl">
        <h2 id="workflow-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">From discovery to delivery</h2>
        <p className="mt-3 text-sm leading-6 text-ink-muted">My approach to a project, with room to revisit decisions as I learn more.</p>
      </div>
      <ol className="relative space-y-3 before:absolute before:bottom-8 before:left-[5px] before:top-7 before:w-px before:bg-line">
        {workflowStages.map((stage, index) => <WorkflowStage key={stage.id} stage={stage} index={index} />)}
      </ol>
    </section>
  );
}
