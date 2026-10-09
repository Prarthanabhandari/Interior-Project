import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { label:'Home',      path:'/'          },
  { label:'About',     path:'/#about'    },
  { label:'Services',  path:'/#services' },
  { label:'Portfolio', path:'/portfolio' },
  { label:'Blog',      path:'/blog'      },
  { label:'Contact',   path:'/contact'   },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (path) => {
    setMenuOpen(false)
    if (path.includes('#')) {
      const hash = path.split('#')[1]
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' }), 300)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' })
      }
    } else {
      navigate(path)
    }
  }

  return (
    <nav className={`am-navbar ${scrolled ? 'am-navbar--scrolled' : 'am-navbar--top'}`}>

      {/* ── AM INTERIOR'S LOGO ── */}
      <div className="am-logo" onClick={() => navigate('/')}>
        <div className="am-logo-icon">
          <svg viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="38">
            {/* A shape */}
            <path d="M2 36L12 4L24 28L36 4L46 36" stroke="#1CB4A6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* M crossbar */}
            <path d="M17 22L31 22" stroke="#1CB4A6" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="am-logo-text">
          <span className="am-logo-brand">AM Interior's</span>
          <span className="am-logo-names">Anita Acharya | Monika Gurav</span>
          <span className="am-logo-tagline">Interior Designer</span>
        </div>
      </div>

      {/* ── NAV LINKS ── */}
      <ul className={`am-nav-links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <li key={link.path}>
            <a
              className={location.pathname === link.path.split('#')[0] && !link.path.includes('#') ? 'active' : ''}
              onClick={() => handleNav(link.path)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* ── CTA BUTTON ── */}
      <button className="am-btn-quote" onClick={() => navigate('/get-quote')}>
        Book Consultation
      </button>

      {/* ── HAMBURGER ── */}
      <button className={`am-hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span/><span/><span/>
      </button>
    </nav>
  )
}

export default Navbar