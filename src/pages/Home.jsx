import Hero from '../components/sections/Hero.jsx';
import About from '../components/sections/About.jsx';
import BlogPreview from '../components/sections/BlogPreview.jsx';
import Gear from '../components/sections/Gear.jsx';
import Projects from '../components/sections/Projects.jsx';
import Experience from '../components/sections/Experience.jsx';
import TechStack from '../components/sections/TechStack.jsx';
import Certifications from '../components/sections/Certifications.jsx';
import Recommendations from '../components/sections/Recommendations.jsx';
import GithubActivity from '../components/sections/GithubActivity.jsx';
import Contact from '../components/sections/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <BlogPreview />
      <Gear />
      <Projects />
      <Experience />
      <TechStack />
      <Certifications />
      <Recommendations />
      <GithubActivity />
      <Contact />
    </>
  );
}
