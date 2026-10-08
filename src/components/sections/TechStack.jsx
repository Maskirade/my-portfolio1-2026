import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import TechBadge from '../ui/TechBadge.jsx';
import { techStack } from '../../data/techStack.js';

export default function TechStack() {
  return (
    <section id="tech-stack" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <SectionHeader
          index="06"
          label="Toolkit"
          title="Tech stack"
          description="Technologies I use across frontend, backend, DevOps, AI/ML, and tooling."
        />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {techStack.map((group, i) => (
          <Reveal key={group.category} delay={i * 70}>
            <Panel className="p-5 h-full rounded-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2 mt-4">
                {group.items.map((item) => (
                  <TechBadge key={item}>{item}</TechBadge>
                ))}
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
