import type { GetStaticPaths, GetStaticProps } from "next";

import { Seo } from "../../src/components";
import { CaseStudy } from "../../src/containers";
import { caseStudyItems } from "../../src/data/work";
import { SiteLayout } from "../../src/layouts/SiteLayout";
import type { NextPageWithLayout } from "../../src/layouts/types";

interface CaseStudyPageProps {
  slug: string;
}

const CaseStudyPage: NextPageWithLayout<CaseStudyPageProps> = ({ slug }) => {
  const item = caseStudyItems.find((study) => study.caseStudy.slug === slug)!;

  return (
    <>
      <Seo
        title={`${item.title} | Austin Melendez`}
        description={`${item.content}. A case study by Austin Melendez.`}
        path={`/work/${slug}`}
        image={item.imgSrc}
      />
      <CaseStudy item={item} />
    </>
  );
};

CaseStudyPage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export const getStaticPaths: GetStaticPaths = () => ({
  paths: caseStudyItems.map((item) => ({
    params: { slug: item.caseStudy.slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<CaseStudyPageProps> = ({
  params,
}) => ({
  props: { slug: String(params?.slug) },
});

export default CaseStudyPage;
