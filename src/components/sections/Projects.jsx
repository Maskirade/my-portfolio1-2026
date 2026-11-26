import HomeSection from '../ui/HomeSection.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';
import { projects } from '../../data/projects.js';

export default function Projects() {
  const featured = projects.filter((project) => project.featured).slice(0, 2);
  return (
    <HomeSection id="projects" index="04" label="Selected work" title="Featured projects" to="/projects" linkLabel="All projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((project) => <ProjectCard key={project.id} project={project} compact />)}
      </div>
    </HomeSection>
  );
}
