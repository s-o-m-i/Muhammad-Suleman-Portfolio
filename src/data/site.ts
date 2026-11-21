export const site = {
  name: "Muhammad Suleman",
  shortName: "M. Suleman",
  firstName: "Muhammad",
  lastName: "Suleman",
  title: "Full-Stack Developer & SEO Specialist",
  location: "Islamabad / Rawalpindi, Pakistan",
  locationShort: "Pakistan",
  email: "sulemandevofficial@gmail.com",
  url: "https://muhammadsuleman.netlify.app",
  github: "https://github.com/s-o-m-i",
  instagram: "https://www.instagram.com/somi_somio/",
  linkedin: "",
  resumePath: "/resume",
  formspreeEndpoint: "https://formspree.io/f/mrekpjeb",
  portrait: {
    src: "/images/portrait/muhammad-suleman.png",
    alt: "Portrait of Muhammad Suleman, Full-Stack Developer and SEO Specialist",
  },
  availability: {
    state: "selective" as const,
    label: "Open to selected conversations",
  },
  seo: {
    title: "Muhammad Suleman | Full-Stack Developer & SEO Specialist",
    description:
      "Muhammad Suleman is a Full-Stack Developer and SEO Specialist from Pakistan, building modern web applications, SaaS platforms and search-optimized digital experiences.",
    keywords: [
      "Muhammad Suleman Developer",
      "Muhammad Suleman Full Stack Developer",
      "Muhammad Suleman SEO Specialist",
      "Full-Stack Developer Pakistan",
      "Next.js developer",
      "MERN stack developer",
      "Technical SEO",
    ],
  },
  hero: {
    kicker: "Independent Developer & SEO Specialist",
    headline: ["Building digital products.", "Growing their visibility."],
    description:
      "I'm Muhammad Suleman, a Full-Stack Developer & SEO Specialist focused on building modern web applications, scalable digital products, and search-optimized experiences that help businesses grow.",
  },
  brand: {
    message: "I build digital products and help them get discovered.",
  },
} as const;

export const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export const socialLinks: { href: string; label: string }[] = [
  { href: site.github, label: "GitHub" },
  { href: site.instagram, label: "Instagram" },
  ...(site.linkedin ? [{ href: site.linkedin, label: "LinkedIn" }] : []),
];
