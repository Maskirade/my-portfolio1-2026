export default function TechBadge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-sm border border-line bg-bg-surface text-xs font-mono text-ink-muted hover:text-accent hover:border-accent/40 transition-colors duration-200">
      {children}
    </span>
  );
}
