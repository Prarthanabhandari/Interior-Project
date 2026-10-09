import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="am-hero" id="home">

      {/* ── BACKGROUND — emerald sofa ── */}
      <div className="am-hero-bg" />

      {/* ── CENTERED CONTENT ── */}
      <div className="am-hero-content">

        {/* Overline */}
        <p className="am-hero-overline">
          AM Interior's &nbsp;•&nbsp; Pune &nbsp;•&nbsp; Est. 2020
        </p>

        {/* Main headings */}
        <h1 className="am-hero-h1">Luxury Interiors</h1>
        <h2 className="am-hero-h2">Crafted for You</h2>

        {/* Sub paragraph */}
        <p className="am-hero-sub">
          From a statement sofa to a complete home transformation —<br />
          we design spaces that feel like <em>you</em>.<br />
          By Anita Acharya &amp; Monika Gurav
        </p>

        {/* Buttons */}
        <div className="am-hero-btns">
          <button
            className="am-btn-solid"
            onClick={() => navigate('/portfolio')}
          >
            View Our Work
          </button>
          <button
            className="am-btn-glass"
            onClick={() => navigate('/get-quote')}
          >
            Book Consultation
          </button>
        </div>

        {/* Service chips */}
        <div className="am-hero-chips">
          {[
            'Interior Design',
            'Space Planning',
            'Modular Design',
            '3ds Max Views',
            'Project Management',
          ].map(s => (
            <span key={s} className="am-hero-chip">{s}</span>
          ))}
        </div>

      </div>

      {/* Scroll hint */}
      <div className="am-hero-scroll"><span /></div>

    </section>
  )
}

export default Hero