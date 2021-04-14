import * as React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import Image from 'gatsby-image'
import Skills from '../../components/skills/skills'
import SocialProfile from '../../components/social-profile/social-profile'
import Experience from '../../components/experience/experience'
import resume from '../../../content/profile.json'
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoGithub,
} from 'react-icons/io'
import {
  AboutWrapper,
  AboutImage,
  AboutPageTitle,
  AboutDetails,
  SocialProfiles,
} from './style'

const SocialLinks = [
  {
    icon: <IoLogoGithub />,
    url: 'https://github.com/tylerJNewman',
    tooltip: 'Github',
  },
  {
    icon: <IoLogoFacebook />,
    url: 'https://www.facebook.com/tylerjnewman',
    tooltip: 'Facebook',
  },
  {
    icon: <IoLogoInstagram />,
    url: 'https://www.instagram.com/tylerjnewman/',
    tooltip: 'Instagram',
  },
  {
    icon: <IoLogoTwitter />,
    url: 'https://twitter.com/tylerjnewman',
    tooltip: 'Twitter',
  },
  {
    icon: <IoLogoLinkedin />,
    url: 'https://www.linkedin.com/tylerthecreator',
    tooltip: 'Linked In',
  },
]

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: {regex: "/about.jpg/"}) {
        childImageSharp {
          fluid(maxWidth: 1770, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `)

  return (
    <AboutWrapper>
      <AboutPageTitle>
        <h2>About Me</h2>
        <p>Finance → Film → Startup → Photography → Startups</p>
      </AboutPageTitle>

      {/* <AboutImage>
        <Image fluid={Data.avatar.childImageSharp.fluid} alt="author" />
      </AboutImage> */}

      <AboutDetails>
        <Skills data={resume.skills} />
        <Experience data={resume.experience} />
        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>
      </AboutDetails>
    </AboutWrapper>
  )
}

export default About
