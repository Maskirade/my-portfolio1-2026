// Small monoline icon components in the lucide visual style.
// lucide-react removed brand/logo icons in recent versions, so these
// are hand-drawn generic glyphs (not traced from any logo asset) used
// only to represent "go to GitHub" / "go to LinkedIn" links.

export function GithubIcon({ size = 18, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.4c0-.9.3-1.5.7-1.8-2.4-.3-5-1.2-5-5.3 0-1.2.4-2.1 1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .8-.3 2.9 1.1a10 10 0 0 1 5.2 0c2.1-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.6.8 1 1.7 1 2.9 0 4.1-2.6 5-5 5.3.4.3.7 1 .7 2V21" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v4" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d="M15 3h-2a4 4 0 0 0-4 4v2H7v3h2v8h3v-8h3l1-3h-4V7a1 1 0 0 1 1-1h2V3z" />
    </svg>
  );
}
