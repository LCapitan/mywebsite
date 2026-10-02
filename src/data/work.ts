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
}

export const workItems: WorkItem[] = [
  {
    title: "Oura",
    content: "A resource hub for Oura Ring built on HubSpot",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867542/oura-ring_r4myqq.jpg",
    imgAlt: "a screenshot of the oura ring resource hub",
    cardLink: "https://resources.ouraring.com/",
    tags: ["hubspot cms", "hubdb", "hubl", "javascript"],
    featured: 1,
  },
  {
    title: "Piedmont",
    content: "Piedmont Healthcare System redesign and replatform",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867167/piedmont_ekpo58.jpg",
    imgAlt: "a screenshot of the piedmont website",
    cardLink: "https://www.piedmont.org/",
    tags: ["react", "typescript", "sitecore headless", "website redesign"],
    featured: 3,
  },
  {
    title: "Reid Health",
    content: "",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867050/reid-health_nn92ll.jpg",
    imgAlt: "a screenshot of the reid health website",
    cardLink: "https://reidhealth.org/",
    tags: ["website redesign", "react", "typescript", "sitecore"],
  },
  {
    title: "Walnut Hill",
    content: "Walnut Hill School for the Arts",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790958208/walnut_hill_btpzw3.webp",
    imgAlt: "the walnut hill school for the arts campus",
    cardLink: "https://www.walnuthillarts.org/",
    tags: ["website redesign", "ui/ux"],
    featured: 2,
  },
  {
    title: "Ensworth",
    content: "The Ensworth School",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790866152/ensworth_vwoapk.jpg",
    imgAlt: "a screenshot of the ensworth school website",
    cardLink: "https://www.ensworth.com/about",
    tags: ["ui/ux", "website redesign"],
  },
  {
    title: "UPitt",
    content: "The University of Pittsburgh",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1656677342/pittt_etmsrj.png",
    imgAlt: "a photo of upitt celebrating at a college game",
    cardLink: "https://www.pitt.edu/",
    tags: ["ui/ux", "website redesign", "HTML5", "CSS3", "javascript"],
  },
  {
    title: "Curry College",
    content: "",
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
