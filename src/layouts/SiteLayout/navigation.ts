import { GitHub } from "../../components/Icons/GitHub";
import { LinkedIn } from "../../components/Icons/LinkedIn";
import { Pdf } from "../../components/Icons/Pdf";
import { RESUME_URL } from "../../config";

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

// Profile links, shown as icons in the desktop header and the mobile menu.
// Sizes (in the mobile menu, px) even out the icons' visual weight: GitHub's
// mark is a circle with room around it, so it's drawn larger than the solid
// Resume and LinkedIn.
export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/LCapitan",
    Icon: GitHub,
    size: 30,
  },
  { label: "Resume (PDF)", href: RESUME_URL, Icon: Pdf, size: 25 },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/austinmelendez/",
    Icon: LinkedIn,
    size: 25,
  },
];
