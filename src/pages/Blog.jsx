import Reveal from '../components/effects/Reveal.jsx';
import BlogCard from '../components/ui/BlogCard.jsx';
import { blogPosts } from '../data/blog.js';

export default function Blog() {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              Blog / Field notes
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight mt-3">
              Behind the build.
            </h1>
            <p className="mt-4 text-ink-muted leading-relaxed">
              The projects, decisions, and people shaping how I build software.
              Notes from exam review apps, library systems, and the work still taking shape.
            </p>
          </div>
        </Reveal>

        {featuredPost && (
          <Reveal>
            <BlogCard post={featuredPost} variant="featured" />
          </Reveal>
        )}

        <section className="mt-12" aria-labelledby="more-stories-title">
          <h2 id="more-stories-title" className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            More from the build
          </h2>
          {otherPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 70}>
              <BlogCard post={post} variant="row" />
            </Reveal>
          ))}
        </section>
      </div>
    </section>
  );
}
