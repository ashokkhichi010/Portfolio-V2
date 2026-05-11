import React from 'react'
import Section from '../../components/Section'
import './styles.css'

const ExperienceSection = () => {
  const experiences = [
    {
      company: 'Innovate Tech',
      role: 'Lead Architect',
      period: '2023 - Present',
      description: 'Driving architectural decisions for large-scale enterprise applications and mentoring senior developers.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop'
    },
    {
      company: 'Creative Studio',
      role: 'Full Stack Developer',
      period: '2021 - 2023',
      description: 'Developed immersive web experiences using GSAP, Three.js, and modern React patterns.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'
    },
    {
      company: 'Global Solutions',
      role: 'Frontend Engineer',
      period: '2019 - 2021',
      description: 'Built and maintained complex dashboards with real-time data visualization and high performance.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
    },
    {
      company: 'StartUp Hub',
      role: 'Junior Web Developer',
      period: '2018 - 2019',
      description: 'Contributed to the core product development and improved initial page load times by 40%.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      company: 'Freelance',
      role: 'Web Designer & Dev',
      period: '2017 - 2018',
      description: 'Collaborated with clients to design and develop custom responsive websites from scratch.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop'
    }
  ]

  return (
    <Section id="experience" number="03" title="Experience">
      <div className="experience-gallery">
        {experiences.map((exp, idx) => (
          <div 
            key={idx} 
            className={`experience-item item-${idx + 1}`}
            style={{ backgroundImage: `url(${exp.image})` }}
          >
            <div className="experience-item-content">
              <span className="experience-item-period">{exp.period}</span>
              <h3 className="experience-item-title">{exp.role}</h3>
              <h4 className="experience-item-company">{exp.company}</h4>
              <p className="experience-item-description">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ExperienceSection
