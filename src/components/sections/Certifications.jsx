import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import CertificatePreview from '../ui/CertificatePreview.jsx';
import { certifications } from '../../data/certifications.js';

export default function Certifications() {
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <section id="certifications" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <SectionHeader
          index="07"
          label="Credentials"
          title="Certifications"
          description="Milestones from internships, conferences, and continued learning."
        />
      </Reveal>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 80} className="h-full">
            <Panel as="article" className="h-full overflow-hidden rounded-sm flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {cert.category}
                  </span>
                  <time dateTime={cert.dateTime} className="text-xs text-ink-muted">
                    {cert.date}
                  </time>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{cert.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{cert.issuer}</p>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{cert.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCertificate(cert)}
                aria-label={`View ${cert.name} certificate`}
                aria-haspopup="dialog"
                className="group block w-full border-t border-line text-left focus-visible:outline-offset-[-3px]"
              >
                <div className="overflow-hidden bg-bg-surface2 p-3">
                  <img
                    src={cert.image}
                    alt={`${cert.name} certificate with signatures blurred`}
                    width={cert.width}
                    height={cert.height}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                    className="certificate-preview-image w-full h-auto select-none rounded-sm transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <span className="flex items-center justify-between gap-2 px-5 py-4 text-sm text-ink-muted transition-colors group-hover:text-accent">
                  View certificate <Maximize2 size={16} aria-hidden="true" />
                </span>
              </button>
            </Panel>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-xs text-ink-muted">Signatures blurred for privacy.</p>
      {activeCertificate && (
        <CertificatePreview
          certificate={activeCertificate}
          onDismiss={() => setActiveCertificate(null)}
        />
      )}
    </section>
  );
}
