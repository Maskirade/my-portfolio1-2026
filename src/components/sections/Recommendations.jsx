import HomeSection from '../ui/HomeSection.jsx';
import RecommendationCard from '../ui/RecommendationCard.jsx';
import { recommendations } from '../../data/recommendations.js';

export default function Recommendations() {
  return (
    <HomeSection id="recommendations" index="08" label="Endorsements" title="Recommendations" to="/recommendations" linkLabel="Read all recommendations">
      {recommendations.slice(0, 1).map((item) => <RecommendationCard key={item.id} recommendation={item} preview />)}
    </HomeSection>
  );
}
