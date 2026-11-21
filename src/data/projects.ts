export type ProjectFilter = "development" | "seo";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  filters: ProjectFilter[];
  featured: boolean;
  liveUrl?: string;
  role?: string;
  purpose: string;
  contribution: string;
  description: string;
  features: string[];
  stack: string[];
  cover: ProjectImage;
  images: ProjectImage[];
  editorialCover?: {
    kicker: string;
    title: string;
    note: string;
  };
};

export const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "development", label: "Development" },
  { id: "seo", label: "SEO & Digital Growth" },
] as const;

export const projects: Project[] = [
  {
    slug: "fitnessadda",
    name: "FitnessAdda",
    category: "Fitness Technology / Product Development / SaaS",
    filters: ["development", "seo"],
    featured: true,
    liveUrl: "https://fitnessadda.pk",
    role: "Product architecture & full-stack development — web and mobile",
    purpose:
      "A fitness discovery and digital ecosystem for connecting gyms, trainers, fitness enthusiasts, and fitness businesses across Pakistan.",
    contribution:
      "Work included product architecture and development on the Next.js web platform, gym discovery and owner tools, community features, workout tracking, Cloudinary media management, and a React Native / Expo mobile application. The public site also uses SEO-friendly city, area, and category architecture.",
    description:
      "FitnessAdda is a flagship product-engineering project: a national fitness directory and operating layer for gyms, fighting clubs, trainers, events, and member journeys. The platform combines discovery, owner tools, community, and search-oriented landing pages rather than a single marketing site.",
    features: [
      "Gym, trainer, fighting club, and event discovery across Pakistan",
      "Owner tools for listings, media, and gym operations",
      "Community features and member-facing profiles",
      "Workout tracking",
      "Cloudinary media management",
      "City, area, and category landing pages with a public sitemap",
      "React Native / Expo companion application",
    ],
    stack: [
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Cloudinary",
    ],
    cover: {
      src: "/images/projects/fitnessadda.jpg",
      alt: "FitnessAdda homepage showing gym discovery across Pakistan",
    },
    images: [
      {
        src: "/images/projects/fitnessadda.jpg",
        alt: "FitnessAdda homepage with Pakistan map and discovery search",
      },
      {
        src: "/images/projects/fitnessadda-gyms.jpg",
        alt: "FitnessAdda gym listing page for Islamabad with filters and results",
      },
      {
        src: "/images/projects/fitnessadda-hero.png",
        alt: "FitnessAdda mobile homepage hero and discovery controls",
      },
    ],
  },
  {
    slug: "tasbihhub",
    name: "TasbihHub",
    category: "Web Development / SEO / Islamic Digital Platform",
    filters: ["development", "seo"],
    featured: true,
    liveUrl: "https://tasbihhub.com",
    role: "Next.js development, SEO architecture & content strategy",
    purpose:
      "An Islamic digital platform offering accessible digital Dhikr tools and educational content.",
    contribution:
      "Work combined Next.js development with search-focused website architecture: SEO-friendly content structure, technical SEO considerations, keyword research, and content strategy, alongside a straightforward user experience for digital Dhikr.",
    description:
      "TasbihHub is the clearest demonstration of both disciplines together — engineering a usable digital product, then structuring it so people can actually find the tools and educational pages through search. No traffic or ranking claims are published here; the work is in the architecture, content model, and technical foundations.",
    features: [
      "Next.js web platform for digital Dhikr tools",
      "Educational content around Tasbih and daily adhkar",
      "Search-focused information architecture",
      "Technical SEO considerations for crawlability and metadata",
      "Keyword research and content strategy",
      "Accessible, low-friction user experience",
    ],
    stack: ["Next.js", "TypeScript", "SEO-friendly architecture", "Content strategy"],
    cover: {
      src: "/images/projects/tasbihhub.svg",
      alt: "TasbihHub editorial cover — Islamic digital Dhikr platform",
    },
    editorialCover: {
      kicker: "Web + SEO",
      title: "Digital Dhikr, structured for discovery.",
      note: "Live product at tasbihhub.com",
    },
    images: [
      {
        src: "/images/projects/tasbihhub.svg",
        alt: "TasbihHub editorial presentation of the Islamic digital platform",
      },
    ],
  },
  {
    slug: "expresschartnote",
    name: "ExpressChartNote",
    category: "Healthcare SaaS / Full-Stack Development",
    filters: ["development"],
    featured: true,
    liveUrl: "https://app.expresschartnote.com",
    role: "Full-stack MERN development",
    purpose:
      "A medical report generation platform designed to streamline patient and doctor workflows through report creation, review, subscription management, and administration.",
    contribution:
      "Full-stack MERN development covering multi-step report forms, role-based dashboards, Stripe subscriptions, email notifications, and report management.",
    description:
      "ExpressChartNote is a subscription-based medical reporting product. Patients complete structured reports, doctors review them, and access is gated by plan. The system separates patient and administrator experiences while keeping report creation, review, and printing in one workflow.",
    features: [
      "Multi-step medical report forms",
      "Patient and administrator dashboards",
      "Role-based access control",
      "Stripe subscription plans",
      "Email notifications",
      "Report management and printing",
    ],
    stack: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Redux",
      "Stripe",
      "Nodemailer",
      "Tailwind CSS",
    ],
    cover: {
      src: "/images/projects/expresschartnote.png",
      alt: "ExpressChartNote medical reporting platform interface",
    },
    images: [
      {
        src: "/images/projects/expresschartnote.png",
        alt: "ExpressChartNote medical report platform screenshot",
      },
    ],
  },
  {
    slug: "viddeon",
    name: "Viddeon",
    category: "Social Media / Full-Stack Development",
    filters: ["development"],
    featured: true,
    liveUrl: "https://app.viddeon.com",
    role: "Full-stack development — Next.js, Prisma & PostgreSQL",
    purpose:
      "A video-based social platform with authentication, subscriptions, and location-aware product features.",
    contribution:
      "Full-stack development with Next.js, Prisma, and PostgreSQL, including OAuth authentication, Stripe subscriptions, and Leaflet-based location features.",
    description:
      "Viddeon is a social product built around video content, accounts, and paid access. The stack favors a maintainable Next.js application with typed data access, a component system, and payment plus mapping integrations.",
    features: [
      "Video-based social experience",
      "Authentication and OAuth",
      "Subscription functionality",
      "Stripe payment integration",
      "Location-based features with Leaflet",
      "Responsive interface with Shadcn UI",
    ],
    stack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "OAuth",
      "Leaflet",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    cover: {
      src: "/images/projects/viddeon-signup.png",
      alt: "Viddeon sign-up and product interface",
    },
    images: [
      {
        src: "/images/projects/viddeon-signup.png",
        alt: "Viddeon authentication and onboarding screen",
      },
      {
        src: "/images/projects/viddeon-feed.png",
        alt: "Viddeon social feed interface",
      },
      {
        src: "/images/projects/viddeon-profile.png",
        alt: "Viddeon profile and dashboard interface",
      },
    ],
  },
  {
    slug: "qdoptixal",
    name: "Qdoptixal",
    category: "E-commerce / WordPress Development",
    filters: ["development"],
    featured: true,
    liveUrl: "https://qdoptixal.com",
    role: "WordPress & WooCommerce customization",
    purpose:
      "An automotive parts e-commerce store with customized WooCommerce workflows, 3D product viewing, and a store locator.",
    contribution:
      "WordPress and WooCommerce customization, including 3D product visualization, store locator work, custom fields, and store-specific functionality. Built for a client in the automotive parts space.",
    description:
      "Qdoptixal is a specialized WooCommerce shop rather than a generic catalog. The work sits in WordPress customization: product presentation, store discovery, and the extra fields and flows automotive parts retail needs.",
    features: [
      "Automotive parts e-commerce catalog",
      "WooCommerce customization",
      "3D product visualization",
      "Store locator",
      "Custom WordPress functionality and Advanced Custom Fields",
    ],
    stack: [
      "WordPress",
      "WooCommerce",
      "PHP",
      "JavaScript",
      "Advanced Custom Fields",
    ],
    cover: {
      src: "/images/projects/qdoptixal.png",
      alt: "Qdoptixal automotive parts e-commerce website",
    },
    images: [
      {
        src: "/images/projects/qdoptixal.png",
        alt: "Qdoptixal homepage and brand presentation",
      },
      {
        src: "/images/projects/qdoptixal-solutions.png",
        alt: "Qdoptixal solutions categories page for car care and heavy-duty trucking",
      },
      {
        src: "/images/projects/qdoptixal-store.png",
        alt: "Qdoptixal octane booster product comparison page",
      },
    ],
  },
  {
    slug: "devmola",
    name: "DevMola",
    category: "Agency Website / Next.js",
    filters: ["development"],
    featured: false,
    liveUrl: "https://devmola.com",
    purpose:
      "A software agency website with a distinctive interface, motion, and booking/contact flows.",
    contribution:
      "Next.js development with GSAP motion, responsive UI, and integrated contact and scheduling surfaces.",
    description:
      "DevMola is a marketing and presence site for a software studio. The work focuses on custom UI, scroll-driven motion, and practical conversion paths rather than a template theme.",
    features: [
      "Custom Next.js front-end",
      "GSAP animation and scroll-triggered motion",
      "Responsive layout",
      "Contact and scheduling integrations",
    ],
    stack: ["Next.js", "GSAP", "Tailwind CSS", "Formly", "Calendly"],
    cover: {
      src: "/images/projects/devmola.png",
      alt: "DevMola software agency website",
    },
    images: [
      {
        src: "/images/projects/devmola.png",
        alt: "DevMola agency website screenshot",
      },
    ],
  },
  {
    slug: "innovazy",
    name: "Innovazy",
    category: "Agency Website / Multilingual",
    filters: ["development"],
    featured: false,
    purpose:
      "A software house website with English and Arabic support, scheduling, and contact workflows.",
    contribution:
      "Gatsby development with GraphQL data, i18n including Arabic RTL support, Formik forms, Calendly, and a Nodemailer backend for messages.",
    description:
      "Innovazy was a multilingual agency site built in Gatsby. The demanding part was internationalization — especially Arabic — together with form and scheduling integrations on a static site architecture.",
    features: [
      "Gatsby and React front-end",
      "Arabic and English language switching with RTL support",
      "Calendly meeting booking",
      "Formik-powered forms",
      "Nodemailer email backend",
    ],
    stack: ["Gatsby", "React", "GraphQL", "i18n", "Formik", "Nodemailer"],
    cover: {
      src: "/images/projects/innovazy.png",
      alt: "Innovazy multilingual software house website",
    },
    images: [
      {
        src: "/images/projects/innovazy.png",
        alt: "Innovazy website screenshot",
      },
    ],
  },
  {
    slug: "izarchviz",
    name: "Izarchviz",
    category: "WordPress / Architectural Visualization",
    filters: ["development"],
    featured: false,
    liveUrl: "https://izarchviz.com",
    purpose:
      "A portfolio site for an architectural visualization studio, built to showcase high-resolution work and collect inquiries.",
    contribution:
      "Custom WordPress theme and content model: project post types, blog, contact forms, testimonials workflow, and ACF-driven content.",
    description:
      "Izarchviz is a visual portfolio first. The WordPress build is there to let the studio publish projects and capture leads without fighting the CMS.",
    features: [
      "Custom WordPress theme",
      "Dynamic project portfolio",
      "Blog section",
      "Contact forms",
      "Testimonial collection and display",
    ],
    stack: ["WordPress", "Advanced Custom Fields", "PHP", "JavaScript"],
    cover: {
      src: "/images/projects/izarchviz.png",
      alt: "Izarchviz architectural visualization website",
    },
    images: [
      {
        src: "/images/projects/izarchviz.png",
        alt: "Izarchviz project showcase website",
      },
    ],
  },
  {
    slug: "bannds",
    name: "Bannds",
    category: "WordPress / Independent Artist Platform",
    filters: ["development"],
    featured: false,
    liveUrl: "https://beige-chimpanzee-949619.hostingersite.com/homee/",
    purpose:
      "A WordPress platform for independent artists to present work and publish supporting content.",
    contribution:
      "WordPress development with portfolio presentation and integrated blogging.",
    description:
      "Bannds combines artist-facing pages with a blog, so the site can hold both work and writing without a separate stack.",
    features: [
      "Artist-oriented WordPress site",
      "Portfolio presentation",
      "Integrated blog",
      "Responsive theme customization",
    ],
    stack: ["WordPress", "PHP", "JavaScript"],
    cover: {
      src: "/images/projects/bannds.png",
      alt: "Bannds independent artist WordPress platform",
    },
    images: [
      {
        src: "/images/projects/bannds.png",
        alt: "Bannds website screenshot",
      },
    ],
  },
  {
    slug: "my-site-solution",
    name: "My Site Solution",
    category: "Full-Stack / Construction Jobs",
    filters: ["development"],
    featured: false,
    liveUrl: "https://my-site-solution.web.app/",
    purpose:
      "A construction job platform connecting workers and employers, with role-based accounts and real-time updates.",
    contribution:
      "React front-end with Material UI, Firebase authentication, realtime data, and separate worker/employer flows.",
    description:
      "My Site Solution is a two-sided job board for construction. Firebase covers auth, data, and hosting; the UI splits worker and employer experiences.",
    features: [
      "Worker and employer authentication",
      "Role-based dashboards",
      "Real-time job posting and application updates",
      "Material UI interface",
    ],
    stack: ["React.js", "Firebase", "Material UI"],
    cover: {
      src: "/images/projects/mysitesolution.png",
      alt: "My Site Solution construction job platform",
    },
    images: [
      {
        src: "/images/projects/mysitesolution.png",
        alt: "My Site Solution application screenshot",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getAdditionalProjects() {
  return projects.filter((project) => !project.featured);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: projects[index - 1],
    next: projects[index + 1],
  };
}
