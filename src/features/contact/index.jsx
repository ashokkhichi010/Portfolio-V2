import React from 'react'
import { Mail, Send } from 'lucide-react'
import Section from '../../components/Section'
import './styles.css'

const ContactSection = () => {
  return (
    <Section id="contact" number="05" title="Contact">
      <div className="contact-grid">
        <div className="contact-info">
          <h3 className="contact-headline">Let's work together</h3>
          <p className="contact-desc">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div>
                <span className="contact-label">Email</span>
                <span className="contact-value">hello@example.com</span>
              </div>
            </div>
          </div>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Name" className="form-input" />
          <input type="email" placeholder="Email" className="form-input" />
          <textarea placeholder="Message" rows="5" className="form-input"></textarea>
          <button className="btn btn-primary form-submit">
            Send Message <Send size={20} />
          </button>
        </form>
      </div>
    </Section>
  )
}

export default ContactSection
