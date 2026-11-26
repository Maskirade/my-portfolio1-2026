import Panel from './Panel.jsx';
import TechBadge from './TechBadge.jsx';

export default function GearCard({ gear }) {
  return (
    <Panel as="article" id={gear.id} className="overflow-hidden rounded-sm">
      {gear.image && (
        <div className="flex h-56 items-center justify-center border-b border-line bg-bg-surface2 p-6 sm:h-72 sm:p-8">
          <img src={gear.image} alt={gear.title} className="h-full w-full object-contain" loading="lazy" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <p className="font-mono text-xs text-accent">{gear.category}</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">{gear.title}</h2>
        <p className="mt-3 text-sm leading-7 text-ink-muted">{gear.description}</p>
        {gear.items?.length > 0 && (
          <ul aria-label="Tools and uses" className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
            {gear.items.map((item) => <li key={item}><TechBadge>{item}</TechBadge></li>)}
          </ul>
        )}
      </div>
    </Panel>
  );
}
