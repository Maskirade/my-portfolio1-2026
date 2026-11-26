import Panel from './Panel.jsx';

export default function RecommendationCard({ recommendation, preview = false }) {
  const { id, quote, name, role, organization } = recommendation;
  const excerpt = preview && quote.length > 180 ? `${quote.slice(0, 180).trimEnd()}…` : quote;
  return (
    <Panel as="figure" id={preview ? undefined : id} className="rounded-sm p-5 sm:p-6">
      <blockquote className="text-sm leading-7 text-ink-muted"><p>{excerpt}</p></blockquote>
      <figcaption className="mt-4 border-t border-line pt-4">
        <p className="font-display text-sm font-semibold text-ink">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{role} · {organization}</p>
      </figcaption>
    </Panel>
  );
}
