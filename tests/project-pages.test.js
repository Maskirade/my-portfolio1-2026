import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { build } from 'rolldown';
import { projects } from '../src/data/projects.js';
import { certifications } from '../src/data/certifications.js';
import { gear } from '../src/data/gear.js';
import { recommendations } from '../src/data/recommendations.js';
import { techStack } from '../src/data/techStack.js';
import { profile } from '../src/data/profile.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let workspace;
let components;

before(async () => {
  const privateRoot = join(root, '.private');
  await mkdir(privateRoot, { recursive: true });
  workspace = await mkdtemp(join(privateRoot, 'project-page-tests-'));
  const entry = join(workspace, 'entry.jsx');
  await writeFile(entry, [
    "export { default as ProjectDetail } from '../../src/pages/ProjectDetail.jsx';",
    "export { default as ProjectCard } from '../../src/components/ui/ProjectCard.jsx';",
    "export { default as ProjectLinks } from '../../src/components/ui/ProjectLinks.jsx';",
    "export { default as FeaturedProjects } from '../../src/components/sections/Projects.jsx';",
    "export { default as Projects } from '../../src/pages/Projects.jsx';",
    "export { default as Sidebar } from '../../src/components/layout/Sidebar.jsx';",
    "export { default as Home } from '../../src/pages/Home.jsx';",
    "export { default as Certifications } from '../../src/pages/Certifications.jsx';",
    "export { default as Gear } from '../../src/pages/Gear.jsx';",
    "export { default as Recommendations } from '../../src/pages/Recommendations.jsx';",
    "export { default as Resume } from '../../src/pages/Resume.jsx';",
  ].join('\n'));
  const result = await build({
    input: entry,
    platform: 'node',
    external: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    write: false,
    output: { format: 'esm' },
  });
  const bundle = join(workspace, 'components.mjs');
  await writeFile(bundle, result.output.find((part) => part.type === 'chunk').code);
  components = await import(pathToFileURL(bundle).href);
});

after(async () => {
  if (!workspace) return;
  const privateRoot = resolve(root, '.private');
  assert.equal(dirname(workspace), privateRoot, 'Only remove the created private test directory');
  await rm(workspace, { recursive: true, force: true });
});

function render(Component, props = {}, path = '/projects') {
  return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(Component, props)));
}

function renderDetail(slug) {
  return renderToStaticMarkup(
    React.createElement(MemoryRouter, { initialEntries: [`/projects/${slug}`] },
      React.createElement(Routes, null,
        React.createElement(Route, { path: '/projects/:slug', element: React.createElement(components.ProjectDetail) }),
      ),
    ),
  );
}

test('every project has a unique URL and a full story with feature delivery states', () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const field of ['overview', 'problem', 'contribution', 'solution', 'currentStatus']) {
      assert.ok(project.details[field]?.trim(), `${project.title}: ${field}`);
    }
    assert.ok(project.details.features.length);
    assert.ok(project.details.challenges.length);
    assert.deepEqual(new Set(project.details.technologyNotes.map((item) => item.name)), new Set(project.technologies));
    for (const feature of project.details.features) {
      assert.ok(feature.title && feature.description);
      assert.ok(['implemented', 'in-development', 'planned'].includes(feature.state));
    }
  }
});

test('homepage and all-work cards open project details without placeholder links', () => {
  for (const project of projects) {
    const html = render(components.ProjectCard, { project });
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    assert.equal(links.length, 3);
    assert.ok(links.every((match) => match[1] === `/projects/${project.slug}`));
    assert.ok(links.some((match) => match[2].includes('<img')));
    assert.ok(links.some((match) => match[2].includes('View project')));
    assert.ok(!html.includes('href="#"'));
  }
  const home = render(components.FeaturedProjects);
  const all = render(components.Projects);
  const featuredSlugs = projects.filter((project) => project.featured).slice(0, 2).map((project) => project.slug);
  for (const project of projects) {
    assert.ok(all.includes(`href="/projects/${project.slug}"`));
    assert.equal(home.includes(`href="/projects/${project.slug}"`), featuredSlugs.includes(project.slug));
  }
});

test('each detail URL renders every story section, image, return link, and valid contents anchors', () => {
  for (const project of projects) {
    const html = renderDetail(project.slug);
    assert.ok(html.includes('<h1'));
    assert.ok(html.includes(`src="${project.image}"`));
    assert.ok(html.includes('href="/projects"'));
    for (const id of ['overview', 'problem', 'contribution', 'features', 'solution', 'technology', 'challenges', 'status']) {
      assert.ok(html.includes(`id="${id}"`), `${project.slug}: ${id}`);
      assert.ok(html.includes(`href="/projects/${project.slug}#${id}"`));
    }
    assert.ok(html.includes('Key features'));
    assert.ok(!html.includes('href="#"'));
    for (const technology of project.technologies) assert.ok(html.includes(technology));
  }
});

test('ongoing projects label intended features as planned and completed projects show implemented features', () => {
  for (const project of projects) {
    const html = renderDetail(project.slug);
    if (project.status === 'In Progress') {
      assert.ok(html.includes('Planned'));
      assert.ok(html.includes('Challenges and learning goals'));
    } else {
      assert.ok(html.includes('Implemented'));
    }
  }
});

test('unknown project URLs show a useful fallback and Projects stays active on detail routes', () => {
  const missing = renderDetail('unknown-project');
  assert.ok(missing.includes('Project not found'));
  assert.ok(missing.includes('href="/projects"'));
  const sidebar = render(components.Sidebar, { theme: 'dark', onToggleTheme() {} }, '/projects/civicprep');
  assert.match(sidebar, /<a\b[^>]*aria-current="page"[^>]*href="\/projects"|<a\b[^>]*href="\/projects"[^>]*aria-current="page"/);
});

test('code and demo links are shown only for absolute HTTP URLs and open separately', () => {
  for (const url of ['#', '', undefined, 'javascript:alert(1)', 'data:text/html,test', '/relative']) {
    assert.equal(render(components.ProjectLinks, { project: { title: 'Example', githubUrl: url, liveUrl: url } }), '');
  }
  const html = render(components.ProjectLinks, {
    project: { title: 'Example', githubUrl: 'https://github.com/example/project', liveUrl: 'https://example.com' },
  });
  assert.ok(html.includes('href="https://github.com/example/project"'));
  assert.ok(html.includes('href="https://example.com"'));
  assert.equal((html.match(/target="_blank" rel="noopener noreferrer"/g) || []).length, 2);
});

test('direct detail-page requests are covered by the Vercel SPA rewrite', async () => {
  const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
  assert.ok(config.rewrites.some((rewrite) => rewrite.source === '/projects/:path*' && rewrite.destination === '/index.html'));
});

test('homepage previews stay brief and point to complete collections', () => {
  const home = render(components.Home, {}, '/');
  const section = (id) => {
    const html = home.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))?.[0];
    assert.ok(html, `Missing homepage section: ${id}`);
    return html;
  };
  const certificates = section('certifications');
  assert.equal((certificates.match(/<li>/g) || []).length, Math.min(2, certifications.length));
  assert.ok(certificates.includes('href="/certifications"'));
  assert.ok(!certificates.includes('<img'));
  assert.equal((section('projects').match(/<article/g) || []).length, Math.min(2, projects.filter((project) => project.featured).length));
  assert.equal((section('blog').match(/<li>/g) || []).length, 2);
  assert.equal((section('tech-stack').match(/<li>/g) || []).length, 8);
  assert.ok(section('tech-stack').includes('href="/resume#skills"'));
  assert.equal((section('gear').match(/<img/g) || []).length, Math.min(1, gear.length));
  assert.ok(section('gear').includes('href="/gear"'));
  assert.equal((section('experience').match(/<article/g) || []).length, 1);
  assert.equal((section('recommendations').match(/<figure/g) || []).length, Math.min(1, recommendations.length));
  assert.ok(section('recommendations').includes('href="/recommendations"'));
  assert.ok((section('affiliation').match(/<li /g) || []).length <= 3);
});

test('detail collections preserve all items and certificate privacy protections', () => {
  const certificates = render(components.Certifications, {}, '/certifications');
  for (const cert of certifications) {
    assert.ok(certificates.includes(`id="${cert.id}"`));
    assert.ok(certificates.includes(`src="${cert.image}"`));
    assert.ok(cert.image.endsWith('-v2.webp'));
  }
  assert.equal((certificates.match(/aria-haspopup="dialog"/g) || []).length, certifications.length);
  assert.equal((certificates.match(/draggable="false"/g) || []).length, certifications.length);
  assert.doesNotMatch(certificates, /download=|\.pdf|\.jpg|\.private\//i);
  const allGear = render(components.Gear, {}, '/gear');
  for (const item of gear) {
    assert.ok(allGear.includes(`id="${item.id}"`));
    for (const tool of item.items) assert.ok(allGear.includes(tool.replaceAll('&', '&amp;')));
  }
  const allRecommendations = render(components.Recommendations, {}, '/recommendations');
  for (const item of recommendations) {
    assert.ok(allRecommendations.includes(`id="${item.id}"`));
    assert.ok(allRecommendations.includes(item.quote.replaceAll('&', '&amp;').replaceAll("'", '&#x27;')));
  }
  const resume = render(components.Resume, {}, '/resume#skills');
  assert.ok(resume.includes('id="skills"'));
  for (const item of profile.focus) assert.ok(resume.includes(item.value.replaceAll('&', '&amp;')));
  for (const group of techStack) {
    for (const item of group.items) assert.ok(resume.includes(item.replaceAll('&', '&amp;')));
  }
});

test('new collection pages support direct Vercel requests and primary navigation', async () => {
  const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
  const sidebar = render(components.Sidebar, { theme: 'dark', onToggleTheme() {} }, '/');
  const app = await readFile(join(root, 'src/App.jsx'), 'utf8');
  for (const path of ['/certifications', '/gear', '/recommendations']) {
    assert.ok(config.rewrites.some((rewrite) => rewrite.source === path && rewrite.destination === '/index.html'));
    assert.ok(app.includes(`<Route path="${path}"`));
    assert.ok(sidebar.includes(`href="${path}"`));
  }
});
