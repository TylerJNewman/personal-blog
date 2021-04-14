import * as React from 'react'

interface ExperienceProps {
  data: Item[]
}

interface Item {
  company: any
  role: any
  start: any
  end: any
  description: any
  skills: any
}

const Experience: React.FunctionComponent<ExperienceProps> = ({data}) => {
  return (
    <div className="section">
      <h2>Experience</h2>
      {data?.map(
        ({company, role, start, end, description, skills}: Item, i: number) => (
          <article key={`${company}-${i}`}>
            <h3 className="item-header">{role}</h3>
            <h4 className="item-sub">
              {company} · {start} - {end || 'PRESENT'}
            </h4>
            <p>{description}</p>
            <p className="item-skills">{skills}</p>
          </article>
        ),
      )}
    </div>
  )
}

export default Experience
