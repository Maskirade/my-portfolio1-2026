import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BackLink({ to = '/#home', children = 'Back to home', className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm text-ink-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {children}
    </Link>
  );
}
