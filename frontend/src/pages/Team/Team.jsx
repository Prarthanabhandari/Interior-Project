import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Team.css'

const team = [
  {
    id: 1,
    name: 'Anita Prajapati',
    role: 'Founder & Creative Director',
    bio: 'Crafting homes that tell the story of the people who live within them. Anita brings a rare blend of corporate precision and artistic vision to every space.',
    strengths: [
      'Luxury Space Planning',
      'Bespoke Furniture Design',
      'Client Vision Curation',
    ],
    material: 'Travertine Marble',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    flip: false,   // image LEFT, text RIGHT
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    role: 'Lead Interior Architect',
    bio: 'Merging functional modernity with sustainable craftsmanship. Rajesh ensures every structural decision is both elegant and enduring.',
    strengths: [
      'Structural Innovation',
      'Material Durability & Sourcing',
      'On-Site Project Management',
    ],
    material: 'Brushed Brass',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    flip: true,    // text LEFT, image RIGHT
  },
  {
    id: 3,
    name: 'Sneha Shah',
    role: 'Lighting & Textures Specialist',
    bio: 'Harnessing light and layer to create ambient sanctuaries. Sneha transforms ordinary rooms into emotionally resonant experiences through expert material curation.',
    strengths: [
      'Lighting Design Strategy',
      'Textile Selection & Curation',
      'Acoustic Optimization',
    ],
    material: 'Textured Navy Velvet',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    flip: false,   // image LEFT, text RIGHT
  },
]

// Hook: trigger when element enters viewport
const useInView = () => {
  const ref  = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.18 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// Individual member row
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
        {/* Offset gold frame behind image */}
        <div className="portrait-frame-offset" />
        <div className={`portrait-img-wrap ${hovered ? 'portrait-img-wrap--hovered' : ''}`}>
          <img src={member.img} alt={member.name} loading="lazy" />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className={`member-content ${hovered ? 'member-content--hovered' : ''}`}>

        {/* Name */}
        <h2 className="member-name">{member.name}</h2>

        {/* Role */}
        <p className="member-role">
          <span className="role-label">Role: </span>{member.role}
        </p>

        {/* Divider */}
        <div className="member-divider" />

        {/* Bio + Strengths side by side */}
        <div className="member-details">
          <p className="member-bio">{member.bio}</p>

          {/* Vertical gold rule */}
          <div className="details-rule" />

          {/* Technical strengths */}
          <div className="member-strengths">
            <p className="strengths-label">Technical Strengths</p>
            <ul>
              {member.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Favourite material badge */}
        <div className="member-material">
          <span className="material-label">Favourite Material: </span>
          <span className="material-value">{member.material}</span>
        </div>
      </div>
    </div>
  )
}

const Team = () => {
  const navigate = useNavigate()

  return (
    <div className="team-page">

      {/* ── NAVBAR ── */}
      <nav className="team-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>Anita Interior</div>
        <ul className="team-nav-links">
          <li onClick={() => navigate('/')}>Home</li>
          <li className="active">About</li>
          <li>Services</li>
          <li onClick={() => navigate('/portfolio')}>Portfolio</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
        <button className="btn-get-quote" onClick={() => navigate('/')}>Get Quote</button>
      </nav>

      {/* ── HERO HEADER ── */}
      <div className="team-hero">
        <div className="team-hero-inner">
          <p className="team-overline">Our People</p>
          <h1 className="team-hero-title">The Architects of<br />Your Vision</h1>
          <p className="team-hero-sub">
            Meet the specialized team turning concepts into luxury realities.
          </p>
          <div className="team-hero-line" />
        </div>
      </div>

      {/* ── TEAM MEMBERS ── */}
      <div className="team-members">
        {team.map(m => <MemberRow key={m.id} member={m} />)}
      </div>

      {/* ── FOOTER BAR ── */}
      <div className="team-footer-bar">
        <span>+91 98765 43210</span>
        <span className="tfoot-sep">|</span>
        <span>www.anitainterior.com</span>
        <div className="tfoot-socials">
          <span>in</span>
          <span>&#9711;</span>
        </div>
      </div>

    </div>
  )
}

export default Team