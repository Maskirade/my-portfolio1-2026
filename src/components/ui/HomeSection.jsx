import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function HomeSection({ id, index, label, title, to, linkLabel, children }) {
  return (
    <section id={id} className="border-t border-line px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      <Reveal>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader index={index} label={label} title={title} compact />
          {to && (
            <Link to={to} className="inline-flex items-center gap-2 rounded-sm py-1 text-sm text-accent hover:underline">
              {linkLabel} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
        {children}
      </Reveal>
    </section>
  );
}
