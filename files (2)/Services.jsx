import React from 'react'
import './Services.css'

const services = [
  {
    id: 1,
    title: 'Interior Design',
    desc: 'Creating elegant, functional home spaces that reflect your personality and elevate your everyday living experience.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="40" height="30" rx="1" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M4 20h40" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M16 28h16M16 34h10" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="15" r="2" fill="#C5A059"/>
        <circle cx="16" cy="15" r="2" fill="#C5A059"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Modular Kitchens',
    desc: 'Stylish & functional kitchen solutions that combine smart storage, premium finishes, and timeless aesthetic appeal.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="16" width="36" height="24" rx="1" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M6 22h36" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M16 16V11a1 1 0 011-1h14a1 1 0 011 1v5" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M14 28h6v12h-6zM28 28h6v12h-6z" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M14 40h20" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Office Interiors',
    desc: 'Modern workplace designs that inspire productivity, reinforce your brand identity, and impress every visiting client.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="26" rx="1" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M14 36v6M34 36v6M10 42h28" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="10" y="16" width="12" height="9" rx="0.5" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M26 18h10M26 23h8" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Bedroom Design',
    desc: 'Serene, carefully curated bedroom environments that prioritize comfort, warmth, and restful personal retreats.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="22" width="40" height="18" rx="1" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M4 30h40" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M4 22v-6a2 2 0 012-2h36a2 2 0 012 2v6" stroke="#C5A059" strokeWidth="1.5"/>
        <rect x="10" y="16" width="10" height="6" rx="1" stroke="#C5A059" strokeWidth="1.5"/>
        <rect x="28" y="16" width="10" height="6" rx="1" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M8 40v2M40 40v2" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Bathroom Design',
    desc: 'Spa-inspired bathroom transformations combining premium fixtures, smart layouts, and sophisticated material palettes.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 26h32v6a8 8 0 01-8 8H16a8 8 0 01-8-8v-6z" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M8 26V14a4 4 0 018 0v12" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M20 40v4M28 40v4" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 26h4" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Space Consultation',
    desc: 'Expert consultation to help you visualise, plan, and make confident decisions before any renovation or build begins.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="10" stroke="#C5A059" strokeWidth="1.5"/>
        <path d="M24 15v5l3 3" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 34c0-3.3 4.5-6 10-6s10 2.7 10 6" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="section-header">
        <span className="overline">What We Offer</span>
        <h2>Our Services</h2>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card" key={s.id}>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
