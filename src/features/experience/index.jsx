import React from 'react'
import './styles.css'

const ExperienceSection = () => {
  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      role: 'Senior Developer',
      period: '2022 - Present',
      description: 'Leading the frontend team and architectural decisions.'
    },
    {
      company: 'Digital Agency',
      role: 'Web Developer',
      period: '2020 - 2022',
      description: 'Built various client projects using React and Node.js.'
    }
  ]

  return (
    <section id="experience" className="content-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">&lt;Experience /&gt;</h2>
        </div>
        <div className="experience-list">
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-content">
                <span className="experience-period">{exp.period}</span>
                <h3 className="experience-role">{exp.role}</h3>
                <h4 className="experience-company">{exp.company}</h4>
                <p className="experience-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
