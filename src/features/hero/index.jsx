import React, { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { Rocket, Mail, Code, Terminal, Globe, Cpu } from 'lucide-react'
import './styles.css'
import heroData from '../../data/hero.json'

// Map icon string names from JSON to Lucide components
const ICON_MAP = { Rocket, Mail, Code, Terminal, Globe, Cpu }

const Hero = () => {
  const nameRef = useRef(null)

  useEffect(() => {
    const nameText = heroData.typedText
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
            <span className="greeting-text">{heroData.greeting}</span>
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
            <span className="title-text">{heroData.title}</span>
          </div>

          <p className="hero-description">{heroData.description}</p>

          <div className="hero-buttons">
            {heroData.buttons.map((btn) => {
              const IconComp = btn.icon ? ICON_MAP[btn.icon] : (btn.variant === 'primary' ? Rocket : Code)
              return (
                <a key={btn.label} href={btn.href} className={`btn btn-${btn.variant}`}>
                  {btn.label} <IconComp size={20} />
                </a>
              )
            })}
          </div>

          <div className="hero-social">
            {heroData.socials.map((s) => {
              const IconComp = ICON_MAP[s.icon]
              return (
                <a key={s.icon} href={s.href} className="social-icon">
                  <IconComp size={20} />
                </a>
              )
            })}
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
            {heroData.badges.map((badge) => {
              const IconComp = ICON_MAP[badge.icon]
              return (
                <div key={badge.title} className={`floating-badge ${badge.className}`}>
                  <div className="badge-icon"><IconComp color={badge.color} size={24} /></div>
                  <div className="badge-content">
                    <span className="badge-title">{badge.title}</span>
                    <span className="badge-libs">{badge.subtitle}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
