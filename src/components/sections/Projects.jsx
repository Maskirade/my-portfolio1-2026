import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';
import { projects } from '../../data/projects.js';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            index="04"
            label="Selected work"
            title="Featured projects"
            description="A snapshot of what I've been building across web, mobile, and AI."
          />
          <Link
            to="/projects"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-accent transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <Reveal key={project.id} delay={i * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
