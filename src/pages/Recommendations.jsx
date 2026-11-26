import CollectionPage from '../components/layout/CollectionPage.jsx';
import RecommendationCard from '../components/ui/RecommendationCard.jsx';
import { recommendations } from '../data/recommendations.js';

export default function Recommendations() {
  return (
    <CollectionPage backTo="/#recommendations" title="Recommendations" description="Feedback from people I've worked with.">
      <div className="max-w-3xl space-y-6">
        {recommendations.map((item) => <RecommendationCard key={item.id} recommendation={item} />)}
      </div>
    </CollectionPage>
  );
}
