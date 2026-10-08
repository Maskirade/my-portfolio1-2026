import { Mail } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../ui/icons.jsx';
import { profile } from '../../data/profile.js';

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="px-6 sm:px-10 lg:px-16 py-20 border-t border-line">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Section 10 // Contact
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-3">
              Let's build something.
            </h2>
            <p className="text-ink-muted mt-3 max-w-md leading-relaxed">
              Open to conversations about web, mobile, and AI-integrated projects.
            </p>
            <a
              href={`mailto:${profile.socials.email}`}
              className="inline-flex mt-5 text-accent font-mono text-sm hover:opacity-80 transition-opacity"
            >
              {profile.socials.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-3 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-3 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={profile.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook profile"
              className="p-3 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              aria-label="Send an email"
              className="p-3 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-ink-faint uppercase tracking-widest">
          <span>
            {profile.name} — {profile.role}
          </span>
          <span>© {year} All rights reserved.</span>
        </div>
      </Reveal>
    </footer>
  );
}
