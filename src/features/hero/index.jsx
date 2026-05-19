import React, { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { Activity, Briefcase, Code, Layers, Mail, Rocket, Server, ShieldCheck } from 'lucide-react'
import './styles.css'
import heroData from '../../data/hero.json'
import logoUrl from '../../assets/icons/logo.svg';

// Map icon string names from JSON to Lucide components
const ICON_MAP = { Activity, Briefcase, Code, Layers, Mail, Rocket, Server, ShieldCheck };

const PHRASES = heroData.typedTexts ?? [heroData.typedText]
const TYPE_SPEED = 120   // ms per character typed
const DELETE_SPEED = 40   // ms per character deleted
const PAUSE_AFTER = 1800 // ms to hold the completed phrase
const PAUSE_BEFORE = 400  // ms before typing next phrase

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const phraseIndex = useRef(0)
  const charIndex = useRef(0)
  const isDeleting = useRef(false)

  // Cycling typewriter
  useEffect(() => {
    let timer

    const tick = () => {
      const current = PHRASES[phraseIndex.current]

      if (!isDeleting.current) {
        // Typing forward
        charIndex.current++
        setDisplayText(current.substring(0, charIndex.current))

        if (charIndex.current === current.length) {
          // Finished typing — pause, then start deleting
          isDeleting.current = true
          timer = setTimeout(tick, PAUSE_AFTER)
          return
        }
        timer = setTimeout(tick, TYPE_SPEED)
      } else {
        // Deleting
        charIndex.current--
        setDisplayText(current.substring(0, charIndex.current))

        if (charIndex.current === 0) {
          // Finished deleting — move to next phrase
          isDeleting.current = false
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length
          timer = setTimeout(tick, PAUSE_BEFORE)
          return
        }
        timer = setTimeout(tick, DELETE_SPEED)
      }
    }

    // Initial delay before first phrase starts
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [])

  // Fade-in entrance for hero elements
  useEffect(() => {
    animate('.hero-content > *', {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(200, { start: 400 }),
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
            <span className="name-prefix">let</span>
            <span className="name-operator">=</span>
            <span className="name-value">"{displayText}</span>
            <span className="typewriter-cursor" aria-hidden="true">|</span>
            <span className="name-suffix">";</span>
          </h1>
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
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-container">
            <div className="profile-image-glow"></div>
            <div className="profile-image-frame">
              <div className="profile-image">
                <img src={logoUrl} alt="LinkedIn" width={260} />
              </div>
            </div>
            {heroData.badges.map((badge) => {
              const IconComp = ICON_MAP[badge.icon] || Code;
              return (
                <div key={badge.title} className="floating-badge" style={badge.style}>
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
