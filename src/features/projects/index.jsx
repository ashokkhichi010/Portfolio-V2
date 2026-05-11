import Section from '../../components/Section'
import './styles.css'

const ProjectsSection = () => {
  const projects = [
    {
      title: 'AI Portfolio',
      subtitle: 'React · GSAP · Three.js',
      description: 'An interactive developer portfolio with scroll-driven animations, WebGL starfield background, and dynamic section reveals.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'E-Commerce Platform',
      subtitle: 'Next.js · Node.js · MongoDB',
      description: 'Full-stack marketplace with real-time inventory, Stripe payments, and a high-performance customer-facing storefront.',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Data Dashboard',
      subtitle: 'TypeScript · D3.js · Redux',
      description: 'Interactive analytics platform with live charts, custom date filters, and one-click CSV export capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Task Manager',
      subtitle: 'React · Firebase · TypeScript',
      description: 'Collaborative project-tracking app for remote teams with real-time updates, drag-and-drop boards, and notifications.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'ML Classifier',
      subtitle: 'Python · TensorFlow · FastAPI',
      description: 'Browser-based machine learning model that classifies images in real time with a FastAPI backend and Python training pipeline.',
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000&auto=format&fit=crop'
    }
  ]

  return (
    <Section id="projects" number="04" title="Projects">
      <div className="projects-gallery">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card-item"
            style={{ backgroundImage: `url(${project.image})` }}
          >
            <div className="project-card-content">
              <span className="project-card-subtitle">{project.subtitle}</span>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ProjectsSection
