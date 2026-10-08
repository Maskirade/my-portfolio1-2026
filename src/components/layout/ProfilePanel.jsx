import { Mail } from 'lucide-react';
import { profile } from '../../data/profile.js';
import Panel from '../ui/Panel.jsx';
import StatusDot from '../ui/StatusDot.jsx';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../ui/icons.jsx';

export default function ProfilePanel({ className = '', sticky = true, compact = false }) {
  const isAvailable = profile.availability === 'AVAILABLE FOR OPPORTUNITIES';
  const layoutClass = compact
    ? 'w-full max-w-xl xl:hidden'
    : `hidden xl:block w-72 shrink-0 px-6 py-10 ${sticky ? 'sticky top-0 h-screen overflow-y-auto' : ''}`;

  return (
    <aside
      aria-label={compact ? 'Profile introduction' : 'Profile sidebar'}
      className={`${layoutClass} ${className}`}
    >
      <Panel className={compact ? 'p-4 sm:p-5 rounded-sm flex flex-col min-[360px]:flex-row gap-4 sm:gap-6 min-[360px]:items-center' : 'p-5 rounded-sm'}>
        <div className={`rounded-sm bg-bg-surface2 border border-line flex items-center justify-center overflow-hidden ${compact ? 'w-20 h-20 sm:w-28 sm:h-28 shrink-0' : 'aspect-square w-full mb-4'}`}>
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-widest px-4 text-center">
              Profile photo placeholder
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {!compact && <h2 className="font-display text-lg font-semibold text-ink">{profile.name}</h2>}
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent mt-1">
            {profile.role}
          </p>

          {!compact && <p className="mt-4 text-sm text-ink-muted leading-relaxed">{profile.shortBio}</p>}

          <div className={compact ? 'mt-3' : 'mt-5 pt-4 border-t border-line'}>
            <StatusDot status={isAvailable ? 'active' : 'idle'} label={profile.availability} />
          </div>

          <div className={`flex flex-wrap items-center ${compact ? 'mt-3 gap-2' : 'mt-5 gap-3'}`}>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook profile"
              className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              aria-label="Send an email"
              className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </Panel>
    </aside>
  );
}
