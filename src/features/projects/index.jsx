import React from 'react'
import Section from '../../components/Section'
import './styles.css'

const ProjectsSection = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory.',
      tags: ['React', 'Node.js', 'MongoDB'],
      icon: '🛒'
    },
    {
      title: 'AI Portfolio',
      description: 'An agentic AI portfolio with dynamic interactions.',
      tags: ['Next.js', 'OpenAI', 'Tailwind'],
      icon: '🤖'
    },
    {
      title: 'Task Management',
      description: 'A collaborative task tracking app for remote teams.',
      tags: ['TypeScript', 'Firebase', 'React'],
      icon: '📋'
    }
  ]

  return (
    <Section id="projects" number="04" title="Projects">
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <div className="project-img">
              <span style={{ fontSize: '4rem' }}>{project.icon}</span>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                {project.description}
              </p>
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ProjectsSection
