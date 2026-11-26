import HomeSection from '../ui/HomeSection.jsx';
import { profile } from '../../data/profile.js';

export default function About() {
  return (
    <HomeSection id="about" index="01" label="Overview" title="About" to="/resume" linkLabel="More about me">
      <p className="max-w-2xl leading-relaxed text-ink-muted">{profile.bio}</p>
    </HomeSection>
  );
}
