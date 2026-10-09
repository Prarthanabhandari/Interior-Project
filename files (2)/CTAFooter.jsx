import React from 'react'
import './CTAFooter.css'

const CTAFooter = () => {
  return (
    <footer className="cta-footer" id="contact">
      <div className="cta-content">
        <span className="overline">Get In Touch</span>
        <h2>Let's Design Your<br /><em>Dream Space</em></h2>
        <p>Get in touch with us to create your perfect interior</p>
        <button className="btn-gold">Contact Now</button>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">Anita Interior</div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Instagram</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Anita Interior. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default CTAFooter
