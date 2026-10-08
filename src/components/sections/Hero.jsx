import { useEffect, useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/profile.js';
import ProfilePanel from '../layout/ProfilePanel.jsx';

const ROLE_CYCLE = profile.roles;
const ROLE_INTERVAL = 3400; // 3 seconds at rest, plus the 400ms transition.

export default function Hero() {
  const [role, setRole] = useState({ current: 0, previous: null });

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval;

    const syncRotation = () => {
      window.clearInterval(interval);
      if (motionPreference.matches || ROLE_CYCLE.length < 2) return;

      interval = window.setInterval(() => {
        setRole((previous) => ({
          current: (previous.current + 1) % ROLE_CYCLE.length,
          previous: previous.current,
        }));
      }, ROLE_INTERVAL);
    };

    syncRotation();
    motionPreference.addEventListener('change', syncRotation);
    return () => {
      window.clearInterval(interval);
      motionPreference.removeEventListener('change', syncRotation);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 xl:py-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 30% 30%, black 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl animate-fadeUp">
        <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-widest text-accent">
          <span className="relative flex w-1.5 h-1.5 rounded-full bg-accent animate-pulseDot" aria-hidden="true" />
          <span className="uppercase text-ink-muted">System online</span>
        </div>

        <ProfilePanel compact className="mb-8" />

        <h1 className="font-display font-semibold tracking-tight text-ink text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
          {profile.name}
        </h1>

        <div className="mt-5 flex items-start gap-2 font-mono text-lg sm:text-xl leading-relaxed text-accent">
          <span className="opacity-60 shrink-0" aria-hidden="true">&gt;</span>
          <span className="sr-only">Roles: {ROLE_CYCLE.join(', ')}.</span>
          <span className="grid min-w-0 min-h-[1.5em]" aria-hidden="true">
            {ROLE_CYCLE.map((label, index) => (
              <span
                key={label}
                className={`hero-role ${index === role.current
                  ? 'hero-role-active' : index === role.previous ? 'hero-role-outgoing' : ''}`}
              >
                {label}
              </span>
            ))}
          </span>
        </div>

        <p className="mt-6 text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl">
          {profile.bio}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-bg font-display text-sm font-semibold uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity"
          >
            View Projects <ArrowRight size={16} />
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 px-5 py-3 border border-line text-ink font-display text-sm font-semibold uppercase tracking-wide rounded-sm hover:border-accent/50 hover:text-accent transition-colors"
          >
            <FileText size={16} /> View Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
