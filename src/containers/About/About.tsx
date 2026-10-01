import Image from "next/image";

import styles from "./About.module.scss";
import { Button } from "../../components";
import { RESUME_URL, SHOW_BLOG } from "../../config";

const heroSrc =
  "https://res.cloudinary.com/austinmel/image/upload/v1790868914/me_ytr3vn.jpg";
const heroAlt = "me hiking in Arizona";

const About = () => {
  return (
    <div className={styles.about}>
      <div className="stars"></div>
      <div className={styles.heroImg}>
        <div className={styles.desktop}>
          <Image
            src={heroSrc}
            alt={heroAlt}
            width={1902}
            height={1047}
            sizes="(max-width: 1300px) 100vw, 1300px"
            style={{ width: "100%", height: "auto" }}
            preload
          />
        </div>
        <div className={styles.mobile}>
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.pageHeading}>
          <h1 className={styles.pageTitle}>Hey, I&#39;m Austin.</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.paragraph}>
            I&#39;m a Senior Front-End Developer currently living in Miami, Florida and working at MERGE, where I spend my days building digital experiences for a wide range of clients.
          </div>

          <div className={styles.paragraph}>
            My path into development actually started with art and design. I&#39;ve been drawing for as long as I can remember and started teaching myself Adobe&#39;s Creative Suite when I was in sixth grade. That eventually led me into graphic and product design, and somewhere along the way I discovered development. I loved that it gave me another way to create—just with a different set of tools.
          </div>

          <div className={styles.paragraph}>
            That background still has a big influence on how I work today. I care just as much about how an experience looks and feels as I do about how it&#39;s built. I enjoy taking a design, understanding the thinking behind it, and figuring out how to bring it to life in a way that&#39;s thoughtful, performant, and built to last.
          </div>

          <div className={styles.paragraph}>
            Over the years I&#39;ve worked across design, product, and development, and today my focus is primarily front-end engineering. I&#39;m always looking for interesting problems to solve, new things to learn, and opportunities to build something I&#39;m proud of.
          </div>

          <div className={styles.paragraph}>
            Outside of work, I&#39;m usually finding another creative rabbit hole to fall into. I love watches, leathercraft, music, hiking, traveling, and generally making things with my hands whenever I get the chance.
          </div>
        </div>
        <div className={styles.actions}>
          <Button url={RESUME_URL} external label="view my resume" />
          {SHOW_BLOG ? (
            <Button url="/blog" label="more about me" secondary />
          ) : (
            <Button url="/work" label="see my work" secondary />
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
