import { CONTACT_EMAIL } from "../../config";

export const contactHref = `mailto:${CONTACT_EMAIL}`;

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: contactHref },
];

export const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: contactHref },
];
