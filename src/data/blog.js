// Project stories and reflections drawn from the portfolio's projects and experience.
const articles = [
  {
    id: 'civicprep-exam-review',
    title: 'CivicPrep: Making Exam Review Fit the Learner',
    category: 'Mobile Development',
    context: 'Thesis project / 2025-2026',
    description:
      'Building a Civil Service Exam review app with gamification, adaptive topic scheduling, and offline progress. A look at the decisions behind CivicPrep.',
    intro: [
      'Exam preparation asks a lot of a learner: consistent practice, time management, and the patience to return to difficult topics. For my thesis project, I built CivicPrep, a gamified mobile application for people preparing for the Civil Service Exam.',
      'The idea was to make the learning process more engaging while helping users decide where to spend their study time. That brought together three parts of the project: game mechanics, a smart topic scheduler, and locally stored progress.',
    ],
    sections: [
      {
        heading: 'Making practice more engaging',
        paragraphs: [
          'Gamification was part of CivicPrep from the start. I incorporated game mechanics to support engagement and motivation during exam review. The design challenge was keeping the learning purpose clear as I built the application.',
          'Working on this helped me think about the relationship between a feature and the behavior it is meant to encourage. In a study app, that behavior is returning to practice and continuing to learn. It gave me a useful way to evaluate the ideas I wanted to add.',
        ],
      },
      {
        heading: 'Giving study time a direction',
        paragraphs: [
          'I integrated a smart topic scheduler that adapts to a user\'s learning pace and performance. Its purpose is to help learners manage their study time and focus on areas where they need improvement.',
          'This was one of the parts that made the project interesting to build. It connected a learner\'s progress with the next topic to review. For me, it was a practical opportunity to think through how an application can respond to an individual instead of treating every study session the same way.',
        ],
      },
      {
        heading: 'Keeping progress close to the learner',
        paragraphs: [
          'I developed CivicPrep with Flutter and Dart and used ObjectBox as its local database. User progress and preferences are stored locally, supporting offline access and data persistence.',
          'Working with local storage added another dimension to the project. I had to consider the information that should remain available when the learner returns to the app. It strengthened my understanding of mobile development and database management together.',
        ],
      },
      {
        heading: 'What the thesis taught me',
        paragraphs: [
          'The app was well received by our thesis panel, with positive feedback on its approach to exam preparation and its interface. Building it also gave me more practice in critical thinking and finding solutions to development challenges.',
          'CivicPrep brought my interests in mobile applications, learning, and personalized software into one project. The experience encouraged me to keep building products around a specific everyday need and to keep asking how each feature helps the person using it.',
        ],
      },
    ],
    takeaway: 'Start with the learner\'s next step, then build the features that help them take it.',
    related: { label: 'Explore my projects', to: '/projects' },
  },
  {
    id: 'area-51-ojt-rfid-attendance',
    title: 'From RFID Scans to Attendance Records: My OJT at Area 51',
    category: 'Developer Experience',
    context: 'OJT / June-August 2025',
    description:
      'Building an RFID attendance page as a junior web developer, contributing across the frontend and backend, and learning from a team shipping a library system.',
    intro: [
      'From June 7 to August 12, 2025, I joined Area 51 Information Technology Solutions as an OJT junior web developer. I became part of the team building the company\'s first startup project: a library system.',
      'My contribution included the attendance page and its integration with an RFID scanner for student attendance. The experience gave me a chance to work on software as part of a team and see how my work connected to a larger product.',
    ],
    sections: [
      {
        heading: 'One page inside a larger system',
        paragraphs: [
          'An attendance page has a specific purpose, but it belongs to the library\'s wider workflow. I was responsible for building that page and integrating RFID scanning into the attendance process.',
          'That responsibility helped me connect the interface people use with the information the system needs to handle. It was a useful introduction to contributing a focused feature while keeping the surrounding application in mind.',
        ],
      },
      {
        heading: 'Working across the frontend and backend',
        paragraphs: [
          'I worked on both frontend and backend parts of the system. The technologies involved in my OJT included HTML, Tailwind CSS, PHP, Laravel, MySQL, and JavaScript.',
          'Moving between those parts of the application expanded my understanding of web development. It gave me more practice thinking about how an interface and its supporting backend work together, while contributing to the same project with other developers.',
        ],
      },
      {
        heading: 'Learning with guidance',
        paragraphs: [
          'My senior, Vars, guided me and taught me programming best practices during the placement. I am grateful for that support. It helped me develop better coding habits and learn how to work in a development team.',
          'Mentorship was an important part of this experience. Having someone guide my learning helped me look beyond finishing an individual task and pay more attention to the quality of the work I was contributing.',
        ],
      },
      {
        heading: 'Seeing the team\'s work reach schools',
        paragraphs: [
          'The library system was deployed to different schools in Mindanao. My attendance work was one contribution to that team effort, and seeing the system reach schools made the project especially meaningful to me.',
          'I carried two lessons forward from my OJT: keep improving my programming practices, and keep learning from the people I build with. Both have stayed relevant as I continue developing web and mobile projects.',
        ],
      },
    ],
    takeaway: 'A focused contribution becomes more valuable when it fits the team\'s wider work.',
    related: { label: 'Read my experience', to: '/experience' },
  },
  {
    id: 'library-check-ins-with-barcodes',
    title: 'Making Library Check-ins Simpler with Barcodes',
    category: 'Web Development',
    context: 'NEMSU-LC / Completed project',
    description:
      'A library attendance system that brings barcode check-ins, check-outs, and ID generation into one workflow. Notes from building the NEMSU-LC project.',
    intro: [
      'Some projects begin with a familiar process that could be easier to carry out. For the NEMSU-LC Library Attendance System, that process was recording attendance when someone enters or leaves the library.',
      'I built a web application with barcode scanning for attendance in and out, together with an ID generator for quick ID creation. The project focused on a clear task and the tools needed to support it.',
    ],
    sections: [
      {
        heading: 'Starting with the attendance workflow',
        paragraphs: [
          'The system uses a barcode scanner to support attendance check-ins and check-outs. The purpose is straightforward: make it easier to record library attendance through a scanning workflow.',
          'Thinking about the project through that everyday action kept its purpose concrete. It gave me a way to connect the interface with what a person needs to accomplish when using the system.',
        ],
      },
      {
        heading: 'Connecting attendance and ID creation',
        paragraphs: [
          'I also integrated an ID generator for quick ID creation. Bringing attendance and ID generation into the same application connected two parts of the library\'s workflow.',
          'That combination is what makes this project stand out to me. It encouraged me to think about related tasks together and consider how one application could support more of the process around attendance.',
        ],
      },
      {
        heading: 'Building with a web stack',
        paragraphs: [
          'The project uses HTML, PHP, Tailwind CSS, MySQL, and JavaScript. Building it gave me another opportunity to work across a web interface and its supporting application logic and database.',
          'This project uses barcode scanning. My OJT work at Area 51 involved an RFID attendance page in a separate team-built library system. Each experience let me work on attendance software in a different project context.',
        ],
      },
      {
        heading: 'A practical project to learn from',
        paragraphs: [
          'The NEMSU-LC Library Attendance System is a completed project in my portfolio. Its value as a learning experience came from building around a specific need: library attendance and the ID creation associated with it.',
          'It reinforced the direction I want to take with my work. I enjoy building software for recognizable tasks, where the purpose of a feature can be explained through something people already need to do.',
        ],
      },
    ],
    takeaway: 'A familiar daily task can be a strong starting point for a useful application.',
    related: { label: 'Explore my projects', to: '/projects' },
  },
  {
    id: 'building-ezqueue',
    title: 'Building EzQueue: A Booking App for Barbershops and Salons',
    category: 'Mobile Development',
    context: 'EzQueue / Work in progress',
    description:
      'An in-progress mobile project for booking with barbershops and salons in the Philippines, built with Flutter, Dart, Supabase, and PostgreSQL.',
    intro: [
      'EzQueue is an in-progress mobile application for booking with barbershops and salons in the Philippines. It is another step in my interest in building software around practical, everyday needs.',
      'The project brings together Flutter, Dart, Supabase, and PostgreSQL. This article captures its purpose, the technologies I am working with, and the direction I want the booking experience to take.',
    ],
    sections: [
      {
        heading: 'Choosing an everyday problem',
        paragraphs: [
          'A booking connects a customer\'s plans with a shop\'s time. EzQueue focuses on that interaction for barbershops and salons in the Philippines, with the aim of making booking more seamless.',
          'That purpose gives the project a clear direction. As I continue building, I want the application to help people understand the next step in arranging a visit and the details they need to agree on.',
        ],
      },
      {
        heading: 'Continuing my mobile development work',
        paragraphs: [
          'I am using Flutter and Dart for EzQueue, continuing the mobile development work I practiced through CivicPrep. The project\'s stack also includes Supabase and PostgreSQL.',
          'Working on another mobile application gives me a new context for those skills. CivicPrep focuses on exam review and learning progress; EzQueue focuses on booking. That change in purpose is an opportunity to keep developing my approach to application design.',
        ],
      },
      {
        heading: 'Keeping the booking goal clear',
        paragraphs: [
          'As the project develops, I want to keep its main task easy to follow. Clear booking details and understandable next steps are priorities I want to carry into the experience.',
          'These are design goals for the ongoing project. I am using them to think about the direction of the application as I continue building and learning with its stack.',
        ],
      },
      {
        heading: 'Writing while the project is in progress',
        paragraphs: [
          'EzQueue is still in progress. Keeping it in my portfolio gives a view of what I am currently working on alongside my completed projects and previous experience.',
          'For me, it also creates a reason to keep documenting the work. As development moves forward, I can return to the original booking goal and describe how the application takes shape around it.',
        ],
      },
    ],
    takeaway: 'Keep the booking task clear as the product takes shape.',
    related: { label: 'Explore my projects', to: '/projects' },
  },
];

export const blogPosts = articles.map((post) => {
  const words = [post.title, ...post.intro, ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs]), post.takeaway]
    .join(' ')
    .trim()
    .split(/\s+/).length;

  return {
    ...post,
    url: `/blog/${post.id}`,
    readingTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
  };
});
