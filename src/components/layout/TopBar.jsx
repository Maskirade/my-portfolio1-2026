import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import MobileNav from './MobileNav.jsx';

export default function TopBar({ theme, onToggleTheme, activeSection }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-4 border-b border-line bg-bg/90 backdrop-blur-md">
        <NavLink to="/#home" className="font-display text-sm font-semibold tracking-widest text-ink">
          John Raymart<span className="text-accent">TENIO</span>
        </NavLink>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className="p-2 border border-line rounded-sm text-ink hover:text-accent hover:border-accent/40 transition-colors"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>
      <MobileNav open={open} onClose={() => setOpen(false)} activeSection={activeSection} />
    </>
  );
}
