export interface WorkItem {
  title: string;
  content: string;
  imgSrc: string;
  imgAlt: string;
  cardLink: string;
  tags: string[];
  // Hidden items stay here for later but aren't shown on the work page.
  hidden?: boolean;
  // Position in the homepage's featured work row (1 = first). Featured cards
  // show the first three tags.
  featured?: number;
  // Projects with a case study open it from the work page (at /work/<slug>)
  // instead of linking straight to the live site.
  caseStudy?: CaseStudy;
}

export interface CaseImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CaseStudy {
  slug: string;
  role: string;
  agency: string;
  platform: string;
  year: string;
  overview: {
    heading: string;
    text: string;
    tags: string[];
  };
  development: {
    heading: string;
    // Shown in two columns on desktop, each with an optional heading.
    paragraphs: { heading?: string; text: string }[];
  };
  images: {
    // A device mockup (transparent background) beside the hero text.
    hero: CaseImage;
    // A desktop screenshot and a phone screenshot for "The experience".
    desktop: CaseImage;
    phone: CaseImage;
  };
}

export const workItems: WorkItem[] = [
  {
    title: "OURA",
    content: "A resource hub for OURA Ring built on HubSpot",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867542/oura-ring_r4myqq.jpg",
    imgAlt: "a screenshot of the OURA Ring resource hub",
    cardLink: "https://resources.ouraring.com/",
    tags: ["hubspot cms", "hubdb", "hubl", "javascript"],
    featured: 1,
    caseStudy: {
      slug: "oura",
      role: "Front-End Dev",
      agency: "MERGE",
      platform: "HubSpot",
      year: "2026",
      overview: {
        heading: "Building a better way to explore OURA.",
        text: "OURA needed a content-driven resource hub to help educate and inspire their growing community. MERGE designed and built a new experience on HubSpot, and I was responsible for front-end development - bringing the design to life and ensuring a performant, accessible, and scalable implementation.",
        tags: [
          "hubspot cms",
          "hubdb",
          "hubl",
          "javascript",
          "custom theme",
          "front-end development",
          "responsive",
          "accessibility",
        ],
      },
      development: {
        heading: "Driven by HubDB.",
        paragraphs: [
          {
            text: "I built the Resource Hub as a custom HubSpot CMS theme that gave OURA a library that behaves consistently everywhere and kept authors from having to make layout decisions they shouldn't have to make. The hub runs on a single coded template where one file renders the main listings, six filtered category views, and two distinct article detail layouts.",
          },
          {
            text: "Every resource page is generated dynamically from a HubDB table, so publishing a new resource means filling in a row or adding content to specified fields, not building a page from scratch. The listing merges that table with the blog into one unified, date-sorted feed, so new content surfaces automatically.",
          },
        ],
      },
      images: {
        // Cropped to the laptop (the original has wide transparent margins).
        hero: {
          src: "https://res.cloudinary.com/austinmel/image/upload/c_crop,x_276,y_397,w_6942,h_4014/c_scale,w_2400/v1791240502/oura-hero_sxwt0i.png",
          width: 2400,
          height: 1388,
          alt: "The OURA for Organizations resources page on a laptop",
        },
        desktop: {
          src: "https://res.cloudinary.com/austinmel/image/upload/v1791240419/oura-experience_fvhdoq.png",
          width: 3014,
          height: 1502,
          alt: "The latest resources grid on the OURA for Organizations site",
        },
        phone: {
          src: "https://res.cloudinary.com/austinmel/image/upload/v1791240419/oura-phone_nupjnl.png",
          width: 618,
          height: 1346,
          alt: "The OURA for Organizations resources page on a phone",
        },
      },
    },
  },
  {
    title: "Piedmont",
    content: "A health system redesign on headless Sitecore",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867167/piedmont_ekpo58.jpg",
    imgAlt: "a screenshot of the piedmont website",
    cardLink: "https://www.piedmont.org/",
    tags: ["react", "typescript", "sitecore headless", "website redesign"],
    featured: 3,
    caseStudy: {
      slug: "piedmont",
      role: "Front-End Dev",
      agency: "MERGE",
      platform: "Sitecore",
      year: "2025",
      overview: {
        heading: "Redesigning care for Piedmont.",
        text: "Piedmont needed a website that did more than describe its services. Patients come to a health system's site with a job to do: find care nearby, see how long the wait is, book an appointment, or check their health records. The old experience made them work too hard for those answers. Piedmont's content team also needed to publish and update pages quickly without waiting on developers.",
        tags: [
          "sitecore headless",
          "sitecore jss",
          "next.js",
          "react",
          "typescript",
          "storybook",
          "accessibility",
          "website redesign",
        ],
      },
      development: {
        heading: "Built on headless Sitecore.",
        paragraphs: [
          {
            heading: "A Modern Headless Platform",
            text: "We paired Sitecore’s content management capabilities with a Next.js frontend using Sitecore JSS. This allowed the frontend and backend teams to work independently while maintaining a shared content model. Reusable components were developed and tested in Storybook, creating a scalable design system that could grow with the site.",
          },
          {
            heading: "Making Care Easier to Find",
            text: "One of the biggest priorities was helping patients quickly find the right care. We built search experiences for providers, locations, services, and immediate care, with filtering, sorting, location-based results, and interactive maps. A persistent quick-access experience also gives patients access to important actions like Find Care and MyChart from anywhere on the site.",
          },
          {
            heading: "Connecting Patients to MyChart",
            text: "We integrated Epic MyChart using SMART on FHIR, allowing patients to securely sign in and access personalized healthcare experiences without storing their health information on Piedmont’s web servers.",
          },
          {
            heading: "Smarter Search",
            text: "Piedmont manages a large amount of healthcare content, so we created search experiences tailored to different content types. Patients can quickly search and filter providers, locations, medical services, articles, news, and patient stories rather than navigating through traditional page hierarchies.",
          },
          {
            heading: "Built for Content Authors",
            text: "We created a library of roughly 50 reusable components that Piedmont’s content team can assemble directly within Sitecore. Components, global settings, SEO controls, and structured content were designed to give editors more control while reducing their dependency on developers.",
          },
          {
            heading: "Accessibility at Every Step",
            text: "Accessibility was considered throughout development, including keyboard navigation, screen-reader support, focus management, responsive interactions, and mobile usability. The goal was simple: make essential healthcare information easy to access regardless of device or ability.",
          },
          {
            heading: "Reliable Delivery",
            text: "Automated GitHub Actions pipelines supported development, QA, staging, and production environments. This allowed the team to continuously ship improvements while maintaining a stable production experience throughout a large, long-running implementation.",
          },
        ],
      },
      images: {
        // Cropped to the laptop (the original has wide transparent margins).
        hero: {
          src: "https://res.cloudinary.com/austinmel/image/upload/c_crop,x_276,y_397,w_6942,h_4014/c_scale,w_2400/v1791289776/piedmont-hero_hkv5zv.png",
          width: 2400,
          height: 1388,
          alt: "The Piedmont find immediate care page on a laptop",
        },
        desktop: {
          src: "https://res.cloudinary.com/austinmel/image/upload/v1791289776/piedmont-experience-wide_t62yid.png",
          width: 2772,
          height: 1508,
          alt: "The Piedmont find a service page",
        },
        phone: {
          src: "https://res.cloudinary.com/austinmel/image/upload/v1791289776/piedmont-experience-mobile_nmvcek.png",
          width: 620,
          height: 1344,
          alt: "The Piedmont homepage on a phone",
        },
      },
    },
  },
  {
    title: "Reid Health",
    content: "A health system redesign built on Sitecore",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867050/reid-health_nn92ll.jpg",
    imgAlt: "a screenshot of the reid health website",
    cardLink: "https://reidhealth.org/",
    tags: ["website redesign", "react", "typescript", "sitecore"],
  },
  {
    title: "Walnut Hill",
    content: "A website redesign for an arts high school",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790958208/walnut_hill_btpzw3.webp",
    imgAlt: "the walnut hill school for the arts campus",
    cardLink: "https://www.walnuthillarts.org/",
    tags: ["website redesign", "ui/ux"],
    featured: 2,
  },
  {
    title: "Ensworth",
    content: "A website redesign for a Nashville K–12 school",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790866152/ensworth_vwoapk.jpg",
    imgAlt: "a screenshot of the ensworth school website",
    cardLink: "https://www.ensworth.com/about",
    tags: ["ui/ux", "website redesign"],
  },
  {
    title: "UPitt",
    content: "A redesign for the University of Pittsburgh",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1656677342/pittt_etmsrj.png",
    imgAlt: "a photo of upitt celebrating at a college game",
    cardLink: "https://www.pitt.edu/",
    tags: ["ui/ux", "website redesign", "HTML5", "CSS3", "javascript"],
  },
  {
    title: "Curry College",
    content: "A college redesign built on Ingeniux",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1656677312/curry_nrh65v.jpg",
    imgAlt: "curry college",
    cardLink: "https://www.curry.edu/",
    tags: [
      "ui/ux",
      "website redesign",
      "HTML5",
      "CSS3",
      "javascript",
      "ingeniux",
    ],
  },
  {
    title: "TUKHS",
    content: "The University of Kansas Health System",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1656677311/tukhs_gcph7g.jpg",
    imgAlt: "tukhs",
    cardLink: "https://www.kansashealthsystem.com/",
    tags: [
      "ui/ux",
      "website redesign",
      "HTML5",
      "CSS3",
      "javascript",
      "sitecore",
    ],
  },
  {
    title: "My Artwork",
    content: "Take a peek if you want to see some of my artwork",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1659499300/c_h_qigysb.jpg",
    imgAlt: "my artwork",
    cardLink: "https://www.instagram.com/shucksworthy/",
    tags: ["illustration", "procreate", "drawing", "hobby"],
    hidden: true,
  },
];

export const caseStudyItems = workItems.filter(
  (item): item is WorkItem & { caseStudy: CaseStudy } => !!item.caseStudy,
);
