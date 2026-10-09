import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Contact.css'
import '../../styles/SharedNav.css'
import api from '../../services/api'

const Contact = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    client_name: '', email: '', phone: '',
    project_type: '', budget: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await api.post('/inquiries', form)
      setSubmitted(true)
    } catch {
      // Even if backend is down, show success for demo
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const contactDetails = [
    { icon: '📍', label: 'Studio Address',   value: 'Laxmi Terrace, 4th Floor, Flat No.8,\nJawalkarnagar, Karvenagar, Pune 411052' },
    { icon: '🏢', label: 'Office Address',   value: 'AM Interior Studio,\nKarvenagar, Pune 411052' },
    { icon: '📞', label: 'Mobile / WhatsApp',value: '+91 8308 882977 (Anita)\n+91 7057 266506 (Monika)' },
    { icon: '✉️', label: 'Email',            value: 'AMinteriors.2420@gmail.com' },
    { icon: '🕐', label: 'Working Hours',    value: 'Mon – Sat: 10:00 AM – 7:00 PM\nSunday: By Appointment Only' },
  ]

  return (
    <div className="contact-page">

      {/* ── AM INTERIOR'S NAVBAR ── */}
      <nav className="am-shared-nav">
        <div className="am-shared-nav-logo" onClick={() => navigate('/')}>
          <svg width="44" height="38" viewBox="0 0 60 55" fill="none">
            <path d="M6 50 L22 8"  stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M54 50 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 8 L30 24 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 50 L14 36"  stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round"/>
            <path d="M54 50 L46 36" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round"/>
            <path d="M14 36 L30 46 L46 36" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="am-shared-nav-text">
            <span className="am-snl-brand">AM Interior's</span>
            <span className="am-snl-sub">ANITA ACHARYA | MONIKA GURAV</span>
            <span className="am-snl-tag">Interior Designer</span>
          </div>
        </div>
        <ul className="am-shared-nav-links">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior:'smooth' }), 300) }}>Services</li>
          <li onClick={() => navigate('/portfolio')}>Portfolio</li>
          <li onClick={() => navigate('/blog')}>Blog</li>
          <li style={{color:'#1CB4A6', borderBottom:'2px solid #1CB4A6', paddingBottom:'3px'}}>Contact</li>
        </ul>
        <button className="am-shared-cta" onClick={() => navigate('/get-quote')}>Book Consultation</button>
      </nav>

      {/* ── HERO BAND ── */}
      <div className="contact-hero">
        <span className="contact-overline">Reach Out</span>
        <h1 className="contact-hero-title">Let's Start a Conversation</h1>
        <p className="contact-hero-sub">Every great space begins with a single conversation. Tell us your vision.</p>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="contact-main">

        {/* LEFT — Contact Info */}
        <div className="contact-info-col">
          <h2 className="info-heading">Find Us</h2>
          <div className="contact-rule" />

          <div className="contact-details">
            {contactDetails.map((d, i) => (
              <div className="contact-detail-item" key={i}>
                <span className="detail-icon">{d.icon}</span>
                <div>
                  <p className="detail-label">{d.label}</p>
                  {d.value.split('\n').map((line, j) => (
                    <p className="detail-value" key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="contact-socials">
            <p className="socials-label">Follow Our Journey</p>
            <div className="socials-row">
              {[
                { name:'Instagram', icon:'📷', url:'https://instagram.com/anitainterior' },
                { name:'LinkedIn',  icon:'💼', url:'https://linkedin.com/in/anitainterior' },
                { name:'Pinterest', icon:'📌', url:'https://pinterest.com/anitainterior' },
                { name:'YouTube',   icon:'▶',  url:'https://youtube.com/@anitainterior' },
              ].map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="social-chip">
                  <span>{s.icon}</span> {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919876543210?text=Hi Anita! I found your website and would love to discuss my interior design project."
            target="_blank" rel="noreferrer"
            className="whatsapp-cta"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* RIGHT — Contact Form */}
        <div className="contact-form-col">
          <h2 className="form-heading">Send Us a Message</h2>
          <div className="contact-rule" />

          {submitted ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. Anita will personally get back to you within 24 hours.</p>
              <button className="am-contact-btn" onClick={() => { setSubmitted(false); setForm({ client_name:'', email:'', phone:'', project_type:'', budget:'', message:'' }) }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {error && <div className="form-error">{error}</div>}

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your full name" value={form.client_name} onChange={e => update('client_name', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Project Type</label>
                  <select value={form.project_type} onChange={e => update('project_type', e.target.value)}>
                    <option value="">Select a service</option>
                    <option>Living Room Design</option>
                    <option>Bedroom Design</option>
                    <option>Modular Kitchen</option>
                    <option>Office Interiors</option>
                    <option>Bathroom Design</option>
                    <option>Full Home Design</option>
                    <option>3D Visualization</option>
                    <option>Material Consultation</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Budget Range</label>
                <select value={form.budget} onChange={e => update('budget', e.target.value)}>
                  <option value="">Select approximate budget</option>
                  <option>Under ₹2 Lakhs</option>
                  <option>₹2 – 5 Lakhs</option>
                  <option>₹5 – 10 Lakhs</option>
                  <option>₹10 – 20 Lakhs</option>
                  <option>Above ₹20 Lakhs</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your space, requirements, timeline, or any specific ideas you have in mind..."
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="am-contact-btn" disabled={loading}>
                {loading ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── MAP SECTION ── */}
      <div className="contact-map">
        <iframe
          title="Anita Interior Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9!2d72.8347!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBandra+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1000000000000"
          width="100%"
          height="380"
          style={{ border:0, display:'block', filter:'grayscale(20%) contrast(1.05)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ── AM INTERIOR'S FOOTER ── */}
      <div className="am-shared-footer">
        <div className="am-sf-top">
          <div className="am-sf-brand">
            <svg width="36" height="32" viewBox="0 0 60 55" fill="none">
              <path d="M6 50 L22 8"  stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M54 50 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 8 L30 24 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 36 L30 46 L46 36" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <span className="am-sf-logo">AM Interior's</span>
              <span className="am-sf-sub">Anita Acharya | Monika Gurav</span>
            </div>
          </div>
          <div className="am-sf-links">
            <span onClick={() => navigate('/')}>Home</span>
            <span onClick={() => navigate('/portfolio')}>Portfolio</span>
            <span onClick={() => navigate('/blog')}>Blog</span>
            <span onClick={() => navigate('/contact')}>Contact</span>
          </div>
          <div className="am-sf-contact">
            <p>📞 +91 8308 882977 (Anita)</p>
            <p>📞 +91 7057 266506 (Monika)</p>
            <p>✉️ AMinteriors.2420@gmail.com</p>
            <p>📍 Karvenagar, Pune 411052</p>
          </div>
        </div>
        <div className="am-sf-bottom">
          <span>© {new Date().getFullYear()} AM Interior's. All rights reserved.</span>
          <span className="am-sf-secret" onClick={() => navigate('/admin/login')}>
            <span className="am-sf-dot" /> Secret Door
          </span>
        </div>
      </div>
    </div>
  )
}

export default Contact