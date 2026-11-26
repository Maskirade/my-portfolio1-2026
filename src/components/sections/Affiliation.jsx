import { Link } from 'react-router-dom';
import HomeSection from '../ui/HomeSection.jsx';
import AffiliationIcon from '../ui/AffiliationIcon.jsx';
import { profile } from '../../data/profile.js';

export default function Affiliation() {
  const affiliations = profile.affiliations || [];
  if (!affiliations.length) return null;
  return (
    <HomeSection id="affiliation" index="10" label="Connections" title="Affiliations" to="/affiliations" linkLabel="All affiliations">
      <ul className="flex flex-wrap gap-x-8 gap-y-5">
        {affiliations.slice(0, 3).map((affiliation) => (
          <li key={affiliation.id} className="max-w-full">
            <Link to={`/affiliations#${affiliation.id}`} aria-label={`View ${affiliation.name} affiliation details`} className="group inline-flex max-w-full items-center gap-3 rounded-sm py-1">
              <AffiliationIcon affiliation={affiliation} />
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-ink group-hover:text-accent">{affiliation.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted">{affiliation.role}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
