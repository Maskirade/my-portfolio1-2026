import { Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import Sidebar from './components/layout/Sidebar.jsx';
import ProfilePanel from './components/layout/ProfilePanel.jsx';
import TopBar from './components/layout/TopBar.jsx';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import BlogArticle from './pages/BlogArticle.jsx';
import Projects from './pages/Projects.jsx';
import Experience from './pages/Experience.jsx';
import Resume from './pages/Resume.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useScrollSpy } from './hooks/useScrollSpy.js';
import { navItems } from './data/nav.js';

const homeSectionIds = navItems
  .filter((item) => item.path === '/' && item.sectionId)
  .map((item) => item.sectionId);

function ScrollToLocation() {
  const { pathname, hash, key } = useLocation();
  const previousPathname = useRef(null);

  useLayoutEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    const behavior = previousPathname.current === pathname ? 'auto' : 'instant';

    // Route content is mounted before this runs; cross-page jumps happen before paint.
    if (target) {
      target.scrollIntoView({ behavior, block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    previousPathname.current = pathname;
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const activeSection = useScrollSpy(pathname === '/' ? homeSectionIds : []);

  return (
    <div className="min-h-screen flex bg-bg text-ink font-body">
      <ScrollToLocation />
      <Sidebar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />
        <div className="flex flex-1 min-w-0">
          <main id="main-content" className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </main>
          {pathname === '/' && <ProfilePanel />}
        </div>
      </div>
    </div>
  );
}
