import { ExternalLink } from 'lucide-react'
import githubIcon from '../../assets/icons/github.svg'

const ProjectLinks = ({ project }) => (
  <div className="project-card-links">
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="project-card-link"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={githubIcon} alt="" className="project-card-link-icon" />
        <span>GitHub</span>
      </a>
    )}
    {project.live && (
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        className="project-card-link"
        onClick={(event) => event.stopPropagation()}
      >
        <ExternalLink size={16} />
        <span>Live</span>
      </a>
    )}
  </div>
)

export default ProjectLinks
