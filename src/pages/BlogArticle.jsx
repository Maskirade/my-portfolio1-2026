import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BlogCard from '../components/ui/BlogCard.jsx';
import { blogPosts } from '../data/blog.js';
import { profile } from '../data/profile.js';

export default function BlogArticle() {
  const { slug } = useParams();
  const post = blogPosts.find((article) => article.id === slug);

  if (!post) {
    return (
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <h1 className="font-display text-3xl font-semibold text-ink">Article not found</h1>
        <p className="mt-4 text-ink-muted">Browse the blog to find another story.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-accent hover:underline">
          <ArrowLeft size={16} aria-hidden="true" /> Back to the blog
        </Link>
      </section>
    );
  }

  const relatedPosts = blogPosts.filter((article) => article.id !== post.id).slice(0, 2);

  return (
    <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-accent transition-colors">
          <ArrowLeft size={15} aria-hidden="true" /> All stories
        </Link>

        <header className="mt-10 pb-8 border-b border-line">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
            <span className="text-accent">{post.category}</span>
            <span className="text-ink-faint">{post.readingTime}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-6 text-sm text-ink-muted">By {profile.name}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint">{post.context}</p>
        </header>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink">
          {post.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-ink tracking-tight">{section.heading}</h2>
            <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-ink-muted">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}

        <aside className="my-10 border-l-2 border-accent pl-5 py-2" aria-label="Key takeaway">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">What I took away</p>
          <p className="mt-3 font-display text-xl leading-relaxed text-ink">{post.takeaway}</p>
        </aside>

        <footer className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-5">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors">
            <ArrowLeft size={16} aria-hidden="true" /> Back to the blog
          </Link>
          <Link to={post.related.to} className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
            {post.related.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      </article>

      <section className="mx-auto max-w-3xl mt-16" aria-labelledby="keep-reading-title">
        <h2 id="keep-reading-title" className="mb-6 font-display text-2xl font-semibold text-ink">Keep reading</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {relatedPosts.map((article) => <BlogCard key={article.id} post={article} />)}
        </div>
      </section>
    </div>
  );
}
