import styles from "./Punctuated.module.scss";

// Renders text with its closing punctuation (". ? !") in the accent color.
export function Punctuated({ children }: { children: string }) {
  const match = children.match(/^([\s\S]*?)([.?!]+)$/);
  if (!match) return children;

  return (
    <>
      {match[1]}
      <span className={styles.mark}>{match[2]}</span>
    </>
  );
}
