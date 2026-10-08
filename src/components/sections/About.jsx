import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import { profile } from '../../data/profile.js';

export default function About() {
  return (
    <section id="about" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <SectionHeader
          index="01"
          label="Overview"
          title="About"
          description="A short overview of who I am, how I work, and what I'm focused on right now."
        />
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <Reveal delay={80}>
          <Panel className="p-6 h-full rounded-sm">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Introduction
            </span>
            <p className="mt-3 text-ink-muted leading-relaxed">{profile.bio}</p>
          </Panel>
        </Reveal>

        <Reveal delay={160}>
          <Panel className="p-6 h-full rounded-sm flex flex-col gap-5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Focus
            </span>
            <dl className="space-y-4">
              {profile.focus.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                    {f.label}
                  </dt>
                  <dd className="text-sm text-ink-muted mt-1 leading-relaxed">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
