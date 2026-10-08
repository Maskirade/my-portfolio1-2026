import { useEffect, useRef } from 'react';
import { X, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../data/nav.js';
import { profile } from '../../data/profile.js';
import { GithubIcon, LinkedinIcon } from '../ui/icons.jsx';

export default function MobileNav({ open, onClose, activeSection }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <div
      className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-72 bg-bg-surface border-l border-line px-6 py-6 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <span className="font-display text-sm font-semibold tracking-widest text-ink">
            MENU
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Mobile primary">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path === '/' && item.sectionId ? `${item.path}#${item.sectionId}` : item.path}
                  end={item.path === '/'}
                  aria-current={item.path === '/' ? (activeSection === item.sectionId ? 'location' : false) : undefined}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 font-display text-base uppercase tracking-wide ${
                      isActive && (item.path !== '/' || activeSection === item.sectionId)
                        ? 'text-accent' : 'text-ink-muted'
                    }`
                  }
                >
                  <span className="text-[10px]" aria-hidden="true">◆</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-line flex items-center gap-3">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent transition-colors"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent transition-colors"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            aria-label="Send an email"
            className="p-2 border border-line rounded-sm text-ink-muted hover:text-accent transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
