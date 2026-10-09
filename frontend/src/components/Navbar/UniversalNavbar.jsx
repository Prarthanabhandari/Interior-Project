import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './UniversalNavbar.css'

const LINKS = [
  { label: 'Home',      to: '/'          },
  { label: 'About',     to: '/about'     },
  { label: 'Services',  to: '/#services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog',      to: '/blog'      },
  { label: 'Contact',   to: '/contact'   },
]

const UniversalNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const handleLink = (e, to) => {
    e.preventDefault()
    setMenuOpen(false)
    if (to.includes('#')) {
      const hash = to.split('#')[1]
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 350)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(to)
    }
  }

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to.split('#')[0]) && to !== '/'
  }

  return (
    <nav className={`unav ${scrolled ? 'unav--solid' : 'unav--transparent'}`}>

      {/* ══════════════════════════════════════
          LOGO — exact replica of business card
          Left: AM mark (A peaks + M base)
          Right: "AM Interior's" + names + tagline
      ══════════════════════════════════════ */}
      <div className="unav-logo" onClick={() => navigate('/')}>

        {/* SVG logo mark — matches the card exactly */}
        <svg
          className="unav-logo-svg"
          viewBox="0 0 60 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/*
            The business card logo has:
            - A tall pointed 'A' shape (two diagonal strokes meeting at a peak, no crossbar at top)
            - An 'M' shape below / merged (two feet spreading out)
            - White/silver fill on card, teal on website
          */}

          {/* LEFT peak of A (tall left stroke) */}
          <path
            d="M6 50 L22 8"
            stroke="#1CB4A6" strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round"
          />
          {/* RIGHT peak of A (tall right stroke) */}
          <path
            d="M54 50 L38 8"
            stroke="#1CB4A6" strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round"
          />
          {/* CENTER join at top — the A peak */}
          <path
            d="M22 8 L30 24 L38 8"
            stroke="#1CB4A6" strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round"
          />
          {/* M left foot */}
          <path
            d="M6 50 L14 36"
            stroke="#1CB4A6" strokeWidth="4"
            strokeLinecap="round"
          />
          {/* M right foot */}
          <path
            d="M54 50 L46 36"
            stroke="#1CB4A6" strokeWidth="4"
            strokeLinecap="round"
          />
          {/* M center dip */}
          <path
            d="M14 36 L30 46 L46 36"
            stroke="#1CB4A6" strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>

        {/* Text block */}
        <div className="unav-logo-text">
          <span className="unav-logo-brand">AM Interior's</span>
          <span className="unav-logo-names">Anita Acharya | Monika Gurav</span>
          <span className="unav-logo-tag">Interior Designer</span>
        </div>
      </div>

      {/* ── NAV LINKS ── */}
      <ul className={`unav-links ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(l => (
          <li key={l.to}>
            <a
              href={l.to}
              className={isActive(l.to) ? 'active' : ''}
              onClick={(e) => handleLink(e, l.to)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* ── BOOK CONSULTATION BUTTON ── */}
      <button className="unav-cta" onClick={() => navigate('/get-quote')}>
        Book Consultation
      </button>

      {/* ── HAMBURGER (mobile) ── */}
      <button
        className={`unav-burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}

export default UniversalNavbar