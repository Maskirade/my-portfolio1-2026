import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackLink from '../components/ui/BackLink.jsx';
import DevelopmentWorkflow from '../components/how-i-work/DevelopmentWorkflow.jsx';
import DevelopmentPrinciples from '../components/how-i-work/DevelopmentPrinciples.jsx';
import ProcessCaseStudy from '../components/how-i-work/ProcessCaseStudy.jsx';

export default function HowIWork() {
  return (
    <div className="px-6 py-12 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <BackLink to="/#how-i-work" className="mb-8" />
        <header className="relative isolate mb-12 border-b border-line pb-10 motion-safe:animate-fadeUp sm:mb-14">
          <div className="process-intro-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" /> MY PROCESS
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">How I Work</h1>
          <p className="mt-4 font-mono text-base text-accent sm:text-lg"><span aria-hidden="true">&gt; </span>From Problem to Solution</p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted">
            I believe great software starts with understanding the problem, not writing code. My approach combines analytical thinking, intentional design, and purposeful development to transform complex problems into practical, user-focused digital solutions.
          </p>
        </header>

        <DevelopmentWorkflow />

        <div className="mt-14 grid items-start gap-12 border-t border-line pt-12 sm:mt-16 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <DevelopmentPrinciples />
          <ProcessCaseStudy />
        </div>

        <section aria-labelledby="process-contact-title" className="mt-12 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 id="process-contact-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Have a problem worth solving?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
            I&apos;m interested in turning meaningful ideas into practical digital solutions. Whether it&apos;s a website, an application, or a technical challenge, let&apos;s explore what we can build together.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link to="/#contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-bg hover:opacity-90">
              Let&apos;s Work Together <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-sm px-1 py-3 text-sm text-ink-muted hover:text-accent">
              Explore My Projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
