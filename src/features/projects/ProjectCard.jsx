import { useEffect, useState } from 'react'
import ProjectLinks from './ProjectLinks'

const CARD_IMAGE_INTERVAL_MS = 2600

const ProjectCard = ({ project, onOpen }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const hasImages = project.resolvedImages.length > 0
  const currentImage = hasImages ? project.resolvedImages[activeImageIndex] : null

  useEffect(() => {
    if (project.resolvedImages.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((previous) => (previous + 1) % project.resolvedImages.length)
    }, CARD_IMAGE_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [project.resolvedImages])

  useEffect(() => {
    setActiveImageIndex(0)
  }, [project.title])

  return (
    <div
      className="project-card-item"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
    >
      {currentImage && project.resolvedImages.map((image, imageIndex) => (
        <img
          key={`${project.title}-${image}`}
          src={image}
          alt={`${project.title} preview ${imageIndex + 1}`}
          className={`project-card-image ${imageIndex === activeImageIndex ? 'is-visible' : ''}`}
        />
      ))}
      <div className="project-card-content">
        <span className="project-card-subtitle">{project.timeframe}</span>
        <h3 className="project-card-title">{project.title}</h3>
        <ProjectLinks project={project} />
      </div>
    </div>
  )
}

export default ProjectCard
