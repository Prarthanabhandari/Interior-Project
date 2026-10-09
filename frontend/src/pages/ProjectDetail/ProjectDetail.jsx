import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ProjectDetail.css'

// ── MOCK PROJECT DATA ──
// When backend is ready, replace with:
// const { data } = await axios.get(`http://localhost:5000/api/projects/${id}`)
const PROJECT_DATA = {
  1: {
    id: 1,
    title: 'The Breezeway Penthouse',
    subtitle: 'An 1800 sq. ft. contemporary sanctuary overlooking the Mumbai coastline.',
    location: 'Bandra, Mumbai',
    client: 'Private Residence',
    area: '1800 sq. ft.',
    timeline: '4 Months',
    completion: 'Jan 2026',
    scope: 'Concept, Execution, Bespoke Furniture',
    challenge: 'Optimize a narrow layout for maximum light and flow across a split-level floor plan.',
    solution: 'Strategic use of reflective materials, custom modular units, and a soft, cream-based color palette that bounces light into every corner.',
    category: 'LIVING ROOM',
    heroImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
    sideImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    gallery: [
      { id: 1, img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&q=80', type: 'photo', cols: 1 },
      { id: 2, img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80', type: 'photo', cols: 1 },
      { id: 3, img: 'https://images.unsplash.com/photo-1560185127-6a4b8e4e9f41?w=500&q=80', type: 'blueprint', cols: 1 },
      { id: 4, img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80', type: 'blueprint', cols: 1 },
      { id: 5, img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=500&q=80', type: 'photo', cols: 1 },
      { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80', type: 'photo', cols: 1 },
      { id: 7, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80', type: 'photo', cols: 1 },
      { id: 8, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80', type: 'photo', cols: 1 },
    ],
    materials: [
      { name: 'Calacatta Marble', use: 'Primary Flooring',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80' },
      { name: 'Brushed Brass',    use: 'Accent Fixtures',     img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=200&q=80' },
      { name: 'Oak Wood Finish',  use: 'Custom Joinery',      img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=200&q=80' },
      { name: 'Navy Velvet',      use: 'Statement Furniture',  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80' },
    ],
    hotspots: [
      { x: 35, y: 55, label: 'Custom Velvet Sofa — Handcrafted by Anita Interior' },
      { x: 65, y: 40, label: 'Brushed Brass Floor Lamp — Sourced from Milan' },
      { x: 50, y: 80, label: 'Calacatta Marble Coffee Table — Italian Import' },
    ],
    beforeImg: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=900&q=80',
    afterImg:  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
  },
}

// ── BEFORE / AFTER SLIDER ──
const BeforeAfterSlider = ({ before, after }) => {
  const [pos, setPos]       = useState(50)
  const [dragging, setDrag] = useState(false)
  const containerRef        = useRef(null)

  const calcPos = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const pct  = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(Math.max(pct, 2), 98))
  }

  const onMouseMove  = (e) => { if (dragging) calcPos(e.clientX) }
  const onTouchMove  = (e) => calcPos(e.touches[0].clientX)

  useEffect(() => {
    const up = () => setDrag(false)
    window.addEventListener('mouseup',  up)
    window.addEventListener('touchend', up)
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up) }
  }, [])

  return (
    <div
      className="slider-wrap"
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* AFTER (full width underneath) */}
      <img className="slider-img slider-img--after" src={after} alt="After" />

      {/* BEFORE (clipped to left of handle) */}
      <div className="slider-before-clip" style={{ width: `${pos}%` }}>
        <img className="slider-img" src={before} alt="Before" style={{ width: containerRef.current?.offsetWidth || '100%' }} />
      </div>

      {/* Handle */}
      <div
        className="slider-handle"
        style={{ left: `${pos}%` }}
        onMouseDown={() => setDrag(true)}
        onTouchStart={() => setDrag(true)}
      >
        <div className="handle-line" />
        <div className="handle-circle">
          <span>◀</span>
          <span>▶</span>
        </div>
        <div className="handle-line" />
      </div>

      {/* Labels */}
      <span className="slider-label slider-label--before">Before</span>
      <span className="slider-label slider-label--after-label">After</span>
    </div>
  )
}

// ── HOTSPOT IMAGE ──
const HotspotImage = ({ img, hotspots }) => {
  const [active, setActive] = useState(null)
  return (
    <div className="hotspot-wrap">
      <img src={img} alt="Project" />
      {hotspots.map((h, i) => (
        <div
          key={i}
          className={`hotspot ${active === i ? 'hotspot--active' : ''}`}
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
        >
          <div className="hotspot-dot">+</div>
          {active === i && (
            <div className={`hotspot-tip ${h.x > 60 ? 'hotspot-tip--left' : ''}`}>
              {h.label}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── MAIN PAGE ──
const ProjectDetail = () => {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const project    = PROJECT_DATA[id] || PROJECT_DATA[1]
  const [tab, setTab] = useState('gallery') // 'gallery' | 'beforeafter'

  return (
    <div className="pd-page">

      {/* ── NAVBAR ── */}
      <nav className="pd-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>AM Interior's</div>
        <ul className="pd-nav-links">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior:'smooth' }), 300) }}>Services</li>
          <li className="active" onClick={() => navigate('/portfolio')}>Portfolio</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
        <button className="pd-btn-quote" onClick={() => navigate('/get-quote')}>Book Consultation</button>
      </nav>

      {/* ══════════════════════════════════════
          MAIN GRID — Left content + Right sidebar
      ══════════════════════════════════════ */}
      <div className="pd-main-grid">

        {/* ── LEFT COLUMN ── */}
        <div className="pd-left">

          {/* Hero image with hotspots */}
          <div className="pd-hero-img">
            <HotspotImage img={project.heroImg} hotspots={project.hotspots} />
            <div className="pd-hero-overlay">
              <p className="pd-category">{project.category}</p>
              <h1 className="pd-title">Project: {project.title}</h1>
              <p className="pd-subtitle">{project.subtitle}</p>
            </div>
          </div>

          {/* ── TAB TOGGLE ── */}
          <div className="pd-tabs">
            <button
              className={`pd-tab ${tab === 'gallery' ? 'pd-tab--active' : ''}`}
              onClick={() => setTab('gallery')}
            >Photo Gallery</button>
            <button
              className={`pd-tab ${tab === 'beforeafter' ? 'pd-tab--active' : ''}`}
              onClick={() => setTab('beforeafter')}
            >Before &amp; After</button>
          </div>

          {/* ── GALLERY GRID (masonry-style) ── */}
          {tab === 'gallery' && (
            <div className="pd-gallery">
              {project.gallery.map(g => (
                <div
                  key={g.id}
                  className={`pd-gallery-item ${g.type === 'blueprint' ? 'pd-gallery-item--blueprint' : ''}`}
                >
                  <img src={g.img} alt="" loading="lazy" />
                  {g.type === 'blueprint' && (
                    <div className="blueprint-badge">Floor Plan</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── BEFORE / AFTER SLIDER ── */}
          {tab === 'beforeafter' && (
            <div className="pd-ba-wrap">
              <p className="pd-ba-hint">Drag the slider to compare</p>
              <BeforeAfterSlider before={project.beforeImg} after={project.afterImg} />
            </div>
          )}

          {/* ── DESIGN JOURNEY (Challenge / Solution) ── */}
          <div className="pd-journey">
            <h2 className="pd-section-title">Design Journey</h2>
            <div className="pd-journey-grid">
              <div className="pd-journey-block">
                <p className="journey-label journey-label--challenge">The Challenge:</p>
                <p className="journey-body">{project.challenge}</p>
              </div>
              <div className="pd-journey-block">
                <p className="journey-label journey-label--solution">The Solution:</p>
                <p className="journey-body">{project.solution}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="pd-sidebar">

          {/* Side image */}
          <div className="pd-side-img">
            <img src={project.sideImg} alt={project.title} />
          </div>

          {/* Project at a glance */}
          <div className="pd-glance">
            <h3 className="pd-glance-title">Project at a Glance</h3>
            <div className="pd-glance-grid">
              {[
                { label: 'Location',   value: project.location   },
                { label: 'Client',     value: project.client     },
                { label: 'Area',       value: project.area       },
                { label: 'Completion', value: project.completion },
                { label: 'Scope',      value: project.scope      },
              ].map(item => (
                <div className="glance-item" key={item.label}>
                  <span className="glance-label">{item.label}:</span>
                  <span className="glance-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Material Palette */}
          <div className="pd-materials">
            <h3 className="pd-section-title pd-section-title--center">Material Palette</h3>
            <div className="pd-mat-row">
              {project.materials.map(m => (
                <div className="pd-mat-item" key={m.name}>
                  <div className="pd-mat-circle">
                    <img src={m.img} alt={m.name} />
                  </div>
                  <p className="pd-mat-name">{m.name}</p>
                  <p className="pd-mat-use">{m.use}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer bar inside sidebar */}
          <div className="pd-sidebar-footer">
            <p className="pd-footer-contact">Contact Us</p>
            <p>+91 8308 882977</p>
            <p>AMinteriors.2420@gmail.com</p>
            <div className="pd-footer-socials">
              <span>&#9711;</span>
              <span>in</span>
              <span>&#9711;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail