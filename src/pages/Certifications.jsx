import CollectionPage from '../components/layout/CollectionPage.jsx';
import CertificateGallery from '../components/ui/CertificateGallery.jsx';

export default function Certifications() {
  return (
    <CollectionPage backTo="/#certifications" title="Certifications" description="Milestones from internships, conferences, and continued learning. Select a certificate to view its preview. Signatures are blurred for privacy.">
      <CertificateGallery />
    </CollectionPage>
  );
}
