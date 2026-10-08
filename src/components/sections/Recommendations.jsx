import { Quote } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import { recommendations } from '../../data/recommendations.js';

export default function Recommendations() {
  return (
    <section id="recommendations" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <SectionHeader
          index="08"
          label="Endorsements"
          title="Recommendations"
          description=""
        />
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {recommendations.map((rec, i) => (
          <Reveal key={rec.id} delay={i * 80}>
            <Panel className="p-6 rounded-sm h-full flex flex-col">
              <Quote size={20} className="text-accent/60 mb-3" aria-hidden="true" />
              <p className="text-sm text-ink-muted leading-relaxed flex-1 italic">
                {rec.quote}
              </p>
              <div className="mt-4 pt-4 border-t border-line">
                <p className="font-display text-sm font-semibold text-ink">{rec.name}</p>
                <p className="font-mono text-[11px] text-ink-faint uppercase tracking-widest mt-0.5">
                  {rec.role} · {rec.organization}
                </p>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
