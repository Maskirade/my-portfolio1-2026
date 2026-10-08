export default function SectionHeader({ index, label, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <div className="flex items-center gap-3 mb-3 font-mono text-xs tracking-widest text-accent">
        {index && <span className="opacity-70">SECTION {index}</span>}
        {index && <span className="w-8 h-px bg-line" aria-hidden="true" />}
        <span className="uppercase text-ink-muted">{label}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-ink-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
