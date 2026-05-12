import React, { useState, useEffect } from 'react'
import { Home, User, Code, Briefcase, Rocket, Mail, Menu, X, GraduationCap } from 'lucide-react'
import './styles.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(window.location.hash.substring(1) || 'home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
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
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="nav-brand">
          <a href="#home" className="brand-logo" onClick={() => setIsMenuOpen(false)}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">ASHOK KUMAR</span>
            <span className="logo-bracket">/&gt;</span>
          </a>
        </div>

        {/* Menu Toggler Button */}
        <div className="nav-controls">
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              {link.icon}
              <span className="nav-text">{link.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
