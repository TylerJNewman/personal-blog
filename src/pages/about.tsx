import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import About from '../containers/about'

type AboutPageProps = {}

const AboutPage: React.FunctionComponent<AboutPageProps> = () => {
  return (
    <Layout>
      <SEO title="About Me" description="Resume & Interest" />
      <About />
    </Layout>
  )
}

export default AboutPage
