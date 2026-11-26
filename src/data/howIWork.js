// Process content is independent of presentation; project metadata stays in projects.js.
export const workflowStages = [
  {
    id: 'discover',
    icon: 'search',
    title: 'Discover & Understand',
    description: 'Understand the problem, business objectives, user needs, and project requirements before defining a solution.',
    activities: ['Requirement gathering', 'Problem identification', 'User needs analysis', 'Project scope definition'],
    output: 'Clear problem definition',
  },
  {
    id: 'analyze',
    icon: 'brain',
    title: 'Analyze & Strategize',
    description: 'Explore possible solutions, evaluate technical constraints and trade-offs, and select the most appropriate technologies and development approach.',
    activities: ['Research and feasibility analysis', 'Technology evaluation', 'Constraint identification', 'Solution planning'],
    output: 'Practical solution strategy',
  },
  {
    id: 'design',
    icon: 'layers',
    title: 'Design & Plan',
    description: 'Translate ideas into user flows, interface designs, and system architecture before beginning implementation.',
    activities: ['User flow design', 'Wireframing', 'UI/UX planning', 'System architecture design'],
    output: 'Visual and technical blueprint',
  },
  {
    id: 'develop',
    icon: 'code',
    title: 'Develop & Implement',
    description: 'Transform the proposed solution into functional software using clean, maintainable, and structured code.',
    activities: ['Frontend development', 'Backend development when required', 'API and system integration', 'Version control', 'Feature implementation'],
    output: 'Working application',
  },
  {
    id: 'test',
    icon: 'shield',
    title: 'Test & Refine',
    description: 'Validate functionality and improve usability, responsiveness, reliability, and performance through testing and feedback.',
    activities: ['Functional testing', 'Debugging', 'Responsive testing', 'Performance optimization', 'Feedback-based refinement'],
    output: 'Validated and refined solution',
  },
  {
    id: 'deploy',
    icon: 'rocket',
    title: 'Deploy & Improve',
    description: 'Launch the application, evaluate its performance, and identify opportunities for future improvements.',
    activities: ['Application deployment', 'Documentation', 'Post-deployment evaluation', 'Maintenance planning', 'Continuous improvement'],
    output: 'Live and evolving digital solution',
  },
];

export const developmentPrinciples = [
  { id: 'problem-first', icon: 'target', title: 'Problem First', description: 'Understand the “why” before deciding the “how”.' },
  { id: 'user-centered', icon: 'users', title: 'User-Centered Thinking', description: 'Build solutions around real user needs and meaningful experiences.' },
  { id: 'simplicity', icon: 'code', title: 'Simplicity Over Complexity', description: 'Choose practical, maintainable solutions instead of unnecessary complexity.' },
  { id: 'growth', icon: 'growth', title: 'Continuous Growth', description: 'Learn, experiment, adapt, and continuously improve.' },
  { id: 'communication', icon: 'message', title: 'Clear Communication', description: 'Keep expectations, progress, and technical decisions transparent.' },
  { id: 'innovation', icon: 'lightbulb', title: 'Purposeful Innovation', description: 'Use modern technologies and intelligent algorithms when they provide meaningful value.' },
];

// The algorithm details below come from the supplied process brief.
export const processCaseStudy = {
  projectSlug: 'civicprep',
  description: 'A gamified Civil Service Examination reviewer that integrates FSRS for intelligent question scheduling and Reinforcement Learning for fair reward distribution.',
  narrative: [
    { title: 'The Problem', description: 'Traditional examination review methods can lack personalized question scheduling and engaging learning experiences.' },
    { title: 'The Approach', description: 'Explore adaptive learning, spaced repetition, gamification, and intelligent reward mechanisms to address these challenges.' },
    { title: 'The Technical Decision', description: 'Integrate the Free Spaced Repetition Scheduler (FSRS) for smart question scheduling and Reinforcement Learning for fair reward distribution.' },
    { title: 'The Solution', description: 'Develop a gamified mobile reviewer designed to provide a more personalized and engaging examination preparation experience.' },
  ],
};
