export default function AffiliationIcon({ affiliation, large = false }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-sm border border-line bg-accent-soft font-mono font-semibold text-accent ${large ? 'h-14 w-14 text-base' : 'h-11 w-11 text-xs'}`}
    >
      {affiliation.logo ? (
        <img
          src={affiliation.logo}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-2"
        />
      ) : affiliation.initials}
    </span>
  );
}
