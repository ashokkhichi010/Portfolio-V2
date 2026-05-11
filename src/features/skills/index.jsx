import React from 'react'
import './styles.css'

const SkillsSection = () => {
  const skillGroups = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: '95%' },
        { name: 'TypeScript', level: '90%' },
        { name: 'Next.js', level: '85%' }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: '90%' },
        { name: 'PostgreSQL', level: '80%' },
        { name: 'MongoDB', level: '85%' }
      ]
    }
  ]

  return (
    <section id="skills" className="content-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">&lt;Skills /&gt;</h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="skill-category">
              <h3>{group.title}</h3>
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-item">
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: skill.level }}></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
