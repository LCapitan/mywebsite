import type { MouseEvent } from "react";
import Image from "next/image";

import { CircleArrowLink } from "../../components/ArrowButton";
import { ContactSection } from "../../components/ContactSection";
import { HeroSky } from "../../components/HeroSky";
import { Orbit } from "../../components/Orbit";
import { Punctuated } from "../../components/Punctuated";
import { Reveal } from "../../components/Reveal";
import { SectionLabel } from "../../components/SectionLabel";

import styles from "./About.module.scss";

const portrait =
  "https://res.cloudinary.com/austinmel/image/upload/v1791056277/IMG_0030_hogihv.jpg";

const beyondWorkPhoto =
  "https://res.cloudinary.com/austinmel/image/upload/v1791302584/me-and-caro_bqrzdg_lsj5bm.jpg";

const history = [
  "I’m a Senior Front-End Developer currently living in Miami, Florida and working at MERGE, where I spend my days building digital experiences for a wide range of clients.",
  "My path into development actually started with art and design. I’ve been drawing for as long as I can remember and started teaching myself Adobe’s Creative Suite when I was in sixth grade. That eventually led me into graphic and product design, and somewhere along the way I discovered development. I loved that it gave me another way to create, just with a different set of tools.",
  "That background still has a big influence on how I work today. I care just as much about how an experience looks and feels as I do about how it’s built. I enjoy taking a design, understanding the thinking behind it, and figuring out how to bring it to life in a way that’s thoughtful, performant, and built to last.",
  "Over the years I’ve worked across design, product, and development, and today my focus is primarily front-end engineering. I’m always looking for interesting problems to solve, new things to learn, and opportunities to build something I’m proud of.",
];

// Glides down to the history section instead of jumping.
function scrollToHistory(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("history");
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
}

export default function About() {
  return (
    <>
      <section className={styles.hero}>
        <HeroSky anchor="top" />
        <div className={styles.heroContent}>
          <div>
            <SectionLabel number="01">About</SectionLabel>
            <Reveal as="h1" className={styles.heroTitle} delay={150}>
              <Punctuated>I’ve always loved making things.</Punctuated>
            </Reveal>
            <Reveal as="p" className={styles.text} delay={300}>
              My path into development started with a love for art and design.
              Over time, that curiosity turned into a career building digital
              experiences - combining creativity, logic, and problem solving to
              make things that are both beautiful and functional.
            </Reveal>
            <Reveal className={styles.action} delay={450}>
              <CircleArrowLink
                href="#history"
                label="Read more about me"
                direction="down"
                onClick={scrollToHistory}
              />
            </Reveal>
          </div>
          <Reveal variant="clip" className={styles.portrait} delay={200}>
            <Image
              src={portrait}
              alt="Austin walking past a colorful painted mural"
              fill
              sizes="(max-width: 1099px) 100vw, 530px"
              preload
            />
          </Reveal>
        </div>
      </section>

      <section id="history" className={styles.history}>
        <Orbit
          ellipse
          className={styles.historyOrbit}
          line="dotted"
          moons={[{ angle: 63, size: 20 }]}
          duration={140}
        />
        <SectionLabel number="02">History</SectionLabel>
        <div className={styles.historyText}>
          {history.map((paragraph, i) => (
            <Reveal as="p" key={i} delay={i === 0 ? 120 : 0}>
              {paragraph}
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.beyond}>
        <Orbit
          ellipse
          className={styles.beyondOrbit}
          moons={[{ angle: -128, size: 17 }]}
          duration={150}
          reverse
        />
        <Reveal variant="clip" className={styles.beyondPhoto}>
          <Image
            src={beyondWorkPhoto}
            alt="Austin and his wife Caro in the mountains"
            fill
            sizes="(max-width: 1099px) 100vw, 645px"
          />
        </Reveal>
        <SectionLabel number="03" className={styles.beyondLabel}>
          Beyond work
        </SectionLabel>
        <Reveal as="h2" className={styles.beyondHeading}>
          <Punctuated>Life away from the screen.</Punctuated>
        </Reveal>
        <Reveal as="p" className={styles.beyondText} delay={120}>
          Outside of work, I’m usually finding another creative rabbit hole to
          fall into. I love watches, leathercraft, music, hiking, traveling
          with my wife, and generally making things with my hands whenever I
          get the chance.
        </Reveal>
        <Reveal className={styles.beyondAction} delay={240}>
          <CircleArrowLink href="/work" label="See my work" />
        </Reveal>
      </section>

      <ContactSection number="04" />
    </>
  );
}
