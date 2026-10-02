import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";

import { MobileMenu } from "./MobileMenu";
import { SiteHeader } from "./SiteHeader";

import styles from "./SiteLayout.module.scss";

// Shell for pages on the new design: header, mobile menu, and page colors.
export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", closeMenu);
    return () => router.events.off("routeChangeStart", closeMenu);
  }, [router.events, closeMenu]);

  return (
    <div className={styles.site}>
      <SiteHeader menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <main>{children}</main>
    </div>
  );
}
