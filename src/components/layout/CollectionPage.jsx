import BackLink from '../ui/BackLink.jsx';

export default function CollectionPage({ title, description, children, backTo = '/#home' }) {
  return (
    <section className="px-6 py-12 sm:px-10 sm:py-20 lg:px-16">
      <div className="max-w-5xl">
        <BackLink to={backTo} className="mb-8" />
        <header className="mb-10 max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-4 leading-relaxed text-ink-muted">{description}</p>
        </header>
        {children}
      </div>
    </section>
  );
}
