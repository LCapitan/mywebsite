import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import cx from "classnames";

import { CircleArrow } from "../../components/ArrowButton";
import { ContactSection } from "../../components/ContactSection";
import { SectionLabel } from "../../components/SectionLabel";
import { workItems, type WorkItem } from "../../data/work";

import styles from "./Work.module.scss";

const projects = workItems.filter((item) => !item.hidden);

// Degrees between neighbouring cards on the wheel.
const STEP_ANGLE = 28;

const pad = (n: number) => String(n).padStart(2, "0");

// Scroll position (in projects) -> wheel position. Each project holds still
// in the active spot for part of its scroll, then eases round to the next,
// like the click of a watch's date wheel.
function detent(progress: number) {
  const whole = Math.floor(progress);
  const t = progress - whole;
  const hold = 0.25;
  if (t <= hold) return whole;
  if (t >= 1 - hold) return whole + 1;
  const x = (t - hold) / (1 - 2 * hold);
  const eased = x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
  return whole + eased;
}

function Details({ item, index }: { item: WorkItem; index: number }) {
  return (
    <div className={styles.details}>
      <h1 className={styles.title}>{item.title}</h1>
      {item.content && <p className={styles.description}>{item.content}</p>}
      <ul className={styles.tags}>
        {item.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p className={styles.counter}>
        {pad(index + 1)} <span>/ {pad(projects.length)}</span>
      </p>
    </div>
  );
}

function ProjectCard({
  item,
  active,
  onFocus,
}: {
  item: WorkItem;
  active: boolean;
  onFocus?: () => void;
}) {
  return (
    <a
      href={item.cardLink}
      target="_blank"
      rel="noreferrer"
      className={cx(styles.card, active && styles.active)}
      onFocus={onFocus}
    >
      <Image
        src={item.imgSrc}
        alt={item.imgAlt}
        fill
        sizes="(max-width: 1099px) 80vw, 460px"
        className={styles.image}
      />
      <span className={styles.cardLink}>
        View website
        <CircleArrow filled={active} />
      </span>
    </a>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const spokeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRef = useRef<HTMLUListElement>(null);

  // Wheel layout: page scroll turns the wheel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      // Hidden (phones, reduced motion): the row layout is in charge.
      if (!track.offsetParent) return;
      const scrollable = track.offsetHeight - window.innerHeight;
      const step = scrollable / Math.max(projects.length - 1, 1);
      const progress = Math.min(
        Math.max(-track.getBoundingClientRect().top / step, 0),
        projects.length - 1,
      );
      const position = detent(progress);

      spokeRefs.current.forEach((spoke, i) => {
        if (!spoke) return;
        const distance = i - position;
        spoke.style.transform = `rotate(${-distance * STEP_ANGLE}deg)`;
        spoke.style.opacity = String(
          Math.max(0, 1 - Math.abs(distance) * 0.45),
        );
        // The card nearest the active spot draws on top.
        spoke.style.zIndex = String(100 - Math.round(Math.abs(distance) * 10));
      });
      setActive(Math.round(position));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Row layout: the card centered in the row is active.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!row.offsetParent) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { root: row, threshold: 0.6 },
    );
    row.querySelectorAll("li").forEach((li) => observer.observe(li));
    return () => observer.disconnect();
  }, []);

  // Tabbing to a card turns the wheel to it.
  const scrollToProject = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const step = scrollable / Math.max(projects.length - 1, 1);
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + index * step });
  };

  const item = projects[active];

  return (
    <>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ "--projects": projects.length } as CSSProperties}
      >
        <div className={styles.stage}>
          <div className={styles.info}>
            <SectionLabel number="01">Work</SectionLabel>
            {/* Keyed by project so each change animates in. */}
            <Details key={item.title} item={item} index={active} />
          </div>
          <div className={styles.wheel}>
            {projects.map((project, i) => (
              <div
                key={project.title}
                ref={(el) => {
                  spokeRefs.current[i] = el;
                }}
                className={styles.spoke}
              >
                <div className={styles.slot}>
                  <ProjectCard
                    item={project}
                    active={i === active}
                    onFocus={() => scrollToProject(i)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rowLayout}>
        <SectionLabel number="01">Work</SectionLabel>
        <Details key={item.title} item={item} index={active} />
        <ul ref={rowRef} className={styles.row}>
          {projects.map((project, i) => (
            <li key={project.title} data-index={i}>
              <ProjectCard item={project} active={i === active} />
            </li>
          ))}
        </ul>
      </div>

      <ContactSection number="02" />
    </>
  );
}
