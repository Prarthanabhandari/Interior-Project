import React from 'react'
import './Services.css'

const services = [
  {
    id:1, title:'Interior Design',
    desc:'Complete interior design solutions tailored to your personality, lifestyle, and budget — from concept to completion.',
    icon:(
      <svg viewBox="0 0 48 48" fill="none" stroke="#1CB4A6" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="40" height="30" rx="1"/>
        <path d="M4 20h40"/><path d="M16 28h16M16 34h10" strokeLinecap="round"/>
        <circle cx="10" cy="15" r="2" fill="#1CB4A6"/>
        <circle cx="16" cy="15" r="2" fill="#1CB4A6"/>
      </svg>
    ),
  },
  {
    id:2, title:'Space Planning',
    desc:'Expert spatial analysis and layout planning to maximise every square foot — functional, beautiful, and flow-optimised.',
    icon:(
      <svg viewBox="0 0 48 48" fill="none" stroke="#1CB4A6" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="36" height="36" rx="1"/>
        <path d="M6 18h36M18 6v36" strokeLinecap="round"/>
        <rect x="20" y="20" width="10" height="10" fill="rgba(28,180,166,0.15)"/>
      </svg>
    ),
  },
  {
    id:3, title:'3ds Max Views',
    desc:'Photorealistic 3D renderings using 3ds Max to visualise your space before construction begins — see it before you build it.',
    icon:(
      <svg viewBox="0 0 48 48" fill="none" stroke="#1CB4A6" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6L42 16v16L24 42 6 32V16z"/>
        <path d="M24 6v36M6 16l18 10 18-10" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:4, title:'2D Drawings & 3D Views',
    desc:'Precise 2D floor plans, elevations, and detailed drawings alongside 3D views for complete project documentation.',
    icon:(
      <svg viewBox="0 0 48 48" fill="none" stroke="#1CB4A6" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="1"/>
        <path d="M8 20h32M8 32h32M20 8v32M32 8v32" strokeLinecap="round" opacity="0.4"/>
        <path d="M14 14l6 6M34 34l-6-6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:5, title:'Project Management',
    desc:'End-to-end project management ensuring timely delivery, quality control, and seamless coordination with all execution teams.',
    icon:(
      <svg viewBox="0 0 48 48" fill="none" stroke="#1CB4A6" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="28" rx="1"/>
        <path d="M6 18h36"/>
        <path d="M14 26h8M14 32h12" strokeLinecap="round"/>
        <circle cx="34" cy="29" r="5"/>
        <path d="M34 27v2l1.5 1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:6, title:'Land Surveying Works',
    desc:'All types of professional land surveying — boundary surveys, topographic surveys, and site measurement services.',
    icon:(
      <svg viewBox="0 0 48 48" fill="none" stroke="#1CB4A6" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L44 40H4z" strokeLinejoin="round"/>
        <path d="M24 4v36M14 22h20" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="3" fill="#1CB4A6"/>
      </svg>
    ),
  },
]

const Services = () => (
  <section className="am-services" id="services">
    <div className="section-header">
      <span className="overline">What We Offer</span>
      <h2>Our Services</h2>
    </div>
    <div className="am-services-grid">
      {services.map(s => (
        <div className="am-service-card" key={s.id}>
          <div className="am-service-icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
    {/* Execution team from business card */}
    <div className="am-execution-team">
      <p className="am-exec-label">Our Execution Partners</p>
      <div className="am-exec-tags">
        {['Carpentry & Furniture','Tiling','Electricals','POP','Civil','Plumbing','Aluminium/Fabrication','Painting','Cushion Work','Artists','MEP'].map(t => (
          <span key={t} className="am-exec-tag">{t}</span>
        ))}
      </div>
    </div>
  </section>
)

export default Services