import React from 'react'
import Section from '../../components/Section'
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
    <Section id="experience" number="03" title="Experience">
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
    </Section>
  )
}

export default ExperienceSection
