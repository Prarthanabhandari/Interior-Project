import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './About.css'

const useCounter = (target, duration, trigger) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const inc = target / (duration / 16)
    const t = setInterval(() => {
      start += inc
      if (start >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(t)
  }, [trigger, target, duration])
  return count
}

const About = () => {
  const navigate = useNavigate()
  const statsRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true) }, { threshold:0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const projects = useCounter(150, 1800, triggered)
  const clients  = useCounter(98,  1500, triggered)
  const awards   = useCounter(12,  1200, triggered)

  return (
    <section className="am-about" id="about">
      <div className="am-about-inner">

        {/* LEFT — Portrait */}
        <div className="am-about-left">
          <div className="am-portrait-wrap">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=80"
              alt="Anita Acharya — Interior Designer"
            />
            <span className="am-frame-tl" />
            <span className="am-frame-br" />
          </div>
          <div className="am-exp-badge">
            <strong>10+</strong>
            <span>Years of Excellence</span>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="am-about-right">
          <p className="am-overline">About AM Interior's</p>
          <h2 className="am-about-heading">
            Crafting Beautiful Interiors{' '}
            <em>for Over 10 Years</em>
          </h2>
          <div className="am-rule" />

          {/* Real info from business card */}
          <div className="am-founders">
            <div className="am-founder">
              <span className="am-founder-name">Anita Acharya</span>
              <span className="am-founder-role">Co-Founder & Interior Designer</span>
            </div>
            <div className="am-founder-sep" />
            <div className="am-founder">
              <span className="am-founder-name">Monika Gurav</span>
              <span className="am-founder-role">Co-Founder & Interior Designer</span>
            </div>
          </div>

          <p className="am-about-body">
            At AM Interior's, we transform spaces with passion and expertise — combining
            corporate precision with artistic vision to create interiors that are deeply
            personal and purposeful.
          </p>

          {/* Services from business card */}
          <div className="am-services-list">
            <p className="am-services-label">Our Services</p>
            <div className="am-service-tags">
              {['Interior Design','Space Planning','3ds Max Views','2D Drawings & 3D Views','Project Management','Land Surveying Works'].map(s => (
                <span key={s} className="am-service-tag">✓ {s}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="am-stats" ref={statsRef}>
            <div className="am-stat">
              <strong>{projects}+</strong>
              <span>Projects Delivered</span>
            </div>
            <div className="am-stat-rule" />
            <div className="am-stat">
              <strong>{clients}%</strong>
              <span>Happy Clients</span>
            </div>
            <div className="am-stat-rule" />
            <div className="am-stat">
              <strong>{awards}</strong>
              <span>Design Awards</span>
            </div>
          </div>

          <div className="am-about-btns">
            <button className="am-btn-teal">Read More</button>
            <button className="am-btn-outline-teal" onClick={() => navigate('/team')}>
              Meet The Team →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About