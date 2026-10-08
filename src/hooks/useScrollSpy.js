import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds = [], options = {}) {
  const sectionKey = sectionIds.join(',');
  const [activeSection, setActiveSection] = useState({ key: sectionKey, id: null });
  const { rootMargin, threshold = 0 } = options;

  if (activeSection.key !== sectionKey) {
    setActiveSection({ key: sectionKey, id: null });
  }

  useEffect(() => {
    const elements = sectionKey.split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    let observer;
    const observeSections = () => {
      observer?.disconnect();
      const visibleIds = new Set();
      // Pixel margins keep the active band tied to viewport height on all screen sizes.
      const activeMargin = rootMargin ??
        `-${Math.round(window.innerHeight * 0.4)}px 0px -${Math.round(window.innerHeight * 0.55)}px 0px`;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        });
        setActiveSection({ key: sectionKey, id: elements.find((el) => visibleIds.has(el.id))?.id || null });
      }, { rootMargin: activeMargin, threshold });

      elements.forEach((el) => observer.observe(el));
    };

    observeSections();
    window.addEventListener('resize', observeSections);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', observeSections);
    };
  }, [sectionKey, rootMargin, threshold]);

  return activeSection.key === sectionKey ? activeSection.id : null;
}
