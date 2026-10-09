import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <p className="hero-overline">Welcome to Anita Interior</p>
        <h1>Designing Spaces<br />That Inspire</h1>
        <p className="hero-sub">Luxury interiors tailored to your lifestyle</p>
        <div className="hero-actions">
          <button className="btn-gold">View Projects</button>
          <button className="btn-outline-white">Our Story</button>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span></span>
      </div>
    </section>
  )
}

export default Hero
