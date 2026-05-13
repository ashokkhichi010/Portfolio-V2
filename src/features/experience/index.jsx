import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import experiences from '../../data/experience.json'

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return

      const section = sectionRef.current
      const { top, height } = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate scroll progress within the section
      // progress will be 0 when top of section enters viewport
      // progress will be 1 when bottom of section reaches bottom of viewport
      let currentProgress = -top / (height - windowHeight)
      currentProgress = Math.max(0, Math.min(1, currentProgress))

      setProgress(currentProgress)

      // Calculate horizontal translation
      const trackWidth = trackRef.current.scrollWidth
      const maxTranslate = trackWidth - window.innerWidth
      const translateX = currentProgress * maxTranslate

      trackRef.current.style.transform = `translateX(-${translateX}px)`
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    // Initial call
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      id="experience"
      className="exp-pin-container"
      ref={sectionRef}
      style={{ height: `${experiences.length * 100}vh` }}
    >
      <div className="exp-sticky-wrapper" ref={stickyRef}>

        {/* Section Heading Overlay */}
        <div className="exp-section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Experience</h2>
        </div>

        {/* Horizontal Track */}
        <div className="exp-slides-track" ref={trackRef}>
          {experiences.map((exp, i) => (
            <div key={i} className="exp-slide-v2">
              <div className="exp-slide-overlay-v2" />

              <div className="exp-slide-content-v2">
                <div className="exp-slide-info">
                  <span className="exp-slide-num-v2" style={{ color: exp.accent }}>{exp.number}</span>
                  <span className="exp-slide-period-v2">{exp.period}</span>
                  <h3 className="exp-slide-role-v2">{exp.role}</h3>
                  <h4 className="exp-slide-company-v2" style={{ color: exp.accent }}>{exp.company}</h4>
                  <p className="exp-slide-desc-v2">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="exp-progress-bar-container">
          <div
            className="exp-progress-bar-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
