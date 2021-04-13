import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Contact from '../containers/contact'

type ContactPageProps = {}

const ContactPage: React.FunctionComponent<ContactPageProps> = () => {
  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="In the land of the blind, the one-eyed man is a hallucinating idiot...for he sees what no one else does: things that, to everyone else, are not there."
      />

      <Contact />
    </Layout>
  )
}

export default ContactPage
