import React, { useMemo, useState } from 'react'
import { Mail, Phone, Send } from 'lucide-react'
import Section from '../../components/Section'
import './styles.css'
import githubIcon from '../../assets/icons/github.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import contactData from '../../data/contact.json'

const ContactSection = () => {
  const initialFormState = {
    name: '',
    email: '',
    message: '',
  }

  const [formData, setFormData] = useState({
    ...initialFormState,
  })
  const [isThankYouOpen, setIsThankYouOpen] = useState(false)

  const whatsappUrl = useMemo(
    () => contactData.socials.find((social) => social.platform === 'whatsapp')?.url ?? '',
    []
  )

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedMessage = formData.message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage || !whatsappUrl) {
      return
    }

    const message = [
      'New contact form submission',
      '',
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Message: ${trimmedMessage}`,
    ].join('\n')

    const separator = whatsappUrl.includes('?') ? '&' : '?'
    const redirectUrl = `${whatsappUrl}${separator}text=${encodeURIComponent(message)}`

    setIsThankYouOpen(true)
    setFormData(initialFormState)
    window.open(redirectUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="contact" number="06" title="Contact">
      <div className="contact-wrapper">
        <div className="contact-inner">

          <div className="contact-form-container">
            <div className="contact-field">
              <h3 className="contact-title">{contactData.heading}</h3>
              <p className="contact-subtitle">{contactData.subtitle}</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  className="form-input"
                  placeholder="Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="contact-submit-btn">
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

      {isThankYouOpen && (
        <div className="contact-thankyou-shell" onClick={() => setIsThankYouOpen(false)}>
          <div className="contact-thankyou-backdrop" />
          <div
            className="contact-thankyou-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <h4 className="contact-thankyou-title">Thank you!</h4>
            <p className="contact-thankyou-text">
              Your message is ready in WhatsApp. Please send it there to complete your inquiry.
            </p>
            <button
              type="button"
              className="contact-thankyou-btn"
              onClick={() => setIsThankYouOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}

export default ContactSection
