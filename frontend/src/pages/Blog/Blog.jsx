import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Blog.css'
import '../../styles/SharedNav.css'

const POSTS = [
  {
    id: 1,
    category: 'Design Tips',
    title: '7 Ways to Make a Small Room Feel Like a Luxury Penthouse',
    excerpt: 'Space is a luxury — but it doesn\'t have to be a limitation. Learn how strategic mirrors, vertical lines, and light palettes can transform even the most compact rooms into airy, high-end retreats.',
    author: 'Anita Prajapati',
    date: 'April 12, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    category: 'Materials',
    title: 'Why Italian Calacatta Marble Is Worth Every Rupee',
    excerpt: 'Premium materials are an investment, not an expense. We break down why sourcing authentic Calacatta marble from Carrara, Italy elevates your home\'s value and aesthetic for decades.',
    author: 'Rajesh Kumar',
    date: 'April 5, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    featured: false,
  },
  {
    id: 3,
    category: 'Trends',
    title: 'The 2026 Interior Design Trends Redefining Mumbai\'s Luxury Homes',
    excerpt: 'From biophilic design to modular japandi kitchens — discover the five trends that are reshaping how Mumbai\'s elite are reimagining their living spaces this year.',
    author: 'Anita Prajapati',
    date: 'March 28, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    featured: false,
  },
  {
    id: 4,
    category: 'Case Study',
    title: 'Inside "The Breezeway Penthouse" — Our Most Ambitious Project Yet',
    excerpt: 'A behind-the-scenes look at how we transformed a 1800 sq. ft. narrow penthouse in Bandra into a flowing, light-filled sanctuary using reflective surfaces and bespoke joinery.',
    author: 'Sneha Shah',
    date: 'March 20, 2026',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    featured: false,
  },
  {
    id: 5,
    category: 'Design Tips',
    title: 'Lighting is the Soul of Interior Design: A Complete Guide',
    excerpt: 'No amount of expensive furniture can compensate for bad lighting. Our lighting specialist Sneha explains layered lighting strategy — ambient, task, accent — and how each transforms a room\'s mood.',
    author: 'Sneha Shah',
    date: 'March 10, 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80',
    featured: false,
  },
  {
    id: 6,
    category: 'Modular Kitchens',
    title: 'The Anatomy of a Perfect Modular Kitchen: What Nobody Tells You',
    excerpt: 'Beyond cabinet colours and countertop materials — we reveal the ergonomic principles, workflow zones, and hidden storage strategies that make a kitchen truly functional and beautiful.',
    author: 'Rajesh Kumar',
    date: 'February 25, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Design Tips', 'Materials', 'Trends', 'Case Study', 'Modular Kitchens']

const Blog = () => {
  const navigate   = useNavigate()
  const [cat, setCat]       = useState('All')
  const [search, setSearch] = useState('')
  const [openPost, setOpenPost] = useState(null)

  const filtered = POSTS
    .filter(p => cat === 'All' || p.category === cat)
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    )

  const featured = POSTS.find(p => p.featured)
  const rest     = filtered.filter(p => !p.featured || cat !== 'All' || search)
  const showFeatured = cat === 'All' && !search

  return (
    <div className="blog-page">

      {/* ── AM INTERIOR'S NAVBAR ── */}
      <nav className="am-shared-nav">
        <div className="am-shared-nav-logo" onClick={() => navigate('/')}>
          <svg width="44" height="38" viewBox="0 0 60 55" fill="none">
            <path d="M6 50 L22 8"  stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M54 50 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 8 L30 24 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 50 L14 36"  stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round"/>
            <path d="M54 50 L46 36" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round"/>
            <path d="M14 36 L30 46 L46 36" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="am-shared-nav-text">
            <span className="am-snl-brand">AM Interior's</span>
            <span className="am-snl-sub">ANITA ACHARYA | MONIKA GURAV</span>
            <span className="am-snl-tag">Interior Designer</span>
          </div>
        </div>
        <ul className="am-shared-nav-links">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior:'smooth' }), 300) }}>Services</li>
          <li onClick={() => navigate('/portfolio')}>Portfolio</li>
          <li style={{color:'#1CB4A6', borderBottom:'2px solid #1CB4A6', paddingBottom:'3px'}}>Blog</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
        <button className="am-shared-cta" onClick={() => navigate('/get-quote')}>Book Consultation</button>
      </nav>

      {/* ── HERO ── */}
      <div className="blog-hero">
        <span className="blog-overline">Our Journal</span>
        <h1 className="blog-hero-title">Design Insights & Stories</h1>
        <p className="blog-hero-sub">Expert tips, project reveals, material guides — straight from the Anita Interior studio.</p>

        {/* Search */}
        <div className="blog-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div className="blog-filter-bar">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`blog-filter-btn ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="blog-content">

        {/* ── FEATURED POST ── */}
        {showFeatured && featured && (
          <div className="featured-post" onClick={() => setOpenPost(featured)}>
            <div className="featured-img">
              <img src={featured.img} alt={featured.title} />
              <span className="featured-badge">Featured</span>
            </div>
            <div className="featured-body">
              <span className="post-cat">{featured.category}</span>
              <h2 className="featured-title">{featured.title}</h2>
              <p className="featured-excerpt">{featured.excerpt}</p>
              <div className="post-meta">
                <span className="post-author">By {featured.author}</span>
                <span className="post-dot">·</span>
                <span>{featured.date}</span>
                <span className="post-dot">·</span>
                <span>{featured.readTime}</span>
              </div>
              <button className="btn-read-post">Read Article →</button>
            </div>
          </div>
        )}

        {/* ── POSTS GRID ── */}
        <div className="blog-grid">
          {(showFeatured ? rest : filtered).map(post => (
            <div key={post.id} className="blog-card" onClick={() => setOpenPost(post)}>
              <div className="blog-card-img">
                <img src={post.img} alt={post.title} loading="lazy" />
                <span className="blog-card-cat">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{post.author}</span>
                  <span className="post-dot">·</span>
                  <span>{post.date}</span>
                  <span className="post-dot">·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="blog-empty">
            <p>No articles found. Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* ── ARTICLE READER MODAL ── */}
      {openPost && (
        <div className="article-overlay" onClick={() => setOpenPost(null)}>
          <div className="article-modal" onClick={e => e.stopPropagation()}>
            <button className="article-close" onClick={() => setOpenPost(null)}>✕ Close</button>
            <div className="article-img">
              <img src={openPost.img} alt={openPost.title} />
            </div>
            <div className="article-body">
              <span className="post-cat">{openPost.category}</span>
              <h1 className="article-title">{openPost.title}</h1>
              <div className="article-meta">
                <span>By {openPost.author}</span>
                <span className="post-dot">·</span>
                <span>{openPost.date}</span>
                <span className="post-dot">·</span>
                <span>{openPost.readTime}</span>
              </div>
              <div className="article-rule" />
              <p className="article-text">{openPost.excerpt}</p>
              <p className="article-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="article-text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="article-cta">
                <p>Ready to transform your space?</p>
                <button className="am-shared-cta" onClick={() => { setOpenPost(null); navigate('/contact') }}>
                  Book a Consultation →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── NEWSLETTER ── */}
      <div className="blog-newsletter">
        <h2>Get Design Tips in Your Inbox</h2>
        <p>Join 2,000+ homeowners receiving our weekly interior design insights.</p>
        <form className="newsletter-form" onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!') }}>
          <input type="email" placeholder="your@email.com" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* ── AM INTERIOR'S FOOTER ── */}
      <div className="am-shared-footer">
        <div className="am-sf-top">
          <div className="am-sf-brand">
            <svg width="36" height="32" viewBox="0 0 60 55" fill="none">
              <path d="M6 50 L22 8"  stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M54 50 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 8 L30 24 L38 8" stroke="#1CB4A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 36 L30 46 L46 36" stroke="#1CB4A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <span className="am-sf-logo">AM Interior's</span>
              <span className="am-sf-sub">Anita Acharya | Monika Gurav</span>
            </div>
          </div>
          <div className="am-sf-links">
            <span onClick={() => navigate('/')}>Home</span>
            <span onClick={() => navigate('/portfolio')}>Portfolio</span>
            <span onClick={() => navigate('/blog')}>Blog</span>
            <span onClick={() => navigate('/contact')}>Contact</span>
          </div>
          <div className="am-sf-contact">
            <p>📞 +91 8308 882977 (Anita)</p>
            <p>📞 +91 7057 266506 (Monika)</p>
            <p>✉️ AMinteriors.2420@gmail.com</p>
            <p>📍 Karvenagar, Pune 411052</p>
          </div>
        </div>
        <div className="am-sf-bottom">
          <span>© {new Date().getFullYear()} AM Interior's. All rights reserved.</span>
          <span className="am-sf-secret" onClick={() => navigate('/admin/login')}>
            <span className="am-sf-dot" /> Secret Door
          </span>
        </div>
      </div>
    </div>
  )
}

export default Blog