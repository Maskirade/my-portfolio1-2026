import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import TimelineItem from '../ui/TimelineItem.jsx';
import { experience } from '../../data/experience.js';

export default function Experience() {
  return (
    <section id="experience" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            index="05"
            label="Timeline"
            title="Experience"
            description="Where my time as a developer has gone so far."
          />
          <Link
            to="/experience"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-accent transition-colors"
          >
            Full timeline <ArrowRight size={14} />
          </Link>
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
