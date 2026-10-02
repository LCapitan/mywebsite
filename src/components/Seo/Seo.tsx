import Head from "next/head";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_NAME,
  SITE_URL,
} from "../../config";

interface SeoProps {
  title: string;
  description?: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {image === DEFAULT_OG_IMAGE && (
        <>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
