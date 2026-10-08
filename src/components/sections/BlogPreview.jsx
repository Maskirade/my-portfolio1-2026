import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import BlogCard from '../ui/BlogCard.jsx';
import { blogPosts } from '../../data/blog.js';

export default function BlogPreview() {
  return (
    <section id="blog" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            index="02"
            label="Writing"
            title="From the blog"
            description="Stories from CivicPrep, library attendance systems, and my experience building with a team."
          />
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-accent transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {blogPosts.slice(0, 3).map((post, i) => (
          <Reveal key={post.id} delay={i * 80} className="h-full">
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
