// Central profile data — edit here, not inside components.
export const profile = {
  name: 'John Raymart Tenio',
  role: 'Full-Stack Developer',
  tagline: 'Web · Mobile · AI Integration',
  bio: "I'm a full-stack developer. I build useful web & mobile apps, and right now I'm focusing on AI integration development. I'm learning new skills and building new things that could actually help people.",
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
  resumeUrl: '/documents/resume/John_Raymart_Tenio_RESUME.docx/', // PLACEHOLDER — link to hosted resume PDF
  roles: ['Web Developer', 'Mobile App Developer', 'AI/ML Developer'],
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
