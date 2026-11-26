import { Link } from 'react-router-dom';
import HomeSection from '../ui/HomeSection.jsx';
import { gear } from '../../data/gear.js';

export default function Gear() {
  const primary = gear[0];
  return (
    <HomeSection id="gear" index="04" label="Loadout" title="Gear" to="/gear" linkLabel="View full setup">
      {primary && (
        <Link to={`/gear#${primary.id}`} className="group flex flex-col items-start gap-5 rounded-sm sm:flex-row sm:items-center sm:gap-8">
          {primary.image && <img src={primary.image} alt={primary.title} className="h-32 w-full object-contain sm:w-48" loading="lazy" />}
          <div>
            <p className="font-mono text-xs text-accent">{primary.category}</p>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-accent">{primary.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">The hardware and tools behind my work.</p>
          </div>
        </Link>
      )}
    </HomeSection>
  );
}
