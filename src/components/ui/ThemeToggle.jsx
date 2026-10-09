import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle, className = '' }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={(event) => onToggle(event.currentTarget)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      className={`relative inline-flex items-center w-12 h-6 rounded-full border border-line bg-bg-surface2 transition-colors duration-300 ${className}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 ${
          isDark ? 'translate-x-0' : 'translate-x-6'
        }`}
        style={{ width: '1.125rem', height: '1.125rem' }}
      >
        {isDark ? (
          <Moon size={11} className="text-bg" aria-hidden="true" />
        ) : (
          <Sun size={11} className="text-bg" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
