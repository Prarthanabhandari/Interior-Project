import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CTAFooter.css'

const CTAFooter = () => {
  const navigate = useNavigate()
  return (
    <footer className="am-footer" id="contact">

      {/* CTA Band */}
      <div className="am-footer-cta">
        <div className="am-footer-cta-inner">
          <div>
            <span className="am-footer-overline">Ready to Begin?</span>
            <h2 className="am-footer-title">Let's Design Your<br /><em>Dream Space</em></h2>
            <p className="am-footer-sub">Contact us today for a free consultation</p>
          </div>
          <button className="am-footer-btn" onClick={() => navigate('/contact')}>
            Contact Now →
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="am-footer-info">
        <div className="am-footer-brand">
          <span className="am-footer-logo">AM Interior's</span>
          <span className="am-footer-names">Anita Acharya | Monika Gurav</span>
          <span className="am-footer-tagline">Interior Designer</span>
          <p className="am-footer-address">
            Laxmi Terrace, 4th Floor, Flat No. 8, Jawalkarnagar<br />
            (Shree Dyaneshwarnagar), Karvenagar, Pune 411052
          </p>
        </div>

        <div className="am-footer-col">
          <p className="am-footer-col-title">Services</p>
          <ul>
            {['Interior Design','Space Planning','3ds Max Views','2D/3D Drawings','Project Management','Land Surveying'].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="am-footer-col">
          <p className="am-footer-col-title">Contact</p>
          <ul>
            <li>📞 +91 8308 882977 (Anita)</li>
            <li>📞 +91 7057 266506 (Monika)</li>
            <li>✉️ AMinteriors.2420@gmail.com</li>
          </ul>
        </div>

        <div className="am-footer-col">
          <p className="am-footer-col-title">Quick Links</p>
          <ul>
            <li onClick={() => navigate('/')}        style={{cursor:'pointer'}}>Home</li>
            <li onClick={() => navigate('/portfolio')} style={{cursor:'pointer'}}>Portfolio</li>
            <li onClick={() => navigate('/team')}    style={{cursor:'pointer'}}>Our Team</li>
            <li onClick={() => navigate('/blog')}    style={{cursor:'pointer'}}>Blog</li>
            <li onClick={() => navigate('/contact')} style={{cursor:'pointer'}}>Contact</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="am-footer-bottom">
        <span>© {new Date().getFullYear()} AM Interior's. All rights reserved.</span>
        <span>+91 8308 882977 | AMinteriors.2420@gmail.com</span>
        {/* Secret admin door — subtle teal dot */}
        <span className="am-secret-door" onClick={() => navigate('/admin/login')} title="Admin">
          <span className="am-secret-dot" />
        </span>
      </div>
    </footer>
  )
}

export default CTAFooter