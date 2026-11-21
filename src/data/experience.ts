export type Experience = {
  id: string;
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
  recognition?: {
    title: string;
    detail: string;
    image?: { src: string; alt: string };
  };
};

export const experiences: Experience[] = [
  {
    id: "aubi-kamaan",
    company: "Aubi / Kamaan Solutions",
    title: "Full-Stack Developer",
    location: "Pakistan",
    start: "2026",
    end: "Present",
    current: true,
    summary:
      "Current professional role focused on full-stack product development.",
    highlights: [],
    technologies: [],
  },
  {
    id: "techy-jeeves",
    company: "Techy Jeeves",
    title: "Full Stack Developer",
    location: "Pakistan",
    start: "Jul 2025",
    end: "May 2026",
    summary:
      "Full-stack development inside a digital services studio spanning web platforms, application delivery, and search-oriented work.",
    highlights: [
      "Built and shipped full-stack web work using modern JavaScript frameworks.",
      "Worked across product delivery in an environment that also covers web, app, and SEO services.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    id: "code-frenetics",
    company: "Code Frenetics",
    title: "Full Stack Developer",
    location: "Rawalpindi, Pakistan",
    start: "Jul 2024",
    end: "Jun 2025",
    summary:
      "Full-stack development in a professional software company, contributing to production web work across the MERN stack and related tools.",
    highlights: [
      "Delivered full-stack features in a collaborative production environment.",
      "Worked with modern JavaScript frameworks, APIs, and client-facing web products.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "Tailwind CSS",
    ],
    recognition: {
      title: "Employee of the Month",
      detail: "Awarded by Code Frenetics for contribution and commitment.",
      image: {
        src: "/images/certificates/employee-of-the-month.jpeg",
        alt: "Code Frenetics Employee of the Month certificate awarded to M. Suleman",
      },
    },
  },
];
