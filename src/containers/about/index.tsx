import * as React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import Image from 'gatsby-image'
import SocialProfile from '../../components/social-profile/social-profile'
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

interface ExperienceProps {
  data: any
}

const Experience: React.FunctionComponent<ExperienceProps> = ({data}) => {
  return (
    <>
      <h2>Experience</h2>
      {data &&
        data.map((item, i) => (
          <article className="my-5" key={`${item.company}-${i}`}>
            <h3 className="item-header">{item.role}</h3>
            <h4 className="item-sub">
              {item.company} | {item.start} - {item.end || 'PRESENT'}
            </h4>
            <p className="py-6">{item.description}</p>
          </article>
        ))}
      {/* 
      <h3 className="title">Senior Web Developer</h3>
      <h4 className="subtitle">Intelitec Solutions | March 2013 - Present</h4>
      <p>
        Bring to the table win-win survival strategies to ensure proactive
        domination. At the end of the day, going forward, a new normal that has
        evolved from generation X is on the runway heading towards a streamlined
        cloud solution. User generated content in real-time will have multiple
        touchpoints for offshoring.
      </p> */}
    </>
  )
}

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
        <Experience data={resume.experience} />

        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>
      </AboutDetails>
    </AboutWrapper>
  )
}

export default About
