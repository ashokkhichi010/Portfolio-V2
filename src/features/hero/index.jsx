import React, { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { Rocket, Mail, Code, Terminal, Globe, Cpu } from 'lucide-react'
import './styles.css'

const Hero = () => {
  const nameRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    // Typing animation
    const nameText = 'Developer'
    animate({ val: 0 }, {
      val: nameText.length,
      duration: 1500,
      delay: 500,
      ease: 'easeInOutQuad',
      onUpdate: (anim) => {
        const length = Math.floor(anim.targets[0].val)
        if (nameRef.current) {
          nameRef.current.textContent = nameText.substring(0, length)
        }
      }
    })

    // Fade in other elements
    animate('.hero-content > *', {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(200, { start: 1000 }),
      duration: 1000,
      ease: 'easeOutExpo'
    })
  }, [])

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="code-grid-bg"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="greeting-text">Hello, I'm</span>
            <span className="greeting-cursor">|</span>
          </div>

          <h1 className="hero-name">
            <span className="name-prefix">const</span>
            <span className="name-operator">=</span>
            <span className="name-value" ref={nameRef}></span>
            <span className="name-suffix">;</span>
          </h1>

          <div className="hero-title">
            <span className="title-prefix">//</span>
            <span className="title-text">Full Stack Developer & UI/UX Designer</span>
          </div>

          <p className="hero-description">
            Passionate developer creating exceptional digital experiences with modern technologies.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Get In Touch <Rocket size={20} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects <Code size={20} />
            </a>
          </div>

          <div className="hero-social">
            <a href="#" className="social-icon"><Terminal size={20} /></a>
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><Cpu size={20} /></a>
            <a href="#" className="social-icon"><Mail size={20} /></a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-container">
            <div className="profile-image-glow"></div>
            <div className="profile-image-frame">
              <div className="profile-image">
                <Code size={120} className="profile-placeholder" />
              </div>
            </div>
            {/* Floating Badges */}
            <div className="floating-badge badge-1">
              <div className="badge-icon"><Code color="var(--primary)" size={24} /></div>
              <div className="badge-content">
                <span className="badge-title">React</span>
                <span className="badge-libs">Modern UI Libraries</span>
              </div>
            </div>
            <div className="floating-badge badge-2">
              <div className="badge-icon"><Rocket color="var(--cyan)" size={24} /></div>
              <div className="badge-content">
                <span className="badge-title">Next.js</span>
                <span className="badge-libs">Full Stack Apps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
