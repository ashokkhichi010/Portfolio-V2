import React, { useState, useEffect } from 'react'
import { User, Code, Briefcase, Rocket, Mail, Menu, X, GraduationCap } from 'lucide-react'
import './styles.css'
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(window.location.hash.substring(1) || 'home')

  const sectionTitles = {
    home: 'Hero',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    journey: 'Journey',
    projects: 'Projects',
    education: 'Education',
    contact: 'Contact',
  }

  useSectionAnalytics(activeSection, sectionTitles)

  useEffect(() => {
    let currentScrollY = window.scrollY
    let timeoutId = null

    const hideAfterDelay = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (window.scrollY > currentScrollY && window.scrollY > 100) {
        // Scrolling down
        setIsVisible(false)
        if (timeoutId) clearTimeout(timeoutId)
      } else {
        // Scrolling up
        setIsVisible(true)
        hideAfterDelay()
      }
      currentScrollY = window.scrollY
    }

    const handleMouseMove = (e) => {
      if (e.clientY < 100) {
        setIsVisible(true)
        hideAfterDelay()
      }
    }

    const handleClick = (e) => {
      if (e.clientY > 100) {
        setIsVisible(false)
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          setActiveSection(id)
          // Update URL hash: Use '/' for home, otherwise use #id
          const newPath = id === 'home' ? '/' : `#${id}`
          window.history.replaceState(null, '', newPath)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = ['home', 'about', 'skills', 'experience', 'journey', 'projects', 'education', 'contact']

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    
    // Start the timer initially
    hideAfterDelay()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  const navLinks = [
    { name: 'About', icon: <User size={18} />, href: '#about' },
    { name: 'Skills', icon: <Code size={18} />, href: '#skills' },
    { name: 'Experience', icon: <Briefcase size={18} />, href: '#experience' },
    { name: 'Journey', icon: <Rocket size={18} />, href: '#journey' },
    { name: 'Projects', icon: <Rocket size={18} />, href: '#projects' },
    { name: 'Education', icon: <GraduationCap size={18} />, href: '#education' },
    { name: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ]

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''} ${!isVisible && activeSection !== 'home' ? 'hidden' : ''}`}>
      <nav className="nav-container">
        <div className="nav-brand">
          <a href="#home" className="brand-logo notranslate" onClick={() => setIsMenuOpen(false)} translate="no">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">ASHOK KUMAR</span>
            <span className="logo-bracket">/&gt;</span>
          </a>
        </div>

        {/* Menu Toggler Button */}
        <div className="nav-controls">
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
