import { NavLink } from 'react-router-dom';
import { navItems } from '../../data/nav.js';
import ThemeToggle from '../ui/ThemeToggle.jsx';

export default function Sidebar({ theme, onToggleTheme, activeSection }) {
  return (
    <aside className="hidden lg:flex flex-col justify-between w-60 shrink-0 h-screen sticky top-0 border-r border-line px-8 py-10 bg-bg">
      <div>
        <NavLink to="/#home" className="block font-display text-sm font-semibold tracking-widest text-ink">
          John Raymart <span className="text-accent">TENIO</span>
        </NavLink>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          Dev Console
        </p>

        <nav className="mt-16" aria-label="Primary">
          <ul className="space-y-5">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path === '/' && item.sectionId ? `${item.path}#${item.sectionId}` : item.path}
                  end={item.path === '/'}
                  aria-current={item.path === '/' ? (activeSection === item.sectionId ? 'location' : false) : undefined}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 font-display text-sm tracking-wide uppercase transition-all duration-200 ${
                      isActive && (item.path !== '/' || activeSection === item.sectionId)
                        ? 'text-accent' : 'text-ink-muted hover:text-ink hover:translate-x-1'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`text-[10px] transition-transform duration-200 ${
                          isActive && (item.path !== '/' || activeSection === item.sectionId)
                            ? 'text-accent scale-110' : 'text-ink-faint group-hover:translate-x-0.5'
                        }`}
                        aria-hidden="true"
                      >
                        ◆
                      </span>
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-faint">
        <span>Theme</span>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </aside>
  );
}
