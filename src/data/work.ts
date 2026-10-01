export interface WorkItem {
  title: string;
  content: string;
  imgSrc: string;
  imgAlt: string;
  cardLink: string;
  tags: string[];
  // Hidden items stay here for later but aren't shown on the work page.
  hidden?: boolean;
}

export const workItems: WorkItem[] = [
  {
    title: "oura ring",
    content: "oura ring resource hub",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867542/oura-ring_r4myqq.jpg",
    imgAlt: "a screenshot of the oura ring resource hub",
    cardLink: "https://resources.ouraring.com/",
    tags: ["hubspot cms", "hubl", "hubdb", "javascript"],
  },
  {
    title: "piedmont",
    content: "",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867167/piedmont_ekpo58.jpg",
    imgAlt: "a screenshot of the piedmont website",
    cardLink: "https://www.piedmont.org/",
    tags: ["website redesign", "react", "typescript", "sitecore"],
  },
  {
    title: "reid health",
    content: "",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790867050/reid-health_nn92ll.jpg",
    imgAlt: "a screenshot of the reid health website",
    cardLink: "https://reidhealth.org/",
    tags: ["website redesign", "react", "typescript", "sitecore"],
  },
  {
    title: "walnut hill",
    content: "walnut hill school for the arts",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790866582/walnut-hill_fjuc0v.jpg",
    imgAlt: "a screenshot of the walnut hill school for the arts website",
    cardLink: "https://www.walnuthillarts.org/",
    tags: ["ui/ux", "website redesign"],
  },
  {
    title: "ensworth",
    content: "the ensworth school",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1790866152/ensworth_vwoapk.jpg",
    imgAlt: "a screenshot of the ensworth school website",
    cardLink: "https://www.ensworth.com/about",
    tags: ["ui/ux", "website redesign"],
  },
  {
    title: "upitt",
    content: "the university of pittsburgh",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1656677342/pittt_etmsrj.png",
    imgAlt: "a photo of upitt celebrating at a college game",
    cardLink: "https://www.pitt.edu/",
    tags: ["ui/ux", "website redesign", "HTML5", "CSS3", "javascript"],
  },
  {
    title: "curry college",
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
    title: "tukhs",
    content: "the university of kansas health system",
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
    title: "my artwork",
    content: "take a peek if you want to see some of my artwork",
    imgSrc:
      "https://res.cloudinary.com/austinmel/image/upload/v1659499300/c_h_qigysb.jpg",
    imgAlt: "my artwork",
    cardLink: "https://www.instagram.com/shucksworthy/",
    tags: ["illustration", "procreate", "drawing", "hobby"],
    hidden: true,
  },
];
