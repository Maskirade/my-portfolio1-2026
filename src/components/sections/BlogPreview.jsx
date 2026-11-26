import { Link } from 'react-router-dom';
import HomeSection from '../ui/HomeSection.jsx';
import { blogPosts } from '../../data/blog.js';

export default function BlogPreview() {
  return (
    <HomeSection id="blog" index="03" label="Writing" title="From the blog" to="/blog" linkLabel="All articles">
      <ul className="divide-y divide-line">
        {blogPosts.slice(0, 2).map((post) => (
          <li key={post.id}>
            <Link to={post.url} className="group block rounded-sm py-4">
              <p className="font-mono text-xs text-ink-muted">{post.category} ? {post.readingTime}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-accent">{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
