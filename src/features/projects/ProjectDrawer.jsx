import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ProjectLinks from './ProjectLinks'

const ProjectDrawer = ({
  project,
  activeImageIndex,
  onClose,
  onPreviousImage,
  onNextImage,
  onSelectImage,
}) => {
  if (!project) return null

  return (
    <div
      className="project-detail-shell is-drawer"
      onClick={onClose}
    >
      <div className="project-detail-backdrop" />
      <div
        className="project-detail-card"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-detail-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={18} />
        </button>

        <div className="project-detail-media">
          {project.resolvedImages.length > 0 ? (
            <>
              {project.resolvedImages.map((image, imageIndex) => (
                <img
                  key={`${project.title}-${image}`}
                  src={image}
                  alt={`${project.title} preview ${imageIndex + 1}`}
                  className={`project-detail-image ${imageIndex === activeImageIndex ? 'is-visible' : ''}`}
                />
              ))}
              {project.resolvedImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="project-detail-nav project-detail-nav-prev"
                    aria-label={`Show previous image for ${project.title}`}
                    onClick={onPreviousImage}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    className="project-detail-nav project-detail-nav-next"
                    aria-label={`Show next image for ${project.title}`}
                    onClick={onNextImage}
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className="project-detail-dots">
                    {project.resolvedImages.map((image, imageIndex) => (
                      <button
                        key={`${project.title}-${image}`}
                        type="button"
                        className={`project-detail-dot ${imageIndex === activeImageIndex ? 'is-active' : ''}`}
                        aria-label={`Show image ${imageIndex + 1} for ${project.title}`}
                        onClick={() => onSelectImage(imageIndex)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="project-detail-empty">No preview images available yet.</div>
          )}
        </div>

        <div className="project-detail-content">
          <span className="project-card-subtitle">{project.timeframe}</span>
          <h3 className="project-detail-title">{project.title}</h3>
          <p className="project-detail-description">{project.description}</p>

          {project.tags?.length > 0 && (
            <div className="project-detail-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-detail-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  )
}

export default ProjectDrawer
