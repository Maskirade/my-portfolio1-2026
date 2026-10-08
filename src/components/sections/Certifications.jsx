import { ExternalLink } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import { certifications } from '../../data/certifications.js';

export default function Certifications() {
  return (
    <section id="certifications" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <SectionHeader
          index="07"
          label="Credentials"
          title="Certifications"
          description=""
        />
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 80}>
            <Panel className="p-5 rounded-sm flex flex-col gap-2">
              <h3 className="font-display text-base font-semibold text-ink">{cert.name}</h3>
              <p className="text-sm text-ink-muted">
                {cert.issuer} · {cert.date}
              </p>
              <p className="font-mono text-[11px] text-ink-faint">
                Credential ID: {cert.credentialId}
              </p>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors w-fit"
              >
                Verify <ExternalLink size={14} />
              </a>
            </Panel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
