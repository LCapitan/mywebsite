import Image from "next/image";

import { ArrowButton, CircleArrowLink } from "../../components/ArrowButton";
import { ContactSection } from "../../components/ContactSection";
import { FeaturedCard } from "../../components/FeaturedCard";
import { HeroSky } from "../../components/HeroSky";
import { Orbit } from "../../components/Orbit";
import { Punctuated } from "../../components/Punctuated";
import { Reveal, RevealLines } from "../../components/Reveal";
import { SectionLabel } from "../../components/SectionLabel";
import { workItems } from "../../data/work";

import styles from "./Home.module.scss";

const featuredWork = workItems
  .filter((item) => item.featured)
  .sort((a, b) => a.featured! - b.featured!);

const pillars = ["Explore", "Create", "Solve"];

function ViewAllProjects({ className }: { className?: string }) {
  return (
    <CircleArrowLink
      href="/work"
      label="View all projects"
      className={className}
    />
  );
}

export function Home() {
  return (
    <>
      <section className={styles.hero}>
        <HeroSky anchor="bottom" planet />

        <div className={styles.heroContent}>
          <SectionLabel number="01">Hi, I&#39;m Austin and I</SectionLabel>
          <RevealLines
            className={styles.heroTitle}
            lines={["Design.", "Develop.", "Create."].map((line) => (
              <Punctuated key={line}>{line}</Punctuated>
            ))}
            delay={150}
          />
          <Reveal as="p" className={styles.heroText} delay={450}>
            I build thoughtful, high quality web experiences that solve real
            problems and bring great designs to life.
          </Reveal>
          <Reveal className={styles.action} delay={600}>
            <ArrowButton href="/work" label="View my work" />
          </Reveal>
        </div>

        <Reveal variant="fade" className={styles.heroArt} delay={300}>
          <Image
            // e_trim crops the transparent space around the artwork.
            src="https://res.cloudinary.com/austinmel/image/upload/e_trim/v1790958160/astro_ljjcsq.png"
            alt="Illustration of an astronaut working on a laptop on the moon"
            width={1596}
            height={725}
            sizes="(max-width: 767px) 127vw, (max-width: 1099px) 100vw, 1043px"
            preload
          />
        </Reveal>
      </section>

      <section className={styles.featured} aria-labelledby="featured-work">
        <Orbit
          className={styles.featuredOrbit}
          line="dotted"
          moons={[{ angle: 63, size: 20 }]}
          duration={140}
        />
        <div className={styles.featuredHead}>
          <SectionLabel number="02" as="h2" id="featured-work">
            Featured work
          </SectionLabel>
          <ViewAllProjects className={styles.viewAllTop} />
        </div>
        <ul className={styles.cards}>
          {featuredWork.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 120}>
              <FeaturedCard item={item} index={i + 1} />
            </Reveal>
          ))}
        </ul>
        <ViewAllProjects className={styles.viewAllBottom} />
      </section>

      <section className={styles.about}>
        <Orbit
          className={styles.aboutOrbit}
          moons={[{ angle: -127, size: 17 }]}
          duration={150}
          reverse
        />
        <SectionLabel number="03" className={styles.aboutLabel}>
          About me
        </SectionLabel>
        <Reveal as="h2" className={styles.heading}>
          <Punctuated>Built on curiosity and creativity.</Punctuated>
        </Reveal>
        <Reveal as="p" className={styles.text} delay={120}>
          I&#39;m a senior developer and product designer with a passion for
          building clean, performant, and thoughtful web experiences. I enjoy
          turning complex problems into simple, intuitive solutions, and
          I&#39;m always looking for new things to learn and explore.
        </Reveal>
        <Reveal className={styles.action} delay={240}>
          <ArrowButton href="/about" label="More about me" />
        </Reveal>
        <Reveal variant="clip" className={styles.aboutPhoto}>
          <Image
            src="https://res.cloudinary.com/austinmel/image/upload/v1790868836/IMG_1154_oiifty.jpg"
            alt="Austin standing in the Arizona desert"
            fill
            sizes="(max-width: 1099px) 100vw, 480px"
          />
        </Reveal>
        <ol className={styles.pillars}>
          {pillars.map((pillar, i) => (
            <Reveal as="li" key={pillar} delay={200 + i * 120}>
              <span className={styles.pillarNumber}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {pillar}
            </Reveal>
          ))}
        </ol>
      </section>

      <ContactSection number="04" />
    </>
  );
}
