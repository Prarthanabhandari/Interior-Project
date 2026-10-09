import React from 'react'
import './FeaturedProjects.css'

const projects = [
  {
    id: 1,
    title: 'Luxury Living Room',
    category: 'Living Room',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
  },
  {
    id: 2,
    title: 'Modern Kitchen',
    category: 'Kitchen',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80',
  },
  {
    id: 3,
    title: 'Elegant Office',
    category: 'Office',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80',
  },
]

const FeaturedProjects = () => {
  return (
    <section className="featured-projects" id="portfolio">
      <div className="section-header">
        <span className="overline">Our Work</span>
        <h2>Featured Projects</h2>
        <div className="gold-divider center"></div>
      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <div className="project-card" key={p.id}>
            <div className="project-img-wrap">
              <img src={p.img} alt={p.title} />
              <div className="project-overlay">
                <span className="overlay-category">{p.category}</span>
                <h4 className="overlay-title">{p.title}</h4>
                <button className="overlay-btn">View Project</button>
              </div>
            </div>
            <div className="project-meta">
              <span className="project-tag">{p.category}</span>
              <h4 className="project-name">{p.title}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-cta">
        <button className="btn-gold">View All Projects</button>
      </div>
    </section>
  )
}

export default FeaturedProjects
