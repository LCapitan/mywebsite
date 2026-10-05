import type { MouseEvent } from "react";
import Router from "next/router";

// Experimental: how the work page and its case studies hand off.
// morph: the clicked card grows into the case study's hero image.
// slide: the case study slides up over the work page like a sheet.
export type TransitionStyle = "morph" | "slide";

// The shared element's name on both pages.
export const HERO_TRANSITION_NAME = "case-hero";

// What the work page needs to pick up where it left off. It lives for the
// session's client-side navigation (a module, not React state), so it's
// still there when the work page renders again on the way back.
export const transitionState = {
  style: "morph" as TransitionStyle,
  // The case study being opened or closed, so its card on the work page
  // takes the shared name.
  slug: null as string | null,
  // Where the work page was scrolled to when a case study opened.
  workScroll: null as number | null,
};

// Resolves once the route change has finished and the new page has rendered
// (`ready` checks the DOM). Animation frames don't run while a view
// transition waits on this, so it polls with timers.
function afterNavigation(navigate: () => void, ready: () => boolean) {
  return new Promise<void>((resolve) => {
    const started = performance.now();
    const check = () => {
      if (ready() || performance.now() - started > 2000) resolve();
      else setTimeout(check, 10);
    };
    const done = () => {
      Router.events.off("routeChangeComplete", done);
      Router.events.off("routeChangeError", done);
      check();
    };
    Router.events.on("routeChangeComplete", done);
    Router.events.on("routeChangeError", done);
    navigate();
  });
}

// Runs a navigation inside a view transition, marking the root with the style
// and direction so the CSS can pick the animation. Browsers without view
// transitions just navigate.
function transition(
  direction: "forward" | "back",
  navigate: () => void,
  ready: () => boolean,
) {
  if (!document.startViewTransition) {
    navigate();
    return;
  }

  const root = document.documentElement;
  root.dataset.transition = `${transitionState.style}-${direction}`;
  const viewTransition = document.startViewTransition(() =>
    afterNavigation(navigate, ready),
  );
  viewTransition.finished.finally(() => {
    delete root.dataset.transition;
    transitionState.slug = null;
  });
}

// Opens a case study from the work page. `card` is the clicked card, which
// becomes the shared element (for the morph).
export function openCaseStudy(slug: string, card: HTMLElement | null) {
  transitionState.slug = slug;
  transitionState.workScroll = window.scrollY;
  // Only one element per page can carry the shared name.
  document
    .querySelectorAll<HTMLElement>("[data-transition-card]")
    .forEach((el) => (el.style.viewTransitionName = ""));
  if (transitionState.style === "morph" && card) {
    card.style.viewTransitionName = HERO_TRANSITION_NAME;
  }

  transition(
    "forward",
    () => Router.push(`/work/${slug}`),
    () => !!document.querySelector(`[data-case-study="${slug}"]`),
  );
}

// Returns to the work page: back through history when that's where the
// visitor came from, otherwise a fresh visit.
export function closeCaseStudy(slug: string) {
  transitionState.slug = slug;
  const cameFromWork = transitionState.workScroll !== null;

  transition(
    "back",
    () => (cameFromWork ? Router.back() : Router.push("/work")),
    () => !!document.querySelector("[data-work-page]"),
  );
}

// Link props for a work card that opens a case study. On the way back from
// that case study, the card takes the shared name so the hero lands on it.
// Modified clicks (new tab, etc.) are left to the browser.
export function caseStudyLinkProps(slug: string) {
  const returning =
    transitionState.style === "morph" && transitionState.slug === slug;

  return {
    href: `/work/${slug}`,
    "data-transition-card": "",
    style: returning ? { viewTransitionName: HERO_TRANSITION_NAME } : undefined,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      openCaseStudy(slug, event.currentTarget);
    },
  };
}
