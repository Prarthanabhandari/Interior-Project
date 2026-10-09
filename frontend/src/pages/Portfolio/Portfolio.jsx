import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Portfolio.css'

// ── MOCK DATA (replace with axios API calls when backend is ready) ──
const ALL_PHOTOS = {
  'LIVING ROOM': [
    { id: 1, title: 'Luxury Living Suite',       img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
    { id: 2, title: 'Modern Lounge Design',       img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
    { id: 3, title: 'Minimalist Living Room',     img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80' },
    { id: 4, title: 'Contemporary Sofa Set',      img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80' },
    { id: 5, title: 'Premium Living Space',       img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80' },
    { id: 6, title: 'Open Plan Living',           img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=600&q=80' },
  ],
  'BEDROOM': [
    { id: 7,  title: 'Master Bedroom Suite',      img: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80' },
    { id: 8,  title: 'Minimalist Bedroom',        img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80' },
    { id: 9,  title: 'Luxury Headboard Design',   img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80' },
    { id: 10, title: 'Warm Bedroom Palette',      img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80' },
    { id: 11, title: 'Modern Kids Bedroom',       img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { id: 12, title: 'Executive Bedroom',         img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80' },
  ],
  'KITCHEN': [
    { id: 13, title: 'Modern White Kitchen',      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
    { id: 14, title: 'Rustic Chic Kitchen',       img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80' },
    { id: 15, title: 'Industrial Kitchen Design', img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80' },
    { id: 16, title: 'Luxury Modular Kitchen',    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
    { id: 17, title: 'Modern Kitchen Island',     img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80' },
    { id: 18, title: 'Chef\'s Dream Kitchen',     img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80' },
    { id: 19, title: 'Open Plan Kitchen',         img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
    { id: 20, title: 'Marble Kitchen Counter',    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80' },
    { id: 21, title: 'Elegant Office Kitchen',    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  ],
  'OFFICE': [
    { id: 22, title: 'Executive Office Suite',    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
    { id: 23, title: 'Modern Co-working Space',   img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80' },
    { id: 24, title: 'Minimalist Workspace',      img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80' },
    { id: 25, title: 'Creative Studio Design',    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80' },
    { id: 26, title: 'Glass-Wall Office',         img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80' },
    { id: 27, title: 'Luxury Director\'s Room',   img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80' },
  ],
  'BATHROOM': [
    { id: 28, title: 'Spa Luxury Bathroom',       img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
    { id: 29, title: 'Marble Master Bath',        img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80' },
    { id: 30, title: 'Minimalist Wet Room',       img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80' },
    { id: 31, title: 'Gold Fixture Bathroom',     img: 'https://images.unsplash.com/photo-1560185008-b4f9b6a35a9b?w=600&q=80' },
    { id: 32, title: 'Walk-in Rain Shower',       img: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&q=80' },
    { id: 33, title: 'Freestanding Bathtub',      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
  ],
  'TOILET': [
    { id: 34, title: 'Powder Room Design',        img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80' },
    { id: 35, title: 'Compact Toilet Design',     img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
    { id: 36, title: 'Modern Guest Toilet',       img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80' },
  ],
  'DESIGN': [
    { id: 37, title: '3D Concept Render',         img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
    { id: 38, title: 'Floor Plan Layout',         img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { id: 39, title: 'Mood Board — Organic',      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
    { id: 40, title: 'Material Palette Study',    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=600&q=80' },
    { id: 41, title: 'Lighting Design Plan',      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
    { id: 42, title: 'Custom Furniture Sketch',   img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80' },
  ],
}

const ALL_VIDEOS = {
  'KITCHEN': [
    { id: 'v1', title: 'Modern Kitchen Design Walkthrough',   thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', featured: false },
    { id: 'v2', title: 'Small Kitchen Storage Solutions',      thumb: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80', featured: false },
    { id: 'v3', title: 'Small Kitchen Storage Solutions',      thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', featured: false },
    { id: 'v4', title: 'A Complete Walkthrough',               thumb: null, featured: true },
    { id: 'v5', title: 'Chef\'s Dream Kitchen Video',          thumb: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80', featured: false },
  ],
  'LIVING ROOM': [
    { id: 'v6', title: 'Living Room Transformation Tour',      thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', featured: false },
    { id: 'v7', title: 'A Complete Walkthrough',               thumb: null, featured: true },
    { id: 'v8', title: 'Interior Styling Tips',                thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', featured: false },
  ],
  'BEDROOM': [
    { id: 'v9',  title: 'Master Suite Reveal',                 thumb: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80', featured: false },
    { id: 'v10', title: 'A Complete Walkthrough',              thumb: null, featured: true },
  ],
}

const PROJECT_TITLES = {
  'KITCHEN':    'PROJECT: THE HEIGHTS PENTHOUSE',
  'LIVING ROOM':'PROJECT: PALM GROVE RESIDENCE',
  'BEDROOM':    'PROJECT: SKYLINE APARTMENTS',
  'OFFICE':     'PROJECT: CORPORATE HQ REDESIGN',
  'BATHROOM':   'PROJECT: SPA SUITE COLLECTION',
  'TOILET':     'PROJECT: MINIMALIST POWDER ROOMS',
  'DESIGN':     'PROJECT: CONCEPT & DESIGN STUDIO',
}

const CATEGORIES = ['LIVING ROOM', 'BEDROOM', 'KITCHEN', 'OFFICE', 'BATHROOM', 'TOILET', 'DESIGN']

const PlayIcon = () => (
  <div className="play-icon">
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="29" stroke="#1CB4A6" strokeWidth="1.5" fill="rgba(0,0,0,0.5)"/>
      <polygon points="24,18 44,30 24,42" fill="#1CB4A6"/>
    </svg>
  </div>
)

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('KITCHEN')
  const [photos, setPhotos] = useState([])
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // When backend is ready, replace with:
    // const res = await axios.get(`http://localhost:5000/api/projects?category=${activeCategory}`)
    // setPhotos(res.data.photos)
    setPhotos(ALL_PHOTOS[activeCategory] || [])
    setVideos(ALL_VIDEOS[activeCategory] || [])
  }, [activeCategory])

  const normalVideos  = videos.filter(v => !v.featured)
  const featuredVideo = videos.find(v => v.featured)

  return (
    <div className="portfolio-page">

      {/* ── TOP NAVBAR ── */}
      <nav className="portfolio-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>AM Interior's</div>
        <ul className="nav-links">
          <li><span onClick={() => navigate('/')}>Home</span></li>
          <li><span onClick={() => navigate('/about')}>About</span></li>
          <li><span onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior:'smooth' }), 300) }}>Services</span></li>
          <li className="active"><span onClick={() => navigate('/portfolio')}>Portfolio</span></li>
          <li><span onClick={() => navigate('/contact')}>Contact</span></li>
        </ul>
        <button className="btn-get-quote" onClick={() => navigate('/get-quote')}>Book Consultation</button>
      </nav>

      {/* ── FILTER BAR ── */}
      <div className="filter-bar">
        {CATEGORIES.map((cat, i) => (
          <React.Fragment key={cat}>
            <button
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
            {i < CATEGORIES.length - 1 && <span className="filter-divider">|</span>}
          </React.Fragment>
        ))}
      </div>

      {/* ── PROJECT HERO HEADER ── */}
      <div className="project-header">
        <h1>{PROJECT_TITLES[activeCategory]}</h1>
        <p>Explore the details of this curated luxury living space.<br />View photos and videos below.</p>
      </div>

      {/* ── PHOTOS SECTION ── */}
      <section className="media-section">
        <h2 className="section-label">PHOTOS</h2>
        <div className="photos-grid">
          {photos.map(photo => (
            <div className="media-card" key={photo.id} onClick={() => navigate(`/project/${photo.id}`)}>
              <div className="media-card-img-wrap">
                <img src={photo.img} alt={photo.title} loading="lazy" />
              </div>
              <p className="media-card-label">{photo.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEOS SECTION ── */}
      {videos.length > 0 && (
        <section className="media-section">
          <h2 className="section-label">VIDEOS</h2>

          {/* Normal videos grid — first 2 on top row, then featured + last side-by-side */}
          <div className="videos-top-row">
            {normalVideos.slice(0, 2).map(v => (
              <div className="media-card video-card" key={v.id}>
                <div className="media-card-img-wrap">
                  <img src={v.thumb} alt={v.title} loading="lazy" />
                  <PlayIcon />
                </div>
                <p className="media-card-label">{v.title}</p>
              </div>
            ))}
          </div>

          <div className="videos-bottom-row">
            {/* Left — third normal video */}
            {normalVideos[2] && (
              <div className="media-card video-card" key={normalVideos[2].id}>
                <div className="media-card-img-wrap">
                  <img src={normalVideos[2].thumb} alt={normalVideos[2].title} loading="lazy" />
                  <PlayIcon />
                </div>
                <p className="media-card-label">{normalVideos[2].title}</p>
              </div>
            )}

            {/* Center — featured */}
            {featuredVideo && (
              <div className="media-card video-card featured-video-card">
                <div className="media-card-img-wrap featured-thumb">
                  <div className="featured-inner">
                    <span className="featured-label">FEATURED VIDEO:</span>
                    <span className="featured-title">{featuredVideo.title.toUpperCase()}</span>
                    <PlayIcon />
                  </div>
                </div>
                <p className="media-card-label">&nbsp;</p>
              </div>
            )}

            {/* Right — fourth normal video */}
            {normalVideos[3] && (
              <div className="media-card video-card" key={normalVideos[3].id}>
                <div className="media-card-img-wrap">
                  <img src={normalVideos[3].thumb} alt={normalVideos[3].title} loading="lazy" />
                  <PlayIcon />
                </div>
                <p className="media-card-label">{normalVideos[3].title}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── VIEW ALL BUTTON ── */}
      <div className="view-all-wrap">
        <button className="btn-view-all">View All Projects</button>
      </div>

      {/* ── FOOTER ── */}
      <footer className="portfolio-footer">
        <div className="footer-logo-col">
          <span className="footer-logo" onClick={() => navigate('/')}>AM Interior's</span>
        </div>
        <div className="footer-contact-col">
          <p className="footer-col-title">Contact Info</p>
          <p>+91 98765 43210</p>
          <p>anitainterior@email.com</p>
        </div>
        <div className="footer-social-col">
          <p className="footer-col-title">Social &amp; Follow</p>
          <div className="social-icons">
            <span className="social-icon">&#9711;</span>
            <span className="social-icon">&#9711;</span>
            <span className="social-icon">&#9711;</span>
          </div>
        </div>
        <div className="footer-star">✦</div>
      </footer>

    </div>
  )
}

export default Portfolio