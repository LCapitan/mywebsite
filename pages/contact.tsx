import { Seo } from "../src/components";
import { Contact } from "../src/containers";
import { SiteLayout } from "../src/layouts/SiteLayout";
import type { NextPageWithLayout } from "../src/layouts/types";

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Contact | Austin Melendez"
        description="Get in touch with Austin about a project, a role, or just to say hi."
        path="/contact"
      />
      <Contact />
    </>
  );
};

ContactPage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default ContactPage;
