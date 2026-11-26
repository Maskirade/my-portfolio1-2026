import HomeSection from '../ui/HomeSection.jsx';
import TechBadge from '../ui/TechBadge.jsx';
import { techStack } from '../../data/techStack.js';

export default function TechStack() {
  // Take one item from each discipline before filling the remaining preview slots.
  const technologies = [...new Set([
    ...techStack.flatMap((group) => group.items.slice(0, 1)),
    ...techStack.flatMap((group) => group.items.slice(1)),
  ])].slice(0, 8);
  return (
    <HomeSection id="tech-stack" index="06" label="Toolkit" title="Tech stack" to="/resume#skills" linkLabel="View all technologies">
      <ul className="flex flex-wrap gap-2" aria-label="Selected technologies">
        {technologies.map((item) => <li key={item}><TechBadge>{item}</TechBadge></li>)}
      </ul>
    </HomeSection>
  );
}
