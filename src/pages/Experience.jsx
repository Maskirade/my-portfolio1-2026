import Reveal from '../components/effects/Reveal.jsx';
import TimelineItem from '../components/ui/TimelineItem.jsx';
import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-24">
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            Experience
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight mt-3">
            Full timeline
          </h1>
          <p className="mt-4 text-ink-muted leading-relaxed">
            Where my time as a developer has gone, from early projects to current focus.
          </p>
        </div>
      </Reveal>

      <div className="max-w-2xl">
        {experience.map((item, i) => (
          <Reveal key={item.id} delay={i * 90}>
            <TimelineItem item={item} isLast={i === experience.length - 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
