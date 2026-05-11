import React from 'react'
import Section from '../../components/Section'
import './styles.css'

const AboutSection = () => {
  return (
    <Section id="about" number="01" title="About Me">
      <div className="about-content">
        <p className="about-text">
          I'm a passionate Full Stack Developer with experience in building modern web applications.
          I specialize in JavaScript technologies, React, Node.js, and creating beautiful user interfaces.
        </p>
        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Years Exp</div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default AboutSection
