import React, { useRef, useEffect, useState } from 'react'
import './styles.css'

const experiences = [
  {
    period: '2023 - Present',
    role: 'Lead Architect',
    company: 'Innovate Tech',
    description: 'Driving architectural decisions for large-scale enterprise applications and mentoring senior developers across multiple product teams.',
    number: '01',
    accent: '#c084fc',
  },
  {
    period: '2021 - 2023',
    role: 'Full Stack Developer',
    company: 'Creative Studio',
    description: 'Developed immersive web experiences using GSAP, Three.js, and modern React patterns for award-winning digital campaigns.',
    number: '02',
    accent: '#67e8f9',
  },
  {
    period: '2019 - 2021',
    role: 'Frontend Engineer',
    company: 'Global Solutions',
    description: 'Built and maintained complex dashboards with real-time data visualization, improving key business metrics across 12 client accounts.',
    number: '03',
    accent: '#fbbf24',
  },
  {
    period: '2018 - 2019',
    role: 'Junior Web Developer',
    company: 'StartUp Hub',
    description: 'Contributed to core product development and improved initial page load times by 40% through code splitting and lazy loading strategies.',
    number: '04',
    accent: '#86efac',
  },
  {
    period: '2017 - 2018',
    role: 'Web Designer & Dev',
    company: 'Freelance',
    description: 'Collaborated with clients globally to design and develop custom responsive websites — delivering 20+ projects from brief to launch.',
    number: '05',
    accent: '#f9a8d4',
  }
]

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
