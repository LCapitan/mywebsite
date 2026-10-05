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
    // Shown in two columns on desktop.
    paragraphs: string[];
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
        tags: ["hubspot cms", "front-end development", "responsive", "accessibility"],
      },
      development: {
        heading: "Driven by HubDB.",
        paragraphs: [
          "I built the Resource Hub as a custom HubSpot CMS theme that gave OURA a library that behaves consistently everywhere and kept authors from having to make layout decisions they shouldn't have to make. The hub runs on a single coded template where one file renders the main listings, six filtered category views, and two distinct article detail layouts.",
          "Every resource page is generated dynamically from a HubDB table, so publishing a new resource means filling in a row or adding content to specified fields, not building a page from scratch. The listing merges that table with the blog into one unified, date-sorted feed, so new content surfaces automatically.",
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
