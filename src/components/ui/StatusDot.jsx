const COLOR_MAP = {
  active: 'bg-accent',
  progress: 'bg-signal-amber',
  idle: 'bg-ink-faint',
};

export default function StatusDot({ status = 'active', label, pulse = true }) {
  const color = COLOR_MAP[status] || COLOR_MAP.active;
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
      <span className={`relative flex w-1.5 h-1.5 rounded-full ${color} ${pulse ? 'animate-pulseDot' : ''}`} aria-hidden="true" />
      {label}
    </span>
  );
}
