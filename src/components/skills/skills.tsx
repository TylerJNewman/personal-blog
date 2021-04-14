import * as React from 'react'

interface SkillsProps {
  data: any
}

const Skills: React.FunctionComponent<SkillsProps> = ({data}) => {
  return (
    <div className="section">
      <h2>Skills</h2>
      <p className="item-skills">{data}</p>
    </div>
  )
}

export default Skills
