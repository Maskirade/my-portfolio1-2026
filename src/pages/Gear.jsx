import CollectionPage from '../components/layout/CollectionPage.jsx';
import GearCard from '../components/ui/GearCard.jsx';
import { gear } from '../data/gear.js';

export default function Gear() {
  return (
    <CollectionPage title="Gear" description="The complete hardware setup and tools I use for development, meetings, and everyday work.">
      <div className="grid items-start gap-6 md:grid-cols-2">
        {gear.map((item) => <GearCard key={item.id} gear={item} />)}
      </div>
    </CollectionPage>
  );
}
