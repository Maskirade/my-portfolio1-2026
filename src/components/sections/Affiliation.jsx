import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import AffiliationIcon from '../ui/AffiliationIcon.jsx';
import { profile } from '../../data/profile.js';

export default function Affiliation() {
  const affiliations = profile.affiliations || [];
  if (!affiliations.length) return null;

  return (
    <section id="affiliation" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-6">
          <SectionHeader index="09" label="Connections" title="Affiliations" />
          <Link
            to="/affiliations"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-accent"
          >
            All affiliations <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <ul className="flex flex-wrap gap-x-10 gap-y-6">
          {affiliations.map((affiliation) => (
            <li key={affiliation.id} className="max-w-full">
              <Link
                to={`/affiliations#${affiliation.id}`}
                aria-label={`View ${affiliation.name} affiliation details`}
                className="group inline-flex max-w-full items-center gap-3 rounded-sm py-1"
              >
                <AffiliationIcon affiliation={affiliation} />
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                    {affiliation.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    {affiliation.role}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
