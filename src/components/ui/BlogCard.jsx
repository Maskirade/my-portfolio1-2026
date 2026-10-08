import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BlogCard({ post, variant = 'card' }) {
  const featured = variant === 'featured';
  const row = variant === 'row';
  const Heading = featured ? 'h2' : 'h3';
  const articleClass = featured
    ? 'border-y border-accent/40 bg-accent/5'
    : row ? 'border-b border-line' : 'h-full border border-line rounded-sm';
  const linkClass = row
    ? 'flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-8'
    : 'h-full flex-col gap-6 p-6 sm:p-8';

  return (
    <article className={articleClass}>
      <Link
        to={post.url}
        aria-label={`Read ${post.title}`}
        className={`group flex ${linkClass} transition-colors hover:bg-bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-widest">
            {featured && <span className="text-ink">Featured story</span>}
            <span className="text-accent">{post.category}</span>
            <span className="text-ink-faint">{post.readingTime}</span>
          </div>
          <Heading className={`font-display font-semibold text-ink tracking-tight mt-4 group-hover:text-accent transition-colors ${
            featured ? 'max-w-3xl text-3xl sm:text-4xl lg:text-5xl leading-tight' : 'text-xl sm:text-2xl leading-snug'
          }`}>
            {post.title}
          </Heading>
          <p className={`mt-4 max-w-2xl text-ink-muted leading-relaxed ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
            {post.description}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            {post.context}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted group-hover:text-accent transition-colors">
          Read article <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
