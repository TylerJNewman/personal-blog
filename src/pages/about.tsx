import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import About from '../containers/about';

type AboutPageProps = {};

const AboutPage: React.FunctionComponent<AboutPageProps> = () => {
  return (
    <Layout>
      <SEO
        title="About Us"
        description="In the land of the blind, the one-eyed man is a hallucinating idiot...for he sees what no one else does: things that, to everyone else, are not there."
      />

      <About />
    </Layout>
  );
};

export default AboutPage;
