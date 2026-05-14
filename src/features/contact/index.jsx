import React from 'react'
import { Mail, Phone, Send } from 'lucide-react'
import Section from '../../components/Section'
import './styles.css'
import githubIcon from '../../assets/icons/github.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import contactData from '../../data/contact.json'

const ContactSection = () => {
  return (
    <Section id="contact" number="06" title="Contact">
      <div className="contact-wrapper">
        <div className="contact-inner">

          <div className="contact-form-container">
            <div className="contact-field">
              <h3 className="contact-title">{contactData.heading}</h3>
              <p className="contact-subtitle">{contactData.subtitle}</p>

              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="form-input" placeholder="Name" />
                <input type="email" className="form-input" placeholder="Email" />
                <textarea className="form-input" placeholder="Message" rows="4"></textarea>
                <button className="contact-submit-btn">
                  Send Message <Send size={18} className="send-icon" />
                </button>
              </form>
            </div>
          </div>

          <div className="contact-social-bar">
            <ul className="social-list">
              <li><a target='_blank' href={contactData.socials.find(s => s.platform === 'github')?.url ?? '#'}><img src={githubIcon} alt="Github" width={20} className="social-icon-img" /></a></li>
              <li><a target='_blank' href={contactData.socials.find(s => s.platform === 'github2')?.url ?? '#'}><img src={githubIcon} alt="Github" width={20} className="social-icon-img" /></a></li>
              <li><a target='_blank' href={contactData.socials.find(s => s.platform === 'linkedin')?.url ?? '#'}><img src={linkedinIcon} alt="LinkedIn" width={20} className="social-icon-img" /></a></li>
              <li><a target='_blank' href={contactData.socials.find(s => s.platform === 'whatsapp')?.url ?? '#'}><img src={whatsappIcon} alt="LinkedIn" width={20} className="social-icon-img" /></a></li>
            </ul>
          </div>

          <div className="contact-info-card">
            <h4>Contact Info</h4>
            <div className="info-single">
              <Phone className="info-icon" size={20} />
              <span>{contactData.phone}</span>
            </div>
            <div className="info-single">
              <Mail className="info-icon" size={20} />
              <span>{contactData.email}</span>
            </div>
          </div>

        </div>
      </div>
    </Section>
  )
}

export default ContactSection
