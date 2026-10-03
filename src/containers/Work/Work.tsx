import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import cx from "classnames";

import { CircleArrow } from "../../components/ArrowButton";
import { CarouselControls } from "../../components/CarouselControls";
import { ContactSection } from "../../components/ContactSection";
import { FeaturedCard } from "../../components/FeaturedCard";
import { HeroSky } from "../../components/HeroSky";
import { SectionLabel } from "../../components/SectionLabel";
import { workItems, type WorkItem } from "../../data/work";
import { useCarousel, type Carousel } from "../../hooks/useCarousel";

import styles from "./Work.module.scss";

const projects = workItems.filter((item) => !item.hidden);

// Degrees between neighbouring cards on the wheel.
const STEP_ANGLE = 31;

// Scroll position (in projects) -> wheel position. The wheel slows as each
// project nears the active spot, like a watch's date wheel settling, without
// ever stopping dead.
function settle(progress: number) {
  return progress - (Math.sin(2 * Math.PI * progress) / (2 * Math.PI)) * 0.3;
}

// How much of the remaining distance the wheel covers each frame: enough to
// smooth out choppy mouse wheels while still following the scroll closely.
const EASE = 0.35;

function Details({ item }: { item: WorkItem }) {
  return (
    <div className={styles.details}>
      <h1 className={styles.title}>{item.title}</h1>
      {item.content && <p className={styles.description}>{item.content}</p>}
      <ul className={styles.tags}>
        {item.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
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
        <CircleArrow />
      </span>
    </a>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const spokeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rowRef, carousel] = useCarousel<HTMLUListElement>();

  // Wheel layout: page scroll turns the wheel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    // The wheel glides toward the scroll position instead of jumping to it.
    let position = 0;
    let target = 0;

    const measure = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      const step = scrollable / Math.max(projects.length - 1, 1);
      const progress = Math.min(
        Math.max(-track.getBoundingClientRect().top / step, 0),
        projects.length - 1,
      );
      return settle(progress);
    };

    const update = () => {
      frame = 0;
      // Hidden (phones, reduced motion): the row layout is shown instead.
      if (!track.offsetParent) return;
      target = measure();
      position += (target - position) * EASE;
      if (Math.abs(target - position) < 0.001) position = target;

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
      // Keep gliding until the wheel catches up.
      if (position !== target) frame = requestAnimationFrame(update);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Start where the page already is (e.g. after a reload mid-page).
    frame = requestAnimationFrame(() => {
      position = measure();
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Tabbing to a card, or the wheel's controls, turns the wheel to it. The
  // page jumps straight there and the wheel glides after it.
  const scrollToProject = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const step = scrollable / Math.max(projects.length - 1, 1);
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + index * step });
  };

  // Steps from the project the page is scrolled to rather than the one the
  // wheel shows, which can lag a moment behind quick presses.
  const stepProject = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const step = scrollable / Math.max(projects.length - 1, 1);
    const current = Math.round(-track.getBoundingClientRect().top / step);
    const target = current + direction;
    if (target < 0 || target >= projects.length) return;
    scrollToProject(target);
  };

  const wheelCarousel: Carousel = {
    index: active,
    count: projects.length,
    atStart: active === 0,
    atEnd: active === projects.length - 1,
    prev: () => stepProject(-1),
    next: () => stepProject(1),
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
          <HeroSky anchor="center" planet />
          <div className={styles.stageInner}>
            <div className={styles.info}>
              <SectionLabel number="01">Work</SectionLabel>
              {/* Keyed by project so each change animates in. */}
              <Details key={item.title} item={item} />
              <CarouselControls
                carousel={wheelCarousel}
                controls="work-wheel"
                itemLabel="project"
                className={styles.wheelControls}
              />
            </div>
            <div id="work-wheel" className={styles.wheel}>
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
      </div>

      {/* Each card carries its own details, so nothing above the row has to
          change as it scrolls. */}
      <div className={styles.rowLayout}>
        <SectionLabel number="01" as="h1">
          Work
        </SectionLabel>
        <ul ref={rowRef} id="work-cards" className={styles.row}>
          {projects.map((project, i) => (
            <li key={project.title}>
              <FeaturedCard
                item={project}
                index={i + 1}
                allTags
                titleAs="h2"
                className={styles.rowCard}
              />
            </li>
          ))}
        </ul>
        <CarouselControls
          carousel={carousel}
          controls="work-cards"
          itemLabel="project"
        />
      </div>

      <ContactSection number="02" />
    </>
  );
}
