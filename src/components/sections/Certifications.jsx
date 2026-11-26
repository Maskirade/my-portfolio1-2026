import { Link } from 'react-router-dom';
import HomeSection from '../ui/HomeSection.jsx';
import { certifications } from '../../data/certifications.js';

export default function Certifications() {
  return (
    <HomeSection id="certifications" index="07" label="Credentials" title="Certifications" to="/certifications" linkLabel={`View all ${certifications.length} certificates`}>
      <ul className="divide-y divide-line">
        {certifications.slice(0, 2).map((cert) => (
          <li key={cert.id}>
            <Link to={`/certifications#${cert.id}`} className="group flex flex-col justify-between gap-2 rounded-sm py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-ink group-hover:text-accent">{cert.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{cert.issuer}</p>
              </div>
              <time dateTime={cert.dateTime} className="shrink-0 text-xs text-ink-muted">{cert.date}</time>
            </Link>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
