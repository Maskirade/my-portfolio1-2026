import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function CertificatePreview({ certificate, onDismiss }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function closeFromBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    ) {
      dialogRef.current.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="certificate-preview-title"
      aria-describedby="certificate-preview-description"
      onClose={onDismiss}
      onClick={closeFromBackdrop}
      className="m-auto w-[calc(100%-2rem)] max-w-5xl max-h-[90dvh] overflow-y-auto rounded-sm border border-line bg-bg-surface p-0 text-ink shadow-panel backdrop:bg-black/75"
    >
      <div className="flex items-start justify-between gap-4 border-b border-line p-4 sm:p-6">
        <div>
          <h2 id="certificate-preview-title" className="font-display text-lg font-semibold">
            {certificate.name}
          </h2>
          <p id="certificate-preview-description" className="mt-1 text-sm text-ink-muted">
            {certificate.issuer} · Signatures blurred for privacy.
          </p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current.close()}
          aria-label="Close certificate preview"
          className="shrink-0 rounded-sm p-2 text-ink-muted transition-colors hover:bg-bg-surface2 hover:text-ink"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="p-3 sm:p-6">
        <img
          src={certificate.image}
          alt={`${certificate.name} awarded to John Raymart Montinola Tenio, with signatures blurred`}
          width={certificate.width}
          height={certificate.height}
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          className="certificate-preview-image block h-auto w-full select-none rounded-sm"
        />
      </div>
    </dialog>
  );
}
