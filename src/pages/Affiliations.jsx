import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/effects/Reveal.jsx';
import Panel from '../components/ui/Panel.jsx';
import AffiliationIcon from '../components/ui/AffiliationIcon.jsx';
import { profile } from '../data/profile.js';

export default function Affiliations() {
  const affiliations = profile.affiliations || [];

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-24">
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Connections</span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-ink">
            Affiliations
          </h1>
          <p className="mt-4 leading-relaxed text-ink-muted">
            The organizations I work with and my role in each.
          </p>
        </div>
      </Reveal>

      <div className="max-w-3xl space-y-6">
        {affiliations.map((affiliation, index) => (
          <Reveal key={affiliation.id} delay={index * 80}>
            <Panel as="article" id={affiliation.id} className="scroll-mt-8 rounded-sm p-5 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                <AffiliationIcon affiliation={affiliation} large />
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-sm border border-line bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                    {affiliation.role}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-semibold text-ink">{affiliation.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{affiliation.description}</p>
                  <a
                    href={affiliation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${affiliation.name} website (opens in a new tab)`}
                    className="mt-5 inline-flex max-w-full items-center gap-2 rounded-sm font-mono text-xs text-ink-muted transition-colors hover:text-accent"
                  >
                    <span className="min-w-0 break-all">{new URL(affiliation.url).hostname}</span>
                    <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
        {!affiliations.length && <p className="text-ink-muted">Affiliations will be added here soon.</p>}
      </div>
    </section>
  );
}
