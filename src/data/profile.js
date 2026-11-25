// Central profile data — edit here, not inside components.
export const profile = {
  name: 'John Raymart Tenio',
  role: 'Full-Stack Developer',
  tagline: 'Web · Mobile · AI Integration',
  bio: "I'm a full-stack software and web developer with a passion for building web and mobile applications. I have experience in both front-end and back-end development, and I'm currently focused on integrating AI into my projects. I enjoy learning new technologies and applying them to create practical solutions.",
  shortBio:
    "Full-stack developer building web and mobile apps, currently focused on AI integration.",
  location: 'San Jose, Prosperidad, Agusan del Sur, Philippines',
  availability: 'OPEN TO CONNECT', // set to 'AVAILABLE FOR OPPORTUNITIES' when true
  profileImage: '/images/profile/akeh.jpg', // PLACEHOLDER — add a headshot at src/assets/images/profile.jpg
  socials: {
    github: 'https://github.com/Maskirade',
    linkedin: 'https://www.linkedin.com/feed/', // PLACEHOLDER — replace with actual LinkedIn URL
    facebook: 'https://www.facebook.com', // PLACEHOLDER — replace with actual Facebook URL
    email: 'teniojohnraymart@gmail.com', // PLACEHOLDER — replace with actual email
  },
  resumeUrl: '/documents/resume/John_Raymart_Tenio_RESUME.pdf/', // PLACEHOLDER — link to hosted resume PDF
  roles: ['Web Developer', 'Mobile App Developer', 'AI/ML Developer'],
  heroStats: [
    { value: '4+', label: 'Projects' },
    { value: '25+', label: 'Technologies' },
    { value: '1+', label: 'Experience' },
  ],
  // Add entries here to update both the homepage preview and Affiliations page.
  affiliations: [
    {
      id: 'devworks-studio',
      name: 'DevWorks Studio',
      role: 'CTO & Programmer',
      description:
        'I work with DevWorks Studio as CTO & Programmer, contributing to technical direction and software development.',
      url: 'https://devworkstudios.net',
      initials: 'DW',
      logo: null, // Optional local logo path, for example /images/affiliations/studio.webp.
    },
    {
      id: 'liavanta-technologies',
      name: 'LIAVANTA Technologies',
      role: 'CO-FOUNDER',
      description: "I'm a co-founder of LIAVANTA Technologies.",
      url: 'https://liavanta-technologies.vercel.app/',
      initials: 'LT',
      logo: null,
    },
  ],
  focus: [
    {
      label: 'Currently building',
      value: 'Web & mobile applications with practical, everyday use cases',
    },
    {
      label: 'Currently learning',
      value: 'AI integration development',
    },
    {
      label: 'Philosophy',
      value: 'Ship things people can actually use, keep learning in public',
    },
  ],
};
