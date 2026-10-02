import Image from "next/image";

import { CircleArrowLink } from "../../components/ArrowButton";
import { ContactSection } from "../../components/ContactSection";
import { IllustratedHero } from "../../components/IllustratedHero";
import { Punctuated } from "../../components/Punctuated";

import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <>
      <IllustratedHero
        number="404"
        label="Page not found"
        titleSize="heading"
        title={
          <Punctuated>
            Looks like the page you’re fishing for doesn’t exist.
          </Punctuated>
        }
        text="Feel free to reach out if there’s anything specific you’d like for me to include on the site."
        action={<CircleArrowLink href="/" label="Back to home" />}
        className={styles.hero}
        artClassName={styles.art}
        art={
          <Image
            src="/astro-fishing.png"
            alt="Illustration of an astronaut fishing from an asteroid with an empty hook"
            width={1090}
            height={1254}
            quality={100}
            sizes="(max-width: 1099px) 85vw, 680px"
            preload
          />
        }
      />
      <ContactSection number="02" flush />
    </>
  );
}
