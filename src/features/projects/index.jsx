import Section from '../../components/Section'
import './styles.css'
import projects from '../../data/projects.json'

const ProjectsSection = () => {

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
