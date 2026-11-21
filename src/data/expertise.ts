export const disciplines = [
  {
    id: "engineering",
    kicker: "Discipline A",
    title: "Software Engineering",
    description:
      "I design and build web products across the stack — from interfaces and APIs to data models, payments, and deployment.",
    groups: [
      {
        title: "Frontend",
        items: [
          "React.js",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "Material UI",
          "Bootstrap",
          "GSAP",
        ],
      },
      {
        title: "Backend",
        items: [
          "Node.js",
          "Express.js",
          "REST APIs",
          "Authentication",
          "OAuth",
          "Socket.IO",
        ],
      },
      {
        title: "Databases",
        items: ["MongoDB", "PostgreSQL", "Prisma"],
      },
      {
        title: "Payments & Integrations",
        items: ["Stripe", "Third-party APIs"],
      },
      {
        title: "Mobile",
        items: ["React Native", "Expo"],
      },
      {
        title: "CMS & E-commerce",
        items: ["WordPress", "WooCommerce", "Shopify", "Elementor"],
      },
    ],
  },
  {
    id: "seo",
    kicker: "Discipline B",
    title: "SEO & Organic Growth",
    description:
      "I treat search as part of product architecture: structure, content, technical health, and intent — not as an afterthought.",
    groups: [
      {
        title: "Technical SEO",
        items: [
          "Crawlability",
          "Indexability",
          "Technical audits",
          "Website structure",
          "Performance",
        ],
      },
      {
        title: "On-Page SEO",
        items: [
          "Keyword optimization",
          "Metadata",
          "Heading structure",
          "Internal linking",
          "Content optimization",
        ],
      },
      {
        title: "Keyword & Competitor Research",
        items: [
          "Keyword discovery",
          "Niche research",
          "Search intent",
          "Competitor analysis",
        ],
      },
      {
        title: "Content Strategy",
        items: [
          "Topical relevance",
          "Content planning",
          "SEO-friendly information architecture",
        ],
      },
      {
        title: "Off-Page SEO",
        items: ["Backlink research", "Link-building fundamentals"],
      },
      {
        title: "Training",
        items: ["Completed a comprehensive SEO course through iSkills"],
      },
    ],
  },
] as const;
