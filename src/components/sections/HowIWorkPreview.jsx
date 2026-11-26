import HomeSection from '../ui/HomeSection.jsx';
import ProcessIcon from '../how-i-work/ProcessIcon.jsx';
import { workflowStages } from '../../data/howIWork.js';

export default function HowIWorkPreview() {
  return (
    <HomeSection id="how-i-work" index="02" label="My process" title="How I Work" to="/how-i-work" linkLabel="View full process">
      <ol className="grid gap-x-6 gap-y-4 min-[400px]:grid-cols-2 2xl:grid-cols-3">
        {workflowStages.map((stage, index) => (
          <li key={stage.id} className="flex min-w-0 items-center gap-3 border-b border-line pb-3">
            <span className="flex shrink-0 items-center gap-2 text-accent" aria-hidden="true">
              <span className="font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
              <ProcessIcon name={stage.icon} />
            </span>
            <span className="min-w-0 font-display text-sm font-medium leading-6 text-ink">{stage.title}</span>
          </li>
        ))}
      </ol>
    </HomeSection>
  );
}
