import Background from './layouts/background/Background'
import Navbar from './layouts/navbar'
import Hero from './features/hero'
import AboutSection from './features/about'
import SkillsSection from './features/skills'
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
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
