import React from 'react'
import './styles.css'

const AboutSection = () => {
  return (
    <section id="about" className="content-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">&lt;About Me /&gt;</h2>
        </div>
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
      </div>
    </section>
  )
}

export default AboutSection
