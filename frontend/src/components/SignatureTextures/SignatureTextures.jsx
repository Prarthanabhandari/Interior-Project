import React, { useEffect, useRef, useState } from 'react'
import './SignatureTextures.css'

const materials = [
  { id:1, label:'Italian Calacatta Marble', desc:'Primary Flooring',    img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id:2, label:'Brushed Gold & Brass',     desc:'Accent Fixtures',     img:'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80' },
  { id:3, label:'Reclaimed Oak Wood',       desc:'Custom Joinery',      img:'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80' },
  { id:4, label:'Hand-Woven Velvet',        desc:'Statement Furniture',  img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
]

const SignatureTextures = () => {
  const ref = useRef(null)
  const [visible, setVisible]   = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm]         = useState({ name:'', email:'', phone:'' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold:0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setShowModal(false); setSubmitted(false); setForm({ name:'', email:'', phone:'' }) }, 2500)
  }

  return (
    <>
      <section className="textures-section" ref={ref}>
        <div className="textures-wrap">
          <h2 className="textures-heading">Signature Textures</h2>
          <p className="textures-sub">We source only sustainable, grade-A materials for lasting elegance.</p>

          <div className="textures-row">
            {materials.map((m, i) => (
              <div key={m.id} className={`texture-item ${visible ? 'texture-item--in' : ''}`} style={{ transitionDelay:`${i * 0.15}s` }}>
                <div className="t-halo">
                  <div className="t-circle">
                    <img src={m.img} alt={m.label} loading="lazy" />
                  </div>
                </div>
                {/* Labels below circle — always visible, no clipping */}
                <p className="t-name">{m.label}</p>
                <p className="t-desc">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="textures-cta">
            <button className="btn-brochure" onClick={() => setShowModal(true)}>
              Request Our Material Brochure &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── BROCHURE REQUEST MODAL ── */}
      {showModal && (
        <div className="brochure-overlay" onClick={() => setShowModal(false)}>
          <div className="brochure-modal" onClick={e => e.stopPropagation()}>
            <button className="brochure-close" onClick={() => setShowModal(false)}>✕</button>
            {submitted ? (
              <div className="brochure-success">
                <div className="success-tick">✓</div>
                <h3>Brochure Request Sent!</h3>
                <p>We'll email you our premium material brochure within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="brochure-modal-top">
                  <span className="brochure-overline">Exclusive PDF</span>
                  <h2>Request Material Brochure</h2>
                  <p>Get our premium catalogue showcasing all materials, sourcing details, and pricing guides.</p>
                </div>
                <form onSubmit={handleSubmit} className="brochure-form">
                  <div className="b-field">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
                  </div>
                  <div className="b-field">
                    <label>Email Address *</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
                  </div>
                  <div className="b-field">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                  </div>
                  <button type="submit" className="brochure-submit">Send Me the Brochure</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SignatureTextures