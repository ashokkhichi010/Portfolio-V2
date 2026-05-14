import { useEffect, useMemo, useState } from 'react'
import Section from '../../components/Section'
import projects from '../../data/projects.json'
import ProjectCard from './ProjectCard'
import ProjectDrawer from './ProjectDrawer'
import { resolveProjectImages } from './projectImages'
import './styles.css'

const ProjectsSection = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null)
  const [projectImageIndexes, setProjectImageIndexes] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.title, 0]))
  )

  const projectsWithImages = useMemo(
    () => projects.map((project) => ({ ...project, resolvedImages: resolveProjectImages(project) })),
    []
  )

  const activeProject = activeProjectIndex === null ? null : projectsWithImages[activeProjectIndex]

  useEffect(() => {
    if (activeProjectIndex === null) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveProjectIndex(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeProjectIndex])

  useEffect(() => {
    if (!activeProject || activeProject.resolvedImages.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      updateProjectImageIndex(activeProject.title, activeProject.resolvedImages.length, 1)
    }, 3200)

    return () => window.clearInterval(intervalId)
  }, [activeProject])

  const updateProjectImageIndex = (projectTitle, totalImages, direction) => {
    if (totalImages <= 1) return

    setProjectImageIndexes((previous) => {
      const currentIndex = previous[projectTitle] || 0
      const nextIndex = (currentIndex + direction + totalImages) % totalImages

      return {
        ...previous,
        [projectTitle]: nextIndex,
      }
    })
  }

  const setProjectImageIndex = (projectTitle, imageIndex) => {
    setProjectImageIndexes((previous) => ({
      ...previous,
      [projectTitle]: imageIndex,
    }))
  }

  return (
    <Section id="projects" number="04" title="Projects">
      <div className="projects-gallery">
        {projectsWithImages.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpen={() => setActiveProjectIndex(idx)}
          />
        ))}
      </div>

      <ProjectDrawer
        project={activeProject}
        activeImageIndex={activeProject ? (projectImageIndexes[activeProject.title] || 0) : 0}
        onClose={() => setActiveProjectIndex(null)}
        onPreviousImage={() => {
          if (!activeProject) return
          updateProjectImageIndex(activeProject.title, activeProject.resolvedImages.length, -1)
        }}
        onNextImage={() => {
          if (!activeProject) return
          updateProjectImageIndex(activeProject.title, activeProject.resolvedImages.length, 1)
        }}
        onSelectImage={(imageIndex) => {
          if (!activeProject) return
          setProjectImageIndex(activeProject.title, imageIndex)
        }}
      />
    </Section>
  )
}

export default ProjectsSection
