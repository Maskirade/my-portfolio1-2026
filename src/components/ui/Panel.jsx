export default function Panel({ as: Tag = 'div', className = '', children, brackets = true, ...rest }) {
  return (
    <Tag
      className={`relative border border-line bg-bg-surface/80 backdrop-blur-sm ${className}`}
      {...rest}
    >
      {brackets && (
        <>
          <span className="pointer-events-none absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-accent/70" aria-hidden="true" />
          <span className="pointer-events-none absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-accent/70" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-accent/70" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-accent/70" aria-hidden="true" />
        </>
      )}
      {children}
    </Tag>
  );
}
