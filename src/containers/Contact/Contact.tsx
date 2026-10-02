import Image from "next/image";

import { ArrowButton } from "../../components/ArrowButton";
import { ContactSection } from "../../components/ContactSection";
import { IllustratedHero } from "../../components/IllustratedHero";
import { Punctuated } from "../../components/Punctuated";
import { CONTACT_EMAIL } from "../../config";

import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <>
      <IllustratedHero
        number="01"
        label="Contact"
        title={<Punctuated>Let’s build something great together.</Punctuated>}
        action={
          <ArrowButton href={`mailto:${CONTACT_EMAIL}`} label="Email me" />
        }
        className={styles.hero}
        titleClassName={styles.title}
        artClassName={styles.art}
        art={
          <Image
            src="/astro-with-a-paper-plane.png"
            alt="Illustration of an astronaut on an asteroid throwing a paper plane"
            width={1523}
            height={883}
            quality={100}
            sizes="(max-width: 1099px) 100vw, 930px"
            preload
          />
        }
      />
      <ContactSection number="02" flush />
    </>
  );
}
