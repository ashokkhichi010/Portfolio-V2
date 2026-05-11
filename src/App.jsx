import Background from './layouts/background/Background'
import Navbar from './layouts/navbar'
import Hero from './features/hero'
import AboutSection from './features/about'
import SkillsSection from './features/skills'
import ExperienceSection from './features/experience'
import ProjectsSection from './features/projects'
import ContactSection from './features/contact'
import './App.css'

function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
