import React, { useEffect, useRef, useState } from 'react'
import './Journey.css'

const phases = [
  {
    id: 1,
    num: 'Phase 1',
    title: 'Discovery & Moodboarding',
    desc: 'We dive deep into your lifestyle and aspirations. From initial consultation to curated moodboards — this is where your story begins.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  },
  {
    id: 2,
    num: 'Phase 2',
    title: '3D Visualization',
    desc: 'High-resolution 3D renders bring your space to life before a single nail is hammered — see your dream interior with photorealistic precision.',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
  },
  {
    id: 3,
    num: 'Phase 3',
    title: 'Procurement & Sourcing',
    desc: 'We source only grade-A materials — Italian marble, solid wood, premium fixtures — ensuring every element meets our exacting quality standards.',
    img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80',
  },
  {
    id: 4,
    num: 'Phase 4',
    title: 'Final Reveal',
    desc: 'The moment of truth — a completely transformed, ready-to-live-in luxury space, delivered on time and beyond your expectations.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
  },
]

const Journey = () => {
  const sectionRef = useRef(null)
  const [lineW, setLineW] = useState(0)
  const [shown, setShown] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate line
          let w = 0
          const t = setInterval(() => {
            w += 1.5
            setLineW(v => Math.min(v + 1.5, 100))
            if (w >= 100) clearInterval(t)
          }, 18)
          // Stagger cards
          phases.forEach((_, i) => {
            setTimeout(() => setShown(p => [...p, i]), i * 180 + 100)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="journey-section" ref={sectionRef}>
      <div className="journey-wrap">
        <h2 className="journey-title">
          <span className="jt-gold">From Concept to Reveal: </span>
          <span className="jt-dark">Your Journey</span>
        </h2>

        <div className="journey-body">
          {/* Gold connector line */}
          <div className="line-track">
            <div className="line-fill" style={{ width: `${lineW}%` }} />
          </div>

          {/* 4 phase circles */}
          <div className="phases-grid">
            {phases.map((p, i) => (
              <div
                key={p.id}
                className={`phase ${shown.includes(i) ? 'phase--in' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="phase-circle">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <p className="phase-num">{p.num}</p>
                <h3 className="phase-title">{p.title}</h3>
                <p className="phase-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journey