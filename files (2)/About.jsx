import React from 'react'
import './About.css'

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-image-wrap">
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=80"
          alt="Interior Designer Anita"
          className="about-img"
        />
        <div className="about-exp-badge">
          <span className="badge-number">10+</span>
          <span className="badge-text">Years of Excellence</span>
        </div>
      </div>

      <div className="about-content">
        <span className="overline">About Anita</span>
        <h2>
          Crafting Beautiful Interiors{' '}
          <em>for Over 10 Years</em>
        </h2>
        <div className="gold-divider"></div>
        <p>
          Transforming spaces with passion and expertise. Anita brings a rare blend
          of corporate precision and artistic vision — creating interiors that are
          not just beautiful, but deeply personal and purposeful.
        </p>
        <p>
          From modular kitchens to executive offices, every project is approached
          as a unique story waiting to be told through light, texture, and form.
        </p>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-num">150+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">98%</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">12</span>
            <span className="stat-label">Design Awards</span>
          </div>
        </div>
        <button className="btn-outline">Read More</button>
      </div>
    </section>
  )
}

export default About
