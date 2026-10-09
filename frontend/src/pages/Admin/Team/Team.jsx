import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UniversalNavbar from '../../components/Navbar/UniversalNavbar'
import './Team.css'

/* ── REAL TEAM DATA — from business card ── */
const team = [
  {
    id: 1,
    name: 'Anita Acharya',
    role: 'Co-Founder & Interior Designer',
    phone: '+91 8308 882977',
    bio: 'Crafting homes that tell the story of the people who live within them. Anita brings a rare blend of corporate precision and artistic vision to every space — from modular kitchens to full-home transformations.',
    strengths: [
      'Luxury Space Planning',
      'Bespoke Interior Design',
      'Client Vision Curation',
      'Project Management',
    ],
    material: 'Calacatta Marble',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    flip: false,
  },
  {
    id: 2,
    name: 'Monika Gurav',
    role: 'Co-Founder & Interior Designer',
    phone: '+91 7057 266506',
    bio: 'Merging functional modernity with creative craftsmanship. Monika specialises in 3ds Max visualisation and ensures every project is delivered on time, on budget, and beyond expectation.',
    strengths: [
      '3ds Max 3D Views',
      '2D Drawings & Floor Plans',
      'Land Surveying Works',
      'Material & Texture Selection',
    ],
    material: 'Oak Wood Finish',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    flip: true,
  },
]

/* ── INTERSECTION OBSERVER HOOK ── */
const useInView = () => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

/* ── MEMBER ROW COMPONENT ── */
const MemberRow = ({ member }) => {
  const [ref, inView] = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`member-row ${member.flip ? 'member-row--flip' : ''} ${inView ? 'member-row--in' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── PORTRAIT ── */}
      <div className="member-portrait">
        <div className="portrait-frame-offset" />
        <div className={`portrait-img-wrap ${hovered ? 'portrait-img-wrap--hovered' : ''}`}>
          <img src={member.img} alt={member.name} loading="lazy" />
        </div>
        {/* Phone badge on portrait */}
        <div className="portrait-phone">
          📞 {member.phone}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="member-content">

        <span className="member-overline">AM Interior's Team</span>
        <h2 className="member-name">{member.name}</h2>
        <p className="member-role">
          <span className="role-label">Role — </span>{member.role}
        </p>

        <div className="member-divider" />

        <div className="member-details">
          <p className="member-bio">{member.bio}</p>
          <div className="details-rule" />
          <div className="member-strengths">
            <p className="strengths-label">Specialisations</p>
            <ul>
              {member.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="member-material">
          <span className="material-label">Favourite Material: </span>
          <span className="material-value">{member.material}</span>
        </div>
      </div>
    </div>
  )
}

/* ── MAIN TEAM PAGE ── */
const Team = () => {
  const navigate = useNavigate()

  return (
    <div className="team-page">

      {/* ── UNIVERSAL NAVBAR — same as all pages ── */}
      <UniversalNavbar />

      {/* ── HERO HEADER ── */}
      <div className="team-hero">
        <div className="team-hero-inner">
          <span className="team-overline">Our People</span>
          <h1 className="team-hero-title">
            The Architects of<br />
            <em>Your Vision</em>
          </h1>
          <p className="team-hero-sub">
            Meet Anita &amp; Monika — the passionate duo turning your design concepts into luxury realities.
          </p>
          <div className="team-hero-rule" />
        </div>
      </div>

      {/* ── TEAM MEMBERS ── */}
      <div className="team-members">
        {team.map(m => <MemberRow key={m.id} member={m} />)}
      </div>

      {/* ── CTA BAND ── */}
      <div className="team-cta-band">
        <div>
          <h2>Work With Our Team</h2>
          <p>Book a free consultation and start your interior journey today</p>
        </div>
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
          <button className="team-cta-btn-solid" onClick={() => navigate('/contact')}>
            Contact Us
          </button>
          <button className="team-cta-btn-outline" onClick={() => navigate('/get-quote')}>
            Book Consultation
          </button>
        </div>
      </div>

      {/* ── FOOTER — same as all other pages ── */}
      <footer className="am-shared-footer">
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
          <span
            className="am-sf-secret"
            onClick={() => navigate('/admin/login')}
          >
            <span className="am-sf-dot" /> Secret Door
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Team