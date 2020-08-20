import React from 'react';
import { graphql } from 'gatsby';
import Navbar from '../components/navbar/navbar';
import ResetCss from '../components/reset-css';
import SEO from '../components/seo';
import NotFound from '../containers/not-found';
import Footer from '../components/footer/footer';

const NotFoundPage = () => {
  return (
    <>
      <ResetCss />
      <Navbar />
      <SEO title="404: Not Found" />
      <NotFound />
      <Footer>
        Made with Love
        &nbsp;&nbsp;
        💙
        &nbsp;&nbsp;
        Tyler Newman
      </Footer>
    </>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
