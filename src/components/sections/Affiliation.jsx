import { ArrowUpRight } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import { profile } from '../../data/profile.js';

export default function Affiliation() {
  const { affiliation } = profile;
  if (!affiliation) return null;

  return (
    <section id="affiliation" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <SectionHeader index="09" label="Connections" title="Affiliation" />
      </Reveal>

      <Reveal>
        <Panel
          as="a"
          href={affiliation.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${affiliation.name} website (opens in a new tab)`}
          className="group block max-w-2xl rounded-sm p-5 sm:p-6 transition-colors hover:border-accent/40"
        >
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-line bg-accent-soft font-mono text-sm font-semibold text-accent"
            >
              {affiliation.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{affiliation.name}</h3>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ink-muted transition-colors group-hover:text-accent"
                />
              </div>
              <p className="mt-2 font-mono text-xs text-accent">{affiliation.role}</p>
              <p className="mt-4 break-all font-mono text-xs text-ink-muted">{affiliation.domain}</p>
            </div>
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}
